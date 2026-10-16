import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';
import {
  comparisonCanvasStyles,
  componentCapture,
  loadFonts,
  prepare,
  renderedStyles,
  useOriginalStyles,
} from './parity-helpers.js';

const fixture = await readFile(new URL('../fixtures/legacy-runtime.js', import.meta.url), 'utf8');
const metadata = JSON.parse(await readFile(new URL('../fixtures/legacy-runtime.json', import.meta.url), 'utf8'));
const gallery = await readFile(new URL('../../../../apps/docs/app/gallery.jsx', import.meta.url), 'utf8');
const digest = (source) => createHash('sha256').update(source).digest('hex');

async function originalPage(context, modern) {
  expect(digest(gallery), 'Regenerate the legacy fixture when shared demo inputs change').toBe(metadata.gallerySha256);
  expect(digest(fixture), 'The archived bundle must match its provenance metadata').toBe(metadata.bundleSha256);
  const stylesheetUrls = await modern
    .locator('link[rel="stylesheet"]')
    .evaluateAll((links) => links.map((link) => link.href));
  const original = await context.newPage();
  await original.setViewportSize({ width: 1440, height: 1400 });
  await original.route('**/__legacy-reference', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: `<!doctype html><html lang="en"><head>${stylesheetUrls.map((url) => `<link rel="stylesheet" href="${url}">`).join('')}</head><body><div id="legacy-root"></div></body></html>`,
    }),
  );
  await original.goto('/__legacy-reference');
  await original.addStyleTag({ content: comparisonCanvasStyles });
  await useOriginalStyles(original);
  await loadFonts(original);
  await original.addScriptTag({ content: fixture });
  await original.waitForFunction(() => window.__REACT_TOOLBOX_LEGACY_READY__ === true);
  await original.evaluate(() => document.fonts.ready);
  await expect(original.locator('.rt-tabs-pointer').first()).not.toHaveCSS('width', '0px');

  // The archive remains byte-for-byte immutable. These explicit DOM corrections
  // accompany the reviewed M1 stylesheet changes; assert the modern contract
  // first, then make the same explicit correction to the historical render.
  // The legacy Switch only styled its disabled label and omitted the native
  // input attribute, which also changes the browser's invisible input ink.
  await expect(modern.locator('.rt-switch-disabled input')).toBeDisabled();
  await original.locator('.rt-switch-disabled input').evaluateAll((inputs) => {
    inputs.forEach((input) => {
      input.disabled = true;
    });
  });

  // A selected-chip container is not a list of li children. Preserve all
  // geometry/styles while adapting the invalid historical ul to a div.
  await expect(modern.locator('ul.rt-autocomplete-values')).toHaveCount(0);
  await original.locator('ul.rt-autocomplete-values').evaluateAll((lists) => {
    for (const list of lists) {
      const container = document.createElement('div');
      for (const attribute of list.attributes) container.setAttribute(attribute.name, attribute.value);
      container.append(...list.childNodes);
      list.replaceWith(container);
    }
  });

  /** Native chip removal buttons retain the reviewed icon geometry and gain browser keyboard semantics. */
  const deleteActions = modern.locator('.rt-chip-delete');
  const deleteActionCount = await deleteActions.count();
  expect(deleteActionCount).toBeGreaterThan(0);
  expect(
    await deleteActions.evaluateAll((actions) =>
      actions.every((action) => action instanceof HTMLButtonElement && action.type === 'button'),
    ),
  ).toBe(true);
  await expect(original.locator('span.rt-chip-delete')).toHaveCount(deleteActionCount);
  await original.locator('span.rt-chip-delete').evaluateAll((actions) => {
    for (const action of actions) {
      const button = document.createElement('button');
      for (const attribute of action.attributes) button.setAttribute(attribute.name, attribute.value);
      button.type = 'button';
      button.setAttribute('aria-label', 'Remove');
      button.append(...action.childNodes);
      action.replaceWith(button);
    }
  });

  /** Preserve each row's archived visual children while introducing its native primary action.
   * Secondary actions remain siblings. These explicit resets are independent of current utility CSS. */
  const listActions = modern.locator('#cards .rt-list-item > button');
  await expect(listActions).toHaveCount(2);
  expect(await listActions.evaluateAll((actions) => actions.every((action) => action.type === 'button'))).toBe(true);
  await original.locator('#cards .rt-list-item').evaluateAll((rows) => {
    for (const caption of ['Material studies', 'Saved inspiration']) {
      const row = rows.find((element) => element.querySelector('.rt-list-primary')?.textContent === caption);
      if (!row) throw new Error(`Missing archived list row: ${caption}`);
      const button = document.createElement('button');
      button.type = 'button';
      Object.assign(button.style, {
        display: 'flex',
        flex: '1 1 0%',
        minWidth: '0px',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderWidth: '0px',
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        padding: '0px',
        color: 'inherit',
        font: 'inherit',
        textAlign: 'start',
        cursor: 'pointer',
      });
      const primaryChildren = [...row.children].filter((child) => !child.classList.contains('rt-list-right'));
      row.prepend(button);
      button.append(...primaryChildren);
    }
  });

  // This gallery starts with one of three rows selected. M1's header must show
  // the newly supported mixed state. Adapt this one state, not the archive or
  // any ordinary checked/unchecked styling, and continue comparing exact pixels.
  await expect(modern.getByRole('checkbox', { name: 'Select all rows' })).toBeChecked({ indeterminate: true });
  await original.locator('.rt-table-head .rt-checkbox-input').evaluate((input) => {
    input.indeterminate = true;
    input.setAttribute('aria-checked', 'mixed');
    input.nextElementSibling.classList.add('rt-checkbox-checked');
  });

  // M1 discrete stops now include the real maximum. This gallery's immutable
  // inputs are min=0, max=10, step=2; the old endpoint was a CSS pseudo-element.
  // Preserve the old slider event handlers and thumb animation, while adapting
  // only the six static stop markers to the corrected explicit DOM geometry.
  const stops = ['0%', '20%', '40%', '60%', '80%', '100%'];
  expect(
    await modern
      .locator('.rt-slider-pinned .rt-slider-snap')
      .evaluateAll((nodes) => nodes.map((node) => node.style.left)),
  ).toEqual(stops);
  await expect(original.locator('.rt-slider-pinned .rt-slider-snap')).toHaveCount(5);
  await original.locator('.rt-slider-pinned .rt-slider-snaps').evaluate((snaps, positions) => {
    const endpoint = document.createElement('div');
    endpoint.className = 'rt-slider-snap';
    snaps.append(endpoint);
    Array.from(snaps.children).forEach((stop, index) => {
      stop.style.left = positions[index];
    });
  }, stops);
  return original;
}

