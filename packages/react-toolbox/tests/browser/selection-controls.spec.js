import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { expect, test } from '@playwright/test';
import { css } from './material-fixture.js';

let javascript;
test.beforeAll(async () => {
  javascript = (
    await build({
      stdin: {
        resolveDir: fileURLToPath(new URL('../../', import.meta.url)),
        loader: 'jsx',
        contents: `
          import React from 'react';
          import { createRoot } from 'react-dom/client';
          import Checkbox from './src/material/checkbox';
          import Switch from './src/material/switch';
          import RadioButton, { RadioGroup } from './src/material/radio';
          const options = window.fixtureOptions;
          createRoot(document.getElementById('root')).render(
            <div style={{lineHeight: '24px'}}>
              <button>Before</button>
              {options.kind === 'switch' && <Switch label="Alerts" disabled={options.disabled} />}
              {options.kind === 'checkbox' && <>
                <Checkbox label="Alerts" disabled={options.disabled} />
                <Checkbox label="Mentions" disabled={options.disabled} />
              </>}
              {options.kind === 'radio' && <RadioGroup name="delivery" disabled={options.disabled}>
                <RadioButton label="Daily" value="daily" />
                <RadioButton label="Weekly" value="weekly" />
              </RadioGroup>}
              <button>After</button>
            </div>
          );
        `,
      },
      bundle: true,
      write: false,
      format: 'iife',
      loader: { '.css': 'empty' },
      define: { 'process.env.NODE_ENV': '"production"' },
    })
  ).outputFiles[0].text;
});

async function render(page, options) {
  await page.setContent(`<style>${css}</style><div id="root" style="padding:32px"></div>`);
  await page.evaluate((options) => {
    window.fixtureOptions = options;
  }, options);
  await page.addScriptTag({ content: javascript });
}

for (const [kind, visualSelector] of [
  ['switch', '.rt-switch-thumb'],
  ['checkbox', '.rt-checkbox-check'],
  ['radio', '.rt-radio-radio'],
]) {
  test(`${kind} reserves its focus halo for keyboard navigation and removes released ink`, async ({
    page,
    browserName,
  }) => {
    await render(page, { kind });
    const name = kind === 'radio' ? 'Daily' : 'Alerts';
    const input = page.getByRole(kind, { name });
    const visual = page.locator(visualSelector).first();
    const halo = () =>
      visual.evaluate((element, kind) => {
        const style = getComputedStyle(element, kind === 'radio' ? null : '::before');
        return kind === 'radio' ? style.boxShadow !== 'none' : !['none', 'normal'].includes(style.content);
      }, kind);

    await page.getByText(name, { exact: true }).click();
    await expect(input).toBeChecked();
    expect(await input.evaluate((element) => element.matches(':focus-visible'))).toBe(false);
    expect(await halo()).toBe(false);

    await visual.click();
    await expect(visual.locator('[data-react-toolbox="ripple"]')).toHaveCount(0);
    expect(await halo()).toBe(false);

    await page.getByRole('button', { name: 'Before' }).focus();
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
    await expect(input).toBeFocused();
    expect(await halo()).toBe(true);
    await page.keyboard.press('Space');
    await expect(input).toBeChecked();
    expect(await halo()).toBe(true);
  });

  test(`${kind} skips disabled controls during keyboard navigation and pointer activation`, async ({
    page,
    browserName,
  }) => {
    await render(page, { kind, disabled: true });
    const name = kind === 'radio' ? 'Daily' : 'Alerts';
    const label = await page.getByText(name, { exact: true }).boundingBox();
    await page.mouse.click(label.x + label.width / 2, label.y + label.height / 2);
    await expect(page.getByRole(kind, { name })).not.toBeChecked();
    await expect(page.locator('[data-react-toolbox="ripple"]')).toHaveCount(0);
    await page.getByRole('button', { name: 'Before' }).focus();
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
    await expect(page.getByRole('button', { name: 'After' })).toBeFocused();
  });

  test(`${kind} retains a visible keyboard outline in forced colors`, async ({ page, browserName }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    test.skip(
      !(await page.evaluate(() => matchMedia('(forced-colors: active)').matches)),
      'Engine cannot emulate forced colors',
    );
    await render(page, { kind });
    await page.getByRole('button', { name: 'Before' }).focus();
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
    await expect(page.locator(visualSelector).first()).toHaveCSS('outline-style', 'solid');
    await expect(page.locator(visualSelector).first()).toHaveCSS('outline-width', '2px');
  });
}

for (const kind of ['radio', 'checkbox']) {
  test(`${kind} options keep 48px targets without inherited line-height or margin gaps`, async ({ page }) => {
    await render(page, { kind });
    const fields = page.locator(`[data-react-toolbox="${kind === 'radio' ? 'radio-button' : kind}"]`);
    const first = await fields.nth(0).boundingBox();
    const second = await fields.nth(1).boundingBox();
    expect(first.height).toBe(48);
    expect(second.y - first.y).toBe(48);
    await fields
      .nth(0)
      .evaluate((element, kind) => element.style.setProperty(`--${kind}-field-margin-bottom`, '8px'), kind);
    const spaced = await fields.nth(1).boundingBox();
    expect(spaced.y - first.y).toBe(56);
  });
}
