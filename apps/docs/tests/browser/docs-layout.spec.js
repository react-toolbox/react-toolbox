import { test, expect } from '@playwright/test';

test('documentation preserves content and outer frame keylines across responsive boundaries', async ({ page }) => {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 599, height: 900 },
    { width: 600, height: 900 },
    { width: 639, height: 900 },
    { width: 640, height: 900 },
    { width: 844, height: 390 },
    { width: 1023, height: 768 },
    { width: 1024, height: 768 },
    { width: 1025, height: 768 },
    { width: 1279, height: 900 },
    { width: 1280, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/docs');
    const article = await page.locator('article').boundingBox();
    const breadcrumb = await page.getByRole('navigation', { name: 'Breadcrumb', exact: true }).boundingBox();
    const footerCredit = await page.locator('footer p').boundingBox();
    expect(breadcrumb.x).toBe(article.x);
    const footerInset = viewport.width >= 600 && viewport.height >= 600 ? 24 : 16;
    expect(footerCredit.x).toBe((viewport.width > 1024 ? 256 : 0) + footerInset);
    expect(await page.evaluate(() => document.documentElement.scrollWidth), `${viewport.width}×${viewport.height}`)
      .toBe(viewport.width);

    if (viewport.width <= 1024) {
      const inset = viewport.width >= 600 && viewport.height >= 600 ? 24 : 16;
      const header = page.locator('header[data-react-toolbox="app-bar"]');
      await expect(header).toHaveCSS('padding-left', `${inset}px`);
      expect(article.x).toBe(inset);
      const browse = page.getByRole('button', { name: 'Browse documentation' });
      const icon = await browse.locator('svg').boundingBox();
      const label = await browse.getByText('Browse documentation').boundingBox();
      expect(icon.x).toBe(inset);
      expect(label.x).toBe(inset + 56);
      expect(Math.abs(icon.y + icon.height / 2 - (label.y + label.height / 2))).toBeLessThan(1);
    } else {
      const main = await page.locator('main').boundingBox();
      expect(article.x - main.x).toBe(40);
      const sidebarHeading = await page.getByRole('heading', { name: 'Getting started' }).boundingBox();
      expect(breadcrumb.y).toBe(sidebarHeading.y);
      expect(breadcrumb.height).toBe(sidebarHeading.height);
      if (viewport.width >= 1280) {
        const toc = page.getByRole('navigation', { name: 'On this page' });
        const tocHeading = await toc.getByText('On this page', { exact: true }).boundingBox();
        expect(tocHeading.y).toBe(breadcrumb.y);
        expect(tocHeading.height).toBe(breadcrumb.height);
        const firstSidebarLink = await page.getByRole('navigation', { name: 'Documentation sidebar' })
          .getByRole('link', { name: 'Introduction', exact: true }).boundingBox();
        expect((await toc.getByRole('link').first().boundingBox()).y).toBe(firstSidebarLink.y);
      }
    }
  }
});

test('the navigation drawer keeps its title and links on the app bar keyline', async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 600, height: 900 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/docs');
    const header = await page.locator('header[data-react-toolbox="app-bar"]').boundingBox();
    const home = await page.getByRole('link', { name: 'React Toolbox home' }).boundingBox();
    await page.getByRole('button', { name: 'Browse documentation' }).click();
    const drawer = page.getByRole('dialog', { name: 'Documentation navigation' });
    await expect(drawer).toBeVisible();
    await expect.poll(async () => (await drawer.boundingBox()).x).toBe(0);
    const title = drawer.getByText('Documentation', { exact: true });
    expect((await title.boundingBox()).x).toBe(home.x);
    expect((await title.locator('..').boundingBox()).height).toBe(header.height);
    const firstLink = drawer.getByRole('link', { name: 'Introduction', exact: true });
    await expect(firstLink).toHaveCSS('padding-left', `${home.x}px`);
    await expect(firstLink).toHaveCSS('min-height', '48px');
    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
  }
});

test('wide pages use one consistent article column and give the collection its available width', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/docs');
  const article = await page.locator('article').boundingBox();
  const paragraph = await page.locator('#material > p').first().boundingBox();
  const introduction = await page.locator('article > p').boundingBox();
  const cards = await page.locator('#start > div').boundingBox();
  expect(article.x).toBe(256 + 40);
  expect(article.width).toBe(1920 - 256 - 80 - 144 - 40);
  expect(paragraph.width).toBe(article.width);
  expect(introduction.width).toBe(article.width);
  expect(cards.width).toBe(article.width);
  const toc = await page.getByRole('navigation', { name: 'On this page' }).boundingBox();
  expect(toc.x - (article.x + article.width)).toBe(40);

  await page.goto('/docs/components');
  await expect(page.getByRole('navigation', { name: 'On this page' })).toHaveCount(0);
  const collection = await page.locator('article').boundingBox();
  const main = await page.locator('main').boundingBox();
  expect(collection.x - main.x).toBe(40);
  expect(main.x + main.width - collection.x - collection.width).toBe(40);
});

test('every table of contents link stays reachable in a short viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 390 });
  await page.goto('/docs/components/date-picker');
  await page.locator('#installation').scrollIntoViewIfNeeded();
  const toc = page.getByRole('navigation', { name: 'On this page' });
  const header = await page.locator('header[data-react-toolbox="app-bar"]').boundingBox();
  const box = await toc.boundingBox();
  expect(box.y).toBeGreaterThanOrEqual(header.height + 24);
  expect(box.y + box.height).toBeLessThanOrEqual(390 - 24);
  await toc.hover();
  await page.mouse.wheel(0, 600);
  const lastLink = toc.getByRole('link', { name: 'Material guidelines' });
  await expect(lastLink).toBeInViewport({ ratio: 1 });
  await lastLink.click();
  await expect(page.getByRole('heading', { name: 'Material guidelines', exact: true })).toBeInViewport();
});
