import { css as styles } from './material-fixture.js';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { test, expect } from '@playwright/test';

const source = `
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './src/material/theme';
import Dialog from './src/material/dialog';
import { SheetRoot, SheetTrigger, SheetPortal, SheetOverlay, SheetContent, SheetTitle, SheetDescription, SheetClose, SheetHandle } from './src/material/sheet';
function App() {
  const [snap,setSnap]=useState(0.4);
  return <ThemeProvider variables={{'--drawer-background-color':'#ffeecc','--drawer-text-color':'#222222'}}>
    <SheetRoot direction={window.direction || 'bottom'} {...(window.snaps ? {snapPoints:[0.4,0.8], activeSnapPoint:snap, setActiveSnapPoint:setSnap} : {})}>
      <SheetTrigger>Open sheet</SheetTrigger>
      <SheetPortal><SheetOverlay/><SheetContent style={window.snaps ? undefined : {height:400}}>
        <SheetHandle data-testid="handle"/>
        <SheetTitle>File details</SheetTitle>
        <SheetDescription>Review this file</SheetDescription>
        <button onClick={()=>setSnap(0.8)}>Expand</button>
        <output>{snap}</output>
        <SheetClose>Done</SheetClose>
      </SheetContent></SheetPortal>
    </SheetRoot>
  </ThemeProvider>;
}
createRoot(document.getElementById('root')).render(window.nested ? <Dialog active title="Parent"><App/></Dialog> : <App/>);
`;
let javascript;
test.beforeAll(async () => {
  const result = await build({
    stdin: { contents: source, resolveDir: fileURLToPath(new URL('../../', import.meta.url)), loader: 'jsx' },
    bundle: true,
    write: false,
    format: 'iife',
    loader: { '.css': 'empty' },
    define: { 'process.env.NODE_ENV': '"production"' },
  });
  javascript = result.outputFiles[0].text;
});
async function mount(page, options = {}) {
  await page.setContent(`<!doctype html><style>${styles}</style><div id="root"></div>`);
  await page.evaluate((value) => Object.assign(window, value), options);
  await page.addScriptTag({ content: javascript });
  await page.getByRole('button', { name: 'Open sheet' }).focus();
  await page.keyboard.press('Enter');
}

test('sheet inherits portal theme, focuses content, and restores its trigger', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await mount(page);
  const sheet = page.getByRole('dialog', { name: 'File details' });
  await expect(sheet).toHaveCSS('background-color', 'rgb(255, 238, 204)');
  await expect
    .poll(() => sheet.evaluate((element) => Number.parseFloat(getComputedStyle(element).animationDuration)))
    .toBe(0.00001);
  await expect(sheet).toHaveCSS('transition-property', 'none');
  await expect(page.getByRole('button', { name: 'Expand' })).toBeFocused();
  await page.getByRole('button', { name: 'Done' }).click();
  await expect(sheet).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Open sheet' })).toBeFocused();
});

test('controlled snap points can be expanded using a keyboard action', async ({ page }) => {
  await mount(page, { snaps: true });
  const sheet = page.getByRole('dialog', { name: 'File details' });
  await expect.poll(async () => (await sheet.boundingBox()).y).toBeCloseTo(page.viewportSize().height * 0.6, 0);
  await page.getByRole('button', { name: 'Expand' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('output')).toHaveText('0.8');
  await expect.poll(async () => (await sheet.boundingBox()).y).toBeCloseTo(page.viewportSize().height * 0.2, 0);
  await page.keyboard.press('Escape');
  await expect(sheet).toHaveCount(0);
});

test('changing reduced motion during exit releases the sheet and scroll lock', async ({ page }) => {
  await mount(page);
  const sheet = page.getByRole('dialog', { name: 'File details' });
  await expect(sheet).toBeVisible();
  await sheet.evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)));
  await page.locator('[data-slot=SheetContent], [data-slot=SheetOverlay]').evaluateAll((elements) => {
    for (const element of elements) element.style.setProperty('--animation-duration-exit', '1000ms');
  });
  await page.keyboard.press('Escape');
  await expect(sheet).toHaveAttribute('data-state', 'closed');
  await expect.poll(() => sheet.evaluate((element) => element.getAnimations().length)).toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(sheet).toHaveCount(0, { timeout: 300 });
  await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
  await expect(page.getByRole('button', { name: 'Open sheet' })).toBeFocused();
});

test('dragging the handle dismisses a bottom sheet', async ({ page }) => {
  await mount(page);
  const sheet = page.getByRole('dialog', { name: 'File details' });
  await expect(sheet).toBeVisible();
  await expect.poll(async () => (await sheet.boundingBox()).y).toBe(page.viewportSize().height - 400);
  /** Vaul ignores drags during its fixed 500ms opening guard, including after the shorter M1 animation. */
  await page.waitForTimeout(550);
  const handle = await page.getByTestId('handle').boundingBox();
  const x = handle.x + handle.width / 2;
  const y = handle.y + handle.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x, y + 280, { steps: 20 });
  await page.mouse.up();
  await expect(sheet).toHaveCount(0);
});

for (const direction of ['top', 'left', 'right']) {
  test(`sheet supports the ${direction} edge`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await mount(page, { direction });
    const sheet = page.getByRole('dialog', { name: 'File details' });
    await expect(sheet).toHaveAttribute('data-vaul-drawer-direction', direction);
    await expect(sheet).toHaveCSS(direction, '0px');
    await page.keyboard.press('Escape');
    await expect(sheet).toHaveCount(0);
  });
}

test('a sheet shares modal ownership with a containing convenience dialog', async ({ page }) => {
  await mount(page, { nested: true });
  const sheet = page.getByRole('dialog', { name: 'File details' });
  await expect(sheet).toBeVisible();
  await page.getByRole('button', { name: 'Done' }).click();
  await expect(sheet).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Open sheet' })).toBeFocused();
  await expect(page.getByRole('dialog', { name: 'Parent' })).toHaveCSS('pointer-events', 'auto');
  await expect(page.locator('body')).toHaveAttribute('data-scroll-locked');
});
