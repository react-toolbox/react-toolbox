import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { expect, test } from '@playwright/test';
import { css } from './material-fixture.js';

const standardCurve = 'cubic-bezier(0.4, 0, 0.2, 1)';
const viewSelectors = {
  date: '[data-react-toolbox="calendar"] [data-view-state]',
  time: '.rt-time-picker-clockWrapper',
};
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
          import { ThemeProvider } from './src/material/theme';
          import DatePicker from './src/material/date-picker';
          import TimePicker from './src/material/time-picker';
          const options = window.fixtureOptions;
          createRoot(document.getElementById('root')).render(
            <ThemeProvider variables={options.variables}>
              {options.kind === 'date'
                ? <DatePicker defaultOpen label="Date" defaultValue={new Date(2026, 9, 15)} />
                : <TimePicker defaultOpen label="Time" defaultValue={new Date(2026, 9, 15, 9, 30)} />}
            </ThemeProvider>
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

async function mount(page, kind, variables) {
  await page.goto('about:blank');
  await page.setContent(
    `<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><div id="root"></div>`,
  );
  await page.evaluate(
    (options) => {
      window.fixtureOptions = options;
    },
    { kind, variables },
  );
  await page.addScriptTag({ content: javascript });
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveCSS('opacity', '1');
  await expect(dialog).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
  await expect(dialog.locator(viewSelectors[kind])).toHaveCount(1);
  return dialog;
}

function changeView(dialog, kind, reverse = false) {
  return kind === 'date'
    ? dialog.getByRole('button', { name: reverse ? 'Previous month' : 'Next month' })
    : dialog.getByRole('spinbutton', { name: reverse ? 'Hours' : 'Minutes' });
}

/** Pause real transitions on both views, keeping short motions inspectable without changing their CSS. */
async function captureNextMotion(page, kind) {
  await page.evaluate((selector) => {
    window.pickerMotion = undefined;
    const outgoing = document.querySelector(selector);
    const capture = (event) => {
      if (event.target !== outgoing) return;
      const views = [...document.querySelectorAll(selector)];
      const animations = views.flatMap((view) =>
        view.getAnimations().filter((animation) => 'transitionProperty' in animation),
      );
      if (!animations.length) return;
      window.pickerMotion = {
        outgoing,
        animations,
        durations: animations.map((animation) => animation.effect.getTiming().duration),
        curves: views.map((view) => getComputedStyle(view).transitionTimingFunction),
      };
      for (const animation of animations) animation.pause();
      outgoing.removeEventListener('transitionrun', capture);
    };
    outgoing.addEventListener('transitionrun', capture);
  }, viewSelectors[kind]);
}

async function expectMotion(page, duration) {
  await expect.poll(() => page.evaluate(() => Boolean(window.pickerMotion))).toBe(true);
  const motion = await page.evaluate(() => ({
    durations: window.pickerMotion.durations,
    curves: window.pickerMotion.curves,
    retained: window.pickerMotion.outgoing.isConnected,
  }));
  expect(motion.retained).toBe(true);
  expect(motion.durations).toHaveLength(4);
  for (const actual of motion.durations) expect(actual).toBeCloseTo(duration, 4);
  expect(motion.curves).toEqual([standardCurve, standardCurve]);
}

async function finishMotion(page, dialog, kind) {
  const completed = await page.evaluate(async () => {
    const animations = window.pickerMotion.animations;
    const completion = Promise.all(
      animations.map((animation) =>
        animation.finished.then(
          () => true,
          () => false,
        ),
      ),
    );
    for (const animation of animations) animation.play();
    return completion;
  });
  /** A stale fixed timeout would cancel a long outgoing transition before it finishes. */
  expect(completed.every(Boolean)).toBe(true);
  await expect(dialog.locator(viewSelectors[kind])).toHaveCount(1);
  expect(await page.evaluate(() => window.pickerMotion.outgoing.isConnected)).toBe(false);
}

for (const coarse of [false, true]) {
  test.describe(coarse ? 'coarse pointer picker motion' : 'desktop picker motion', () => {
    test.use({ hasTouch: coarse });
    for (const kind of ['date', 'time']) {
      test(`${kind} view changes use standard motion and finish before removing the old view`, async ({ page }) => {
        const dialog = await mount(page, kind);
        expect(await page.evaluate(() => matchMedia('(pointer: coarse)').matches)).toBe(coarse);
        await captureNextMotion(page, kind);
        await changeView(dialog, kind).click();
        await expectMotion(page, coarse ? 300 : 200);
        await finishMotion(page, dialog, kind);
      });
    }
  });
}

for (const kind of ['date', 'time']) {
  test(`${kind} makes departing views inert and hides them from assistive technology`, async ({ page }) => {
    const dialog = await mount(page, kind);
    await captureNextMotion(page, kind);
    await changeView(dialog, kind).click();
    await expectMotion(page, 200);
    await expect(dialog.locator('[data-view-state="departing"]')).toHaveAttribute('inert', '');
    await expect(dialog.locator('[data-view-state="departing"]')).toHaveAttribute('aria-hidden', 'true');
    await expect(dialog.locator('[data-view-state="current"]')).not.toHaveAttribute('inert');
    await finishMotion(page, dialog, kind);
  });

  test(`${kind} retains a departing view for the full themed duration`, async ({ page }) => {
    const dialog = await mount(page, kind, { '--animation-duration': '800ms' });
    await captureNextMotion(page, kind);
    await changeView(dialog, kind).click();
    await expectMotion(page, 800);
    await finishMotion(page, dialog, kind);
  });

  test(`${kind} keeps the current view when an exit is reversed`, async ({ page }) => {
    const dialog = await mount(page, kind);
    await captureNextMotion(page, kind);
    await changeView(dialog, kind).click();
    await expectMotion(page, 200);
    await changeView(dialog, kind, true).evaluate((control) => {
      for (const animation of window.pickerMotion.animations) {
        animation.currentTime = Number(animation.effect.getTiming().duration) * 0.4;
        animation.play();
      }
      control.click();
    });
    await expect(dialog.locator(viewSelectors[kind])).toHaveCount(1);
    expect(await page.evaluate(() => window.pickerMotion.outgoing.isConnected)).toBe(true);
    if (kind === 'date') await expect(dialog.getByText('October 2026', { exact: true })).toBeVisible();
    else await expect(dialog).toHaveClass(/rt-time-picker-hoursDisplay/);
  });

  test(`${kind} completes reduced motion changes and cancels an in-flight transition cleanly`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    let dialog = await mount(page, kind);
    await changeView(dialog, kind).click();
    await expect(dialog.locator(viewSelectors[kind])).toHaveCount(1);
    if (kind === 'date') await expect(dialog.getByText('November 2026', { exact: true })).toBeVisible();
    else await expect(dialog).toHaveClass(/rt-time-picker-minutesDisplay/);

    await page.emulateMedia({ reducedMotion: 'no-preference' });
    dialog = await mount(page, kind);
    await captureNextMotion(page, kind);
    await changeView(dialog, kind).click();
    await expectMotion(page, 200);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(dialog.locator(viewSelectors[kind])).toHaveCount(1);
    expect(await page.evaluate(() => window.pickerMotion.outgoing.isConnected)).toBe(false);
  });
}

test('a year jump transitions between distinct months and preserves day focus', async ({ page }) => {
  const dialog = await mount(page, 'date');
  await captureNextMotion(page, 'date');
  await dialog.getByRole('button', { name: '15 October 2026', exact: true }).press('Shift+PageDown');
  await expectMotion(page, 200);
  await expect(dialog.getByRole('button', { name: '15 October 2027', exact: true })).toBeFocused();
  await finishMotion(page, dialog, 'date');
  await expect(dialog.getByRole('button', { name: '15 October 2027', exact: true })).toBeFocused();
});
