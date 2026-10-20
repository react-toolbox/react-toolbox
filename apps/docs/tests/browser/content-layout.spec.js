import { test, expect } from '@playwright/test';

test('documentation cards reflow with their available article width', async ({ page }) => {
  for (const route of ['/docs', '/docs/components']) {
    await page.goto(route);
    const cards = page.locator('article a:has(> [data-react-toolbox="card"])');
    for (const width of [640, 648, 1024]) {
      await page.setViewportSize({ width, height: 900 });
      const first = await cards.nth(0).boundingBox();
      const second = await cards.nth(1).boundingBox();
      if (width === 640) {
        expect(second.x, route).toBe(first.x);
        expect(second.y - first.y - first.height, route).toBe(16);
      } else {
        expect(second.y, route).toBe(first.y);
        expect(second.x - first.x - first.width, route).toBe(24);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth), route).toBe(width);
    }
  }
});

test('Field Notes keeps mobile controls usable and reflows when the sidebar appears', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/docs/theming');
  const example = page.locator('[data-field-notes-viewport]');
  await page.evaluate(() => document.fonts.ready);
  const title = example.getByRole('heading', { name: 'Field Notes', exact: true });
  expect(await title.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  for (const name of ['About this workspace', 'Survey actions']) {
    const control = example.getByRole('button', { name });
    const box = await control.boundingBox();
    expect(box.width, name).toBeGreaterThanOrEqual(48);
    expect(box.height, name).toBeGreaterThanOrEqual(48);
  }
  await example.getByRole('button', { name: 'Survey actions' }).click();
  await expect(page.getByRole('menuitem', { name: 'Save survey link' })).toBeVisible();
  await page.keyboard.press('Escape');

  const cards = example.locator('[data-react-toolbox="card"]');
  for (const width of [1024, 1025, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const survey = await cards.nth(0).boundingBox();
    const preferences = await cards.nth(1).boundingBox();
    if (width === 1025) {
      expect(preferences.x).toBe(survey.x);
      expect(preferences.y).toBeGreaterThanOrEqual(survey.y + survey.height + 24);
    } else {
      expect(preferences.y).toBe(survey.y);
      expect(preferences.x - survey.x - survey.width).toBe(24);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
});
