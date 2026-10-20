import { expect, test } from '@playwright/test';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { css } from './material-fixture.js';

let javascript;
test.beforeAll(async () => {
  javascript = (
    await build({
      stdin: {
        resolveDir: fileURLToPath(new URL('../../', import.meta.url)),
        loader: 'jsx',
        contents: `import React from 'react';
      import {createRoot} from 'react-dom/client';
      import DatePicker from './src/material/date-picker/DatePicker';
      import TimePicker from './src/material/time-picker/TimePicker';
      createRoot(document.getElementById('root')).render(<>
        <DatePicker label="Date" layout="responsive" defaultValue={new Date(2026,9,15)} />
        <TimePicker label="Time" layout="responsive" format="ampm" defaultValue={new Date(2026,9,15,9,30)} />
        <TimePicker label="24-hour time" layout="responsive" defaultValue={new Date(2026,9,15,9,30)} />
      </>);`,
      },
      bundle: true,
      write: false,
      format: 'iife',
      loader: { '.css': 'empty' },
      define: { 'process.env.NODE_ENV': '"production"' },
    })
  ).outputFiles[0].text;
});

async function measureParts(dialog, content) {
  return dialog.evaluate(
    (element, selector) => ({
      header: element.querySelector('header').getBoundingClientRect().toJSON(),
      body: element.querySelector(selector).getBoundingClientRect().toJSON(),
      actions: element.querySelector('nav').getBoundingClientRect().toJSON(),
    }),
    content,
  );
}

for (const [label, content] of [
  ['Date', '.rt-date-picker-calendarWrapper'],
  ['Time', '.rt-time-picker-clock'],
  ['24-hour time', '.rt-time-picker-clock'],
]) {
  test(`${label} picker adapts between landscape and portrait without clipping actions`, async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 600 });
    await page.setContent(
      `<style>${css}*,*::before,*::after{animation:none!important;transition:none!important}</style><div id="root"></div>`,
    );
    await page.addScriptTag({ content: javascript });
    await page.getByRole('combobox', { name: label, exact: true }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    /** Disabling CSS motion does not skip the dialog's delayed entrance state. */
    await expect(dialog).toHaveCSS('opacity', '1');
    await expect(dialog).toHaveCSS('display', 'grid');
    const { header, body, actions } = await measureParts(dialog, content);
    expect(header.x + header.width).toBeCloseTo(body.x, 0);
    expect(actions.x).toBeCloseTo(body.x, 0);
    expect(header.y + header.height).toBeGreaterThanOrEqual(actions.y + actions.height - 1);
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(dialog).toHaveCSS('display', 'flex');
    const { header: portraitHeader, body: portraitBody } = await measureParts(dialog, content);
    expect(portraitHeader.y + portraitHeader.height).toBeLessThanOrEqual(portraitBody.y + 1);
    if (content === '.rt-time-picker-clock') {
      /** Large clock digits must not inherit the dialog body's fixed 24px line-height. */
      await expect(dialog.locator('header')).toHaveCSS('line-height', '78px');
      expect(portraitHeader.height).toBeCloseTo(98, 0);
    }
    await expect(dialog.getByRole('button', { name: 'Ok', exact: true })).toBeInViewport();
  });
}
