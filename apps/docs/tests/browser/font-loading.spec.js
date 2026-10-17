import { test, expect } from '@playwright/test';

async function visibleTextLayout(page) {
  return page.locator('h1, main p, header a, [data-react-toolbox="button"], figcaption').evaluateAll((elements) =>
    elements.flatMap((element) => {
      const bounds = element.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return [];
      const text = document.createRange();
      text.selectNodeContents(element);
      return [{ bounds: bounds.toJSON(), lines: [...text.getClientRects()].map((rect) => rect.toJSON()) }];
    }),
  );
}

for (const path of ['/', '/docs']) {
  for (const width of [390, 1270]) {
    test(`${path} keeps its initial layout when fonts arrive late at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const fonts = Promise.withResolvers();
      const requested = [];
      await page.route(/\.(woff2?|ttf)(\?.*)?$/, async (route) => {
        requested.push(route.request().url());
        await fonts.promise;
        await route.continue();
      });

      try {
        await page.goto(path, { waitUntil: 'domcontentloaded' });
        await expect(page.locator('h1')).toBeVisible();
        await expect.poll(() => requested.length).toBeGreaterThan(0);
        /** Simulate fonts arriving after the browser's short optional-font block period. */
        await page.waitForTimeout(500);

        if (path === '/') {
          await expect(page.getByRole('link', { name: 'Get started' }).locator('svg')).toBeVisible();
          await expect(page.getByRole('button', { name: 'Favorite this project' }).locator('svg')).toBeVisible();
        } else if (width < 1024) {
          await expect(page.getByRole('button', { name: 'Browse documentation' }).locator('svg')).toBeVisible();
        }

        const before = await visibleTextLayout(page);
        fonts.resolve();
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(resolve)));
        expect(await visibleTextLayout(page)).toEqual(before);
      } finally {
        fonts.resolve();
        await page.unrouteAll({ behavior: 'wait' });
      }
    });
  }
}
