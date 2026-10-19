import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { expect, test } from '@playwright/test';
import { css } from './material-fixture.js';

let javascript;
test.beforeAll(async () => {
  const result = await build({
    stdin: {
      resolveDir: fileURLToPath(new URL('../../', import.meta.url)),
      loader: 'jsx',
      contents: `
        import React from 'react';
        import { createRoot } from 'react-dom/client';
        import { Button } from './src/material/button';
        import { IconMenu, MenuItem } from './src/material/menu';
        const options = window.fixtureOptions || {};
        window.menuClickCount = 0;
        window.triggerClickCount = 0;
        createRoot(document.getElementById('root')).render(<>
          <IconMenu aria-label="More actions"
            onClick={event => {
              window.menuClickCount++;
              if (options.cancel === 'menuClick') event.preventDefault();
            }}
            trigger={options.custom ? <Button
              onClick={event => {
                window.triggerClickCount++;
                if (options.cancel === 'click') event.preventDefault();
              }}
              onPointerDown={event => { if (options.cancel === 'pointerdown') event.preventDefault(); }}
              onPointerUp={event => { if (options.cancel === 'pointerup') event.preventDefault(); }}
            >More actions</Button> : undefined}>
            <MenuItem caption="Download" closeOnSelect={false} />
          </IconMenu>
          <Button raised>Save changes</Button>
          <button onPointerUp={event => event.stopPropagation()}>Outside</button>
        </>);
      `,
    },
    bundle: true,
    write: false,
    format: 'iife',
    loader: { '.css': 'empty' },
    define: { 'process.env.NODE_ENV': '"production"' },
  });
  javascript = result.outputFiles[0].text;
});

async function render(page, options = {}) {
  await page.setContent(
    `<meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><div id="root" style="padding:48px"></div>`,
  );
  await page.evaluate((options) => {
    window.fixtureOptions = options;
  }, options);
  await page.addScriptTag({ content: javascript });
  await expect(page.getByRole('button', { name: 'More actions' })).toBeVisible();
}
test.beforeEach(async ({ page }) => render(page));

test('menu trigger ink stays clipped while pressed and fades after every click', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'More actions' });
  const ripple = trigger.locator('[data-react-toolbox="ripple"]');
  for (let press = 0; press < 2; press++) {
    const box = await trigger.boundingBox();
    await page.mouse.move(box.x + 8, box.y + 8);
    await page.mouse.down();
    await expect(ripple).toHaveCount(1);
    await expect(ripple).toHaveCSS('overflow', 'hidden');
    await expect(ripple).toHaveCSS('border-radius', '50%');
    await expect(ripple.locator('span')).toHaveCSS('opacity', '0.3');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await page.mouse.up();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(ripple.locator('.rt-ripple-rippleActive')).toHaveCount(0);
    await expect(ripple).toHaveCount(0, { timeout: 1500 });
    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  }
});

test('releasing outside the menu trigger finishes ink even when propagation is stopped', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'More actions' });
  await trigger.hover();
  await page.mouse.down();
  await expect(trigger.locator('[data-react-toolbox="ripple"]')).toHaveCount(1);
  await trigger.dispatchEvent('pointerup', { pointerType: 'touch' });
  await expect(trigger.locator('.rt-ripple-rippleActive')).toHaveCount(1);
  await page.getByRole('button', { name: 'Outside' }).hover();
  await page.mouse.up();
  await expect(trigger.locator('[data-react-toolbox="ripple"]')).toHaveCount(0, { timeout: 1500 });
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('canceling a menu trigger press finishes ink without opening the menu', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'More actions' });
  await trigger.hover();
  await page.mouse.down();
  await expect(trigger.locator('[data-react-toolbox="ripple"]')).toHaveCount(1);
  await trigger.evaluate((element) => {
    element.addEventListener('pointercancel', (event) => event.stopPropagation(), { once: true });
    element.dispatchEvent(new PointerEvent('pointercancel', { bubbles: true, pointerType: 'mouse' }));
  });
  await expect(trigger.locator('[data-react-toolbox="ripple"]')).toHaveCount(0, { timeout: 1500 });
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: 'Outside' }).hover();
  await page.mouse.up();
});

