import { test, expect } from '@playwright/test';

async function expectPanelFits(menu) {
  await expect.poll(() => menu.evaluate(element => {
    const panel = element.querySelector('.rt-menu-outline').getBoundingClientRect();
    const list = element.querySelector('.rt-menu-menuInner').getBoundingClientRect();
    return Math.max(...['x', 'y', 'width', 'height'].map(key => Math.abs(panel[key] - list[key])));
  })).toBeLessThan(0.02);
}

test('keeps the menu panel around its content after ordinary font loading', async ({ page }) => {
  // Intentionally use ordinary loading, without the legacy comparison's font gate.
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const menu = page.locator('.rt-menu-static').first();
  await expect(menu).toBeVisible();
  await expectPanelFits(menu);
  expect((await menu.boundingBox()).width).toBeLessThan(280);
  await expect(menu.locator('.rt-menu-shortcut')).toHaveText('⌘D');
});

test('tracks a static menu stretching, resizing, and retaining browser list margins', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const menu = page.locator('.rt-menu-static').first();
  await menu.evaluate(element => { element.parentElement.style.display = 'grid'; });
  await expectPanelFits(menu);
  await menu.evaluate(element => { element.parentElement.style.width = '280px'; });
  await expectPanelFits(menu);
  await expect(menu.locator('.rt-menu-outline')).toHaveCSS('width', '280px');
  await menu.locator('.rt-menu-menuInner').evaluate(element => { element.style.margin = '14px 0'; });
  await expectPanelFits(menu);
});
