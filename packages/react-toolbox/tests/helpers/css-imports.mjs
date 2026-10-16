import { readFile } from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';

/** Expand maintained local CSS imports for token inspection, without network or font imports. */
export async function readSourceCss(file, seen = new Set()) {
  const absolute = path.resolve(file);
  if (seen.has(absolute)) return postcss.root();
  seen.add(absolute);
  const tree = postcss.parse(await readFile(absolute, 'utf8'), { from: absolute });
  const imports = [];
  tree.walkAtRules('import', (rule) => imports.push(rule));
  for (const rule of imports) {
    const specifier = rule.params.match(/^["']([^"']+)["']/)?.[1];
    if (specifier?.startsWith('.')) {
      const imported = await readSourceCss(path.resolve(path.dirname(absolute), specifier), seen);
      rule.replaceWith(...imported.nodes);
    }
  }
  return tree;
}
