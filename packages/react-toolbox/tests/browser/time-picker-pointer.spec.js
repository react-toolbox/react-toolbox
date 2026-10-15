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
        contents: `
          import React, { useState } from 'react';
          import { createRoot } from 'react-dom/client';
          import TimePicker from './src/material/time-picker/TimePicker';
          function App() {
            const [value, setValue] = useState(new Date(2026, 9, 15, 9, 30));
            return <main style={{ width: 1800, height: 2200, padding: 40 }}>
              <TimePicker label="24-hour time" value={value} onChange={setValue} />
              <TimePicker label="12-hour time" format="ampm" value={value} onChange={setValue} />
            </main>;
          }
          createRoot(document.getElementById('root')).render(<App />);
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

async function settle(page) {
  await page.evaluate(async () => {
    await new Promise(requestAnimationFrame);
    await Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => {})));
  });
}

async function mount(page, label = '24-hour time') {
  await page.setContent(
    `<!doctype html><html><head><style>${css}</style></head><body><div id="root"></div></body></html>`,
  );
  await page.addScriptTag({ content: javascript });
  await page.getByLabel(label, { exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Choose time' });
  await expect(dialog).toHaveCSS('opacity', '1');
  await expect(dialog).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
  await settle(page);
  return dialog;
}

async function center(locator) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

async function expectHandAt(dialog, target, label = '') {
  await expect
    .poll(
      async () => {
        const knob = await center(dialog.locator('.rt-time-picker-knob'));
        return Math.hypot(knob.x - target.x, knob.y - target.y);
      },
      { message: `${label}: hand should point to ${JSON.stringify(target)}` },
    )
    .toBeLessThan(1);
}

test('clicks and drags select the visible numerals on both 24-hour rings', async ({ page }) => {
  const dialog = await mount(page);
  const hours = dialog.getByRole('spinbutton', { name: 'Hours' });
  for (const hour of [15, 18, 21, 0, 3, 6, 9, 12, 1, 13, 23, 11]) {
    const label = hour === 0 || hour > 12 ? String(hour).padStart(2, '0') : String(hour);
    const target = await center(dialog.locator('.rt-time-picker-number').getByText(label, { exact: true }));
    await page.mouse.move(target.x, target.y);
    if (hour === 15) await page.mouse.down();
    await expect(hours).toHaveAttribute('aria-valuenow', String(hour));
    await expectHandAt(dialog, target, `hour ${hour}`);
    // Keep the drag active to exercise movement between the inner and outer rings.
  }
  await page.mouse.up();
  await expect(dialog).toHaveClass(/rt-time-picker-minutesDisplay/);
});

test('minute clicks and dragging align with the dial after opening and scrolling', async ({ page }) => {
  const dialog = await mount(page);
  await page.evaluate(() => window.scrollTo(120, 240));
  await dialog.getByRole('spinbutton', { name: 'Minutes' }).click();
  await settle(page);
  const minutes = dialog.getByRole('spinbutton', { name: 'Minutes' });
  for (const minute of [15, 30, 45, 0, 5, 55]) {
    const target = await center(
      dialog.locator('.rt-time-picker-number').getByText(String(minute).padStart(2, '0'), { exact: true }),
    );
    await page.mouse.click(target.x, target.y);
    await expect(minutes).toHaveAttribute('aria-valuenow', String(minute));
    await expectHandAt(dialog, target);
  }
  const face = await dialog.locator('.rt-time-picker-face').boundingBox();
  const radius = face.width * 0.41;
  const origin = { x: face.x + face.width / 2, y: face.y + face.height / 2 };
  await page.mouse.move(origin.x, origin.y - radius);
  await page.mouse.down();
  for (const minute of [7, 22, 38, 59]) {
    const radians = (minute * Math.PI) / 30;
    const target = { x: origin.x + radius * Math.sin(radians), y: origin.y - radius * Math.cos(radians) };
    await page.mouse.move(target.x, target.y);
    await expect(minutes).toHaveAttribute('aria-valuenow', String(minute));
    await expectHandAt(dialog, target);
  }
  await page.mouse.up();
  await dialog.getByRole('button', { name: 'Ok', exact: true }).click();
  await expect(page.getByLabel('24-hour time', { exact: true })).toHaveValue('09:59');
});

test('12-hour selection preserves PM and follows the resized dialog', async ({ page }) => {
  const dialog = await mount(page, '12-hour time');
  await dialog.getByRole('button', { name: 'PM', exact: true }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await settle(page);
  const target = await center(dialog.locator('.rt-time-picker-number').getByText('3', { exact: true }));
  await page.mouse.move(target.x, target.y);
  await page.mouse.down();
  await expect(dialog.getByRole('spinbutton', { name: 'Hours' })).toHaveAttribute('aria-valuenow', '3');
  await expectHandAt(dialog, target);
  await page.mouse.up();
  await settle(page);
  await dialog.getByRole('button', { name: 'Ok', exact: true }).click();
  await expect(page.getByLabel('24-hour time', { exact: true })).toHaveValue('15:30');
});

test('touch selection uses the face position after the dialog settles', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  try {
    const page = await context.newPage();
    const dialog = await mount(page);
    const target = await center(dialog.locator('.rt-time-picker-number').getByText('15', { exact: true }));
    await page.touchscreen.tap(target.x, target.y);
    await expect(dialog.getByRole('spinbutton', { name: 'Hours' })).toHaveAttribute('aria-valuenow', '15');
    await settle(page);
    const minute = await center(dialog.locator('.rt-time-picker-number').getByText('45', { exact: true }));
    await page.touchscreen.tap(minute.x, minute.y);
    await expect(dialog.getByRole('spinbutton', { name: 'Minutes' })).toHaveAttribute('aria-valuenow', '45');
    await expectHandAt(dialog, minute);
  } finally {
    await context.close();
  }
});