async function compareRuntimes(
  modern,
  original,
  selector,
  name,
  testInfo,
  animations = 'disabled',
  preservePointer = false,
) {
  if (animations === 'disabled' && !preservePointer) {
    await modern.mouse.move(0, 0);
    await original.mouse.move(0, 0);
  }
  if (animations === 'disabled') {
    // The thumb's 100ms size transition finishes before its ring/rail's 180ms
    // transition. Await every finite transition in these static captures;
    // the separate live ripple sample still preserves its exact 200ms frame.
    await Promise.all(
      [modern, original].map((target) =>
        target.locator(selector).evaluate(async (node) => {
          await Promise.all(
            node
              .getAnimations({ subtree: true })
              .filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity)
              .map((animation) => animation.finished.catch(() => {})),
          );
        }),
      ),
    );
  }
  if (selector.startsWith('[data-slider-comparison=')) {
    // A transition's finished promise resolves before its last frame is painted.
    // Let both canvases commit the completed pin transform before capturing the
    // focus halo, whose rasterization otherwise depends on compositor timing.
    await Promise.all(
      [modern, original].map((target) =>
        target.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))),
      ),
    );
  }
  // Slider transitions have finished above. Playwright's animation disabling
  // can repaint the released pin's compositor layer differently between the
  // runtimes; capture that settled native frame without another intervention.
  const captureAnimations = selector.startsWith('[data-slider-comparison=') ? 'allow' : animations;
  const modernImage = await componentCapture(modern, selector).screenshot({ animations: captureAnimations });
  const originalImage = await componentCapture(original, selector).screenshot({ animations: captureAnimations });
  // Compare stable component hooks rather than the migrated implementation
  // utilities. Computed declarations, geometry and every rendered pixel remain exact.
  const normalized = (items) =>
    items.map(({ className, ...item }) => ({
      ...item,
      className: [
        ...new Set(
          className
            ?.split(/\s+/)
            .filter(
              (token) =>
                token &&
                !token.includes(':') &&
                (token.startsWith('rt-') || token.startsWith('gallery-') || token === 'material-icons'),
            ),
        ),
      ]
        .sort()
        .join(' '),
    }));
  const modernStyles = normalized(await renderedStyles(modern, selector));
  const originalStyles = normalized(await renderedStyles(original, selector));
  await testInfo.attach(`${name}-react19`, { body: modernImage, contentType: 'image/png' });
  await testInfo.attach(`${name}-original-react16`, { body: originalImage, contentType: 'image/png' });
  if (!modernImage.equals(originalImage)) {
    await writeFile(testInfo.outputPath(`${name}-react19.png`), modernImage);
    await writeFile(testInfo.outputPath(`${name}-original-react16.png`), originalImage);
    const geometry = (target) =>
      target.locator(selector).evaluate((root) =>
        [root, ...root.querySelectorAll('[class*="rt-"]')].map((node) => ({
          className: node.getAttribute('class'),
          rect: node.getBoundingClientRect().toJSON(),
          focused: node === document.activeElement,
          focusVisible: node.matches(':focus-visible'),
        })),
      );
    await writeFile(
      testInfo.outputPath(`${name}-geometry.json`),
      JSON.stringify({ modern: await geometry(modern), original: await geometry(original) }, null, 2),
    );
  }
  expect(
    modernStyles,
    'The original runtime with reviewed M1 corrections and DOM adapters preserves current geometry, colors, and motion declarations',
  ).toEqual(originalStyles);
  expect(
    modernImage.equals(originalImage),
    'Original React 16 with reviewed M1 corrections and DOM adapters must match React 19 pixels exactly',
  ).toBe(true);
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
    const animationCount = await button.evaluate((element) => {
      const animations = element.getAnimations({ subtree: true });
      for (const animation of animations) {
        animation.pause();
        animation.currentTime = 200;
      }
      return animations.length;
    });
    expect(animationCount, 'A real CSS transition must be sampled before it finishes').toBeGreaterThan(0);
  }
  const transform = (target) =>
    target.locator(`${selector} .rt-ripple-rippleActive`).evaluate((element) => getComputedStyle(element).transform);
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

