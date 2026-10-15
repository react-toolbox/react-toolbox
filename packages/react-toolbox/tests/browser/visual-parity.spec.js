import { writeFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';
import { componentCapture, useOriginalStyles, prepare, renderedStyles } from './parity-helpers.js';

async function assertParity(page, selector, name, testInfo) {
  const target = componentCapture(page, selector);
  await target.scrollIntoViewIfNeeded();
  // Opening a picker leaves the pointer where the input was. As its entrance
  // transition finishes, that coordinate can hover a different calendar day.
  await page.mouse.move(0, 0);
  const modernImage = await target.screenshot({ animations: 'disabled' });
  const modernStyles = await renderedStyles(page, selector);
  await useOriginalStyles(page);
  const originalImage = await target.screenshot({ animations: 'disabled' });
  const originalStyles = await renderedStyles(page, selector);

  await testInfo.attach(`${name}-modern`, { body: modernImage, contentType: 'image/png' });
  await testInfo.attach(`${name}-original`, { body: originalImage, contentType: 'image/png' });
  if (!modernImage.equals(originalImage)) {
    await writeFile(testInfo.outputPath(`${name}-modern.png`), modernImage);
    await writeFile(testInfo.outputPath(`${name}-original.png`), originalImage);
  }
  expect(modernStyles, `${name}: geometry, colors, typography, and motion declarations match the archived stylesheet plus reviewed M1 corrections`).toEqual(originalStyles);
  expect(modernImage.equals(originalImage), `${name}: screenshots must be pixel-identical to the independent reference plus reviewed M1 corrections`).toBe(true);
}

for (const section of ['buttons', 'inputs', 'selection', 'identity', 'cards', 'navigation', 'pickers', 'progress', 'tables']) {
  test(`M1 corrected reference parity: ${section}`, async ({ page }, testInfo) => {
    await prepare(page);
    await assertParity(page, `#${section}`, section, testInfo);
  });
}

test('M1 corrected reference parity: open dialog', async ({ page }, testInfo) => {
  await prepare(page);
  await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
  await expect(page.getByText('Keep this moment?', { exact: true })).toBeVisible();
  await assertParity(page, '[data-react-toolbox="dialog"]', 'dialog', testInfo);
});

test('M1 corrected reference parity: open calendar', async ({ page }, testInfo) => {
  await prepare(page);
  await page.getByLabel('Travel date', { exact: true }).click();
  await expect(page.locator('.rt-date-picker-calendar')).toBeVisible();
  await assertParity(page, '[data-react-toolbox="dialog"]', 'calendar', testInfo);
});

test('M1 corrected reference parity: open clock', async ({ page }, testInfo) => {
  await prepare(page);
  await page.getByLabel('Departure time', { exact: true }).click();
  await expect(page.locator('.rt-time-picker-clock')).toBeVisible();
  await assertParity(page, '[data-react-toolbox="dialog"]', 'clock', testInfo);
});

test('M1 corrected reference parity: disabled buffered progress', async ({ page }, testInfo) => {
  await prepare(page);
  await page.locator('#progress [data-react-toolbox="progress-bar"]').first().evaluate(element => element.setAttribute('disabled', ''));
  await assertParity(page, '#progress', 'disabled-progress', testInfo);
});
