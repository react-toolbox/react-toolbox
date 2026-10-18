import { test, expect } from '@playwright/test';

function documentationPanel(page) {
  return page.locator('[data-react-toolbox="panel"]');
}

function navigationDrawer(page) {
  return page
    .getByRole('navigation', { name: 'Documentation sidebar' })
    .locator('xpath=ancestor::*[@data-react-toolbox="drawer"][1]');
}

async function settleScrolling(page) {
  await page.evaluate(async () => {
    let previous;
    let stableFrames = 0;
    for (let frame = 0; frame < 180; frame++) {
      await new Promise(requestAnimationFrame);
      const position = `${window.scrollY}:${document.querySelector('[data-react-toolbox="drawer"]')?.scrollTop}`;
      stableFrames = position === previous ? stableFrames + 1 : 0;
      if (stableFrames === 6) return;
      previous = position;
    }
    throw new Error('Scrolling did not settle');
  });
}

async function finishLayoutTransitions(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const elements = document.querySelectorAll('[data-react-toolbox="panel"], [data-react-toolbox="drawer"], header');
    await Promise.all([...elements].flatMap((element) => element.getAnimations().map((animation) => animation.finished.catch(() => {}))));
  });
}

async function wheelContent(page, deltaY) {
  await finishLayoutTransitions(page);
  const panel = await documentationPanel(page).boundingBox();
  const header = await page.getByRole('banner').boundingBox();
  /** The content margin avoids code blocks and demos that own their own scrolling. */
  await page.mouse.move(panel.x + 20, header.y + header.height + 240);
  await page.mouse.wheel(0, deltaY);
  await settleScrolling(page);
}

async function wheelNavigation(page, deltaY) {
  const drawer = navigationDrawer(page);
  await drawer.hover({ position: { x: 20, y: 280 } });
  await page.mouse.wheel(0, deltaY);
  await settleScrolling(page);
}

async function scrollPosition(scroller) {
  return scroller.evaluate((element) => element.scrollTop);
}

async function expectAtBottom(scroller) {
  await expect
    .poll(() => scroller.evaluate((element) => element.scrollHeight - element.clientHeight - element.scrollTop))
    .toBeLessThan(2);
}

async function documentPosition(page) {
  return page.evaluate(() => window.scrollY);
}

async function expectDocumentAtBottom(page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollHeight - innerHeight - scrollY)).toBeLessThan(2);
}

test('server-rendered navigation is visible on desktop and hidden on mobile without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/docs/installation`);
    const sidebar = page.locator('nav[aria-label="Documentation sidebar"]');
    await expect(sidebar.getByRole('link', { name: 'Installation', exact: true, includeHidden: true }))
      .toHaveAttribute('href', '/docs/installation');
    for (const width of [390, 1024, 1025, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const browse = page.getByRole('button', { name: 'Browse documentation' });
      if (width <= 1024) {
        await expect(sidebar).toBeHidden();
        await expect(browse).toBeVisible();
        expect((await documentationPanel(page).boundingBox()).x).toBe(0);
      } else {
        await expect(sidebar).toBeVisible();
        await expect(browse).toBeHidden();
        const drawer = await navigationDrawer(page).boundingBox();
        expect(drawer.x).toBe(0);
        expect((await documentationPanel(page).boundingBox()).x).toBe(drawer.width);
      }
    }
  } finally {
    await context.close();
  }
});

