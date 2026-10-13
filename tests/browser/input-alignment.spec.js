import { test, expect } from '@playwright/test';

test('single-line and multiline inputs use the theme font', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const fields = page.locator('#inputs input, #inputs textarea');
  const themeFont = await page.locator('#inputs .rt-input-input').first()
    .evaluate(element => getComputedStyle(element).fontFamily);
  expect(themeFont).toContain('Roboto');
  for (const field of await fields.all()) {
    await expect(field).toHaveCSS('font-family', themeFont);
    await expect(field).toHaveCSS('font-size', '16px');
  }

  // A scoped font choice must reach native controls, including textarea's
  // browser-default monospace font, without changing the field text size.
  await page.locator('#inputs').evaluate(element => element.style.setProperty('--preferred-font', 'Georgia, serif'));
  for (const field of await fields.all()) {
    await expect(field).toHaveCSS('font-family', 'Georgia, serif');
    await expect(field).toHaveCSS('font-size', '16px');
  }
});

for (const width of [1440, 390]) {
  test(`dropdown and autocomplete share field alignment at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    const geometry = async label => page.getByRole('combobox', { name: label, exact: true }).evaluate(input => {
      const outer = input.closest('[data-react-toolbox="dropdown"], [data-react-toolbox="autocomplete"]');
      const field = input.parentElement;
      const origin = outer.getBoundingClientRect();
      const bounds = input.getBoundingClientRect();
      const label = field.querySelector('label').getBoundingClientRect();
      const chevron = getComputedStyle(field, '::after');
      return {
        top: origin.top,
        inputTop: bounds.top - origin.top,
        underline: bounds.bottom - origin.top,
        height: bounds.height,
        labelTop: label.top - origin.top,
        labelHeight: label.height,
        chevronTop: field.getBoundingClientRect().top - origin.top + parseFloat(chevron.top),
      };
    });
    const destination = await geometry('Destination');
    const country = await geometry('Country');
    if (width === 1440) expect(country.top).toBe(destination.top);
    // Compare local keylines too: the phone layout stacks the same controls.
    const { top: destinationTop, ...destinationField } = destination;
    const { top: countryTop, ...countryField } = country;
    expect(countryField).toEqual(destinationField);
  });
}
