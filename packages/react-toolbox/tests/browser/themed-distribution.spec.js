import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

async function settle(page) {
  await page.evaluate(async () => {
    await new Promise(requestAnimationFrame);
    await Promise.all(
      document
        .getAnimations()
        .filter((animation) => animation.effect?.getTiming().iterations !== Infinity)
        .map((animation) => animation.finished.catch(() => {})),
    );
  });
}

async function accessible(page, root) {
  await settle(page);
  const audit = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']);
  if (root) audit.include(root);
  const result = await audit.analyze();
  expect(
    result.violations.map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
    })),
  ).toEqual([]);
}

for (const appearance of ['Original Material', 'Field Notes', 'Night']) {
  test(`${appearance} preserves scoped colors, accessible states and mixed picker focus`, async ({ page }) => {
    await page.clock.setFixedTime(new Date(2026, 9, 17, 12));
    await page.goto('/docs/theming');
    await page.getByRole('radiogroup', { name: 'Example appearance' }).getByText(appearance, { exact: true }).click();
    await page.getByRole('button', { name: 'Plan a visit', exact: true }).hover();
    await accessible(page);
    await page.getByRole('button', { name: 'Survey actions' }).click();
    const menu = page.getByRole('menu');
    await expect(menu).toHaveCSS(
      'background-color',
      appearance === 'Night'
        ? 'rgb(32, 59, 52)'
        : appearance === 'Field Notes'
          ? 'rgb(255, 253, 247)'
          : 'rgb(255, 255, 255)',
    );
    /** Radix hides and traps the page behind a modal menu; axe cannot infer that keyboard trap. */
    await page.keyboard.press('Tab');
    await expect.poll(() => menu.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Shift+Tab');
    await expect.poll(() => menu.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    await accessible(page, '[role=menu]');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Survey actions' })).toBeFocused();
    const opener = page.getByRole('button', { name: 'Plan a visit', exact: true });
    await opener.click();
    const parent = page.getByRole('dialog', { name: 'Plan a visit', exact: true });
    await expect(parent).toHaveCSS(
      'background-color',
      appearance === 'Night'
        ? 'rgb(32, 59, 52)'
        : appearance === 'Field Notes'
          ? 'rgb(255, 253, 247)'
          : 'rgb(255, 255, 255)',
    );
    await accessible(page);
    for (const [label, dialogName] of [
      ['Date', 'Choose date'],
      ['Meeting time', 'Choose time'],
    ]) {
      const picker = parent.getByRole('combobox', { name: label, exact: true });
      await picker.focus();
      await picker.press('ArrowDown');
      const dialog = page.getByRole('dialog', { name: dialogName });
      await expect(dialog).toBeVisible();
      await expect(dialog).toHaveCSS('opacity', '1');
      if (label === 'Date') {
        await dialog.getByRole('button', { name: '17 October 2026', exact: true }).hover();
      }
      await accessible(page);
      await page.keyboard.press('Escape');
      await expect(picker).toBeFocused();
      await expect(parent).toHaveCSS('pointer-events', 'auto');
    }
    await page.keyboard.press('Escape');
    await expect(opener).toBeFocused();
    const navigation = page.getByRole('button', { name: 'Open field navigation' });
    await navigation.focus();
    await navigation.press('Enter');
    const drawer = page.getByRole('dialog', { name: 'Field navigation' });
    await expect(drawer).toBeVisible();
    await accessible(page);
    await drawer.getByRole('button', { name: 'Close navigation' }).click();
    await expect(page.getByRole('button', { name: 'Open field navigation' })).toBeFocused();
    await page.getByRole('button', { name: 'About this workspace' }).focus();
    await expect(page.getByRole('tooltip')).toBeVisible();
    await accessible(page);
    await page.keyboard.press('Escape');
  });
}

for (const width of [1440, 390]) {
  test(`Field Notes navigation stays within its container at ${width}px and leaves the docs usable`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/docs/theming');
    const opener = page.getByRole('button', { name: 'Open field navigation' });
    const drawer = page.getByRole('dialog', { name: 'Field navigation' });
    await opener.click();
    await expect(drawer).toBeVisible();
    await settle(page);
    const bounds = await drawer.evaluate((element) => {
      const panel = element.getBoundingClientRect();
      const viewport = element.closest('[data-field-notes-viewport]').getBoundingClientRect();
      return {
        x: panel.left - viewport.left,
        y: panel.top - viewport.top,
        height: panel.height - viewport.height,
        remainingWidth: viewport.width - panel.width,
      };
    });
    expect(bounds.x).toBeCloseTo(0, 0);
    expect(bounds.y).toBeCloseTo(0, 0);
    expect(bounds.height).toBeCloseTo(0, 0);
    expect(bounds.remainingWidth).toBeGreaterThanOrEqual(55);
    await expect(drawer).not.toHaveAttribute('aria-modal', 'true');
    await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
    await expect(page.locator('body')).toHaveCSS('pointer-events', 'auto');

    const scrollY = await page.evaluate(() => window.scrollY);
    await page.mouse.move(width - 10, 600);
    await page.mouse.wheel(0, 120);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(scrollY);
    await expect(drawer).toBeVisible();

    const appearance = page.getByRole('radiogroup', { name: 'Example appearance' });
    await appearance.getByText('Night', { exact: true }).click();
    await expect(appearance.getByRole('radio', { name: 'Night', exact: true })).toBeChecked();
    await expect(drawer).toHaveCount(0);
    await opener.focus();
    await opener.press('Enter');
    await expect(drawer).toHaveCSS('background-color', 'rgb(32, 59, 52)');
    await page.keyboard.press('Escape');
    await expect(drawer).toHaveCount(0);
    await expect(opener).toBeFocused();
  });
}

test('component compositions remain accessible after filtering and async actions', async ({ page }) => {
  await page.goto('/docs/components/table#composition');
  await accessible(page);
  await page.getByRole('searchbox', { name: 'Filter projects' }).fill('Coastal');
  await expect(page.getByRole('cell', { name: 'Coastal survey', exact: true })).toBeVisible();
  await accessible(page);
  await page.goto('/docs/components/button#composition');
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(page.getByText('Changes saved.', { exact: true })).toBeVisible();
  await accessible(page);
  await page.goto('/docs/components/dialog#composition');
  await page.getByRole('button', { name: 'Delete example draft', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Cancel', exact: true })).toBeFocused();
  await accessible(page);
  await page.keyboard.press('Escape');
});
