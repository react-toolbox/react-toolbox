import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { expect, test } from '@playwright/test';
import { css } from './material-fixture.js';

let javascript;
test.beforeAll(async () => {
  javascript = (
    await build({
      stdin: {
        resolveDir: fileURLToPath(new URL('../../', import.meta.url)),
        loader: 'jsx',
        contents: `
          import React from 'react';
          import { createRoot } from 'react-dom/client';
          import { Input } from './src/material/input';
          import Slider from './src/material/slider';
          import { Tabs, Tab, TabsRoot, TabsList, TabsTrigger, TabsIndicator } from './src/material/tabs';
          const options = window.fixtureOptions;
          createRoot(document.getElementById('root')).render(
            <div dir={options.dir} style={{width: 360, ...options.style}}>
              {options.kind === 'input' && <Input aria-label='Name' />}
              {options.kind === 'slider' && <Slider aria-label='Volume' dir={options.dir} min={0} max={1000} step={1} defaultValue={250} snaps />}
              {options.kind === 'tabs' && <Tabs defaultValue='one' disableAnimatedBottomBorder={options.disableAnimation} dir={options.dir}>
                <Tab value='one' label='One' style={{minWidth:80, width:80}} ripple={false} />
                <Tab value='second-tab' label='Second tab' style={{minWidth:220, width:220}} ripple={false} />
                <Tab value='third-tab' label='Third tab' style={{minWidth:220, width:220}} ripple={false} />
              </Tabs>}
              {options.kind === 'compound-tabs' && <TabsRoot defaultValue='one' dir={options.dir} orientation={options.orientation}>
                <TabsList aria-label='Sections' style={{maxHeight:220}}>
                  <TabsTrigger value='one' style={{minWidth:80, width:80, height:48}} ripple={false}>One</TabsTrigger>
                  <TabsTrigger value='two' style={{minWidth:220, width:220, height:80}} ripple={false}>Second tab</TabsTrigger>
                  <TabsTrigger value='three' style={{minWidth:220, width:220, height:120}} ripple={false}>Third tab</TabsTrigger>
                  <TabsIndicator className={options.customIndicator === 'border' ? 'custom-motion-pointer' : undefined} style={options.customIndicator === 'dimensions' ? (options.orientation === 'vertical' ? {height:100} : {width:100}) : undefined} />
                </TabsList>
              </TabsRoot>}
            </div>
          );
        `,
      },
      bundle: true,
      write: false,
      format: 'iife',
      loader: { '.css': 'empty' },
      define: { 'process.env.NODE_ENV': '"production"' },
    })
  ).outputFiles[0].text;
});

async function render(page, options) {
  await page.setContent(
    `<style>${css} .custom-motion-pointer { border: 2px solid red; }</style><div id='root' style='padding:32px'></div>`,
  );
  await page.evaluate((options) => {
    window.fixtureOptions = options;
  }, options);
  await page.addScriptTag({ content: javascript });
}

async function finishMotion(locator) {
  await locator.evaluate(async (element) => {
    await Promise.all(element.getAnimations({ subtree: true }).map((animation) => animation.finished));
  });
}

for (const dir of ['ltr', 'rtl']) {
  test(`clicking the current slider knob value allows the next keyboard change: ${dir}`, async ({ page }) => {
    await render(page, { kind: 'slider', dir });
    const slider = page.getByRole('slider', { name: 'Volume' });
    await expect(slider).toHaveAttribute('aria-valuenow', '250');
    await page.locator('.rt-slider-innerknob').click();
    await expect(slider).toHaveAttribute('aria-valuenow', '250');
    await expect(slider).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(slider).toHaveAttribute('aria-valuenow', dir === 'rtl' ? '249' : '251');
  });

  test(`dense slider snap markers retain their geometry while dragging: ${dir}`, async ({ page }) => {
    await render(page, { kind: 'slider', dir });
    const markers = page.locator('.rt-slider-snap');
    await expect(markers).toHaveCount(1001);
    const positions = () =>
      markers.evaluateAll((elements) =>
        [elements[0], elements[500], elements[1000]].map((element) => {
          const bounds = element.getBoundingClientRect();
          return bounds.x + bounds.width / 2;
        }),
      );
    const before = await positions();
    const rail = await page.locator('.rt-slider-container').boundingBox();
    const thumb = await page.locator('.rt-slider-innerknob').boundingBox();
    await page.mouse.move(thumb.x + thumb.width / 2, thumb.y + thumb.height / 2);
    await page.mouse.down();
    await page.mouse.move(rail.x + rail.width * 0.65, rail.y + rail.height / 2, { steps: 10 });
    await page.mouse.up();
    const value = Number(await page.getByRole('slider', { name: 'Volume' }).getAttribute('aria-valuenow'));
    expect(Math.abs(value - (dir === 'rtl' ? 350 : 650))).toBeLessThanOrEqual(2);
    await expect(markers).toHaveCount(1001);
    expect(await positions()).toEqual(before);
    expect(before[0]).toBeCloseTo(dir === 'rtl' ? rail.x + rail.width : rail.x, 0);
    expect(before[2]).toBeCloseTo(dir === 'rtl' ? rail.x : rail.x + rail.width, 0);
  });
}

