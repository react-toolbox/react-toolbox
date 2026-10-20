import { test, expect } from '@playwright/test';

for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 390, height: 844 },
  { width: 844, height: 390 },
]) {
  test(`single icons are centered at ${viewport.width}×${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/playground');
    await page.evaluate(() => document.fonts.ready);

    // Measure the font's glyph line box, not the enclosing span: a 48px span
    // can conceal the wrong 36px line height and still appear centered itself.
    const icons = await page.locator([
      '.rt-button-toggle > .rt-button-icon',
      '.rt-button-floating > .rt-button-icon',
      '.rt-avatar-avatar > [data-react-toolbox="font-icon"]',
    ].join(',')).evaluateAll(elements => elements.map(element => {
      const range = document.createRange();
      range.selectNodeContents(element);
      const glyph = range.getBoundingClientRect();
      const container = element.parentElement.getBoundingClientRect();
      return {
        name: `${element.textContent} in ${element.parentElement.className}`,
        x: glyph.x + glyph.width / 2 - container.x - container.width / 2,
        y: glyph.y + glyph.height / 2 - container.y - container.height / 2,
        fontLoaded: document.fonts.check(`24px ${getComputedStyle(element).fontFamily}`),
      };
    }));

    // Includes both app-bar actions, normal/mini/disabled FABs, icon buttons,
    // menu triggers, and avatars supplied through both the icon prop and children.
    expect(icons).toHaveLength(14);
    for (const icon of icons) {
      expect(icon.fontLoaded, icon.name).toBe(true);
      expect(Math.abs(icon.x), `${icon.name}: horizontal center`).toBeLessThanOrEqual(0.5);
      expect(Math.abs(icon.y), `${icon.name}: vertical center`).toBeLessThanOrEqual(0.5);
    }
  });
}

test('font icons preserve control dimensions while their font downloads', async ({ page }) => {
  const fonts = Promise.withResolvers();
  const requested = [];
  await page.route(/\.(woff2?|ttf)(\?.*)?$/, async (route) => {
    requested.push(route.request().url());
    await fonts.promise;
    await route.continue();
  });
  const dimensions = () => page.locator([
    '[data-react-toolbox="font-icon"]',
    '[data-react-toolbox="button"]',
  ].join(',')).evaluateAll(elements => elements.map(element => {
    const bounds = element.getBoundingClientRect();
    return { width: bounds.width, height: bounds.height };
  }));

  try {
    await page.goto('/playground', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Good design is in the details.' })).toBeVisible();
    await expect.poll(() => requested.length).toBeGreaterThan(0);
    /** Let the text font's optional block period expire while both fonts remain unavailable. */
    await page.waitForTimeout(500);
    await expect(page.getByRole('img', { name: 'Palette', exact: true })).toHaveCSS('width', '24px');
    const before = await dimensions();
    fonts.resolve();
    await page.evaluate(() => document.fonts.ready);
    expect(await dimensions()).toEqual(before);
  } finally {
    fonts.resolve();
    await page.unrouteAll({ behavior: 'wait' });
  }
});
