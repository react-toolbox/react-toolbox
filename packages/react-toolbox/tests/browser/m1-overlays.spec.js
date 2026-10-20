import { css as styles } from './material-fixture.js';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { test, expect } from '@playwright/test';

/** Exercise the actual source components in both browser engines. */
const source = `
  import React, { useState } from 'react';
  import { createRoot } from 'react-dom/client';
  import Dialog from './src/material/dialog';
  import Drawer from './src/material/drawer';
  import Snackbar from './src/material/snackbar';
  import { useTooltip } from './src/material/tooltip';
  import { Tabs, Tab } from './src/material/tabs';
  import { IconMenu, MenuItem } from './src/material/menu';
  function Tip() {
    const behavior = useTooltip({ tooltip: 'Add file' });
    return <><button {...behavior.triggerProps}>Tip</button>{behavior.tooltip}</>;
  }
  function App() {
    const [dialog, setDialog] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [tab, setTab] = useState('overview');
    return <>
      <button onClick={() => setDialog(true)}>Open dialog</button>
      <button onClick={() => setDrawer(true)}>Open drawer</button>
      <Tip />
      <IconMenu aria-label="File options" style={{ position: 'fixed', left: 1230, top: 470 }}>
        <MenuItem caption="Archive" />
        <MenuItem caption="Delete" />
        {Array.from({ length: 20 }, (_, index) => <MenuItem key={index} caption={'Option ' + index} />)}
      </IconMenu>
      <Tabs inverse value={tab} onValueChange={setTab} aria-label="Text and icon tabs">
        <Tab value="overview" icon="home" label="Overview">Overview</Tab>
        <Tab value="settings" icon="settings" label="Settings">Settings</Tab>
      </Tabs>
      <Tabs value="home" aria-label="Icon tabs"><Tab value="home" icon="home" /><Tab value="settings" icon="settings" /></Tabs>
      <Snackbar active label={innerWidth < 500 ? 'Your message was sent successfully. Undo?' : 'Saved'} action="Undo" />
      <Dialog active={dialog} title="Long content" onEscKeyDown={() => setDialog(false)}
        actions={[{ label: 'Cancel', onClick: () => setDialog(false) }, { label: 'OK', onClick: () => setDialog(false) }]}>
        {Array.from({ length: 50 }, (_, index) => <p key={index}>A line of dialog content</p>)}
      </Dialog>
      <Drawer active={drawer} onEscKeyDown={() => setDrawer(false)} aria-label="Sections"><button>Home</button></Drawer>
    </>;
  }
  createRoot(document.getElementById('root')).render(window.__M1_PHONE_MENU__
    ? <div data-testid="phone-menu" style={{ position: 'absolute', left: 180, top: 30, width: 48 }}>
        <IconMenu aria-label="Phone options" icon="⋮" position="topRight">
          <MenuItem caption="A longer menu option" />
        </IconMenu>
      </div>
    : <App />);
`;

let javascript;
test.use({ viewport: { width: 1280, height: 900 } });
test.beforeAll(async () => {
  const root = new URL('../../', import.meta.url);
  const result = await build({
    stdin: { contents: source, resolveDir: fileURLToPath(root), loader: 'jsx' },
    bundle: true,
    write: false,
    format: 'iife',
    // This fixture injects independently compiled CSS below.
    loader: { '.js': 'jsx', '.css': 'empty' },
    define: { 'process.env.NODE_ENV': '"production"' },
  });
  javascript = result.outputFiles[0].text;
});

test.beforeEach(async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.__m1Errors = errors;
  await page.setContent(
    `<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1"><style>${styles}</style><div id="root"></div>`,
  );
  await page.addScriptTag({ content: javascript });
  await expect(page.getByRole('button', { name: 'Open dialog' })).toBeVisible();
});

test.afterEach(async ({ page }) => {
  expect(page.__m1Errors).toEqual([]);
});

