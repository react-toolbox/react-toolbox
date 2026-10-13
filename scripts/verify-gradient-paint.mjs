/** Exact pixel regression for legacy gradient alpha, across browser engines.
 * Run after `npx playwright install`: node scripts/verify-gradient-paint.mjs
 * Pass chromium, firefox, or webkit to check one engine independently.
 */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium, firefox, webkit } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const entry = await readFile(path.join(root, 'components/styles.css'), 'utf8');
const sheets = [...entry.matchAll(/@import "\.\/([^"]+)"/g)].map(match => match[1]);
const modern = (await Promise.all(sheets.map(name =>
  readFile(path.join(root, 'components', name), 'utf8')))).join('\n');
const original = await readFile(path.join(root, 'tests/fixtures/legacy-styles/reference.css'), 'utf8');
const engines = { chromium, firefox, webkit };
const selected = process.argv.slice(2);

for (const name of selected.length ? selected : Object.keys(engines)) {
  assert.ok(engines[name], `Unknown browser engine: ${name}`);
  const browser = await engines[name].launch();
  try {
    const page = await browser.newPage({ viewport: { width: 800, height: 400 }, deviceScaleFactor: 1 });
    for (const disabled of [false, true]) {
      const geometry = 'body{margin:0;background:#fff}#bar{position:absolute;left:200px;top:150px;width:380px;height:4px;transform:none}';
      await page.setContent(`<style>${modern}\n${geometry}</style><div class="rt-progress-bar-linear" ${disabled ? 'disabled' : ''}><span id="bar" class="rt-progress-bar-buffer"></span></div>`);
      const actual = await page.locator('#bar').screenshot();
      await page.addStyleTag({ content: original });
      const expected = await page.locator('#bar').screenshot();
      assert.ok(actual.equals(expected), `${name}: ${disabled ? 'disabled' : 'default'} buffered gradient differs from original pixels`);
    }
    console.log(`${name}: default and disabled progress gradients are pixel-identical to the original CSS.`);
  } finally {
    await browser.close();
  }
}
