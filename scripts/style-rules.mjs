/** Resolve current and archived CSS for strict declaration and browser comparisons. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import calc from 'postcss-calc';
import selectorParser from 'postcss-selector-parser';

const root = fileURLToPath(new URL('..', import.meta.url));
const fixture = path.join(root, 'tests/fixtures/legacy-styles');
const entry = await readFile(path.join(root, 'components/styles.css'), 'utf8');
const sheets = [...entry.matchAll(/@import "\.\/([^"]+)"/g)].map(match => match[1]);
const current = postcss.parse((await Promise.all(sheets.map(name =>
  readFile(path.join(root, 'components', name), 'utf8')))).join('\n'));
const baseline = postcss.parse(await readFile(path.join(fixture, 'reference.css'), 'utf8'));
const tokens = new Map();
const runtimeTokens = new Set();
current.walkDecls(/^--/, declaration => {
  if (declaration.parent.selector === ':root') tokens.set(declaration.prop, declaration.value);
  else if (!declaration.parent.selector?.includes('[data-react-toolbox-tokens')) runtimeTokens.add(declaration.prop);
});

function resolveVariables(value, ancestors = new Set()) {
  let result = '';
  let cursor = 0;
  while (true) {
    const start = value.indexOf('var(', cursor);
    if (start < 0) return result + value.slice(cursor);
    result += value.slice(cursor, start);
    let depth = 1;
    let end = start + 4;
    while (depth && end < value.length) {
      if (value[end] === '(') depth++;
      if (value[end] === ')') depth--;
      end++;
    }
    const content = value.slice(start + 4, end - 1);
    const comma = content.indexOf(',');
    const name = (comma < 0 ? content : content.slice(0, comma)).trim();
    const fallback = comma < 0 ? null : content.slice(comma + 1).trim();
    if (runtimeTokens.has(name)) {
      result += `var(${name}${fallback === null ? '' : `, ${resolveVariables(fallback, ancestors)}`})`;
    } else if (tokens.has(name)) {
      assert.ok(!ancestors.has(name), `Cyclic design token ${name}`);
      result += resolveVariables(tokens.get(name), new Set([...ancestors, name]));
    } else {
      assert.notEqual(fallback, null, `Undefined design token ${name}`);
      result += resolveVariables(fallback, ancestors);
    }
    cursor = end;
  }
}

function resolveRelativeColors(value) {
  return value.replace(/rgb\(from\s+(rgb\([^)]+\)|#[\da-f]+)\s+r g b\s*\/\s*([\d.]+%?)\)/gi,
    (_, color, alpha) => {
      let channels;
      if (color[0] === '#') {
        const hex = color.slice(1).length === 3 ? [...color.slice(1)].map(char => char + char).join('') : color.slice(1);
        channels = [0, 2, 4].map(offset => parseInt(hex.slice(offset, offset + 2), 16));
      } else {
        channels = color.match(/[\d.]+/g).map(Number);
      }
      const opacity = alpha.endsWith('%') ? parseFloat(alpha) / 100 : Number(alpha);
      return `rgba(${channels.join(', ')}, ${opacity})`;
    });
}

let legacyGradientStops = 0;
current.walkDecls(declaration => {
  if (declaration.prop.startsWith('--') && !runtimeTokens.has(declaration.prop)) {
    declaration.remove();
    return;
  }
  // The old rgba() renderer quantized gradient alpha to 8 bits; relative RGB
  // does not. The explicit wrapper reproduces that old paint operation exactly.
  // Its epsilon corrects floating-point midpoint rounding in WebKit.
  // Compare its source color here; browser PNG parity verifies the actual paint.
  if (declaration.prop === 'background-image' && declaration.parent.selector.includes('.rt-progress-bar-')) {
    declaration.value = declaration.value.replace(
      /rgb\(from (var\(--progress-(?:secondary|main|disabled)-color\)) r g b \/ calc\(round\(alpha \* 255 \+ 0\.0001\) \/ 255\)\)/g,
      (_, color) => { legacyGradientStops++; return color; });
  }
  declaration.value = resolveRelativeColors(resolveVariables(declaration.value));
});
assert.equal(legacyGradientStops, 8, 'Progress gradients must preserve legacy 8-bit alpha painting');
const calcOptions = { precision: false, unwrapSingleValue: true };
const resolved = (await postcss([calc(calcOptions)]).process(current, { from: undefined })).root;
const normalizedBaseline = (await postcss([calc(calcOptions)]).process(baseline, { from: undefined })).root;

// The original postcss-calc emitted five decimal places for repeating values.
const normalize = text => text.replace(/-?\d*\.\d+/g, value => String(Number(Number(value).toFixed(5))))
  .replace(/\s+/g, ' ').replace(/\s*([(),:])\s*/g, '$1').trim();