test('M1 desktop snackbar has 48px height, 288px minimum width and 24px edge inset', async ({ page }) => {
  const snackbar = page.getByRole('status');
  await expect(snackbar).toHaveCSS('height', '48px');
  await expect(snackbar).toHaveCSS('width', '288px');
  await expect(snackbar).toHaveCSS('max-width', '568px');
  await expect(snackbar).toHaveCSS('left', '24px');
  await expect(snackbar).toHaveCSS('bottom', '24px');
  await expect(snackbar).toHaveCSS('background-color', 'rgb(50, 50, 50)');
  await expect(snackbar).toHaveAttribute('aria-live', 'polite');
});

test('M1 keyboard tooltip uses 22px tile, medium type and 150ms deceleration', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Tip', exact: true });
  await trigger.focus();
  const tooltip = page.getByRole('tooltip');
  await expect(tooltip).toHaveClass(/rt-tooltip-tooltipActive/);
  await expect(tooltip).toHaveCSS('height', '22px');
  await expect(tooltip).toHaveCSS('font-size', '10px');
  await expect(tooltip).toHaveCSS('font-weight', '500');
  await expect(tooltip).toHaveCSS('padding', '4px 8px');
  await expect(tooltip).toHaveCSS('scroll-margin-top', '14px');
  await expect(tooltip).toHaveCSS('animation-duration', '0.15s');
  await expect(tooltip).toHaveCSS('animation-timing-function', 'cubic-bezier(0, 0, 0.2, 1)');
  await expect(trigger).toHaveAttribute('aria-describedby', await tooltip.getAttribute('id'));
  await page.keyboard.press('Escape');
  await expect(tooltip).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('tooltip exit responds to a live reduced-motion preference change', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Tip', exact: true });
  await trigger.focus();
  const tooltip = page.locator('.rt-tooltip-tooltip');
  await expect(tooltip).toBeVisible();
  await tooltip.evaluate((element) => element.style.setProperty('--tooltip-animation-duration', '2s'));
  await page.getByRole('button', { name: 'Open dialog', exact: true }).focus();
  await expect(tooltip).toHaveAttribute('data-state', 'closed');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(tooltip).toHaveCount(0, { timeout: 1000 });
  await trigger.focus();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveCSS('animation-name', 'none');
});

