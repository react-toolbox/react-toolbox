/**
 * Reproducible migration of the original Material Design styles.
 *
 * The fixtures are an immutable copy of the CSS from 2.0.0-beta.13. This script
 * translates syntax and local names; it does not redesign or approximate rules.
 * Consumers receive ordinary CSS and do not run this migration at build time.
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import postcss from 'postcss';
import nested from 'postcss-nested';
import selectorParser from 'postcss-selector-parser';

export const projectRoot = fileURLToPath(new URL('..', import.meta.url));
export const fixtureRoot = path.join(projectRoot, 'tests/fixtures/legacy-styles');
const componentRoot = path.join(projectRoot, 'components');

export async function cssFiles(directory = fixtureRoot) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async entry => {
    const name = path.join(directory, entry.name);
    return entry.isDirectory() ? cssFiles(name) : entry.name.endsWith('.module.css') ? [name] : [];
  }));
  return files.flat().sort();
}

const variables = await readFile(path.join(fixtureRoot, 'variables.module.css'), 'utf8');
const resetStart = variables.indexOf('  --reset: {');
const resetOpen = variables.indexOf('{', resetStart);
let depth = 1;
let resetEnd = resetOpen + 1;
while (depth) {
  if (variables[resetEnd] === '{') depth++;
  if (variables[resetEnd] === '}') depth--;
  resetEnd++;
}
const reset = variables.slice(resetOpen + 1, resetEnd - 1);
const mediaSource = await readFile(path.join(fixtureRoot, 'media.module.css'), 'utf8');
const media = new Map([...mediaSource.matchAll(/@custom-media\s+(--[\w-]+)\s+([^;]+);/g)]
  .map(([, name, query]) => [name, query]));

// Recompute only aliases affected by explicitly changed theme inputs. Resetting
// every default on a scope would erase inherited custom palettes, scale, fonts,
// and component overrides whenever an unrelated token changes.
const directDependencies = new Map();
for (const filename of await cssFiles()) {
  const text = await readFile(filename, 'utf8');
  for (const [, name, value] of text.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) {
    directDependencies.set(name, [...value.matchAll(/var\((--[\w-]+)\)/g)].map(match => match[1]));
  }
}
function dependenciesOf(name, ancestors = new Set()) {
  if (ancestors.has(name)) throw new Error(`Cyclic design token: ${name}`);
  const ancestorsWithName = new Set([...ancestors, name]);
  return [...new Set((directDependencies.get(name) || []).flatMap(dependency =>
    [dependency, ...dependenciesOf(dependency, ancestorsWithName)]))].sort();
}
const tokenDependencies = new Map([...directDependencies.keys()].map(name => [name, dependenciesOf(name)]));

// Relative RGB replaces alpha, just as color-mod(... a(...)) did. color-mix
// would multiply an existing alpha instead, changing customized translucent colors.
export function modernColor(value) {
  return value.replace(/color-mod\((.+?)\s+a\(([\d.]+%?)\)\)/g,
    (_, color, alpha) => `rgb(from ${color} r g b / ${alpha})`);
}

function substitute(value, environment) {
  return value.replace(/\$\(([\w-]+)\)|\$([\w-]+)/g,
    (match, parenthesized, plain) => environment[parenthesized || plain] ?? match);
}

function expandLoopsAndMixins(root) {
  const mixins = new Map();
  root.walkAtRules('define-mixin', rule => {
    const [name, ...parameters] = rule.params.split(/\s+/);
    mixins.set(name, { parameters, nodes: rule.nodes });
    rule.remove();
  });
  function expand(nodes, environment = {}) {
    return nodes.flatMap(original => {
      if (original.type === 'atrule' && original.name === 'each') {
        const [, variable, values] = original.params.match(/^\$([\w-]+)\s+in\s+(.+)$/);
        return values.split(',').flatMap(value =>
          expand(original.nodes, { ...environment, [variable]: value.trim() }));
      }
      if (original.type === 'atrule' && original.name === 'mixin') {
        const [name, ...values] = original.params.split(/\s+/);
        const mixin = mixins.get(name);
        if (!mixin) throw new Error(`Unknown mixin ${name}`);
        const parameters = Object.fromEntries(mixin.parameters.map((parameter, i) =>
          [parameter.slice(1), substitute(values[i], environment)]));
        return expand(mixin.nodes, { ...environment, ...parameters });
      }
      const node = original.clone();
      for (const field of ['selector', 'params', 'prop', 'value']) {
        if (typeof node[field] === 'string') node[field] = substitute(node[field], environment);
      }
      if (node.nodes) {
        const children = expand(node.nodes, environment);
        node.removeAll();
        node.append(children);
      }
      return [node];
    });
  }
  const children = expand(root.nodes);
  root.removeAll();
  root.append(children);
}

export async function convertFile(filename, { namespace = true, scopedTokens = true } = {}) {
  const relative = path.relative(fixtureRoot, filename);
  const component = path.dirname(relative).replaceAll('_', '-');
  let source = await readFile(filename, 'utf8');
  if (relative === 'variables.module.css') {
    source = source.slice(0, resetStart) + source.slice(resetEnd);
  }
  source = source.replace(/@import\s+[^;]+;\s*/g, '')
    .replace(/@apply --reset;/g, reset);
  const root = postcss.parse(source, { from: filename });
  root.walkAtRules('custom-media', rule => rule.remove());
  expandLoopsAndMixins(root);
  root.walkAtRules('media', rule => {
    rule.params = rule.params.replace(/\((--[\w-]+)\)/g, (_, name) => {
      if (!media.has(name)) throw new Error(`Unknown media query ${name}`);
      return media.get(name);
    });
  });

  const compositions = new Map();
  root.walkDecls('composes', declaration => {
    const name = declaration.parent.selector.match(/^\.([\w-]+)$/)?.[1];
    if (!name) throw new Error(`Unexpected composition selector: ${declaration.parent.selector}`);
    compositions.set(name, [...(compositions.get(name) || []), ...declaration.value.split(/\s+/)]);
    declaration.remove();
  });
  root.walkDecls(declaration => { declaration.value = modernColor(declaration.value); });
  if (component === 'progress-bar') {
    root.walkDecls(/^stroke-dash(?:array|offset)$/, declaration => {
      // A bare number is an SVG user-unit length, but calc(<number>) remains
      // number-typed and interpolates discretely in SVG animations. Explicit
      // px uses the exact same viewBox user units while enabling smooth length
      // interpolation throughout the original 1.5 second keyframe cycle.
      declaration.value = declaration.value.replace(/calc\(var\(--scale-ratio\) \* (-?[\d.]+)\)/g,
        (_, value) => `calc(var(--scale-ratio) * ${value}px)`);
    });
    root.walkDecls('background-image', declaration => {
      // Color 3 rgba() gradient stops were painted with 8-bit alpha. Relative
      // Color 4 RGB otherwise retains a float alpha and changes pixels by one
      // channel even for identical stops. Reproduce the original quantization
      // while allowing live theme colors (including translucent colors).
      // A tiny epsilon compensates for WebKit storing 0.7 just below the
      // 178.5 midpoint in float32; the original rgba() parser rounds it to 179.
      declaration.value = declaration.value.replace(/var\(--progress-(?:secondary|main|disabled)-color\)/g,
        color => `rgb(from ${color} r g b / calc(round(alpha * 255 + 0.0001) / 255))`);
      declaration.before(postcss.comment({ text: 'Preserve legacy rgba gradient alpha rounding (8 bits).' }));
    });
  }
  // Preserve the original compiler's browser fallbacks as ordinary CSS too.
  // In particular Safari still uses the prefixed text-size-adjust property.
  const prefixes = {
    'text-size-adjust': ['-webkit-text-size-adjust', '-moz-text-size-adjust'],
    appearance: ['-webkit-appearance', '-moz-appearance'],
    'user-select': ['-webkit-user-select', '-moz-user-select'],
  };
  root.walkDecls(declaration => {
    for (const prop of prefixes[declaration.prop] || []) declaration.cloneBefore({ prop });
  });
  const flattened = (await postcss([nested()]).process(root, { from: filename })).root;
  const classes = new Set();
  const keyframes = new Map();
  flattened.walkAtRules('keyframes', rule => {
    const original = rule.params;
    const translated = namespace ? `rt-${component}-${original}` : original;
    keyframes.set(original, translated);
    rule.params = translated;
  });
  flattened.walkRules(rule => {
    if (rule.parent.type === 'atrule' && rule.parent.name.endsWith('keyframes')) return;
    rule.selector = selectorParser(selectors => selectors.walkClasses(node => {
      classes.add(node.value);
      if (namespace) node.value = `rt-${component}-${node.value}`;
    })).processSync(rule.selector);
  });
  if (scopedTokens) {
    flattened.walkRules(':root', rule => {
      const groups = new Map();
      for (const declaration of rule.nodes.filter(node => node.type === 'decl')) {
        const dependencies = tokenDependencies.get(declaration.prop) || [];
        if (!dependencies.length) continue;
        const selector = dependencies.map(name => `[data-react-toolbox-tokens~="${name}"]`).join(',\n');
        if (!groups.has(selector)) groups.set(selector, []);
        groups.get(selector).push(declaration.clone());
      }
      let previous = rule;
      for (const [selector, declarations] of groups) {
        const scope = postcss.rule({ selector });
        scope.append(declarations);
        previous.after(scope);
        previous = scope;
      }
    });
  }
  flattened.walkDecls(/^animation(?:-name)?$/, declaration => {
    declaration.value = declaration.value.replace(/[a-z][\w-]*/gi,
      name => keyframes.get(name) || name);
  });

  function classNames(name, visited = new Set()) {
    if (visited.has(name)) throw new Error(`Composition cycle at ${name}`);
    const next = new Set([...visited, name]);
    const own = namespace ? `rt-${component}-${name}` : name;
    return [own, ...(compositions.get(name) || []).flatMap(parent => classNames(parent, next))];
  }
  const theme = Object.fromEntries([...classes].sort().map(name =>
    [name, [...new Set(classNames(name))].join(' ')]));
  for (const [name, translated] of keyframes) theme[name] = translated;
  return { css: flattened.toString().trim() + '\n', theme, relative, compositions, keyframes };
}

