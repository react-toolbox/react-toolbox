import { test as base, expect } from '@playwright/test';

const test = base.extend({
  page: async ({ page }, use) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await use(page);
    expect(errors, 'The example should hydrate and interact without browser errors').toEqual([]);
  },
});

test.beforeEach(async ({ page }) => {
  await page.goto('/playground');
  await expect(page.getByRole('heading', { name: 'Good design is in the details.' })).toBeVisible();
});

test('renders every gallery section with the default Material palette and sizes', async ({ page }) => {
  await expect(page.locator('main > section')).toHaveCount(10);
  const primary = page.getByRole('button', { name: 'Primary', exact: true });
  await expect(primary).toHaveCSS('background-color', 'rgb(63, 81, 181)');
  await expect(primary).toHaveCSS('height', '36px');
  const accent = page.getByRole('button', { name: 'Accent', exact: true });
  await expect(accent).toHaveCSS('background-color', 'rgb(216, 27, 96)');
  await expect(accent).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(page.getByRole('button', { name: 'Create item', exact: true })).toHaveCSS('height', '56px');
  await expect(page.getByRole('button', { name: 'Disabled', exact: true })).toBeDisabled();
  await page.evaluate(() => document.fonts.ready);
  for (const selector of ['body', '.material-icons']) {
    expect(
      await page
        .locator(selector)
        .first()
        .evaluate((element) => {
          const style = getComputedStyle(element);
          return document.fonts.check(`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`);
        }),
    ).toBe(true);
  }
});

