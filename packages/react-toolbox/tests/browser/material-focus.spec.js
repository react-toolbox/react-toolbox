import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { expect, test } from '@playwright/test';
import { css } from './material-fixture.js';

let javascript;
test.beforeAll(async () => {
  const result = await build({
    stdin: {
      resolveDir: fileURLToPath(new URL('../../', import.meta.url)),
      loader: 'jsx',
      contents: `
        import React, { useState } from 'react';
        import { createRoot } from 'react-dom/client';
        import { Tabs, Tab, TabsRoot, TabsList, TabsTrigger, TabsIndicator } from './src/material/tabs';
        import { IconMenu, MenuItem, DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './src/material/menu';
        import { AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel } from './src/material/accordion';
        import { List, ListItem } from './src/material/list';
        import { DropdownRoot, DropdownTrigger, DropdownSelection } from './src/material/dropdown';
        function App() {
          const [tab, setTab] = useState(0);
          return <>
            <TabsRoot defaultValue="preview" activationMode="manual">
              <TabsList aria-label="Example view">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsIndicator />
              </TabsList>
            </TabsRoot>
            <div style={{ width: 220 }}>
              <Tabs index={tab} onChange={setTab} inverse aria-label="Inverse tabs">
                <Tab label="Overview" /><Tab label="Details" />
              </Tabs>
            </div>
            <IconMenu aria-label="File actions"><MenuItem caption="Download" /><MenuItem caption="Share" /></IconMenu>
            <DropdownMenuRoot>
              <DropdownMenuTrigger>Compound menu</DropdownMenuTrigger>
              <DropdownMenuContent><DropdownMenuItem>Rename</DropdownMenuItem></DropdownMenuContent>
            </DropdownMenuRoot>
            <AccordionRoot>
              <AccordionItem value="settings">
                <AccordionHeader><AccordionTrigger>Settings</AccordionTrigger></AccordionHeader>
                <AccordionPanel>Settings content</AccordionPanel>
              </AccordionItem>
            </AccordionRoot>
            <List><ListItem caption="Inbox" primaryAction={<button />} /></List>
            <DropdownRoot><DropdownTrigger aria-label="Category"><DropdownSelection placeholder="Choose" /></DropdownTrigger></DropdownRoot>
          </>;
        }
        createRoot(document.getElementById('root')).render(<App />);
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

test.beforeEach(async ({ page }) => {
  await page.setContent(
    `<meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><div id="root" style="width:640px;padding:24px"></div>`,
  );
  await page.addScriptTag({ content: javascript });
  await expect(page.getByRole('tab', { name: 'Preview', exact: true })).toBeVisible();
});

test('tab focus uses a visible fill while selection keeps its own underline', async ({ page }) => {
  const preview = page.getByRole('tab', { name: 'Preview', exact: true });
  const code = page.getByRole('tab', { name: 'Code', exact: true });
  await page.keyboard.press('Tab');
  await expect(preview).toBeFocused();
  await expect(preview).toHaveCSS('outline-style', 'none');
  await expect(preview).toHaveCSS('background-color', 'color(srgb 0 0 0 / 0.12)');
  await page.keyboard.press('ArrowRight');
  await expect(code).toBeFocused();
  await expect(code).toHaveCSS('background-color', 'color(srgb 0 0 0 / 0.12)');
  await expect(preview).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(preview).toHaveAttribute('aria-selected', 'true');
  await expect(code).toHaveAttribute('aria-selected', 'false');
  await expect(page.locator('[data-slot=TabsIndicator]')).toHaveCSS('height', '2px');
  await page.keyboard.press('Enter');
  await expect(code).toHaveAttribute('aria-selected', 'true');
});

test('pointer selection keeps the underline without a frame and clears the fill on blur', async ({ page }) => {
  const code = page.getByRole('tab', { name: 'Code', exact: true });
  await code.click();
  await expect(code).toHaveAttribute('aria-selected', 'true');
  await expect(code).toHaveCSS('outline-style', 'none');
  await page.getByRole('button', { name: 'Settings', exact: true }).focus();
  await expect(code).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
});

test('inverse tab scroll arrows retain their surface and show keyboard focus above it', async ({ page }) => {
  await page.keyboard.press('Tab');
  const arrow = page.getByRole('button', { name: 'Scroll tabs right' });
  await arrow.focus();
  await expect(arrow).toHaveCSS('background-color', 'rgb(63, 81, 181)');
  await expect(arrow).toHaveCSS('outline-style', 'none');
  expect(await arrow.evaluate((element) => getComputedStyle(element, '::before').backgroundColor)).toBe(
    'color(srgb 1 1 1 / 0.12)',
  );
  await arrow.press('Enter');
  await expect(page.getByRole('button', { name: 'Scroll tabs left' })).toBeVisible();
});

test('tab focus adapts to inverse text and respects an explicit focus token', async ({ page }) => {
  await page.keyboard.press('Tab');
  const overview = page.getByRole('tab', { name: 'Overview', exact: true });
  const indicator = page.locator('.rt-tabs-pointer');
  await expect(indicator).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await indicator.evaluate((element) => element.style.setProperty('--tab-inverse-pointer-color', 'rgb(255, 128, 171)'));
  await expect(indicator).toHaveCSS('background-color', 'rgb(255, 128, 171)');
  await overview.focus();
  await expect(overview).toHaveCSS('background-color', 'color(srgb 1 1 1 / 0.12)');
  await expect(overview).toHaveCSS('outline-style', 'none');
  const preview = page.getByRole('tab', { name: 'Preview', exact: true });
  await preview.evaluate((element) => element.style.setProperty('--tab-focus-color', 'rgb(230, 220, 250)'));
  await preview.focus();
  await expect(preview).toHaveCSS('background-color', 'rgb(230, 220, 250)');
});

test('convenience and compound menus use row highlighting without an extra frame', async ({ page }) => {
  await page.keyboard.press('Tab');
  await page.getByRole('button', { name: 'File actions' }).focus();
  await page.keyboard.press('ArrowDown');
  const download = page.getByRole('menuitem', { name: 'Download' });
  await download.focus();
  await expect(download).toHaveCSS('outline-style', 'none');
  await expect(download).toHaveCSS('background-color', 'rgb(238, 238, 238)');
  await page.keyboard.press('ArrowDown');
  const share = page.getByRole('menuitem', { name: 'Share' });
  await expect(share).toBeFocused();
  await expect(share).toHaveCSS('background-color', 'rgb(238, 238, 238)');
  await expect(download).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Compound menu' }).focus();
  await page.keyboard.press('ArrowDown');
  const rename = page.getByRole('menuitem', { name: 'Rename' });
  await expect(rename).toBeFocused();
  await expect(rename).toHaveCSS('outline-style', 'none');
  await expect(rename).toHaveCSS('background-color', 'rgb(238, 238, 238)');
});

test('expansion panels and list actions use fills, and dropdowns retain their focus underline', async ({ page }) => {
  await page.keyboard.press('Tab');
  for (const name of ['Settings', 'Inbox']) {
    const action = page.getByRole('button', { name, exact: true });
    await action.focus();
    await expect(action).toHaveCSS('outline-style', 'none');
    await expect(action).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  }
  const dropdown = page.getByRole('combobox', { name: 'Category' });
  await dropdown.focus();
  await expect(dropdown).toHaveCSS('outline-style', 'none');
  await expect(dropdown).toHaveCSS('box-shadow', /0px -2px 0px 0px inset/);
});

test('forced colors retain complete inset keyboard outlines on controls using fills', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  test.skip(
    !(await page.evaluate(() => matchMedia('(forced-colors: active)').matches)),
    'Engine cannot emulate forced colors',
  );
  await page.keyboard.press('Tab');
  for (const [role, name] of [
    ['tab', 'Preview'],
    ['tab', 'Overview'],
    ['menuitem', 'Download'],
    ['button', 'Settings'],
    ['button', 'Inbox'],
    ['combobox', 'Category'],
  ]) {
    if (role === 'menuitem') {
      await page.getByRole('button', { name: 'File actions' }).focus();
      await page.keyboard.press('ArrowDown');
    }
    const control = page.getByRole(role, { name, exact: true });
    await control.focus();
    await expect(control).toHaveCSS('outline-style', 'solid');
    await expect(control).toHaveCSS('outline-width', '2px');
    await expect(control).toHaveCSS('outline-offset', '-2px');
    if (role === 'menuitem') await page.keyboard.press('Escape');
  }
});