for (const [name, pinned] of [
  ['continuous', false],
  ['pinned', true],
]) {
  test(`original React 16 runtime parity: ${name} slider press and release`, async ({ page, context }, testInfo) => {
    await prepare(page);
    const original = await originalPage(context, page);
    const sliderSelector = `.rt-slider-editable${pinned ? '.rt-slider-pinned' : ':not(.rt-slider-pinned)'}`;
    const canvasSelector = `[data-slider-comparison="${name}"]`;
    for (const target of [page, original]) {
      await target.locator(sliderSelector).evaluate((element) => {
        element.parentElement.setAttribute(
          'data-slider-comparison',
          element.classList.contains('rt-slider-pinned') ? 'pinned' : 'continuous',
        );
        // Give both external canvases a compositor layer before interaction.
        // The animated pin can otherwise promote only one canvas's halo,
        // changing Chromium's edge rasterization despite identical styles.
        element.parentElement.style.transform = 'translateZ(0)';
      });
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
        /** Align only the external canvas before interaction. Moving it after press can leave
         * a pin or halo texture rasterized at its former fractional origin in Chromium. */
        await target.locator(canvasSelector).evaluate((node) => {
          const bounds = node.querySelector('.rt-slider-knob').getBoundingClientRect();
          node.style.position = 'relative';
          node.style.left = `${(parseFloat(node.style.left) || 0) + Math.round(bounds.x) - bounds.x}px`;
          node.style.top = `${(parseFloat(node.style.top) || 0) + Math.round(bounds.y) - bounds.y}px`;
        });
        const bounds = await slider.locator('.rt-slider-knob').boundingBox();
        await target.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
        await target.mouse.down();
        // The corrected slider focuses its actual ARIA control when pressed.
        // Give the archived render that same focus target so the reviewed M1
        // focus halo is compared, while its original drag/animation code runs.
        const control = slider.locator('.rt-slider-container');
        if (target === original) {
          await control.evaluate((node) => {
            node.tabIndex = 0;
            node.focus({ preventScroll: true });
          });
        }
        await expect(control).toBeFocused();
        await expect(slider).toHaveClass(/rt-slider-pressed/);
        await expect(slider.locator('.rt-slider-innerknob')).toHaveCSS('width', pinned ? '12px' : '18px');
      }
      // Moving the pointer while pressed would drag the slider to a new value.
      await compareRuntimes(
        page,
        original,
        canvasSelector,
        `${name}-${ring ? 'ring' : 'filled'}-pressed`,
        testInfo,
        'disabled',
        true,
      );
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
  ['dialog', (page) => page.getByRole('button', { name: 'Open dialog', exact: true }).click()],
  ['calendar', (page) => page.getByLabel('Travel date', { exact: true }).click()],
  ['clock', (page) => page.getByLabel('Departure time', { exact: true }).click()],
]) {
  test(`original React 16 runtime parity: ${name}`, async ({ page, context }, testInfo) => {
    await prepare(page);
    const original = await originalPage(context, page);
    for (const target of [page, original]) {
      await open(target);
      await expect(target.locator('[data-react-toolbox="dialog"]')).toHaveClass(/rt-dialog-active/);
    }
    if (name === 'calendar') {
      // The reviewed M1 today indicator was added with an explicit DOM hook.
      // Adapt that hook on the immutable runtime, including when today is not
      // the selected date (a difference hidden on the fixture's creation day).
      const today = await page.locator('.rt-date-picker-day[data-today]').allTextContents();
      await original.locator('.rt-date-picker-day').evaluateAll((days, labels) => {
        days.forEach((day) => {
          if (labels.includes(day.textContent)) day.setAttribute('data-today', 'true');
        });
      }, today);
    }
    await compareRuntimes(page, original, '[data-react-toolbox="dialog"]', name, testInfo);
    await original.close();
  });
}
