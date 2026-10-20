import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import postcss from 'postcss';
import { readSourceCss } from './helpers/css-imports.mjs';

const directory = join(process.cwd(), 'src/material/foundations/styles');
const defaults = new Map();
(await readSourceCss(join(directory, 'styles.css'))).walkRules(':root', (rule) => {
  rule.walkDecls(/^--/, (declaration) => defaults.set(declaration.prop, declaration.value));
});
const bridge = postcss.parse(readFileSync(join(directory, 'shadcn.css'), 'utf8'));
const scoped = new Map();
bridge.walkDecls(/^--/, (declaration) => scoped.set(declaration.prop, declaration.value));

describe('optional shadcn semantic bridge', () => {
  it('only assigns existing Toolbox variables inside explicit scopes', () => {
    bridge.walkDecls(/^--/, (declaration) => {
      expect(defaults.has(declaration.prop), `Host variable assigned: ${declaration.prop}`).toBe(true);
      expect(declaration.parent.selector).toBe('[data-react-toolbox-tokens~="--rt-shadcn"]');
    });
  });

  it('recalculates every dependent default when semantic color inputs change', () => {
    const affected = new Set([...scoped].filter(([name, value]) => defaults.get(name) !== value).map(([name]) => name));
    let expanded = true;
    while (expanded) {
      expanded = false;
      for (const [name, value] of defaults) {
        if (
          !affected.has(name) &&
          [...value.matchAll(/var\((--[\w-]+)/g)].some(([, dependency]) => affected.has(dependency))
        ) {
          affected.add(name);
          expanded = true;
        }
      }
    }
    for (const name of affected) expect(scoped.has(name), `Missing dependent semantic token: ${name}`).toBe(true);
  });
});
