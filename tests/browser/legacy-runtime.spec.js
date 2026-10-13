import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';
import { comparisonCanvasStyles, componentCapture, loadFonts, prepare, renderedStyles, useOriginalStyles } from './parity-helpers.js';

const fixture = await readFile(new URL('../fixtures/legacy-runtime.js', import.meta.url), 'utf8');
const metadata = JSON.parse(await readFile(new URL('../fixtures/legacy-runtime.json', import.meta.url), 'utf8'));
const gallery = await readFile(new URL('../../examples/nextjs/app/gallery.jsx', import.meta.url), 'utf8');
const digest = source => createHash('sha256').update(source).digest('hex');

async function originalPage(context, modern) {
  expect(digest(gallery), 'Regenerate the legacy fixture when shared demo inputs change').toBe(metadata.gallerySha256);
  expect(digest(fixture), 'The archived bundle must match its provenance metadata').toBe(metadata.bundleSha256);
  const stylesheetUrls = await modern.locator('link[rel="stylesheet"]').evaluateAll(links => links.map(link => link.href));
  const original = await context.newPage();
  await original.setViewportSize({ width: 1440, height: 1400 });
  await original.route('**/__legacy-reference', route => route.fulfill({
    contentType: 'text/html',
    body: `<!doctype html><html lang="en"><head>${stylesheetUrls.map(url => `<link rel="stylesheet" href="${url}">`).join('')}</head><body><div id="legacy-root"></div></body></html>`,
  }));
  await original.goto('/__legacy-reference');
  await original.addStyleTag({ content: comparisonCanvasStyles });
  await useOriginalStyles(original);
  await loadFonts(original);
  await original.addScriptTag({ content: fixture });
  await original.waitForFunction(() => window.__REACT_TOOLBOX_LEGACY_READY__ === true);
  await original.evaluate(() => document.fonts.ready);
  await expect(original.locator('.rt-tabs-pointer').first()).not.toHaveCSS('width', '0px');

  // The archive remains byte-for-byte immutable. These two DOM corrections
  // accompany the reviewed M1 stylesheet changes; assert the modern contract
  // first, then make the same explicit correction to the historical render.
  // The legacy Switch only styled its disabled label and omitted the native
  // input attribute, which also changes the browser's invisible input ink.
  await expect(modern.locator('.rt-switch-disabled input')).toBeDisabled();
  await original.locator('.rt-switch-disabled input').evaluateAll(inputs => {
    inputs.forEach(input => { input.disabled = true; });
  });

  // M1 discrete stops now include the real maximum. This gallery's immutable
  // inputs are min=0, max=10, step=2; the old endpoint was a CSS pseudo-element.
  // Preserve the old slider event handlers and thumb animation, while adapting
  // only the six static stop markers to the corrected explicit DOM geometry.
  const stops = ['0%', '20%', '40%', '60%', '80%', '100%'];
  expect(await modern.locator('.rt-slider-pinned .rt-slider-snap').evaluateAll(nodes => nodes.map(node => node.style.left))).toEqual(stops);
  await expect(original.locator('.rt-slider-pinned .rt-slider-snap')).toHaveCount(5);
  await original.locator('.rt-slider-pinned .rt-slider-snaps').evaluate((snaps, positions) => {
    const endpoint = document.createElement('div');
    endpoint.className = 'rt-slider-snap';
    snaps.append(endpoint);
    Array.from(snaps.children).forEach((stop, index) => { stop.style.left = positions[index]; });
  }, stops);
  return original;
}

