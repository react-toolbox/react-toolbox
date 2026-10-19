import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function expectAccessibleDocumentation(page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(
    violations.map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
    })),
    page.url(),
  ).toEqual([]);
}

for (const width of [390, 1440]) {
  test(`preview tabs show complete keyboard focus without a clipped outline at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/docs/components/menu');
    await page.keyboard.press('Tab');
    const preview = page.getByRole('tab', { name: 'Preview', exact: true });
    await preview.focus();
    await expect(preview).toHaveCSS('outline-style', 'none');
    await expect(preview).toHaveCSS('background-color', 'color(srgb 0 0 0 / 0.12)');
    await expect(preview).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowRight');
    const code = page.getByRole('tab', { name: 'Code', exact: true });
    await expect(code).toBeFocused();
    await expect(code).toHaveAttribute('aria-selected', 'true');
    await expect(code).toHaveCSS('outline-style', 'none');
    await expect(code).toHaveCSS('background-color', 'color(srgb 0 0 0 / 0.12)');
    await expect(preview).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  });
}

test('expansion panels and dividers demonstrate their installed APIs and accessible behavior', async ({ page }) => {
  await page.goto('/docs/components/accordion');
  const preview = page.locator('#preview');
  const details = preview.getByRole('button', { name: 'Project details' });
  const sharing = preview.getByRole('button', { name: 'Sharing', exact: true });
  await expect(details).toHaveAttribute('aria-expanded', 'true');
  await expect(details).toHaveCSS('min-height', '64px');
  await expect(sharing).toHaveCSS('min-height', '48px');
  await sharing.focus();
  await sharing.press('Enter');
  await expect(preview.getByRole('region', { name: 'Sharing' })).toBeVisible();
  await expect(details).toHaveAttribute('aria-expanded', 'false');
  await expect(preview.getByRole('button', { name: 'Archive (unavailable)' })).toBeDisabled();
  await expect(page.getByRole('heading', { name: 'AccordionRoot', exact: true })).toBeVisible();
  await expectAccessibleDocumentation(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await details.locator('svg').click();
  await expect(details).toHaveAttribute('aria-expanded', 'true');
  await preview.getByRole('tab', { name: 'Code', exact: true }).click();
  await preview.getByRole('button', { name: 'Reset demo' }).click();
  await expect(preview.getByRole('tab', { name: 'Preview', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(details).toHaveAttribute('aria-expanded', 'true');
  await page.goto('/docs/components/divider');
  const horizontal = page.locator('#preview').getByRole('separator');
  await expect(horizontal).toHaveCSS('height', '1px');
  const vertical = page.locator('#preview [data-orientation=vertical]');
  await expect(vertical).toHaveAttribute('aria-hidden', 'true');
  await expect(vertical).toHaveCSS('width', '1px');
  expect((await vertical.boundingBox()).height).toBeGreaterThan(0);
  await expectAccessibleDocumentation(page);
});

test('the modal sheet example dims its background at both snap points', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/docs/components/sheet');
  await page.locator('#preview').getByRole('button', { name: 'Open visit notes' }).click();
  const sheet = page.getByRole('dialog', { name: 'Visit notes' });
  const backdrop = page.locator('[data-slot="SheetOverlay"]');
  await expect(sheet).toBeInViewport();
  await expect(backdrop).toHaveCSS('opacity', '1');
  await sheet.getByRole('button', { name: 'Expand notes' }).click();
  await expect(backdrop).toHaveCSS('opacity', '1');
  await sheet.getByRole('button', { name: 'Reduce notes' }).click();
  await expect(backdrop).toHaveCSS('opacity', '1');
  await sheet.getByRole('button', { name: 'Done' }).click();
  await expect(sheet).toBeHidden();
});

test('landing leads into a shared documentation shell with working examples', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /Browse components/i })).toHaveAttribute('href', '/docs/components');
  await page.getByRole('link', { name: 'Documentation', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'The original, renewed.' })).toBeVisible();
  const sidebar = page.getByRole('navigation', { name: 'Documentation sidebar' });
  await expect(sidebar).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'On this page' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Breadcrumb', exact: true })).toBeVisible();
  await sidebar.getByRole('link', { name: 'Installation', exact: true }).click();
  await expect(sidebar.getByRole('link', { name: 'Installation', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await sidebar.getByRole('link', { name: 'Button', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Button', exact: true, level: 1 })).toBeVisible();
  await expect(sidebar.getByRole('link', { name: 'Button', exact: true })).toHaveAttribute('aria-current', 'page');
  await page.reload();
  await expect(sidebar).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'On this page' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Breadcrumb', exact: true })).toBeVisible();
  const preview = page.locator('#preview');
  await expect(preview.getByRole('button', { name: 'Accent', exact: true })).toBeVisible();
  await expect(preview.getByRole('button', { name: 'Flat accent', exact: true })).toBeVisible();
  await expect(preview.getByRole('button', { name: 'Disabled', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.locator('#preview').getByRole('status')).toHaveText('Saved');
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.locator('#preview').getByRole('status')).toHaveText('Ready');
  await page.getByRole('tab', { name: 'Preview', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Code', exact: true })).toBeFocused();
  await expect(page.getByLabel('Component example', { exact: true })).toContainText('@/components/ui/material/button');
  await expect(page.getByLabel('Component example', { exact: true })).toContainText('<Button accent raised');
  await expect(page.getByLabel('Component example', { exact: true })).toContainText('<Button accent label=');
  await expect(page.getByLabel('Component example', { exact: true })).toContainText('<Button disabled');
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: 'Preview', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('link', { name: 'React Toolbox home' }).click();
  await expect(page.getByRole('heading', { name: /The details/ })).toBeVisible();
});

test('mobile documentation navigation closes after following a component', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/docs/installation');
  const browse = page.getByRole('button', { name: 'Browse documentation' });
  const buttonBox = await browse.boundingBox();
  const iconBox = await browse.locator('svg').boundingBox();
  const labelBox = await browse.getByText('Browse documentation').boundingBox();
  expect(buttonBox.height).toBeGreaterThanOrEqual(48);
  expect(iconBox.width).toBe(24);
  expect(iconBox.height).toBe(24);
  expect(Math.abs(iconBox.y + iconBox.height / 2 - (buttonBox.y + buttonBox.height / 2))).toBeLessThan(1);
  expect(Math.abs(iconBox.y + iconBox.height / 2 - (labelBox.y + labelBox.height / 2))).toBeLessThan(1);
  await browse.focus();
  await browse.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Documentation navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Documentation navigation' })).toBeHidden();
  await expect(browse).toBeFocused();
  await browse.getByText('Browse documentation').click();
  const sidebar = page.getByRole('navigation', { name: 'Documentation sidebar' });
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
    /** The title must cover the moving rows, with no exposed strip above it. */
    expect(
      await heading.evaluate((element) => {
        const box = element.getBoundingClientRect();
        return element.contains(document.elementFromPoint(box.x + 24, box.y + 1));
      }),
    ).toBe(true);
  };
  expect((await guides.boundingBox()).y).toBe((await headerBottom()) + 32);
  const scrollerTop = (await scroller.boundingBox()).y;
  const guidesSection = await guides.locator('xpath=parent::section').boundingBox();
  const componentsSection = await components.locator('xpath=parent::section').boundingBox();
  const guidesHeight = (await guides.boundingBox()).height;
  const componentsHeight = (await components.boundingBox()).height;
  /** Derive each scroll position from section boundaries so adding guide links preserves the same scenario. */
  await scroller.evaluate(
    (element, scrollTop) => {
      element.scrollTop = scrollTop;
    },
    guidesSection.y - scrollerTop + guidesHeight,
  );
  await expectPinned(guides);

  /** Halfway through the title's exit, the next section pushes it away instead of stacking over it. */
  await scroller.evaluate(
    (element, scrollTop) => {
      element.scrollTop = scrollTop;
    },
    guidesSection.y + guidesSection.height - scrollerTop - guidesHeight / 2,
  );
  const oldTitle = await guides.boundingBox();
  const newTitle = await components.boundingBox();
  expect(oldTitle.y).toBeLessThan(await headerBottom());
  expect(oldTitle.y + oldTitle.height).toBeLessThanOrEqual(newTitle.y);

  await scroller.evaluate(
    (element, scrollTop) => {
      element.scrollTop = scrollTop;
    },
    componentsSection.y - scrollerTop + componentsHeight,
  );
  await expectPinned(components);
  await page.evaluate(() => window.scrollTo(0, 200));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(200);
  await expectPinned(components);
  expect((await header.boundingBox()).y).toBe(0);
});

for (const [slug, title, dependencies] of [
  ['button', 'Button', []],
  ['autocomplete', 'Autocomplete', ['button']],
  ['drawer', 'Drawer', ['button', 'dialog', 'input']],
]) {
  test(`${title} install copies the displayed shell command and reports clipboard failures`, async ({ page }) => {
    await page.goto(`/docs/components/${slug}`);
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
    const command = await page.getByLabel(`Install ${title}`, { exact: true }).textContent();
    const urls = [slug, ...dependencies].map((name) => `https://react-toolbox.io/r/${name}.json`);
    expect(command.replaceAll('\\\n', '').split(/\s+/)).toEqual(['pnpm', 'dlx', 'shadcn@latest', 'add', ...urls]);
    expect(command.split('\n')).toHaveLength(dependencies.length ? urls.length + 1 : 1);
    const copy = page.getByRole('button', { name: `Copy install ${slug}`, exact: true });
    await copy.click();
    await expect(copy).toHaveText('Copied');
    expect(await page.evaluate(() => window.copiedDocumentation)).toBe(command);
    await page.evaluate(() => {
      navigator.clipboard.writeText = async () => {
        throw new Error('Clipboard unavailable');
      };
    });
    await copy.click();
    await expect(copy).toHaveText('Select to copy');
  });
}

