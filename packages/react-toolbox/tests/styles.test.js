// @vitest-environment node
import { it } from 'vitest';
import assert from 'node:assert/strict';
import { glob, readFile } from 'node:fs/promises';
import path from 'node:path';
import { compile } from 'tailwindcss';
import postcss from 'postcss';
import { root, modernRules, correctedRules, referenceCss, declarationsBySelector } from './helpers/style-rules.mjs';

it('preserves the reviewed Material 1 declarations and independent browser reference', () => {
  const expectedRules = correctedRules();
  const browserReference = declarationsBySelector(postcss.parse(referenceCss()));
  assert.deepEqual(
    new Map([...browserReference].sort()),
    new Map([...expectedRules].sort()),
    'Browser reference must contain exactly the reviewed declarations',
  );
  /** Tailwind owns utility order. Declaration equivalence is checked here; browser
   * parity and interactive-state tests verify the resulting cascade and pixels. */
  const differences = [];
  for (const [selector, declarations] of expectedRules) {
    const modern = modernRules.get(selector);
    if (!modern) {
      differences.push(`Missing selector: ${selector}`);
      continue;
    }
    for (const [property, value] of declarations) {
      /** The checkmark's old `border-left: 0; border-style: solid` resolves to
       * `0 solid`. Spell that result explicitly when Tailwind orders the rules. */
      const resolvedZeroBorder =
        property === 'border-left' &&
        value === '0' &&
        declarations.get('border-style') === 'solid' &&
        [...declarations.keys()].indexOf('border-style') > [...declarations.keys()].indexOf(property) &&
        modern.get(property) === '0 solid';
      if (modern.get(property) !== value && !resolvedZeroBorder) {
        differences.push(`${selector}: ${property}\n  original: ${value}\n  current:  ${modern.get(property)}`);
      }
    }
    for (const property of modern.keys()) {
      /** Autocomplete composes Chip. Its margin shorthand must retain the Chip
       * end margin that previously won by stylesheet order. Verify the explicit
       * utility against that independent reference value, not a new baseline. */
      if (selector === '.rt-autocomplete-value' && property === 'margin-right') {
        assert.equal(modern.get(property), expectedRules.get('.rt-chip-chip').get(property));
        continue;
      }
      if (!declarations.has(property)) differences.push(`Unexpected property ${selector}: ${property}`);
    }
  }
  for (const selector of modernRules.keys()) {
    /** Accessibility preferences are a separate, opt-in rendering contract. Keep
     * every normal-motion declaration exact and verify reduced motion in browser tests. */
    if (selector.startsWith('@media (prefers-reduced-motion: reduce) > ')) continue;
    if (!expectedRules.has(selector)) differences.push(`Unexpected selector: ${selector}`);
  }

  assert.equal(differences.length, 0, `Unreviewed Material 1 style drift:\n${differences.join('\n')}`);
});

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

it('keeps component presentation out of runtime theme maps', async () => {
  /** Component presentation belongs in JSX or explicitly shared constants, not a
   * per-family runtime theme map. The independent declarations above stay exact. */
  for await (const file of glob('src/material/**/theme.ts', { cwd: root })) {
    assert.fail(`Obsolete runtime theme map: ${file}`);
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
