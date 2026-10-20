import { css } from './material-fixture.js';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { test, expect } from '@playwright/test';

let javascript;
test.beforeAll(async () => {
  const result = await build({
    stdin: {
      resolveDir: fileURLToPath(new URL('../../', import.meta.url)),
      loader: 'jsx',
      contents: `
        import React from 'react';
        import { createRoot } from 'react-dom/client';
        import Chip from './src/material/chip';
        createRoot(document.getElementById('root')).render(<>
          <Chip data-testid="enabled" onClick={() => {}} deletable deleteLabel="Remove Design">Design</Chip>
          <Chip data-testid="disabled" onClick={() => {}} disabled deletable deleteLabel="Remove Locked">Locked</Chip>
          <button>Continue</button>
        </>);
      `,
    },
    bundle: true,
    write: false,
    format: 'iife',
    loader: { '.css': 'empty' },
    define: { 'process.env.NODE_ENV': '"production"' },
  });
  javascript = result.outputFiles[0].text;
});

test('disabled chips look unavailable, ignore hover feedback and skip keyboard actions', async ({ page, browserName }) => {
  await page.setContent(`<style>${css}</style><div id="root" style="padding:24px"></div>`);
  await page.addScriptTag({ content: javascript });
  const enabled = page.getByTestId('enabled');
  const disabled = page.getByTestId('disabled');
  const opacity = (element) => element.evaluate((node) => Number(getComputedStyle(node).opacity));
  expect(await opacity(disabled)).toBeLessThan(await opacity(enabled));
  const background = (element) => element.locator('svg').evaluate((node) => getComputedStyle(node).backgroundColor);
  const inactiveDeleteBackground = await background(disabled);
  await disabled.getByRole('button', { name: 'Remove Locked' }).hover();
  expect(await background(disabled)).toBe(inactiveDeleteBackground);
  const activeDeleteBackground = await background(enabled);
  await enabled.getByRole('button', { name: 'Remove Design' }).hover();
  expect(await background(enabled)).not.toBe(activeDeleteBackground);
  /** Safari uses Option-Tab to include native buttons in sequential keyboard navigation. */
  const nextControl = browserName === 'webkit' ? 'Alt+Tab' : 'Tab';
  await page.keyboard.press(nextControl);
  await expect(page.getByRole('button', { name: 'Design', exact: true })).toBeFocused();
  await page.keyboard.press(nextControl);
  await expect(page.getByRole('button', { name: 'Remove Design' })).toBeFocused();
  await page.keyboard.press(nextControl);
  await expect(page.getByRole('button', { name: 'Continue' })).toBeFocused();
});