for (const width of [320, 1440]) {
  test(`every registry family is accessible and usable at ${width}px`, async ({ context, request }) => {
    test.setTimeout(180_000);
    const catalog = await (await request.get('/r/registry.json')).json();
    const families = catalog.items.filter((item) => item.type === 'registry:ui');
    expect(families).toHaveLength(30);
    for (const family of families) {
      // Each route gets its own page so pending link prefetches from a prior
      // document cannot report teardown errors in the next route's audit.
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(`/docs/components/${family.name}`);
      expect(response.status(), family.name).toBe(200);
      await expect(page.locator('article > h1')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Material guidelines' })).toBeVisible();
      await expect(page.locator('#material-guidelines a')).toHaveAttribute('href', /^https:\/\/m1\.material\.io\//);
      await expect(page.getByRole('tab', { name: 'Preview', exact: true })).toHaveAttribute('aria-selected', 'true');
      if (family.name === 'app-bar') {
        await page.locator('#preview').getByRole('button', { name: 'Open navigation', exact: true }).click();
        await expect(page.locator('#preview').getByRole('status')).toHaveText('Navigation opened');
      }
      const reset = await page.getByRole('button', { name: 'Reset demo', exact: true }).boundingBox();
      const canvas = await page.locator('#preview').getByRole('tabpanel', { name: 'Preview', exact: true }).boundingBox();
      expect(reset.y + reset.height, `${family.name} reset stays outside the example`).toBeLessThanOrEqual(canvas.y);
      await expectAccessibleDocumentation(page);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        `${family.name} preview`,
      ).toBeLessThanOrEqual(width);
      await page.getByRole('tab', { name: 'Code', exact: true }).click();
      await expect(page.getByLabel('Component example', { exact: true })).toContainText(
        `@/components/ui/material/${family.name}`,
      );
      expect(await page.evaluate(() => document.documentElement.scrollWidth), family.name).toBeLessThanOrEqual(width);
      expect(errors, family.name).toEqual([]);
      await page.close();
    }
    expect((await request.get('/docs/components/not-a-component')).status()).toBe(404);
    const legacyComponents = await request.get('/components', { maxRedirects: 0 });
    expect(legacyComponents.status()).toBe(308);
    expect(legacyComponents.headers().location).toBe('/docs/components');
  });
}

test('the desktop sidebar stays below the app bar at the footer as content changes', async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 1180, height: 520 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/docs/components/snackbar');
    const sidebar = page.getByRole('navigation', { name: 'Documentation sidebar' }).locator('..');
    const header = page.locator('header[data-react-toolbox="app-bar"]');
    for (const view of ['Preview', 'Code', 'Preview']) {
      await page.getByRole('tab', { name: view, exact: true }).click();
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await expect(page.locator('footer')).toBeInViewport();
      await expect
        .poll(async () => {
          const bar = await header.boundingBox();
          return (await sidebar.boundingBox()).y - (bar.y + bar.height);
        })
        .toBe(0);
      const box = await sidebar.boundingBox();
      expect(box.y + box.height).toBe(viewport.height);
      // Navigation remains independently scrollable all the way to the last item.
      await sidebar.evaluate((element) => {
        element.scrollTop = element.scrollHeight;
      });
      await expect(sidebar.getByRole('link', { name: 'Tooltip', exact: true })).toBeInViewport();
    }
  }
});