test('M1 long dialog keeps actions onscreen while containing and restoring keyboard focus', async ({ page }) => {
  const opener = page.getByRole('button', { name: 'Open dialog' });
  // Safari does not focus native buttons on a pointer click. Start this focus
  // restoration check through keyboard activation in both browser engines.
  await opener.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Long content' });
  await expect(dialog.getByRole('button', { name: 'Cancel' })).toBeFocused();
  await expect.poll(async () => Math.round((await dialog.boundingBox()).y)).toBe(24);
  const body = dialog.locator(':scope > section');
  expect(await body.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);
  await expect(body).toHaveCSS('overflow-y', 'auto');
  const ok = dialog.getByRole('button', { name: 'OK', exact: true });
  await expect(ok).toHaveCSS('min-width', '64px');
  const bounds = await ok.boundingBox();
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(876);
  await page.keyboard.press('Shift+Tab');
  await expect(ok).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Cancel' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('M1 menus realign inside viewport and restore their trigger on Escape', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'File options' });
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  const menu = page.getByRole('menu');
  await expect(page.getByRole('menuitem', { name: 'Archive', exact: true })).toBeFocused();
  /** Radix constrains the popup to the available side of its anchor, not the full viewport. */
  await expect.poll(async () => (await menu.boundingBox()).height).toBeLessThanOrEqual(852);
  await expect(page.getByRole('menuitem', { name: 'Archive', exact: true })).toHaveCSS('min-height', '48px');
  await expect
    .poll(async () => {
      const bounds = await menu.boundingBox();
      return bounds.x >= 24 && bounds.y >= 24 && bounds.x + bounds.width <= 1256 && bounds.y + bounds.height <= 876;
    })
    .toBe(true);
  expect(
    await menu.locator('.rt-menu-menuInner').evaluate((element) => element.scrollHeight > element.clientHeight),
  ).toBe(true);
  await page.keyboard.press('End');
  await expect(page.getByRole('menuitem', { name: 'Option 19', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('M1 tab icon geometry and inactive inverse color match the original specification', async ({ page }) => {
  const combined = page.getByRole('tablist', { name: 'Text and icon tabs', exact: true });
  await expect(combined.getByRole('tab').first()).toHaveCSS('height', '72px');
  await expect(combined.locator('.rt-tabs-icon').first()).toHaveCSS('margin-bottom', '10px');
  expect(
    await combined
      .getByRole('tab')
      .last()
      .evaluate((element) => {
        const color = getComputedStyle(element).color;
        return color === 'rgba(255, 255, 255, 0.7)' || color === 'color(srgb 1 1 1 / 0.7)';
      }),
  ).toBe(true);
  await expect(page.getByRole('tablist', { name: 'Icon tabs', exact: true }).getByRole('tab').first()).toHaveCSS(
    'height',
    '48px',
  );
});

test('M1 menus measure their current viewport after scrolling to a previously offscreen trigger', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'File options' });
  await trigger.evaluate((element) => {
    const wrapper = element.closest('.rt-menu-iconMenu');
    wrapper.style.position = 'absolute';
    wrapper.style.left = '300px';
    wrapper.style.top = '2400px';
  });
  await page.evaluate(() => window.scrollTo(0, 2200));
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  const menu = page.getByRole('menu');
  const isInsideViewport = async () => {
    const bounds = await menu.boundingBox();
    return bounds.y >= 24 && bounds.y + bounds.height <= 876;
  };
  // Inspect geometry before any menu-item action can scroll it into view.
  await expect.poll(isInsideViewport).toBe(true);
  /** Keep the anchor visible: primitive placement follows its anchor when it leaves the viewport. */
  await page.evaluate(() => window.scrollBy(0, 200));
  await expect.poll(isInsideViewport).toBe(true);
  await expect(page.getByRole('menuitem', { name: 'Archive', exact: true })).toBeFocused();
});

test('M1 unmeasured right-origin menus do not leave stale horizontal page overflow', async ({ page }) => {
  await page.goto('about:blank');
  await page.setContent(
    `<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1"><style>${styles}</style><div id="root"></div>`,
  );
  await page.addScriptTag({ content: `window.__M1_PHONE_MENU__ = true; ${javascript}` });
  const trigger = page.getByRole('button', { name: 'Phone options' });
  await expect(trigger).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  expect(await page.getByTestId('phone-menu').evaluate((element) => element.scrollWidth)).toBe(48);
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  const bounds = await page.getByRole('menu').boundingBox();
  expect(bounds.x + bounds.width).toBeCloseTo(228, 0);
});

test('M1 temporary drawer uses 16dp shadow, a bounded width, and modal focus', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  const opener = page.getByRole('button', { name: 'Open drawer' });
  await opener.focus();
  await page.keyboard.press('Enter');
  const drawer = page.getByRole('dialog', { name: 'Sections' });
  await expect.poll(() => drawer.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  await expect(drawer).toHaveCSS('width', '264px');
  await expect(drawer).toHaveCSS('box-shadow', /16px 24px 2px/);
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
});

test.describe('M1 touch measurements', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test('uses full-width 80px multiline snackbars and 32px touch tooltips', async ({ page }) => {
    const snackbar = page.getByRole('status');
    await expect(snackbar).toHaveAttribute('data-multiline', 'true');
    await expect(snackbar).toHaveCSS('height', '80px');
    await expect(snackbar).toHaveCSS('width', '390px');
    await expect(snackbar).toHaveCSS('left', '0px');
    await page
      .getByRole('button', { name: 'Tip', exact: true })
      .dispatchEvent('pointerdown', { pointerType: 'touch', clientX: 0, clientY: 0 });
    const tooltip = page.getByRole('tooltip');
    await expect(tooltip).toHaveClass(/rt-tooltip-tooltipActive/);
    await expect(tooltip).toHaveCSS('height', '32px');
    await expect(tooltip).toHaveCSS('font-size', '14px');
    await expect(tooltip).toHaveCSS('padding', '8px 16px');
    await expect(tooltip).toHaveCSS('scroll-margin-top', '24px');
  });
});
