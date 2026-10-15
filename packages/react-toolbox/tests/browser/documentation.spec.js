import { test, expect } from '@playwright/test';

test('landing leads into a shared documentation shell with working examples', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Make it yours.' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Browse components/i })).toHaveAttribute('href', '/docs/components');
  await page.getByRole('link', { name: 'Documentation', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'The original, renewed.' })).toBeVisible();
  const sidebar = page.getByRole('navigation', { name: 'Documentation sidebar' });
  await sidebar.getByRole('link', { name: 'Installation', exact: true }).click();
  await expect(sidebar.getByRole('link', { name: 'Installation', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(page.getByRole('searchbox')).toHaveCount(0);
  await sidebar.getByRole('link', { name: 'Button', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Button', exact: true, level: 1 })).toBeVisible();
  await expect(sidebar.getByRole('link', { name: 'Button', exact: true })).toHaveAttribute('aria-current', 'page');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Saved');
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByRole('status')).toHaveText('Ready');
  await page.getByRole('tab', { name: 'Preview', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Code', exact: true })).toBeFocused();
  await expect(page.getByLabel('Component example', { exact: true })).toContainText('@/components/ui/material/button');
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: 'Preview', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('link', { name: 'React Toolbox home' }).click();
  await expect(page.getByRole('heading', { name: /The details/ })).toBeVisible();
});

test('mobile documentation navigation closes after following a component', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/docs/installation');
  const browse = page.getByRole('button', { name: 'Browse documentation' });
  await browse.focus();
  await browse.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Documentation navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Documentation navigation' })).toBeHidden();
  await expect(browse).toBeFocused();
  await browse.click();
  const sidebar = page.getByRole('navigation', { name: 'Documentation sidebar' });
  await expect(sidebar.getByRole('searchbox')).toHaveCount(0);
  const mobileLink = sidebar.getByRole('link', { name: 'Dialog', exact: true });
  await expect(mobileLink).toHaveCSS('min-height', '48px');
  await expect(mobileLink).toHaveCSS('padding-left', '16px');
  await sidebar.getByRole('link', { name: 'Dialog', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Dialog', exact: true, level: 1 })).toBeVisible();
  await expect(sidebar).toBeHidden();
  await expect(browse).toHaveAttribute('aria-expanded', 'false');
  // Safari does not focus buttons on pointer clicks. Exercise keyboard focus
  // restoration from an explicitly focused trigger in every browser.
  await page.getByRole('button', { name: 'Open dialog' }).focus();
  await page.getByRole('button', { name: 'Open dialog' }).press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open dialog' })).toBeFocused();
  await browse.click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.getByRole('dialog', { name: 'Documentation navigation' })).toBeHidden();
  await expect(sidebar.getByRole('link', { name: 'Dialog', exact: true })).toBeVisible();
});

test('sidebar section titles stick flush below the app bar while their lists scroll', async ({ page }) => {
  await page.goto('/docs/components/dropdown');
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  const sidebar = page.getByRole('navigation', { name: 'Documentation sidebar' });
  const scroller = sidebar.locator('xpath=parent::aside');
  const guides = sidebar.getByRole('heading', { name: 'Getting started' });
  const components = sidebar.getByRole('heading', { name: 'Components' });
  const header = page.locator('header[data-react-toolbox="app-bar"]');
  const headerBottom = async () => {
    const box = await header.boundingBox();
    return box.y + box.height;
  };
  const expectPinned = async (heading) => {
    await expect.poll(async () => (await heading.boundingBox()).y).toBe(await headerBottom());
    // The title must cover the moving rows, with no exposed strip above it.
    expect(await heading.evaluate((element) => {
      const box = element.getBoundingClientRect();
      return element.contains(document.elementFromPoint(box.x + 24, box.y + 1));
    })).toBe(true);
  };
  expect((await guides.boundingBox()).y).toBe((await headerBottom()) + 32);
  await scroller.evaluate((element) => { element.scrollTop = 80; });
  await expectPinned(guides);

  // The next section pushes the preceding title away instead of stacking over it.
  await scroller.evaluate((element) => { element.scrollTop = 270; });
  const oldTitle = await guides.boundingBox();
  const newTitle = await components.boundingBox();
  expect(oldTitle.y).toBeLessThan(await headerBottom());
  expect(oldTitle.y + oldTitle.height).toBeLessThanOrEqual(newTitle.y);

  await scroller.evaluate((element) => { element.scrollTop = 550; });
  await expectPinned(components);
  await page.evaluate(() => window.scrollTo(0, 200));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(200);
  await expectPinned(components);
  expect((await header.boundingBox()).y).toBe(0);
});

test('documentation copy controls copy the displayed command and report clipboard failures', async ({ page }) => {
  await page.goto('/docs/components/button');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.copiedDocumentation = text;
        },
      },
    });
  });
  const copy = page.getByRole('button', { name: 'Copy install button', exact: true });
  await copy.click();
  await expect(copy).toHaveText('Copied');
  expect(await page.evaluate(() => window.copiedDocumentation)).toBe(
    await page.getByLabel('Install Button', { exact: true }).textContent(),
  );
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new Error('Clipboard unavailable');
    };
  });
  await copy.click();
  await expect(copy).toHaveText('Select to copy');
});