for (const width of [390, 1440]) {
  test(`navigation avoids an entrance or exit animation during hydration at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() => {
      window.docsNavigationFrames = [];
      const painted = (element) => {
        if (!element) return false;
        const style = getComputedStyle(element);
        /** An offscreen drawer can still paint its shadow inside the viewport. */
        return style.position === 'fixed' && style.display !== 'none' &&
          style.visibility === 'visible' && Number(style.opacity) > 0;
      };
      const sample = () => {
        const drawer = document.querySelector('nav[aria-label="Documentation sidebar"]')
          ?.closest('[data-react-toolbox="drawer"]');
        const overlays = [...document.querySelectorAll('.rt-overlay-overlay')];
        window.docsNavigationFrames.push({
          drawerPainted: painted(drawer),
          drawerX: drawer?.getBoundingClientRect().x,
          drawerAnimated: drawer?.getAnimations().some((animation) => animation.playState === 'running'),
          overlayPainted: overlays.some(painted),
          overlayAnimated: overlays.some((overlay) => overlay.getAnimations().some((animation) => animation.playState === 'running')),
        });
        window.docsNavigationFrame = requestAnimationFrame(sample);
      };
      sample();
    });
    await page.goto('/docs/installation');
    if (width < 1025) {
      await expect(page.getByRole('button', { name: 'Browse documentation' })).toBeVisible();
    } else {
      await expect(page.getByRole('navigation', { name: 'Documentation sidebar' })).toBeVisible();
    }
    const frames = await page.evaluate(async () => {
      for (let frame = 0; frame < 40; frame++) await new Promise(requestAnimationFrame);
      cancelAnimationFrame(window.docsNavigationFrame);
      return window.docsNavigationFrames;
    });
    expect(frames.length).toBeGreaterThan(2);
    expect(frames.every((frame) => !frame.overlayPainted && !frame.overlayAnimated)).toBe(true);
    if (width < 1025) {
      expect(frames.every((frame) => !frame.drawerPainted)).toBe(true);
    } else {
      const visibleFrames = frames.filter((frame) => frame.drawerPainted);
      expect(visibleFrames.length).toBeGreaterThan(2);
      expect(visibleFrames.every((frame) => frame.drawerX === 0 && !frame.drawerAnimated)).toBe(true);
    }
  });
}

test('document and drawer wheel scrolling leave the header and navigation anchored', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/docs/installation');
  const drawer = navigationDrawer(page);
  await expect(drawer).toBeVisible();
  await expect.poll(async () => (await drawer.boundingBox()).x).toBe(0);
  await finishLayoutTransitions(page);
  await page.evaluate(() => {
    const frames = [];
    const sample = () => {
      const header = document.querySelector('header[data-react-toolbox="app-bar"]').getBoundingClientRect();
      const navigation = document
        .querySelector('nav[aria-label="Documentation sidebar"]')
        .closest('[data-react-toolbox="drawer"]')
        .getBoundingClientRect();
      frames.push({
        headerTop: header.top,
        drawerGap: navigation.top - header.bottom,
        documentLeft: window.scrollX,
      });
      window.docsScrollFrame = requestAnimationFrame(sample);
    };
    window.docsScrollFrames = frames;
    sample();
  });

  await wheelContent(page, 720);
  await expect.poll(() => documentPosition(page)).toBeGreaterThan(200);
  const contentPosition = await documentPosition(page);
  expect(await scrollPosition(drawer)).toBe(0);

  await wheelNavigation(page, 420);
  await expect.poll(() => scrollPosition(drawer)).toBeGreaterThan(100);
  expect(await documentPosition(page)).toBeCloseTo(contentPosition, 0);
  await wheelNavigation(page, 10000);
  await expectAtBottom(drawer);
  await wheelNavigation(page, 600);
  await expectAtBottom(drawer);
  expect(await documentPosition(page)).toBeCloseTo(contentPosition, 0);
  await wheelNavigation(page, -10000);
  await wheelNavigation(page, -600);
  await expect.poll(() => scrollPosition(drawer)).toBe(0);
  await wheelNavigation(page, -600);
  expect(await documentPosition(page)).toBeCloseTo(contentPosition, 0);

  await wheelContent(page, 10000);
  await expectDocumentAtBottom(page);
  await wheelContent(page, 600);
  await expectDocumentAtBottom(page);
  await wheelContent(page, -10000);
  await expect.poll(() => documentPosition(page)).toBe(0);
  await wheelContent(page, -600);
  expect(await scrollPosition(drawer)).toBe(0);
  expect(await documentPosition(page)).toBe(0);

  const frames = await page.evaluate(() => {
    cancelAnimationFrame(window.docsScrollFrame);
    return window.docsScrollFrames;
  });
  expect(frames.length).toBeGreaterThan(2);
  for (const frame of frames) {
    expect(frame.headerTop).toBeCloseTo(0, 0);
    expect(frame.drawerGap).toBeCloseTo(0, 0);
    expect(frame.documentLeft).toBe(0);
  }
});

test('article navigation reveals the next heading and history restores the reading position', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/docs/installation');
  await page.evaluate(() => document.fonts.ready);
  await wheelContent(page, 10000);
  await expectDocumentAtBottom(page);
  const installationPosition = await documentPosition(page);
  await page.getByRole('link', { name: 'Next: Theming →' }).click();
  await expect(page.getByRole('heading', { name: 'Theming', exact: true, level: 1 })).toBeInViewport();
  await wheelContent(page, 640);
  await expect.poll(() => documentPosition(page)).toBeGreaterThan(200);
  const themingPosition = await documentPosition(page);

  await page.goBack();
  await expect(page).toHaveURL(/\/docs\/installation$/);
  await expect.poll(() => documentPosition(page)).toBeCloseTo(installationPosition, 0);
  await page.goForward();
  await expect(page).toHaveURL(/\/docs\/theming$/);
  await expect.poll(() => documentPosition(page)).toBeCloseTo(themingPosition, 0);

  await page.getByRole('navigation', { name: 'Documentation sidebar' }).getByRole('link', { name: 'Introduction' }).click();
  await expect(page.getByRole('heading', { name: 'The original, renewed.', level: 1 })).toBeInViewport();
});

test('direct fragments, table of contents links and fragment history reveal the requested section', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/docs/installation#fonts');
  const fonts = page.getByRole('heading', { name: 'Fonts and first paint', exact: true });
  const updates = page.getByRole('heading', { name: 'Make changes. Keep them.', exact: true });
  await expect(fonts).toBeInViewport({ ratio: 1 });
  expect(await documentPosition(page)).toBeGreaterThan(0);

  await page.getByRole('navigation', { name: 'On this page' }).getByRole('link', { name: 'Updates', exact: true }).click();
  await expect(page).toHaveURL(/#updates$/);
  await expect(updates).toBeInViewport({ ratio: 1 });
  await page.goBack();
  await expect(page).toHaveURL(/#fonts$/);
  await expect(fonts).toBeInViewport({ ratio: 1 });
  await page.goForward();
  await expect(page).toHaveURL(/#updates$/);
  await expect(updates).toBeInViewport({ ratio: 1 });
});

test('resizing an open mobile drawer releases the modal and keeps navigation usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/docs/installation');
  const browse = page.getByRole('button', { name: 'Browse documentation' });
  await browse.focus();
  await browse.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Documentation navigation' })).toBeVisible();
  await page.setViewportSize({ width: 1025, height: 844 });
  await expect(page.getByRole('dialog', { name: 'Documentation navigation' })).toHaveCount(0);
  await expect(page.getByRole('navigation', { name: 'Documentation sidebar' })).toBeVisible();
  await expect(browse).toBeHidden();
  await expect.poll(() => page.evaluate(() => {
    const element = document.activeElement;
    const box = element?.getBoundingClientRect();
    return Boolean(
      element?.closest('[data-react-toolbox="panel"], [data-react-toolbox="drawer"], header') &&
      !element.closest('[inert], [aria-hidden="true"]') && box?.width && box?.height,
    );
  })).toBe(true);
  await wheelContent(page, 600);
  await expect.poll(() => documentPosition(page)).toBeGreaterThan(200);

  await page.getByRole('navigation', { name: 'Documentation sidebar' }).getByRole('link', { name: 'Theming', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Theming', exact: true, level: 1 })).toBeInViewport();
  await page.setViewportSize({ width: 1024, height: 844 });
  await expect(browse).toBeVisible();
  await browse.focus();
  await browse.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Documentation navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Documentation navigation' })).toBeHidden();
  await expect(browse).toBeFocused();
  await wheelContent(page, 600);
  await expect.poll(() => documentPosition(page)).toBeGreaterThan(200);
});
