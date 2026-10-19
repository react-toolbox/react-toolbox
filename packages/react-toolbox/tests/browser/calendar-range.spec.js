import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { expect, test } from '@playwright/test';
import { css } from './material-fixture.js';

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
          import { CalendarSelection } from './src/material/date-picker';
          const options = window.fixtureOptions;
          createRoot(document.getElementById('root')).render(
            <CalendarSelection
              mode={options.mode}
              defaultMonth={new Date(2026, 9, 1)}
              numberOfMonths={2}
              showWeekNumbers
              sundayFirstDayOfWeek={options.sundayFirstDayOfWeek}
              isDateUnavailable={date => date.getDate() === 31}
              clearable
            />
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

async function mount(page, options = {}) {
  await page.goto('about:blank');
  await page.setContent(
    `<style>${css}</style><div id="root" dir="${options.direction ?? 'ltr'}" style="padding:24px"></div>`,
  );
  await page.evaluate(
    (options) => {
      window.fixtureOptions = options;
    },
    { mode: 'range', ...options },
  );
  await page.addScriptTag({ content: javascript });
  await expect(page.getByRole('table')).toHaveCount(2);
}

async function band(day) {
  return day.evaluate((element) => {
    const cell = element.closest('td');
    const style = getComputedStyle(cell, '::before');
    return {
      content: style.content,
      width: parseFloat(style.width),
      height: parseFloat(style.height),
      start: parseFloat(style.insetInlineStart),
      end: parseFloat(style.insetInlineEnd),
      background: style.backgroundColor,
      cellWidth: cell.getBoundingClientRect().width,
      dayHeight: element.getBoundingClientRect().height,
    };
  });
}

for (const direction of ['ltr', 'rtl']) {
  test(`range bands connect endpoints across weeks and months in ${direction}`, async ({ page }) => {
    await mount(page, { direction, sundayFirstDayOfWeek: direction === 'rtl' });
    const first = page.getByRole('button', { name: '30 October 2026', exact: true });
    const unavailable = page.getByRole('button', { name: '31 October 2026', exact: true });
    const middle = page.getByRole('button', { name: '1 November 2026', exact: true });
    const last = page.getByRole('button', { name: '2 November 2026', exact: true });
    await first.click();
    await last.click();
    await page.mouse.move(0, 0);

    for (const day of [first, unavailable, middle, last]) {
      await expect(day).toHaveAttribute('aria-pressed', 'true');
      const stripe = await band(day);
      expect(stripe.height).toBe(stripe.dayHeight);
    }
    await expect(unavailable).toHaveAttribute('aria-disabled', 'true');
    const start = await band(first);
    const end = await band(last);
    expect(start.start).toBeCloseTo(start.cellWidth / 2);
    expect(start.end).toBe(0);
    expect(end.start).toBe(0);
    expect(end.end).toBeCloseTo(end.cellWidth / 2);
    for (const day of [unavailable, middle]) {
      const stripe = await band(day);
      expect(stripe.width).toBe(stripe.cellWidth);
      expect(stripe.background).toBe(start.background);
      await expect(day).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    }
    const endpointColor = await first.evaluate((element) => getComputedStyle(element).backgroundColor);
    expect(endpointColor).not.toBe('rgba(0, 0, 0, 0)');
    await expect(last).toHaveCSS('background-color', endpointColor);
    await expect(page.getByRole('button', { name: '3 November 2026', exact: true })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(
      await page
        .locator('th, td:empty')
        .evaluateAll((cells) => cells.every((cell) => getComputedStyle(cell, '::before').content === 'none')),
    ).toBe(true);

    await first.focus();
    await first.press(direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight');
    await expect(unavailable).toBeFocused();
    await expect(unavailable).toHaveCSS('outline-style', 'solid');
    await expect(unavailable).toHaveCSS('outline-width', '2px');
    await expect(last).toHaveAttribute('aria-pressed', 'true');
  });
}

test('unfinished and same-day ranges stay circular, reversed ranges connect, and clearing removes the band', async ({
  page,
}) => {
  await mount(page);
  const first = page.getByRole('button', { name: '19 October 2026', exact: true });
  const last = page.getByRole('button', { name: '23 October 2026', exact: true });
  await first.click();
  expect((await band(first)).content).toBe('none');
  await first.click();
  expect((await band(first)).content).toBe('none');
  await expect(first).toHaveCSS('border-radius', '50%');
  await expect(page.getByRole('button', { pressed: true })).toHaveCount(1);

  await last.click();
  await first.click();
  await expect(page.getByRole('button', { pressed: true })).toHaveCount(5);
  const firstBand = await band(first);
  const lastBand = await band(last);
  expect(firstBand.width).toBeCloseTo(firstBand.cellWidth / 2);
  expect(lastBand.width).toBeCloseTo(lastBand.cellWidth / 2);
  const days = page.getByRole('button', { pressed: true });
  const boxes = await days.evaluateAll((elements) =>
    elements.map((element) => {
      const cell = element.closest('td').getBoundingClientRect();
      return { x: cell.x, right: cell.right, y: cell.y };
    }),
  );
  for (let i = 1; i < boxes.length; i++) {
    expect(boxes[i].x).toBeCloseTo(boxes[i - 1].right);
    expect(boxes[i].y).toBe(boxes[0].y);
  }
  await page.getByRole('button', { name: 'Clear dates' }).click();
  await expect(page.getByRole('button', { pressed: true })).toHaveCount(0);
  expect((await band(first)).content).toBe('none');
});

for (const mode of ['single', 'multiple']) {
  test(`${mode} selections retain individual filled circles`, async ({ page }) => {
    await mount(page, { mode });
    const first = page.getByRole('button', { name: '19 October 2026', exact: true });
    const last = page.getByRole('button', { name: '20 October 2026', exact: true });
    await first.click();
    await last.click();
    await page.mouse.move(0, 0);
    await expect(page.getByRole('button', { pressed: true })).toHaveCount(mode === 'single' ? 1 : 2);
    for (const day of mode === 'single' ? [last] : [first, last]) {
      await expect(day).toHaveCSS('border-radius', '50%');
      expect(await day.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe('rgba(0, 0, 0, 0)');
      expect((await band(day)).content).toBe('none');
    }
  });
}