test('input underline grows from the center without changing layout width', async ({ page }) => {
  await render(page, { kind: 'input' });
  const input = page.getByRole('textbox', { name: 'Name' });
  const bar = page.locator('.rt-input-bar');
  const readHalves = () =>
    bar.evaluate((element) =>
      ['::before', '::after'].map((pseudo) => {
        const style = getComputedStyle(element, pseudo);
        return {
          width: parseFloat(style.width),
          origin: parseFloat(style.transformOrigin),
          scale: new DOMMatrix(style.transform).a,
          transition: style.transitionProperty,
        };
      }),
    );
  const width = (await bar.boundingBox()).width / 2;
  const idle = await readHalves();
  expect(idle.map((half) => half.scale)).toEqual([0, 0]);
  expect(idle.map((half) => half.origin)).toEqual([0, width]);
  await input.focus();
  await finishMotion(bar);
  for (const half of await readHalves()) {
    expect(half.width).toBe(width);
    expect(half.scale).toBe(1);
    expect(half.transition).toBe('transform, background-color');
  }
  await input.blur();
  await finishMotion(bar);
  expect((await readHalves()).map((half) => half.scale)).toEqual([0, 0]);
});

for (const kind of ['tabs', 'compound-tabs']) {
  for (const dir of ['ltr', 'rtl']) {
    for (const orientation of kind === 'tabs' ? ['horizontal'] : ['horizontal', 'vertical']) {
      test(`tab indicator follows unequal tabs and scroll: ${kind}, ${dir}, ${orientation}`, async ({ page }) => {
        await render(page, { kind, dir, orientation, style: { '--tab-pointer-height': '3px' } });
        const indicator = page.locator(kind === 'tabs' ? '.rt-tabs-pointer' : '[data-slot=TabsIndicator]');
        await expect(indicator).toHaveCSS('transition-property', 'transform');
        for (const name of ['One', 'Second tab', 'Third tab', 'One']) {
          const tab = page.getByRole('tab', { name, exact: true });
          await tab.click();
          await expect(tab).toHaveAttribute('aria-selected', 'true');
          await expect
            .poll(async () => {
              const bar = await indicator.boundingBox();
              const label = await tab.boundingBox();
              return orientation === 'vertical'
                ? Math.abs(bar.y - label.y) + Math.abs(bar.height - label.height) + Math.abs(bar.width - 3)
                : Math.abs(bar.x - label.x) + Math.abs(bar.width - label.width) + Math.abs(bar.height - 3);
            })
            .toBeLessThan(1);
        }
      });
    }
  }
}

test('disabled tab motion and reduced motion still settle at the selected tab', async ({ page }) => {
  await render(page, { kind: 'tabs', disableAnimation: true });
  await page.getByRole('tab', { name: 'Second tab' }).click();
  await expect(page.locator('.rt-tabs-pointer')).toHaveCSS('transition-duration', '0s');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await render(page, { kind: 'compound-tabs' });
  await page.getByRole('tab', { name: 'Second tab' }).click();
  await expect(page.locator('[data-slot=TabsIndicator]')).toHaveCSS('transition-property', 'none');
  await expect
    .poll(async () => {
      const bar = await page.locator('[data-slot=TabsIndicator]').boundingBox();
      const tab = await page.getByRole('tab', { name: 'Second tab' }).boundingBox();
      return Math.abs(bar.x - tab.x) + Math.abs(bar.width - tab.width);
    })
    .toBeLessThan(1);
});

for (const orientation of ['horizontal', 'vertical']) {
  test(`custom indicator dimensions remain unscaled: ${orientation}`, async ({ page }) => {
    await render(page, { kind: 'compound-tabs', orientation, customIndicator: 'dimensions' });
    const indicator = page.locator('[data-slot=TabsIndicator]');
    for (const name of ['One', 'Second tab']) {
      await page.getByRole('tab', { name, exact: true }).click();
      await finishMotion(indicator);
      const bounds = await indicator.boundingBox();
      expect(orientation === 'vertical' ? bounds.height : bounds.width).toBeCloseTo(100, 1);
      await expect(indicator).toHaveCSS('transform-origin', `${bounds.width / 2}px ${bounds.height / 2}px`);
    }
  });
}

test('custom compound indicator borders retain their dimensions', async ({ page }) => {
  await render(page, { kind: 'compound-tabs', customIndicator: 'border' });
  const tab = page.getByRole('tab', { name: 'Second tab' });
  await tab.click();
  const pointer = page.locator('[data-slot=TabsIndicator]');
  await expect
    .poll(async () => {
      const bounds = await pointer.boundingBox();
      const active = await tab.boundingBox();
      return Math.abs(bounds.x - active.x) + Math.abs(bounds.width - active.width);
    })
    .toBeLessThan(1);
  await expect(pointer).toHaveCSS('border-left-width', '2px');
});
