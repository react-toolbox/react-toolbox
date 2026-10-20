import { css } from './material-fixture.js';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { test, expect } from '@playwright/test';
import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

test('inherits root custom colors inside a portaled dialog', async ({ page }) => {
  await page.goto('/playground');
  await page.addStyleTag({ content: ':root { --rt-color-primary: #b71c1c; }' });
  await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
  const dialog = page.locator('[data-react-toolbox="dialog"]');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('button').last()).toHaveCSS('color', 'rgb(183, 28, 28)');
});

test('recalculates scoped palette and size tokens while retaining unrelated root and explicit parent values', async ({
  page,
}) => {
  /** SSR consumers need a CSS-aware bundler, just like the verified Next consumer. */
  const bundle = await build({
    stdin: {
      contents: "export { ThemeProvider, Button } from 'react-toolbox';",
      resolveDir: fileURLToPath(new URL('../../', import.meta.url)),
      loader: 'js',
    },
    bundle: true,
    write: false,
    platform: 'node',
    format: 'cjs',
    external: ['react', 'react/*', 'react-dom', 'react-dom/*'],
    loader: { '.css': 'empty' },
  });
  const bundledModule = { exports: {} };
  new Function('require', 'module', 'exports', bundle.outputFiles[0].text)(
    createRequire(import.meta.url),
    bundledModule,
    bundledModule.exports,
  );
  const { ThemeProvider, Button } = bundledModule.exports;
  const markup = renderToString(
    h(
      'div',
      null,
      h(
        ThemeProvider,
        { className: 'wrapper' },
        h(Button, { id: 'inherited', primary: true, raised: true, label: 'Inherited' }),
      ),
      h(
        ThemeProvider,
        { variables: { '--palette-indigo-500': '#673ab7', '--button-height': '50px' } },
        h(
          ThemeProvider,
          { variables: { '--unit': '12px' } },
          h(Button, { id: 'primary', primary: true, raised: true, label: 'Primary' }),
          h(Button, { id: 'accent', accent: true, raised: true, label: 'Accent' }),
          h(Button, { id: 'accent-text', accent: true, label: 'Accent text' }),
        ),
      ),
      h(
        ThemeProvider,
        { variables: { '--button-accent-color': '#4a148c' } },
        h(Button, { id: 'component-accent-text', accent: true, label: 'Component accent' }),
        h(Button, { id: 'component-accent-raised', accent: true, raised: true, label: 'Component surface' }),
      ),
      h(
        ThemeProvider,
        { variables: { '--palette-pink-600': '#880e4f', '--rt-color-white': '#fffbea' } },
        h(
          ThemeProvider,
          { variables: { '--unit': '12px' } },
          h(Button, { id: 'scoped-accent', accent: true, raised: true, label: 'Scoped accent' }),
          h(Button, { id: 'scoped-accent-text', accent: true, label: 'Scoped accent text' }),
        ),
      ),
      h(
        ThemeProvider,
        { variables: { '--unit': '12px' } },
        h(Button, { id: 'resized', primary: true, raised: true, label: 'Resized' }),
      ),
    ),
  );
  await page.setContent(`<style>${css}\n:root { --rt-color-accent: #00695c; }</style>${markup}`);
  await expect(page.locator('#inherited')).toHaveCSS('background-color', 'rgb(63, 81, 181)');
  await expect(page.locator('#primary')).toHaveCSS('background-color', 'rgb(103, 58, 183)');
  await expect(page.locator('#accent')).toHaveCSS('background-color', 'rgb(0, 105, 92)');
  /** Resolve CSS Color 4 serialization through canvas so both browser engines compare the same RGB value. */
  await expect(page.locator('#component-accent-raised')).toHaveCSS('background-color', 'rgb(74, 20, 140)');
  await expect(page.locator('#scoped-accent')).toHaveCSS('background-color', 'rgb(136, 14, 79)');
  await expect(page.locator('#scoped-accent')).toHaveCSS('color', 'rgb(255, 251, 234)');
  for (const [id, expected] of [
    ['#accent-text', [0, 73.5, 64.4]],
    ['#component-accent-text', [51.8, 14, 98]],
    ['#scoped-accent-text', [95.2, 9.8, 55.3]],
  ]) {
    const accentText = await page.locator(id).evaluate((node) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const context = canvas.getContext('2d');
      context.fillStyle = getComputedStyle(node).color;
      context.fillRect(0, 0, 1, 1);
      return [...context.getImageData(0, 0, 1, 1).data].slice(0, 3);
    });
    for (const [index, channel] of expected.entries()) {
      expect(Math.abs(accentText[index] - channel)).toBeLessThanOrEqual(1);
    }
  }
  await expect(page.locator('#primary')).toHaveCSS('height', '50px');
  expect(await page.locator('#resized').evaluate((element) => element.getBoundingClientRect().height)).toBeCloseTo(
    43.2,
    1,
  );
  // WebKit serializes live calc(1.4 * 12px) as 16.799999px.
  expect(
    await page.locator('#resized').evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize)),
  ).toBeCloseTo(16.8, 4);
});
