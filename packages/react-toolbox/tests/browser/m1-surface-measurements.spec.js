import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { expect, test } from '@playwright/test';
import { css } from './material-fixture.js';

const source = `
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './src/material/theme';
import { AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel } from './src/material/accordion';
import { DatePicker } from './src/material/date-picker';
import { TimePicker } from './src/material/time-picker';
import { Menu, MenuItem, MenuDivider, DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './src/material/menu';
import { SheetRoot, SheetPortal, SheetOverlay, SheetContent, SheetTitle, SheetDescription, SheetClose } from './src/material/sheet';
import { Snackbar } from './src/material/snackbar';

function SnackbarExample() {
  const [active, setActive] = useState(false);
  return <>
    <button onClick={() => setActive(true)}>Save changes</button>
    <button onClick={() => setActive(false)}>Complete operation</button>
    <Snackbar active={active} label="Changes saved" />
  </>;
}

function App() {
  if (window.fixture === 'accordion') return <AccordionRoot defaultValue={['two']}>
    {['one', 'two', 'three'].map(value => <AccordionItem key={value} value={value}>
      <AccordionHeader><AccordionTrigger>{value}</AccordionTrigger></AccordionHeader>
      <AccordionPanel>Details for {value}</AccordionPanel>
    </AccordionItem>)}
  </AccordionRoot>;
  if (window.fixture === 'pickers') return <ThemeProvider variables={window.unit ? {'--unit': window.unit} : {}}>
    <DatePicker label="Visit date" defaultValue={new Date(2026, 9, 19)} />
    <TimePicker label="Visit time" defaultValue={new Date(2026, 9, 19, 9, 30)} />
  </ThemeProvider>;
  if (window.fixture === 'menus') return <>
    <Menu><MenuItem caption="Rename" /><MenuDivider /><MenuItem caption="Delete" /></Menu>
    <DropdownMenuRoot defaultOpen modal={false}>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent><DropdownMenuItem>Rename</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem>Delete</DropdownMenuItem></DropdownMenuContent>
    </DropdownMenuRoot>
  </>;
  if (window.fixture === 'sheet') return <SheetRoot defaultOpen>
    <SheetPortal><SheetOverlay /><SheetContent>
      <SheetTitle>Visit details</SheetTitle><SheetDescription>Review the plan.</SheetDescription><SheetClose>Done</SheetClose>
    </SheetContent></SheetPortal>
  </SheetRoot>;
  return <SnackbarExample />;
}
createRoot(document.getElementById('root')).render(<App />);
`;

let javascript;
test.beforeAll(async () => {
  javascript = (
    await build({
      stdin: {
        contents: source,
        resolveDir: fileURLToPath(new URL('../../', import.meta.url)),
        loader: 'jsx',
      },
      bundle: true,
      write: false,
      format: 'iife',
      loader: { '.css': 'empty' },
      define: { 'process.env.NODE_ENV': '"production"' },
    })
  ).outputFiles[0].text;
});

async function mount(page, fixture, options = {}) {
  await page.setContent(`<!doctype html><style>${css}</style><div id="root"></div>`);
  await page.evaluate((settings) => Object.assign(window, settings), { fixture, ...options });
  await page.addScriptTag({ content: javascript });
}

test('an expanded panel separates from its neighbors by 16px and rejoins them when collapsed', async ({ page }) => {
  await mount(page, 'accordion');
  const items = page.locator('[data-slot="AccordionItem"]');
  const gaps = () =>
    items.evaluateAll((elements) => {
      const [first, middle, last] = elements.map((element) => element.getBoundingClientRect());
      return [middle.top - first.bottom, last.top - middle.bottom];
    });
  await expect.poll(gaps).toEqual([16, 16]);
  const trigger = page.getByRole('button', { name: 'two', exact: true });
  await expect(trigger).toHaveCSS('height', '64px');
  await trigger.click();
  await expect.poll(gaps).toEqual([0, 0]);
  await expect(trigger).toHaveCSS('height', '48px');
});

test('the time picker keeps its own 300px width at phone and desktop sizes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await mount(page, 'pickers');
  await page.getByRole('combobox', { name: 'Visit time' }).click();
  const dialog = page.getByRole('dialog', { name: 'Choose time' });
  await expect(dialog).toHaveCSS('width', '300px');
  await expect(dialog.getByRole('button', { name: 'Ok', exact: true })).toBeInViewport();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(dialog).toHaveCSS('width', '300px');
});

for (const [unit, size] of [
  [undefined, '24px'],
  ['12px', '28.8px'],
]) {
  test(`the selected calendar year uses its emphasized size at ${unit ?? 'the default unit'}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await mount(page, 'pickers', { unit });
    await page.getByRole('combobox', { name: 'Visit date' }).click();
    await page.getByRole('button', { name: 'Choose year: 2026' }).click();
    const selectedYear = page.locator('[data-react-toolbox="years"] [aria-pressed="true"]');
    await expect(selectedYear).toHaveText('2026');
    expect(await selectedYear.evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeCloseTo(
      parseFloat(size),
      4,
    );
  });
}

test('convenience and compound menu separators share 8px vertical spacing', async ({ page }) => {
  await mount(page, 'menus');
  for (const selector of ['[data-react-toolbox="menu-divider"]', '[data-slot="DropdownMenuSeparator"]']) {
    await expect(page.locator(selector)).toHaveCSS('margin-top', '8px');
    await expect(page.locator(selector)).toHaveCSS('margin-bottom', '8px');
    await expect(page.locator(selector)).toHaveCSS('height', '1px');
  }
});

test('a bottom sheet uses the M1 white surface, subdued 16px title, and 20% scrim', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await mount(page, 'sheet');
  const sheet = page.getByRole('dialog', { name: 'Visit details' });
  await expect(sheet).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  const title = sheet.getByRole('heading', { name: 'Visit details' });
  await expect(title).toHaveCSS('font-size', '16px');
  await expect(title).toHaveCSS('font-weight', '400');
  await expect(title).toHaveCSS('color', 'rgb(117, 117, 117)');
  await expect(page.locator('[data-slot="SheetOverlay"]')).toHaveCSS(
    'background-color',
    /^(rgba\(0, 0, 0, 0\.2\)|color\(srgb 0 0 0 \/ 0\.2\))$/,
  );
});

test('the snackbar completes its slide below the viewport before its retained exit unmounts', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await mount(page, 'snackbar');
  await page.getByRole('button', { name: 'Save changes' }).click();
  const snackbar = page.locator('[data-react-toolbox="snackbar"]');
  await expect(snackbar).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
  await snackbar.evaluate((element) => {
    element.addEventListener('transitionend', (event) => {
      if (event.propertyName === 'transform') {
        window.snackbarExit = { top: element.getBoundingClientRect().top, viewport: window.innerHeight };
      }
    });
  });
  await page.getByRole('button', { name: 'Complete operation' }).click();
  await expect
    .poll(() => page.evaluate(() => window.snackbarExit?.top >= window.snackbarExit?.viewport - 1))
    .toBe(true);
  await expect(snackbar).toHaveCount(0);
});