async function compareRuntimes(modern, original, selector, name, testInfo, animations = 'disabled', preservePointer = false) {
  if (selector.startsWith('[data-slider-comparison=')) {
    // Align the thumb to the pixel grid by moving only the external canvas. Chromium's
    // compositor otherwise rasterizes the translated thumb differently
    // at the shell's fractional y offset. Internal geometry, colors and every
    // thumb/rail pixel remain compared without overrides, masks or tolerance.
    await Promise.all([modern, original].map(target => target.locator(selector).evaluate(node => {
      const bounds = node.querySelector('.rt-slider-knob').getBoundingClientRect();
      node.style.position = 'relative';
      node.style.left = `${(parseFloat(node.style.left) || 0) + Math.round(bounds.x) - bounds.x}px`;
      node.style.top = `${(parseFloat(node.style.top) || 0) + Math.round(bounds.y) - bounds.y}px`;
    })));
  }
  if (animations === 'disabled' && !preservePointer) {
    await modern.mouse.move(0, 0);
    await original.mouse.move(0, 0);
  }
  if (animations === 'disabled') {
    // The thumb's 100ms size transition finishes before its ring/rail's 180ms
    // transition. Await every finite transition in these static captures;
    // the separate live ripple sample still preserves its exact 200ms frame.
    await Promise.all([modern, original].map(target => target.locator(selector).evaluate(async node => {
      await Promise.all(node.getAnimations({ subtree: true })
        .filter(animation => animation.effect?.getComputedTiming().iterations !== Infinity)
        .map(animation => animation.finished.catch(() => {})));
    })));
  }
  const modernImage = await componentCapture(modern, selector).screenshot({ animations });
  const originalImage = await componentCapture(original, selector).screenshot({ animations });
  // Ignore whitespace and the old theme wrapper's inert "undefined" token.
  // All real classes, computed declarations and rendered pixels remain exact.
  const normalized = (items, legacy = false) => items.map(({ className, ...item }) => ({
    ...item,
    className: [...new Set(className?.split(/\s+/).filter(token => token && (!legacy || token !== 'undefined')))].sort().join(' '),
  }));
  const modernStyles = normalized(await renderedStyles(modern, selector));
  const originalStyles = normalized(await renderedStyles(original, selector), true);
  await testInfo.attach(`${name}-react19`, { body: modernImage, contentType: 'image/png' });
  await testInfo.attach(`${name}-original-react16`, { body: originalImage, contentType: 'image/png' });
  if (!modernImage.equals(originalImage)) {
    await writeFile(testInfo.outputPath(`${name}-react19.png`), modernImage);
    await writeFile(testInfo.outputPath(`${name}-original-react16.png`), originalImage);
    const geometry = target => target.locator(selector).evaluate(root => [root, ...root.querySelectorAll('[class*="rt-"]')].map(node => ({
      className: node.getAttribute('class'),
      rect: node.getBoundingClientRect().toJSON(),
      focused: node === document.activeElement,
      focusVisible: node.matches(':focus-visible'),
    })));
    await writeFile(testInfo.outputPath(`${name}-geometry.json`), JSON.stringify({ modern: await geometry(modern), original: await geometry(original) }, null, 2));
  }
  expect(modernStyles, 'The original runtime with reviewed M1 corrections and DOM adapters preserves current geometry, colors, and motion declarations').toEqual(originalStyles);
  expect(modernImage.equals(originalImage), 'Original React 16 with reviewed M1 corrections and DOM adapters must match React 19 pixels exactly').toBe(true);
}

test('original React 16 runtime parity: component gallery', async ({ page, context }, testInfo) => {
  await prepare(page);
  const original = await originalPage(context, page);
  for (const section of ['buttons', 'inputs', 'selection', 'identity', 'cards', 'navigation', 'pickers', 'tables']) {
    await compareRuntimes(page, original, `#${section}`, section, testInfo);
  }
  await original.close();
});

test('original React 16 runtime parity: ripple at 200 milliseconds', async ({ page, context }, testInfo) => {
  await prepare(page);
  const original = await originalPage(context, page);
  const selector = '#buttons button.rt-button-raised.rt-button-primary';
  for (const target of [page, original]) {
    const button = target.locator(selector);
    await button.scrollIntoViewIfNeeded();
    const box = await button.boundingBox();
    await target.mouse.move(box.x + 20, box.y + 18);
    await target.mouse.down();
    await expect(button.locator('.rt-ripple-rippleActive')).toHaveCount(1);
    await expect(button.locator('.rt-ripple-rippleActive')).toHaveCSS('transition-duration', '0.8s');
    const animationCount = await button.evaluate(element => {
      const animations = element.getAnimations({ subtree: true });
      for (const animation of animations) {
        animation.pause();
        animation.currentTime = 200;
      }
      return animations.length;
    });
    expect(animationCount, 'A real CSS transition must be sampled before it finishes').toBeGreaterThan(0);
  }
  const transform = target => target.locator(`${selector} .rt-ripple-rippleActive`).evaluate(element => getComputedStyle(element).transform);
  expect(await transform(page)).toBe(await transform(original));
  await compareRuntimes(page, original, selector, 'ripple-200ms', testInfo, 'allow');
  await page.mouse.up();
  await original.mouse.up();
  await original.close();
});