for (const name of ['Save changes', 'Download']) {
  test(`${name} retains a ripple at the contact point and removes it on release`, async ({ page }) => {
    if (name === 'Download') {
      await page.getByRole('button', { name: 'More actions' }).click();
      await page
        .getByRole('menu')
        .evaluate((element) =>
          Promise.all(element.getAnimations({ subtree: true }).map((animation) => animation.finished)),
        );
    }
    const control = page.getByRole(name === 'Download' ? 'menuitem' : 'button', { name });
    await control.hover();
    const box = await control.boundingBox();
    const contact = { x: Math.round(box.x + 12), y: Math.round(box.y + 12) };
    await page.mouse.move(contact.x, contact.y);
    await page.mouse.down();
    const ripple = control.locator('[data-react-toolbox="ripple"]');
    await expect(ripple).toHaveCount(1);
    const center = await ripple.locator('span').evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
    });
    expect(center.x).toBeCloseTo(contact.x, 1);
    expect(center.y).toBeCloseTo(contact.y, 1);
    await page.mouse.up();
    await expect(ripple).toHaveCount(0, { timeout: 1500 });
  });
}

test.describe('touch', () => {
  test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  test('menu trigger ink fades after tapping', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'More actions' });
    await trigger.tap();
    await expect(trigger.locator('[data-react-toolbox="ripple"]')).toHaveCount(1);
    await expect(trigger.locator('[data-react-toolbox="ripple"]')).toHaveCount(0, { timeout: 1500 });
  });

  for (const custom of [false, true]) {
    test(`menu opens once after a touch tap with a ${custom ? 'custom' : 'default'} trigger`, async ({ page }) => {
      await render(page, { custom });
      const trigger = page.getByRole('button', { name: 'More actions' });
      for (let count = 1; count <= 2; count++) {
        await trigger.tap();
        await expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(await page.evaluate(() => window.menuClickCount)).toBe(count);
        expect(await page.evaluate(() => window.triggerClickCount)).toBe(custom ? count : 0);
        await page.keyboard.press('Escape');
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      }
      await trigger.focus();
      await page.keyboard.press('Enter');
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(await page.evaluate(() => window.menuClickCount)).toBe(3);
    });
  }

  for (const cancel of ['menuClick', 'click', 'pointerdown', 'pointerup']) {
    test(`touch activation respects ${cancel} cancellation`, async ({ page }) => {
      await render(page, { custom: true, cancel });
      const trigger = page.getByRole('button', { name: 'More actions' });
      await trigger.tap();
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(await page.evaluate(() => window.triggerClickCount)).toBe(cancel.startsWith('pointer') ? 0 : 1);
      expect(await page.evaluate(() => window.menuClickCount)).toBe(cancel.startsWith('pointer') ? 0 : 1);
    });
  }

  for (const gesture of ['move', 'cancel']) {
    test(`touch ${gesture} does not activate the menu`, async ({ page }) => {
      const trigger = page.getByRole('button', { name: 'More actions' });
      const box = await trigger.boundingBox();
      const pointer = {
        pointerType: 'touch',
        pointerId: 1,
        isPrimary: true,
        button: 0,
        clientX: box.x + box.width / 2,
        clientY: box.y + box.height / 2,
      };
      await trigger.dispatchEvent('pointerdown', pointer);
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      if (gesture === 'move') await trigger.dispatchEvent('pointermove', { ...pointer, clientY: pointer.clientY + 20 });
      else await trigger.dispatchEvent('pointercancel', pointer);
      await trigger.dispatchEvent('pointerup', pointer);
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(await page.evaluate(() => window.menuClickCount)).toBe(0);
    });
  }
});