test('every registry family has a functioning component page at mobile width', async ({ page, request }) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 320, height: 800 });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const catalog = await (await request.get('/r/registry.json')).json();
  const families = catalog.items.filter((item) => item.type === 'registry:ui');
  expect(families).toHaveLength(27);
  for (const family of families) {
    const response = await page.goto(`/docs/components/${family.name}`);
    expect(response.status(), family.name).toBe(200);
    await expect(page.locator('article > h1')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Material guidelines' })).toBeVisible();
    await expect(page.locator('#material-guidelines a')).toHaveAttribute('href', /^https:\/\/m1\.material\.io\//);
    await expect(page.getByRole('tab', { name: 'Preview', exact: true })).toHaveAttribute('aria-selected', 'true');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      `${family.name} preview`,
    ).toBeLessThanOrEqual(320);
    await page.getByRole('tab', { name: 'Code', exact: true }).click();
    await expect(page.getByLabel('Component example', { exact: true })).toContainText(
      `@/components/ui/material/${family.name}`,
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth), family.name).toBeLessThanOrEqual(320);
  }
  expect(errors).toEqual([]);
  expect((await request.get('/docs/components/not-a-component')).status()).toBe(404);
  const legacyComponents = await request.get('/components', { maxRedirects: 0 });
  expect(legacyComponents.status()).toBe(308);
  expect(legacyComponents.headers().location).toBe('/docs/components');
});

test('documentation rows have full Material touch areas, keyboard links, and contained ink feedback', async ({
  page,
}) => {
  await page.goto('/docs/components/button');
  const sidebar = page.getByRole('navigation', { name: 'Documentation sidebar' });
  const button = sidebar.getByRole('link', { name: 'Button', exact: true });
  await expect(button).toHaveCSS('font-size', '14px');
  await expect(button).toHaveCSS('font-weight', '500');
  await expect(button).toHaveCSS('padding-left', '24px');
  const row = button.locator('xpath=ancestor::li');
  await expect(row).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(button).toHaveCSS('color', 'rgb(63, 81, 181)');
  const box = await button.boundingBox();
  expect(box.x).toBe(0);
  expect((await page.getByRole('link', { name: 'React Toolbox home' }).boundingBox()).x).toBe(24);
  expect(box.height).toBe(48);
  const rowBox = await row.boundingBox();
  expect(box.width).toBe(rowBox.width);
  // Press inside the row's leading padding, not just its text.
  await page.mouse.move(box.x + 2, box.y + 24);
  await page.mouse.down();
  const ripple = row.locator('[data-react-toolbox="ripple"]');
  await expect(ripple).toBeVisible();
  await expect(ripple).toHaveCSS('overflow', 'hidden');
  await expect(ripple.locator('span')).toHaveCSS('opacity', '0.3');
  await page.mouse.up();
  await expect(ripple).toHaveCount(0);
  const installation = sidebar.getByRole('link', { name: 'Installation', exact: true });
  // Enter keyboard modality before focusing: Safari's system preference can
  // exclude links from Tab traversal, while Enter must still activate a link.
  await page.keyboard.press('Tab');
  await installation.focus();
  await expect(installation).toBeFocused();
  await expect(installation).toHaveCSS('outline-style', 'solid');
  await installation.press('Enter');
  await expect(page).toHaveURL(/\/docs\/installation$/);
  await expect(installation).toHaveAttribute('aria-current', 'page');

  await page.goto('/docs/components');
  const card = page.locator('article').getByRole('link', { name: /^Button / });
  const cardBox = await card.boundingBox();
  await page.mouse.move(cardBox.x + 20, cardBox.y + 20);
  await page.mouse.down();
  await expect(card.locator('[data-react-toolbox="ripple"]')).toBeVisible();
  await page.mouse.up();
  await expect(page).toHaveURL(/\/docs\/components\/button$/);
});

