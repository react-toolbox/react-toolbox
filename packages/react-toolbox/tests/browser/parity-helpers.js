import { expect } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { componentClasses } from '../../scripts/component-classes.mjs';

const utilitySlots = Object.fromEntries(
  Object.entries(await componentClasses(fileURLToPath(new URL('../../', import.meta.url)))).map(([marker, classes]) => [
    marker,
    classes.split(/\s+/).filter((name) => name !== marker),
  ]),
);
import { referenceCss } from '../../scripts/style-rules.mjs';

const referenceStyles = referenceCss();

// Keep comparison canvases free of the gallery shell's rounded-corner
// antialiasing. This changes no library component, geometry, or shadow.
export const comparisonCanvasStyles =
  'html { scroll-behavior: auto !important; } .gallery-section { border-radius: 0 !important; }';

// Use immutable legacy PostCSS output plus individually reviewed M1 corrections.
// Keep Next's font and gallery utility styles intact. Current CSS is never copied
// into this reference, and unexpected declarations still fail verify-styles.
export async function useOriginalStyles(page) {
  await page.evaluate((slots) => {
    // The independent reference must never inherit migrated presentation utilities.
    // Keep stable hooks and application classes, and use only archived component CSS.
    document.querySelectorAll('[class*="rt-"]').forEach((element) => {
      const utilities = new Set([...element.classList].flatMap((name) => slots[name] || []));
      element.setAttribute('class', [...element.classList].filter((name) => !utilities.has(name)).join(' '));
    });
  }, utilitySlots);
  await page.evaluate(() => {
    const removeComponentRules = (sheet) => {
      for (let index = sheet.cssRules.length - 1; index >= 0; index -= 1) {
        const rule = sheet.cssRules[index];
        if (rule.selectorText?.includes('.rt-') || (rule instanceof CSSKeyframesRule && rule.name.startsWith('rt-'))) {
          sheet.deleteRule(index);
        } else if (rule.cssRules && typeof rule.deleteRule === 'function') {
          removeComponentRules(rule);
        }
      }
    };
    for (const sheet of document.styleSheets) removeComponentRules(sheet);
  });
  await page.addStyleTag({ content: referenceStyles });
  // New M1 mixed selection state, absent from the archived implementation.
  // Keep this explicit reference independent of the generated utility classes;
  // the browser quality test separately asserts the native state and mark geometry.
  await page.addStyleTag({
    content: `
    .rt-checkbox-input[aria-checked="mixed"] ~ .rt-checkbox-check.rt-checkbox-checked::after {
      animation: none; border: 0; background-color: var(--rt-color-background);
      height: 2px; width: 10px; left: 2px; top: 6px; transform: none;
    }
  `,
  });
}

export async function prepare(page) {
  // Keep every section inside the viewport: Chromium shifts oversized element
  // captures when Playwright temporarily enlarges and restores its viewport.
  await page.setViewportSize({ width: 1440, height: 1400 });
  // Both historical and current Menu measure on mount. Load fonts before
  // hydration so neither runtime caches a measurement using a fallback font.
  let releaseScripts;
  const fontGate = new Promise((resolve) => {
    releaseScripts = resolve;
  });
  const scriptPattern = '**/_next/static/**/*.js';
  const waitForFonts = async (route) => {
    await fontGate;
    await route.continue();
  };
  await page.route(scriptPattern, waitForFonts);
  await page.goto('/playground', { waitUntil: 'domcontentloaded' });
  await loadFonts(page);
  releaseScripts();
  await page.waitForLoadState('load');
  await page.unroute(scriptPattern, waitForFonts);
  await page.addStyleTag({ content: comparisonCanvasStyles });
  await page.evaluate(() => document.fonts.ready);
  // Await the tab indicator's initial measurement, then move focus away.
  await expect(page.locator('.rt-tabs-pointer').first()).not.toHaveCSS('width', '0px');
  await page.mouse.move(0, 0);
}

export async function loadFonts(page) {
  await page.evaluate(async () => {
    await Promise.all([
      ...[300, 400, 500, 700].map((weight) => document.fonts.load(`${weight} 14px Roboto`)),
      document.fonts.load('24px "Material Icons"'),
    ]);
    // WebKit resolves FontFaceSet.ready after page load, which cannot finish
    // while hydration scripts are gated. These explicit loads finish first;
    // prepare awaits fonts.ready after releasing scripts.
  });
}

export function componentCapture(page, selector) {
  const target = page.locator(selector);
  // The rounded section border belongs to the gallery shell, not the library.
  // Its compositor antialiasing can vary by one channel during repaint, so
  // compare the complete component canvas inside it with zero pixel tolerance.
  return selector.startsWith('#') && !selector.includes(' ') ? target.locator('.gallery-section-body') : target;
}

export async function renderedStyles(page, selector) {
  return page.locator(selector).evaluateAll((roots, slots) => {
    const normalizeColors = (value) =>
      value.replace(/color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)(?: \/ ([\d.]+))?\)/g, (_, r, g, b, a) => {
        const channels = [r, g, b].map((channel) => Math.round(Number(channel) * 255)).join(', ');
        return a === undefined || Number(a) === 1 ? `rgb(${channels})` : `rgba(${channels}, ${Number(a)})`;
      });
    // The old PostCSS calc plugin rounded 40px / 2.25 to 17.77778px;
    // live calc preserves the division. WebKit serializes the resulting float
    // as 17.777781px vs 17.777779px despite identical pixels. Normalize CSSOM
    // numbers below layout precision; screenshot equality stays exact.
    const normalizeValue = (value) =>
      normalizeColors(value).replace(/(-?\d+\.\d+)px\b/g, (_, number) => `${Number(Number(number).toFixed(4))}px`);
    const properties = [
      'color',
      'background-color',
      'border-color',
      'border-radius',
      'box-shadow',
      'font-family',
      'font-size',
      'font-weight',
      'line-height',
      'letter-spacing',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'width',
      'height',
      'opacity',
      'display',
      'position',
      'transition-duration',
      'transition-delay',
      'transition-timing-function',
      'animation-name',
      'animation-duration',
      'animation-timing-function',
    ];
    return roots
      .flatMap((root) => [root, ...root.querySelectorAll('[class*="rt-"]')])
      .map((element) => {
        const style = getComputedStyle(element);
        const utilities = new Set([...element.classList].flatMap((name) => slots[name] || []));
        return {
          tag: element.tagName,
          className: [...element.classList].filter((name) => !utilities.has(name)).join(' '),
          styles: Object.fromEntries(
            properties.map((property) => [property, normalizeValue(style.getPropertyValue(property))]),
          ),
        };
      });
  }, utilitySlots);
}
