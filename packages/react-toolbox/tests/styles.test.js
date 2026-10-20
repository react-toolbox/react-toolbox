// @vitest-environment node
import { it } from 'vitest';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { compile } from 'tailwindcss';
import postcss from 'postcss';

const root = path.resolve(import.meta.dirname, '..');

it('scopes reduced motion to the accessibility preference', async () => {
  const reducedMotion = postcss.parse(
    await readFile(path.join(root, 'src/material/foundations/styles/reduced-motion.css'), 'utf8'),
  );
  for (const node of reducedMotion.nodes) {
    if (node.type === 'comment') continue;
    assert.equal(node.type, 'atrule', 'Reduced-motion rules must not affect default M1 styling');
    assert.equal(node.name, 'media');
    assert.equal(node.params, '(prefers-reduced-motion: reduce)');
  }
});

it('generates Tailwind aliases without redefining the original palette', async () => {
  /** The optional integration must generate real utilities that resolve variables
   * at the element, without shadowing the original palette or semantic tokens. */
  const bridge = (await readFile(path.join(root, 'src/material/foundations/styles/tailwind.css'), 'utf8')).replace(
    /@import[^;]+;/g,
    '',
  );
  const tailwind = await compile(`${bridge}\n@tailwind utilities;`);
  const utilities = [
    'bg-toolbox-primary',
    'text-toolbox-accent',
    'font-toolbox',
    'text-toolbox-small',
    'text-toolbox-title',
    'text-toolbox-subheading',
    'text-toolbox-body-desktop',
    'text-toolbox-display-1',
    'text-toolbox-display-2',
    'min-h-toolbox-touch',
    'max-w-toolbox-prose',
    'p-toolbox',
    'rounded-toolbox',
    'shadow-toolbox-2p',
    'ease-toolbox',
    'duration-toolbox',
  ];
  const utilityCss = tailwind.build(utilities);
  for (const utility of utilities) assert.ok(utilityCss.includes(`.${utility}`), `Missing utility ${utility}`);
  assert.ok(
    utilityCss.includes('background-color: var(--rt-color-primary)'),
    'Tailwind color must resolve in the theme scope',
  );
  assert.ok(!utilityCss.includes('--rt-color-primary:'), 'Tailwind aliases must not redefine original tokens');
});