test('documentation follows Material typography, keylines, touch targets, and table geometry', async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 600, height: 960 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/docs/components/snackbar');
    const mobile = viewport.width < 600;
    const header = page.locator('header[data-react-toolbox="app-bar"]');
    await expect(header).toHaveCSS('height', mobile ? '56px' : '64px');
    await expect(page.getByRole('link', { name: 'React Toolbox home' })).toHaveCSS('font-size', '20px');
    await expect(page.locator('article > h1')).toHaveCSS('font-size', viewport.width < 600 ? '34px' : '45px');
    await expect(page.locator('#installation > h2')).toHaveCSS('font-size', '20px');
    await expect(page.locator('#installation > h2')).toHaveCSS('font-weight', '500');
    await expect(page.locator('#usage > p').first()).toHaveCSS('color', 'rgba(0, 0, 0, 0.87)');
    await expect(page.locator('article > p')).toHaveCSS('color', 'rgba(0, 0, 0, 0.54)');
    await expect(page.locator('main')).toHaveCSS(
      'padding-left',
      mobile ? '16px' : viewport.width < 1024 ? '24px' : '40px',
    );
    for (const link of await page.locator('header a, footer a, nav[aria-label="Component pages"] a').all()) {
      const box = await link.boundingBox();
      expect(box.height).toBeGreaterThanOrEqual(48);
      expect(box.width).toBeGreaterThanOrEqual(48);
    }
    const table = page.getByRole('table', { name: 'Snackbar API', exact: true });
    await expect(table.locator('th').first()).toHaveCSS('font-size', '12px');
    await expect(table.locator('td code').first()).toHaveCSS('font-size', '13px');
    for (const row of await table.locator('tbody tr').all()) {
      expect((await row.boundingBox()).height).toBeGreaterThanOrEqual(48);
    }
    await expect(table.getByRole('row')).toHaveCount(7);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(viewport.width);
  }
});