// Selector/media whitespace is syntax: removing the space after :not(...)
// changes a descendant into a compound selector, and `and (` is not `and(`.
const normalizeSyntax = text => text.replace(/\s+/g, ' ').trim();
export function declarationsBySelector(tree) {
  const selectors = new Map();
  tree.walkRules(rule => {
    const declarations = rule.nodes.filter(node => node.type === 'decl');
    if (!declarations.length) return;
    const conditions = [];
    for (let parent = rule.parent; parent && parent.type !== 'root'; parent = parent.parent) {
      if (parent.type === 'atrule') conditions.unshift(`@${parent.name} ${normalizeSyntax(parent.params)}`);
    }
    // Compare each selector separately: grouping is only a serialization choice.
    const parsed = selectorParser().astSync(rule.selector);
    for (const selector of parsed.nodes) {
      const key = [...conditions, normalizeSyntax(selector.toString())].join(' > ');
      const properties = selectors.get(key) || new Map();
      for (const declaration of declarations) {
        // Unitless SVG dash numbers and px lengths represent the same viewBox
        // user units. Runtime calc() requires the explicit length dimension to
        // interpolate; the legacy compiler had reduced it to a bare number.
        const value = /^stroke-dash(?:array|offset)$/.test(declaration.prop)
          ? declaration.value.replace(/(^|[\s,])(-?[\d.]+)(?=$|[\s,])/g, '$1$2px')
          : declaration.value;
        properties.set(declaration.prop, normalize(value) + (declaration.important ? '!important' : ''));
      }
      selectors.set(key, properties);
    }
  });
  return selectors;
}

export const legacyRules = declarationsBySelector(normalizedBaseline);
export const modernRules = declarationsBySelector(resolved);
export { root, fixture };

export const corrections = JSON.parse(await readFile(path.join(root, 'tests/fixtures/m1-style-corrections.json'), 'utf8'));

// Each correction records both values and its M1 source. Unexpected drift is
// still an error; the original compiler output is never regenerated to pass.
export function correctedRules() {
  const rules = new Map([...legacyRules].map(([selector, declarations]) => [selector, new Map(declarations)]));
  for (const correction of corrections) {
    const { selector, property, before, after, source, reason } = correction;
    assert.ok(source?.startsWith('https://m1.material.io/'), `Missing M1 source: ${selector}`);
    assert.ok(reason, `Missing correction rationale: ${selector}`);
    assert.equal(rules.get(selector)?.get(property) ?? null, before, `Archived value changed: ${selector}: ${property}`);
    if (!rules.has(selector)) rules.set(selector, new Map());
    if (after === null) rules.get(selector).delete(property);
    else rules.get(selector).set(property, after);
  }
  for (const [selector, declarations] of rules) if (!declarations.size) rules.delete(selector);
  return rules;
}

export function referenceCss() {
  correctedRules(); // Validate the immutable before-values and provenance first.
  const entries = [];
  normalizedBaseline.walkRules(rule => {
    const conditions = [];
    for (let parent = rule.parent; parent && parent.type !== 'root'; parent = parent.parent) {
      if (parent.type === 'atrule') conditions.unshift(`@${parent.name} ${normalizeSyntax(parent.params)}`);
    }
    for (const selector of selectorParser().astSync(rule.selector).nodes) {
      const text = normalizeSyntax(selector.toString());
      entries.push({ key: [...conditions, text].join(' > '), conditions, rule: rule.clone({ selector: text }) });
    }
  });
  for (const { selector: key, property, after, afterSelector } of corrections) {
    let targets = entries.filter(entry => entry.key === key);
    if (!targets.length && after !== null) {
      const parts = key.split(' > ');
      const conditions = [];
      while (parts[0]?.startsWith('@')) conditions.push(parts.shift());
      const entry = { key, conditions, rule: postcss.rule({ selector: parts.join(' > ') }) };
      const index = afterSelector === null ? -1 : entries.findLastIndex(item => item.key === afterSelector);
      assert.ok(afterSelector === null || index >= 0, `Missing reviewed cascade anchor: ${key}`);
      entries.splice(index + 1, 0, entry);
      targets = [entry];
    }
    // Preserve repeated rules and their cascade positions. A Map serialization
    // would merge them and could also split one animation into several @keyframes.
    const declarations = targets.flatMap(entry => entry.rule.nodes || []).filter(node => node.type === 'decl' && node.prop === property);
    if (after === null) declarations.forEach(node => node.remove());
    else {
      const value = after.replace(/!important$/, '');
      const important = after.endsWith('!important');
      if (declarations.length) Object.assign(declarations.at(-1), { value, important });
      else targets.at(-1).rule.append({ prop: property, value, important });
    }
  }
  const output = postcss.root();
  let previous = [];
  let parents = [output];
  for (const { conditions, rule } of entries) {
    if (!rule.nodes?.length) continue;
    let shared = 0;
    while (shared < conditions.length && conditions[shared] === previous[shared]) shared++;
    parents = parents.slice(0, shared + 1);
    for (const condition of conditions.slice(shared)) {
      const [, name, params] = condition.match(/^@(\S+)\s+(.*)$/);
      const wrapper = postcss.atRule({ name, params });
      parents.at(-1).append(wrapper);
      parents.push(wrapper);
    }
    parents.at(-1).append(rule);
    previous = conditions;
  }
  return output.toString();
}
