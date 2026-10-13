import { readFile } from 'node:fs/promises';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { test, expect } from '@playwright/test';

async function componentStyles() {
  const root = new URL('../../components/', import.meta.url);
  const entry = await readFile(new URL('styles.css', root), 'utf8');
  const imports = [...entry.matchAll(/@import "\.\/([^"]+)" layer\(([^)]+)\);/g)];
  const sheets = await Promise.all(imports.map(async ([, file, layer]) =>
    `@layer ${layer} { ${await readFile(new URL(file, root), 'utf8')} }`));
  return `@layer theme, base, components, utilities;\n${sheets.join('\n')}`;
}

test('inherits root custom colors inside a portaled dialog', async ({ page }) => {
  await page.goto('/');
  await page.addStyleTag({ content: ':root { --color-primary: #b71c1c; }' });
  await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
  const dialog = page.locator('[data-react-toolbox="dialog"]');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('button').last()).toHaveCSS('color', 'rgb(183, 28, 28)');
});

test('recalculates scoped palette and size tokens while retaining unrelated root and explicit parent values', async ({ page }) => {
  const { ThemeProvider, Button } = await import('react-toolbox');
  const markup = renderToString(h('div', null,
    h(ThemeProvider, { className: 'wrapper' }, h(Button, { id: 'inherited', primary: true, raised: true, label: 'Inherited' })),
    h(ThemeProvider, { variables: { '--palette-indigo-500': '#673ab7', '--button-height': '50px' } },
      h(ThemeProvider, { variables: { '--unit': '12px' } },
        h(Button, { id: 'primary', primary: true, raised: true, label: 'Primary' }),
        h(Button, { id: 'accent', accent: true, raised: true, label: 'Accent' }),
      ),
    ),
    h(ThemeProvider, { variables: { '--unit': '12px' } },
      h(Button, { id: 'resized', primary: true, raised: true, label: 'Resized' }),
    ),
  ));
  await page.setContent(`<style>${await componentStyles()}\n:root { --color-accent: #00695c; }</style>${markup}`);
  await expect(page.locator('#inherited')).toHaveCSS('background-color', 'rgb(63, 81, 181)');
  await expect(page.locator('#primary')).toHaveCSS('background-color', 'rgb(103, 58, 183)');
  await expect(page.locator('#accent')).toHaveCSS('background-color', 'rgb(0, 105, 92)');
  await expect(page.locator('#primary')).toHaveCSS('height', '50px');
  expect(await page.locator('#resized').evaluate(element => element.getBoundingClientRect().height)).toBeCloseTo(43.2, 1);
  // WebKit serializes live calc(1.4 * 12px) as 16.799999px.
  expect(await page.locator('#resized').evaluate(element => Number.parseFloat(getComputedStyle(element).fontSize))).toBeCloseTo(16.8, 4);
});
