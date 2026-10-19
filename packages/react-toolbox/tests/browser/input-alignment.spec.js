import { test, expect } from '@playwright/test';

test('a labeled input reveals its hint on focus and hides it while filled', async ({ page }) => {
  await page.goto('/docs/components/input');
  const field = page.getByRole('textbox', { name: 'Project name', exact: true });
  const hint = page.getByText('Something worth making', { exact: true });
  await expect(hint).toBeHidden();
  await field.click();
  await expect(hint).toBeVisible();
  await expect(hint).toHaveCSS('opacity', '1');
  await field.fill('Weekend notes');
  await expect(hint).toHaveCSS('opacity', '0');
  await field.clear();
  await expect(hint).toHaveCSS('opacity', '1');
  await field.blur();
  await expect(hint).toBeHidden();
});

test('single-line and multiline inputs use the theme font', async ({ page }) => {
  await page.goto('/playground');
  await page.evaluate(() => document.fonts.ready);
  const fields = page.locator('#inputs input:not([aria-hidden=true]), #inputs textarea');
  const themeFont = await page
    .locator('#inputs .rt-input-input')
    .first()
    .evaluate((element) => getComputedStyle(element).fontFamily);
  expect(themeFont).toContain('Roboto');
  for (const field of await fields.all()) {
    await expect(field).toHaveCSS('font-family', themeFont);
    await expect(field).toHaveCSS('font-size', '16px');
  }

  // A scoped font choice must reach native controls, including textarea's
  // browser-default monospace font, without changing the field text size.
  await page.locator('#inputs').evaluate((element) => element.style.setProperty('--preferred-font', 'Georgia, serif'));
  for (const field of await fields.all()) {
    await expect(field).toHaveCSS('font-family', 'Georgia, serif');
    await expect(field).toHaveCSS('font-size', '16px');
  }
});

for (const width of [1440, 390]) {
  test(`dropdown and autocomplete share field alignment at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/playground');
    await page.evaluate(() => document.fonts.ready);

    const geometry = async (label) =>
      page.getByRole('combobox', { name: label, exact: true }).evaluate((input) => {
        const outer = input.closest('[data-react-toolbox="dropdown"], [data-react-toolbox="autocomplete"]');
        const field = input.parentElement;
        const origin = outer.getBoundingClientRect();
        const bounds = input.getBoundingClientRect();
        const label = field.querySelector('label').getBoundingClientRect();
        const chevron = getComputedStyle(field, '::after');
        const paddingEnd = parseFloat(getComputedStyle(input).paddingInlineEnd);
        const chevronSpace = parseFloat(chevron.insetInlineEnd) + 2 * parseFloat(chevron.borderLeftWidth);
        return {
          top: origin.top,
          inputTop: bounds.top - origin.top,
          underline: bounds.bottom - origin.top,
          height: bounds.height,
          labelTop: label.top - origin.top,
          labelHeight: label.height,
          chevronTop: field.getBoundingClientRect().top - origin.top + parseFloat(chevron.top),
          paddingEnd,
          chevronSpace,
        };
      });
    const destination = await geometry('Destination');
    const country = await geometry('Country');
    expect(destination.paddingEnd).toBeGreaterThan(destination.chevronSpace);
    expect(country.paddingEnd).toBeGreaterThan(country.chevronSpace);
    if (width === 1440) expect(country.top).toBe(destination.top);
    // Compare local keylines too: the phone layout stacks the same controls.
    const { top: destinationTop, ...destinationField } = destination;
    const { top: countryTop, ...countryField } = country;
    expect(countryField).toEqual(destinationField);
  });
}
