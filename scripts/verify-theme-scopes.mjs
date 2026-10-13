/** Verify live token dependency scopes against actual browser inheritance. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium, firefox, webkit } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const entry = await readFile(path.join(root, 'components/styles.css'), 'utf8');
const sheets = [...entry.matchAll(/@import "\.\/([^"]+)"/g)].map(match => match[1]);
const css = (await Promise.all(sheets.map(name =>
  readFile(path.join(root, 'components', name), 'utf8')))).join('\n');
const engines = { chromium, firefox, webkit };
const selected = process.argv.slice(2);

for (const name of selected.length ? selected : ['chromium']) {
  assert.ok(engines[name], `Unknown browser engine: ${name}`);
  const browser = await engines[name].launch();
  try {
    const page = await browser.newPage();
    await page.setContent(`<style>${css}
      :root { --color-primary:#123456; --color-accent:#ff6600; --palette-grey-900:#654321;
        --unit:12px; --preferred-font:monospace; --button-border-radius:7px; }
      .probe { color:var(--button-primary-color); background-color:var(--button-accent-color);
        border-color:var(--button-neutral-color-contrast); font-family:var(--preferred-font);
        font-size:var(--font-size); width:var(--button-height); border-radius:var(--button-border-radius); }
      </style>
      <div id="global" class="probe"></div>
      <div data-react-toolbox-theme><div id="empty" class="probe"></div></div>
      <div data-react-toolbox-theme data-react-toolbox-tokens="--color-primary" style="--color-primary:#00695c">
        <div id="primary" class="probe"></div>
      </div>
      <div data-react-toolbox-theme data-react-toolbox-tokens="--palette-pink-a200" style="--palette-pink-a200:#aabbcc">
        <div id="palette" class="probe"></div>
      </div>
      <div data-react-toolbox-theme data-react-toolbox-tokens="--unit" style="--unit:20px">
        <div id="scale" class="probe"></div>
      </div>
      <div data-react-toolbox-theme data-react-toolbox-tokens="--color-primary --button-primary-color"
        style="--color-primary:#00695c;--button-primary-color:#112233">
        <div id="explicit" class="probe"></div>
      </div>`);
    const styles = await page.locator('.probe').evaluateAll(elements => Object.fromEntries(elements.map(element => {
      const style = getComputedStyle(element);
      const properties = ['color', 'backgroundColor', 'borderTopColor', 'fontFamily', 'fontSize', 'width', 'borderRadius'];
      return [element.id, Object.fromEntries(properties.map(property => [property, style[property]]))];
    })));
    assert.deepEqual(styles.empty, styles.global, `${name}: an empty scope resets inherited global customization`);
    assert.deepEqual(styles.primary, { ...styles.global, color: 'rgb(0, 105, 92)' }, `${name}: primary scope resets unrelated inherited tokens`);
    assert.deepEqual(styles.palette, { ...styles.global, backgroundColor: 'rgb(170, 187, 204)' }, `${name}: palette scope must recalculate only dependent colors`);
    assert.equal(styles.scale.width, '72px', `${name}: scoped unit must recalculate component dimensions`);
    assert.equal(styles.scale.fontSize, '32px', `${name}: scoped unit must recalculate derived typography`);
    assert.equal(styles.scale.color, styles.global.color, `${name}: scoped unit resets inherited primary color`);
    assert.equal(styles.scale.fontFamily, styles.global.fontFamily, `${name}: scoped unit resets inherited font family`);
    assert.equal(styles.explicit.color, 'rgb(17, 34, 51)', `${name}: explicit component token must override derived defaults`);
    console.log(`${name}: global token inheritance, selective scoped colors, palette aliases, scale, and explicit overrides pass.`);
  } finally {
    await browser.close();
  }
}