test('original React 16 runtime parity: selected controls and tabs', async ({ page, context }, testInfo) => {
  await prepare(page);
  const original = await originalPage(context, page);
  for (const target of [page, original]) {
    await target.getByText('Keep me signed in', { exact: true }).click();
    await target.getByText('Product updates', { exact: true }).click();
    await target.getByText('Compact', { exact: true }).click();
    await target.getByText('Notifications', { exact: true }).click();
    await target.getByRole('tab', { name: 'Details', exact: false }).click();
  }
  await compareRuntimes(page, original, '#selection', 'selected-controls', testInfo);
  await compareRuntimes(page, original, '#navigation', 'selected-tabs', testInfo);
  await original.close();
});

for (const [name, pinned] of [['continuous', false], ['pinned', true]]) {
  test(`original React 16 runtime parity: ${name} slider press and release`, async ({ page, context }, testInfo) => {
    await prepare(page);
    const original = await originalPage(context, page);
    const sliderSelector = `.rt-slider-editable${pinned ? '.rt-slider-pinned' : ':not(.rt-slider-pinned)'}`;
    const canvasSelector = `[data-slider-comparison="${name}"]`;
    for (const target of [page, original]) {
      await target.locator(sliderSelector).evaluate(element => element.parentElement.setAttribute('data-slider-comparison', element.classList.contains('rt-slider-pinned') ? 'pinned' : 'continuous'));
    }

    // Compare both a filled thumb and the hollow minimum-value ring.
    for (const ring of [false, true]) {
      for (const target of [page, original]) {
        const slider = target.locator(sliderSelector);
        if (ring) {
          await slider.locator('.rt-slider-container').click({ position: { x: 1, y: 16 } });
          await expect(slider).toHaveClass(/rt-slider-ring/);
        }
        await target.mouse.move(0, 0);
        await expect(slider.locator('.rt-slider-innerknob')).toHaveCSS('width', '12px');
        await slider.scrollIntoViewIfNeeded();
        const bounds = await slider.locator('.rt-slider-knob').boundingBox();
        await target.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
        await target.mouse.down();
        // The corrected slider focuses its actual ARIA control when pressed.
        // Give the archived render that same focus target so the reviewed M1
        // focus halo is compared, while its original drag/animation code runs.
        const control = slider.locator('.rt-slider-container');
        if (target === original) {
          await control.evaluate(node => { node.tabIndex = 0; node.focus({ preventScroll: true }); });
        }
        await expect(control).toBeFocused();
        await expect(slider).toHaveClass(/rt-slider-pressed/);
        await expect(slider.locator('.rt-slider-innerknob')).toHaveCSS('width', pinned ? '12px' : '18px');
      }
      // Moving the pointer while pressed would drag the slider to a new value.
      await compareRuntimes(page, original, canvasSelector, `${name}-${ring ? 'ring' : 'filled'}-pressed`, testInfo, 'disabled', true);
      for (const target of [page, original]) {
        await target.mouse.up();
        await expect(target.locator(sliderSelector)).not.toHaveClass(/rt-slider-pressed/);
        if (!pinned) await expect(target.locator(`${sliderSelector} .rt-slider-innerknob`)).toHaveCSS('width', '14px');
        await target.mouse.move(0, 0);
        await expect(target.locator(`${sliderSelector} .rt-slider-innerknob`)).toHaveCSS('width', '12px');
      }
      await compareRuntimes(page, original, canvasSelector, `${name}-${ring ? 'ring' : 'filled'}-released`, testInfo);
    }
    await original.close();
  });
}

for (const [name, open] of [
  ['dialog', page => page.getByRole('button', { name: 'Open dialog', exact: true }).click()],
  ['calendar', page => page.getByLabel('Travel date', { exact: true }).click()],
  ['clock', page => page.getByLabel('Departure time', { exact: true }).click()],
]) {
  test(`original React 16 runtime parity: ${name}`, async ({ page, context }, testInfo) => {
    await prepare(page);
    const original = await originalPage(context, page);
    for (const target of [page, original]) {
      await open(target);
      await expect(target.locator('[data-react-toolbox="dialog"]')).toHaveClass(/rt-dialog-active/);
    }
    await compareRuntimes(page, original, '[data-react-toolbox="dialog"]', name, testInfo);
    await original.close();
  });
}
