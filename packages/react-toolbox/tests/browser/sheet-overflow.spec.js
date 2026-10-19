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
        import { SheetRoot, SheetTrigger, SheetPortal, SheetOverlay, SheetContent, SheetTitle, SheetDescription, SheetClose } from './src/material/sheet';
        createRoot(document.getElementById('root')).render(
          <SheetRoot direction={window.direction || 'bottom'} snapPoints={window.snaps ? [0.5, 1] : undefined}>
            <SheetTrigger>Open visit notes</SheetTrigger>
            <SheetPortal>
              <SheetOverlay />
              <SheetContent>
                <div data-testid="notes-content" style={{ minHeight: 0, overflowY: 'auto', padding: 24 }}>
                  <SheetTitle>Visit notes</SheetTitle>
                  <SheetDescription>Review the complete field notes before finishing.</SheetDescription>
                  <SheetClose>Close notes</SheetClose>
                  {Array.from({length: window.noteCount ?? 24}, (_, index) => <p key={index}>Observation {index + 1}: Record the trail conditions and the plants growing beside the water.</p>)}
                  <SheetClose>Finish reviewing</SheetClose>
                </div>
              </SheetContent>
            </SheetPortal>
          </SheetRoot>
        );
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

for (const direction of ['bottom', 'top', 'left', 'right']) {
  for (const snaps of [false, true]) {
    test(`long ${snaps ? 'snap-point' : 'default'} ${direction} sheet content scrolls to its final action on a small viewport`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 390, height: 560 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setContent(`<style>${css}</style><div id="root"></div>`);
      await page.evaluate(
        (options) => {
          Object.assign(window, options);
        },
        { snaps, direction },
      );
      await page.addScriptTag({ content: javascript });
      const trigger = page.getByRole('button', { name: 'Open visit notes' });
      await trigger.click();
      const sheet = page.getByRole('dialog', { name: 'Visit notes' });
      await expect(sheet).toBeVisible();
      await expect(page.getByRole('button', { name: 'Close notes' })).toBeFocused();
      await expect
        .poll(async () => {
          const bounds = await sheet.boundingBox();
          if (direction === 'bottom') return Math.round(snaps ? bounds.y - 280 : bounds.y + bounds.height - 560);
          if (direction === 'top') return Math.round(bounds.y + (snaps ? 280 : 0));
          if (direction === 'left') return Math.round(bounds.x + (snaps ? 195 : 0));
          return Math.round(snaps ? bounds.x - 195 : bounds.x + bounds.width - 390);
        })
        .toBe(0);
      const bounds = await sheet.boundingBox();
      const visibleLeft = Math.max(bounds.x, 0);
      const visibleTop = Math.max(bounds.y, 0);
      const visibleRight = Math.min(bounds.x + bounds.width, 390);
      const visibleBottom = Math.min(bounds.y + bounds.height, 560);
      await page.mouse.move((visibleLeft + visibleRight) / 2, (visibleTop + visibleBottom) / 2);
      await page.mouse.wheel(0, 3000);
      const finish = page.getByRole('button', { name: 'Finish reviewing' });
      await expect(finish).toBeInViewport();
      await finish.click();
      await expect(sheet).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });
  }
}

test('short sheet content has no empty scrolling region after the actions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setContent(`<style>${css}</style><div id="root"></div>`);
  await page.evaluate(() => {
    window.noteCount = 2;
  });
  await page.addScriptTag({ content: javascript });
  await page.getByRole('button', { name: 'Open visit notes' }).click();
  const sheet = page.getByRole('dialog', { name: 'Visit notes' });
  await expect(sheet).toBeVisible();
  expect(await page.getByTestId('notes-content').evaluate((node) => node.scrollHeight - node.clientHeight)).toBe(0);
  await expect(page.getByRole('button', { name: 'Finish reviewing' })).toBeInViewport();
});

test.describe('touch scrolling', () => {
  test.use({ hasTouch: true, viewport: { width: 390, height: 560 } });
  test('long sheet content responds to a native touch scroll', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Native swipe synthesis uses the Chromium input protocol.');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setContent(`<style>${css}</style><div id="root"></div>`);
    await page.addScriptTag({ content: javascript });
    await page.getByRole('button', { name: 'Open visit notes' }).click();
    const sheet = page.getByRole('dialog', { name: 'Visit notes' });
    await expect.poll(async () => Math.round((await sheet.boundingBox()).y)).toBe(56);
    const input = await page.context().newCDPSession(page);
    /** Dispatch native touch events; Linux Chromium's synthesized gesture can omit touchmove and scrolling. */
    await input.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 195, y: 450 }] });
    for (let y = 430; y >= 150; y -= 20) {
      await input.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 195, y }] });
    }
    await input.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await expect.poll(() => page.getByTestId('notes-content').evaluate((node) => node.scrollTop)).toBeGreaterThan(0);
  });
});
