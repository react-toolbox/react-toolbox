import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { componentClasses } from './component-classes.mjs';
import { compile } from 'tailwindcss';
import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';

// Verify the declarations Tailwind actually emits, mapped back to the stable
// component slots used by the independent Material 1 reference. This is test
// infrastructure only; installed components contain ordinary static utilities.
export async function utilityRules(root) {
  const owners = new Map();
  for (const value of Object.values(await componentClasses(root))) {
    const [marker, ...classes] = value.split(/\s+/);
    for (const name of classes) {
      if (!owners.has(name)) owners.set(name, new Set());
      owners.get(name).add(marker);
    }
  }
  const theme = await readFile(path.join(root, 'node_modules/tailwindcss/theme.css'), 'utf8');
  const bridge = (await readFile(path.join(root, 'src/material/foundations/styles/tailwind.css'), 'utf8')).replace(
    /@(?:import|source)[^;]+;/g,
    '',
  );
  const compiler = await compile(`${theme}\n${bridge}\n@tailwind utilities;`);
  const tree = postcss.parse(compiler.build([...owners.keys()]));
  const output = postcss.root();
  /** Resolve Tailwind's registered initial values, such as border-style: solid. */
  const defaults = postcss.rule({ selector: ':root' });
  tree.walkAtRules('property', (rule) => {
    const initial = rule.nodes.find((node) => node.type === 'decl' && node.prop === 'initial-value');
    if (initial) defaults.append({ prop: rule.params, value: initial.value });
  });
  output.append(defaults);
  tree.walkRules((rule) => {
    const declarations = rule.nodes.filter((node) => node.type === 'decl' && !node.prop.startsWith('--tw-'));
    if (!declarations.length) return;
    const conditions = [];
    for (let parent = rule.parent; parent?.type !== 'root'; parent = parent.parent) {
      if (parent.type === 'atrule') conditions.unshift(parent);
    }
    for (const selector of selectorParser().astSync(rule.selector).nodes) {
      let utility;
      selector.walkClasses((node) => {
        if (owners.has(node.value)) utility = node;
      });
      if (!utility) continue;
      const name = utility.value;
      for (const marker of owners.get(name)) {
        const copy = selector.clone();
        copy.walkClasses((node) => {
          if (node.value === name) node.value = marker;
        });
        const reconstructed = postcss.rule({ selector: copy.toString() });
        reconstructed.append(
          declarations.map((node) =>
            node.clone({
              // Tailwind spells literal zero-length utilities as 0px.
              value:
                node.prop === 'opacity' && /^\d+(?:\.\d+)?%$/.test(node.value)
                  ? String(parseFloat(node.value) / 100)
                  : /(?:^|:)[\w-]+-0!?$/.test(name) && ['0px', 'calc(var(--spacing) * 0)'].includes(node.value)
                    ? '0'
                    : node.value,
            }),
          ),
        );
        let parent = output;
        for (const condition of conditions) {
          const wrapper = postcss.atRule({ name: condition.name, params: condition.params });
          parent.append(wrapper);
          parent = wrapper;
        }
        parent.append(reconstructed);
      }
    }
  });
  return output;
}