test('documentation guides remain accessible on desktop and mobile', async ({ page }) => {
  test.setTimeout(90_000);
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/docs', '/docs/installation', '/docs/theming', '/docs/components']) {
      await page.goto(path);
      await expectAccessibleDocumentation(page);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBe(width);
    }
  }
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
  await expect(installation).toHaveCSS('outline-style', 'none');
  await expect(installation).toHaveCSS('background-color', 'rgb(238, 238, 238)');
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
  await expect(page.locator('#preview').getByRole('status')).toHaveText('Draft');
  await page.getByRole('button', { name: 'Open dialog' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.locator('#preview').getByRole('status')).toHaveText('Saved');

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

test('retired routing wrappers lead to installation', async ({ page }) => {
  for (const slug of ['link', 'navigation']) {
    await page.goto(`/docs/components/${slug}`);
    await expect(page).toHaveURL(/\/docs\/installation#routing$/);
    await expect(page.getByRole('heading', { name: 'Use your router for navigation', level: 2 })).toBeInViewport();
    await expect(page.getByRole('heading', { name: 'Installation', level: 1, exact: true })).toBeVisible();
  }
});

for (const width of [390, 1440]) {
  test(`overlay demo covers the docs frame and dismisses at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/docs/components/overlay');
    const trigger = page.getByRole('button', { name: 'Show overlay' });
    const backdrop = page.locator('.rt-overlay-overlay.rt-overlay-active');
    await trigger.click();
    await expect(backdrop).toHaveCSS('opacity', '0.6');
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
    expect(await backdrop.boundingBox()).toEqual({ x: 0, y: 0, width, height: 900 });
    const surfaces = [page.getByRole('banner'), page.locator('article')];
    if (width > 1024) {
      surfaces.push(page.getByRole('navigation', { name: 'Documentation sidebar' }));
      surfaces.push(page.getByRole('navigation', { name: 'On this page' }));
    }
    for (const surface of surfaces) {
      const box = await surface.boundingBox();
      expect(
        await backdrop.evaluate((element, point) => document.elementFromPoint(point.x, point.y) === element, {
          x: box.x + 16,
          y: box.y + 16,
        }),
      ).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(backdrop).toHaveCount(0);
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
    await expect(page.locator('.rt-overlay-overlay')).toHaveCSS('opacity', '0');

    await trigger.click();
    await expect(backdrop).toHaveCSS('opacity', '0.6');
    const home = page.getByRole('link', { name: 'React Toolbox home' });
    const homeBox = await home.boundingBox();
    await page.mouse.click(homeBox.x + homeBox.width / 2, homeBox.y + homeBox.height / 2);
    await expect(backdrop).toHaveCount(0);
    await expect(page).toHaveURL(/\/docs\/components\/overlay$/);
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
    await page.getByRole('tab', { name: 'Code', exact: true }).click();
    const code = page.getByLabel('Component example', { exact: true });
    await expect(code).toContainText('createPortal');
    await expect(code).toContainText('z-(--z-index-higher)');
    await home.click();
    await expect(page).toHaveURL('/');
  });
}