test('documented list, confirmation, and snackbar examples implement their stated actions', async ({ page }) => {
  await page.goto('/docs/components/list');
  const favorites = page.getByRole('button', { name: 'Favorites' });
  await favorites.focus();
  await favorites.press('Enter');
  await expect(page.getByRole('status')).toHaveText('Selected: Favorites');

  await page.goto('/docs/components/dialog');
  await page.getByRole('button', { name: 'Open dialog' }).click();
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Draft');
  await page.getByRole('button', { name: 'Open dialog' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Saved');

  await page.goto('/docs/components/snackbar');
  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(page.locator('#preview').getByRole('status')).toHaveText('Saved');
  await expect(page.getByRole('button', { name: 'Dismiss', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  await expect(page.locator('#preview').getByRole('status')).toHaveText('Unsaved');
});

test('syntax colors preserve source, copy exactly, and remain readable on the Material surface', async ({ page }) => {
  await page.goto('/docs/components/button');
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  const code = page.getByLabel('Component example', { exact: true });
  const source = await code.textContent();
  expect(source).toContain("from '@/components/ui/material/button'");
  expect(source).not.toContain('toolbox-button');
  const colors = await code
    .locator('code > span')
    .evaluateAll((spans) => [
      ...new Set(spans.filter((span) => span.textContent.trim()).map((span) => getComputedStyle(span).color)),
    ]);
  expect(colors.length).toBeGreaterThanOrEqual(4);
  function luminance(rgb) {
    const values = rgb
      .map((value) => value / 255)
      .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
    return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
  }
  for (const color of colors) {
    const rgb = color
      .match(/[\d.]+/g)
      .slice(0, 3)
      .map(Number);
    expect((luminance([250, 250, 250]) + 0.05) / (luminance(rgb) + 0.05), color).toBeGreaterThanOrEqual(4.5);
  }
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.copiedExample = text;
        },
      },
    });
  });
  await page.getByRole('button', { name: 'Copy component example', exact: true }).click();
  expect(await page.evaluate(() => window.copiedExample)).toBe(source);
  await code.focus();
  await expect(code).toBeFocused();

  await page.goto('/docs/installation');
  for (const label of ['Registry configuration', 'Initialize shadcn']) {
    await expect(page.getByLabel(label, { exact: true }).locator('code > span').first()).toBeVisible();
  }
});

test('retired routing wrappers lead to native routing guidance', async ({ page }) => {
  for (const slug of ['link', 'navigation']) {
    await page.goto(`/docs/components/${slug}`);
    await expect(page).toHaveURL(/\/docs\/installation#routing$/);
    await expect(page.getByRole('heading', { name: 'Use your router for navigation' })).toBeVisible();
  }
  const sidebar = page.getByRole('navigation', { name: 'Documentation sidebar' });
  await expect(sidebar.getByRole('link', { name: 'Link', exact: true })).toHaveCount(0);
  await expect(sidebar.getByRole('link', { name: 'Navigation', exact: true })).toHaveCount(0);
});