test('preserves ripple feedback, tooltip behavior, and file selection', async ({ page }) => {
  const primary = page.getByRole('button', { name: 'Primary', exact: true });
  const box = await primary.boundingBox();
  await page.mouse.move(box.x + 20, box.y + 18);
  await page.mouse.down();
  await expect(primary.locator('.rt-ripple-ripple')).toHaveCount(1);
  await expect(primary.locator('.rt-ripple-ripple')).toHaveCSS('transition-duration', '0.8s');
  await page.mouse.up();
  await expect(page.getByText('Primary action selected', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Dismiss', exact: true }).click();
  await page.getByRole('button', { name: 'Touch the surface' }).click();
  await expect(page.getByText('Surface interactions: 1')).toBeVisible();
  await page.getByRole('button', { name: 'Hover for tooltip' }).hover();
  await expect(page.getByText('Original Material Design tooltip', { exact: true })).toBeVisible();
  await page
    .locator('#buttons input[type="file"]')
    .setInputFiles({ name: 'example.txt', mimeType: 'text/plain', buffer: Buffer.from('A local example') });
  await expect(page.getByText('example.txt', { exact: true })).toBeVisible();
});

test('updates form inputs, dropdowns, and autocomplete through existing callbacks', async ({ page }) => {
  await page.getByLabel('Your name', { exact: true }).fill('Modern React');
  await expect(page.getByLabel('Your name', { exact: true })).toHaveValue('Modern React');
  await page.getByLabel('Notes', { exact: true }).fill('The original styling, the current React API.');
  await expect(page.locator('#inputs')).toContainText('44/120');
  await page.getByRole('combobox', { name: 'Destination', exact: true }).click();
  await page.getByRole('option', { name: 'Tokyo', exact: true }).click();
  await expect(page.getByText('Destination: Tokyo · Country: Spain')).toBeVisible();
  await page.getByRole('combobox', { name: 'Country', exact: true }).fill('Jap');
  await page.getByRole('option', { name: 'Japan', exact: true }).click();
  await expect(page.getByText('Destination: Tokyo · Country: Japan')).toBeVisible();
  await page.getByRole('combobox', { name: 'Interests', exact: true }).fill('React');
  await page.getByRole('option', { name: 'React', exact: true }).click();
  await expect(page.locator('#inputs [data-react-toolbox="chip"]')).toHaveCount(2);
});

test('toggles checkbox, radio, switch, list, and removable chip states', async ({ page }) => {
  const checked = page.getByLabel('Keep me signed in', { exact: true });
  await expect(checked).toBeChecked();
  await page.getByText('Keep me signed in', { exact: true }).click();
  await expect(checked).not.toBeChecked();
  await page.getByText('Product updates', { exact: true }).click();
  await page.getByText('Compact', { exact: true }).click();
  await page.getByText('Notifications', { exact: true }).click();
  await expect(page.getByText('Density: compact · Notifications off')).toBeVisible();
  await page
    .locator('#identity [data-react-toolbox="chip"]')
    .filter({ hasText: 'Remove this chip' })
    .locator('.rt-chip-delete')
    .click();
  await expect(page.getByRole('button', { name: 'Restore chip' })).toBeVisible();
  await page.getByRole('button', { name: 'Restore chip' }).click();
  await expect(page.getByText('Remove this chip', { exact: true })).toBeVisible();
  const listCheck = page.locator('#cards input[type="checkbox"]');
  await expect(listCheck).toBeChecked();
  await page.getByText('Keep collection offline', { exact: true }).click();
  await expect(listCheck).not.toBeChecked();
});

test('switches tabs and selects static and icon menus', async ({ page }) => {
  await page.getByRole('tab', { name: 'Details', exact: false }).click();
  await expect(page.getByText('The details tab is now selected.')).toBeVisible();
  await page.locator('#navigation [data-react-toolbox="menu"]').first().getByText('Share', { exact: true }).click();
  await expect(page.getByText('Menu selection: share')).toBeVisible();
  await page.getByTestId('icon-menu').getByRole('button').click();
  await page.getByTestId('icon-menu').getByText('Duplicate item', { exact: true }).click();
  await expect(page.getByText('Duplicate selected', { exact: true })).toBeVisible();
});

test('opens and dismisses portals, calendar, and clock without legacy React APIs', async ({ page }) => {
  await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
  await expect(page.getByText('Keep this moment?', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Save moment' }).click();
  await expect(page.getByText('Moment saved to your collection.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Dismiss', exact: true }).click();
  await page.getByRole('button', { name: 'Open drawer', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Your workspace' })).toBeVisible();
  await expect(page.locator('[data-react-toolbox="drawer"]')).toHaveClass(/rt-drawer-active/);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('heading', { name: 'Your workspace' })).not.toBeVisible();
  await page.getByLabel('Travel date', { exact: true }).click();
  await expect(page.locator('[data-react-toolbox="dialog"]')).toBeVisible();
  await page.locator('.rt-date-picker-day').filter({ hasText: /^21$/ }).click();
  await page.getByRole('button', { name: /^ok$/i }).click();
  await expect(page.getByLabel('Travel date', { exact: true })).toHaveValue(/21/);
  await page.getByLabel('Departure time', { exact: true }).click();
  await expect(page.locator('.rt-time-picker-clock')).toBeVisible();
  await page.getByRole('button', { name: /^ok$/i }).click();
  await expect(page.getByLabel('Departure time', { exact: true })).toHaveValue('2:30 pm');
});

test('edits sliders and sorts and selects table rows', async ({ page }) => {
  const slider = page.locator('#progress [data-react-toolbox="slider"]').first();
  await slider.getByRole('textbox').fill('72');
  await slider.getByRole('textbox').press('Tab');
  await expect(page.getByText('Progress: 72%')).toBeVisible();
  await slider.getByRole('slider').focus();
  await page.keyboard.press('ArrowUp');
  await expect(page.getByText('Progress: 73%')).toBeVisible();
  await page
    .locator('#tables')
    .getByRole('columnheader', { name: /Calories/ })
    .click();
  await expect(page.getByText('1 row selected · Calories sorted descending')).toBeVisible();
  await expect(page.locator('#tables tbody tr').first()).toContainText('Cupcake');
  await page.locator('#tables thead [data-react-toolbox="checkbox"]').click();
  await expect(page.getByText('4 rows selected · Calories sorted descending')).toBeVisible();
});

test('composes the app layout with navigation and a sidebar', async ({ page }) => {
  await page.getByRole('link', { name: 'Layout example', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Space for your ideas.' })).toBeVisible();
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByText('Pin navigation', { exact: true })).toBeVisible();
  await page.getByText('Pin navigation', { exact: true }).click();
  await expect(page.locator('.rt-layout-layout')).toHaveClass(/rt-layout-navDrawerPinned/);
  await page.getByRole('button', { name: 'Close navigation' }).click();
  await page.getByRole('button', { name: 'Open details' }).click();
  await expect(page.getByRole('heading', { name: 'Collection details' })).toBeVisible();
  await page.getByRole('button', { name: 'Close details' }).click();
  await expect(page.getByRole('heading', { name: 'Collection details' })).not.toBeVisible();
});

test('fits the gallery on a phone without changing component styles', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('heading', { name: 'Good design is in the details.' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
  await expect(page.locator('[data-react-toolbox="dialog"]')).toBeVisible();
  await expect(page.locator('[data-react-toolbox="dialog"]')).toHaveClass(/rt-dialog-active/);
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-react-toolbox="dialog"]')).not.toBeVisible();
});

test('scopes theme variables and carries them through portals', async ({ page }) => {
  await page.goto('/theme-demo');
  const original = page.getByRole('button', { name: 'Default primary', exact: true });
  const custom = page.getByRole('button', { name: 'Scoped primary', exact: true });
  await expect(original).toHaveCSS('background-color', 'rgb(63, 81, 181)');
  await expect(custom).toHaveCSS('background-color', 'rgb(0, 105, 92)');
  await page.getByLabel('Themed date', { exact: true }).click();
  await expect(page.locator('.rt-date-picker-header')).toHaveCSS('background-color', 'rgb(0, 105, 92)');
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await page.getByRole('button', { name: 'Restore original colors', exact: true }).click();
  await expect(custom).toHaveCSS('background-color', 'rgb(63, 81, 181)');
  await expect(original).toHaveCSS('background-color', 'rgb(63, 81, 181)');
});
