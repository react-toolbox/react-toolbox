/** Compare against the immutable legacy output plus documented M1 corrections. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { compile } from 'tailwindcss';
import postcss from 'postcss';
import { root, fixture, legacyRules, modernRules, corrections, correctedRules, referenceCss, declarationsBySelector } from './style-rules.mjs';

const expectedRules = correctedRules();
const browserReference = declarationsBySelector(postcss.parse(referenceCss()));
assert.deepEqual(new Map([...browserReference].sort()), new Map([...expectedRules].sort()), 'Browser reference must contain exactly the reviewed declarations');
assert.deepEqual([...modernRules.keys()], [...browserReference.keys()], 'Reviewed selector cascade order changed');
// Preserve the relative cascade order of every surviving original selector.
assert.deepEqual([...modernRules.keys()].filter(key => legacyRules.has(key)),
  [...legacyRules.keys()].filter(key => modernRules.has(key)), 'Original selector cascade order changed');
const differences = [];
let compared = 0;
for (const [selector, declarations] of expectedRules) {
  const modern = modernRules.get(selector);
  if (!modern) {
    differences.push(`Missing selector: ${selector}`);
    continue;
  }
  for (const [property, value] of declarations) {
    compared++;
    if (modern.get(property) !== value) {
      differences.push(`${selector}: ${property}\n  original: ${value}\n  current:  ${modern.get(property)}`);
    }
  }
  for (const property of modern.keys()) {
    if (!declarations.has(property)) differences.push(`Unexpected property ${selector}: ${property}`);
  }
}
for (const selector of modernRules.keys()) {
  if (!expectedRules.has(selector)) differences.push(`Unexpected selector: ${selector}`);
}

const legacyThemes = JSON.parse(await readFile(path.join(fixture, 'reference-themes.json'), 'utf8'));
let slots = 0;
for (const [component, theme] of Object.entries(legacyThemes)) {
  const { default: modernTheme } = await import(pathToFileURL(path.join(root, 'components', component, 'theme.ts')));
  assert.deepEqual(modernTheme, theme, `${component} style slots/composition changed`);
  slots += Object.keys(theme).length;
}
assert.equal(differences.length, 0, `Unreviewed Material 1 style drift:\n${differences.join('\n')}`);
console.log(`Verified ${compared} declarations across ${expectedRules.size} selectors and ${slots} style slots; ${corrections.length} explicit M1 corrections to the immutable original reference.`);

// The optional integration must generate real utilities that resolve variables
// at the element, without shadowing the original palette or semantic tokens.
const bridge = (await readFile(path.join(root, 'components/tailwind.css'), 'utf8'))
  .replace(/@import[^;]+;/, '');
const tailwind = await compile(`${bridge}\n@tailwind utilities;`);
const utilities = ['bg-toolbox-primary', 'text-toolbox-accent', 'font-toolbox',
  'text-toolbox-small', 'p-toolbox', 'rounded-toolbox', 'shadow-toolbox-2p',
  'ease-toolbox', 'duration-toolbox'];
const utilityCss = tailwind.build(utilities);
for (const utility of utilities) assert.ok(utilityCss.includes(`.${utility}`), `Missing utility ${utility}`);
assert.ok(utilityCss.includes('background-color: var(--color-primary)'), 'Tailwind color must resolve in the theme scope');
assert.ok(!utilityCss.includes('--color-primary:'), 'Tailwind aliases must not redefine original tokens');
console.log('Verified Tailwind utility aliases for colors, typography, spacing, radius, shadows, and motion.');