export async function migrate(outputRoot) {
  if (!outputRoot) throw new Error('Historical translation requires --output=<scratch-directory>; maintained components include reviewed M1 corrections.');
  const destination = path.resolve(outputRoot);
  if (destination === componentRoot || destination.startsWith(componentRoot + path.sep)) {
    throw new Error('Historical translation cannot overwrite maintained component sources. Use a scratch directory.');
  }
  const files = await cssFiles();
  const imports = { theme: [], components: [] };
  for (const filename of files) {
    const result = await convertFile(filename);
    const outputRelative = result.relative.replace('.module.css', '.css');
    const output = path.join(destination, outputRelative);
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, result.css);
    const layer = path.basename(output) === 'theme.css' ? 'components' : 'theme';
    imports[layer].push(outputRelative);
    if (layer === 'components') {
      await writeFile(output.replace(/\.css$/, '.js'),
        '// Stable style slots; pass additional classes through the theme prop.\n' +
        `const theme = ${JSON.stringify(result.theme, null, 2)};\n\nexport default theme;\n`);
    }
  }
  // Tokens first: component defaults may depend on shared palette and scale.
  imports.theme.sort((a, b) => {
    const rank = value => value === 'colors.css' ? 0 : value === 'variables.css' ? 1 : 2;
    return rank(a) - rank(b) || a.localeCompare(b);
  });
  await writeFile(path.join(destination, 'styles.css'),
    '/* Original Material Design, expressed as plain CSS in Tailwind cascade layers.\n' +
    ' * No global reset or preflight: utility classes can override component rules. */\n' +
    '@layer theme, base, components, utilities;\n\n' +
    Object.entries(imports).flatMap(([layer, names]) => names.map(name =>
      `@import "./${name}" layer(${layer});`)).join('\n') + '\n');
  console.log(`Migrated ${files.length} legacy stylesheets without changing design values.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await migrate(process.argv.find(argument => argument.startsWith('--output='))?.slice('--output='.length));
}
