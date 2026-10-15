import { glob, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parse } from '@babel/parser';
import { transform } from 'esbuild';
import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';
import { __unstable__loadDesignSystem } from 'tailwindcss';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Only inspect class expressions, never labels, prop values, or conditions.
export function classStrings(source) {
  const nodes = new Set();
  const attributes = new Set();
  function collect(node) {
    if (!node) return;
    if (node.type === 'StringLiteral') nodes.add(node);
    if (node.type === 'JSXExpressionContainer') collect(node.expression);
    if (node.type === 'ArrayExpression') node.elements.forEach(collect);
    if (node.type === 'ConditionalExpression') {
      collect(node.consequent);
      collect(node.alternate);
    }
    if (node.type === 'LogicalExpression') collect(node.right);
    if (node.type === 'CallExpression' && ['cn', 'clsx', 'classNames'].includes(node.callee.name))
      node.arguments.forEach(collect);
    if (node.type === 'CallExpression' && node.callee.property?.name === 'join') collect(node.callee.object);
  }
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'JSXAttribute' && node.name.name === 'className') {
      collect(node.value);
      if (node.value?.type === 'StringLiteral') attributes.add(node.value);
    }
    if (node.type === 'CallExpression' && ['cn', 'clsx', 'classNames'].includes(node.callee.name)) collect(node);
    if (
      node.type === 'VariableDeclarator' &&
      (node.id.name?.endsWith('Classes') || ['materialRoot', 'materialDescendants'].includes(node.id.name))
    )
      collect(node.init);
    for (const [key, value] of Object.entries(node)) {
      if (['loc', 'extra', 'comments'].includes(key)) continue;
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  }
  visit(parse(source, { sourceType: 'module', plugins: ['typescript', 'jsx'] }));
  return [...nodes].sort((a, b) => a.start - b.start).map((node) => ({ ...node, jsx: attributes.has(node) }));
}

export function classLiteral(value, quote, jsx) {
  const escaped = jsx
    ? value.replaceAll('&', '&amp;').replaceAll(quote, quote === '"' ? '&quot;' : '&#39;')
    : value.replaceAll('\\', '\\\\').replaceAll('\n', '\\n').replaceAll('\r', '\\r').replaceAll(quote, `\\${quote}`);
  return `${quote}${escaped}${quote}`;
}

function utilityOffset(candidate) {
  let depth = 0;
  let offset = 0;
  for (let i = 0; i < candidate.length; i++) {
    const char = candidate[i];
    if (char === '\\') i++;
    else if (char === '[' || char === '(') depth++;
    else if (char === ']' || char === ')') depth--;
    else if (char === ':' && depth === 0) offset = i + 1;
  }
  return offset;
}

export async function createCanonicalizer() {
  const theme = await readFile(path.join(root, 'node_modules/tailwindcss/theme.css'), 'utf8');
  const bridge = (await readFile(path.join(root, 'components/tailwind.css'), 'utf8')).replace(
    /@(?:import|source)[^;]+;/g,
    '',
  );
  // Use the installed compiler's canonicalization rather than a second set of
  // Tailwind rules. No rem assumption: consumers control their root font size.
  const system = await __unstable__loadDesignSystem(`${theme}\n${bridge}\n@tailwind utilities;`);
  const fingerprints = new Map();
  const replacements = new Map();
  async function fingerprint(name) {
    if (fingerprints.has(name)) return fingerprints.get(name);
    const css = system.candidatesToCss([name])[0];
    if (!css) return null;
    const tree = postcss.parse(css);
    // Ignore compiler bookkeeping; retain every visible declaration, selector,
    // condition and variable reference. Browser parity checks cover composition.
    tree.walkDecls(/^--tw-/, (decl) => decl.remove());
    tree.walkAtRules('property', (rule) => rule.remove());
    tree.walkRules((rule) => {
      rule.selector = selectorParser((selectors) =>
        selectors.walkClasses((node) => {
          if (node.value === name) node.value = 'utility';
        }),
      ).processSync(rule.selector);
    });
    const { code } = await transform(tree.toString(), { loader: 'css', minify: true });
    fingerprints.set(name, code);
    return code;
  }
  return async function canonicalize(name) {
    if (replacements.has(name)) return replacements.get(name);
    const offset = utilityOffset(name);
    const [utility] = system.canonicalizeCandidates([name.slice(offset)]);
    const candidate = name.slice(0, offset) + utility;
    let result = name;
    // Variant spelling also determines Tailwind's rule order. In particular,
    // data-* can lose to an arbitrary class variant even with equal specificity.
    // Preserve variants, including media queries used by the standalone build.
    if (utility && candidate !== name) {
      const original = await fingerprint(name);
      if (original !== null && original === (await fingerprint(candidate))) result = candidate;
    }
    replacements.set(name, result);
    return result;
  };
}

async function main() {
  const fix = process.argv.includes('--fix');
  const canonicalize = await createCanonicalizer();
  let count = 0;
  let changedFiles = 0;
  for (const directory of ['components', '../../apps/docs/app']) {
    for await (const relative of glob('**/*.{ts,tsx,js,jsx}', { cwd: path.join(root, directory) })) {
      // Shared input for the independent React 16 rendering reference.
      if (directory.endsWith('/app') && relative === 'gallery.jsx') continue;
      const filename = path.resolve(root, directory, relative);
      const source = await readFile(filename, 'utf8');
      const edits = [];
      for (const node of classStrings(source)) {
        const parts = node.value.split(/(\s+)/);
        let changed = false;
        for (let i = 0; i < parts.length; i += 2) {
          if (!parts[i]) continue;
          const next = await canonicalize(parts[i]);
          if (next === parts[i]) continue;
          count++;
          changed = true;
          if (!fix) console.error(`${path.relative(root, filename)}:${node.loc.start.line}: ${parts[i]} → ${next}`);
          parts[i] = next;
        }
        if (changed) {
          const value = parts.join('');
          const replacement = classLiteral(value, source[node.start], node.jsx);
          edits.push({ start: node.start, end: node.end, replacement });
        }
      }
      if (edits.length) {
        changedFiles++;
        if (fix) {
          let result = source;
          for (const edit of edits.reverse())
            result = result.slice(0, edit.start) + edit.replacement + result.slice(edit.end);
          await writeFile(filename, result);
        }
      }
    }
  }
  console.log(`${fix ? 'Updated' : 'Found'} ${count} equivalent Tailwind class improvements in ${changedFiles} files.`);
  if (!fix && count) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) await main();
