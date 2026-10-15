import { readFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

const files = ['colors.css', 'variables.css', ...['input', 'dropdown', 'autocomplete', 'chip', 'radio', 'checkbox', 'switch'].flatMap(name => [`${name}/config.css`, `${name}/theme.css`])];
const css = (await Promise.all(files.map(file => readFile(new URL(`../../components/${file}`, import.meta.url), 'utf8')))).join('\n');

async function color(locator, property, pseudo = null) {
  return locator.evaluate((element, { property, pseudo }) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d');
    context.fillStyle = getComputedStyle(element, pseudo).getPropertyValue(property);
    context.fillRect(0, 0, 1, 1);
    return [...context.getImageData(0, 0, 1, 1).data];
  }, { property, pseudo });
}

// M1 text-fields Layout/States: labels54%, rules42%, disabled text38%,
// 24px icon +16px gap, persistent labels and a2px error underline.
test('M1 text-field states retain legible labels and correct icon and error geometry', async ({ page }) => {
  await page.setContent(`<style>${css}</style><div style="width:320px;padding:30px">
    <div id="idle" class="rt-input-input rt-input-withIcon"><input class="rt-input-inputElement"><span class="rt-input-icon">@</span><span class="rt-input-bar"></span><label class="rt-input-label">Name</label><span class="rt-input-counter">0/20</span></div>
    <div id="fixed" class="rt-input-input"><input class="rt-input-inputElement rt-input-filled" value="Ada"><label class="rt-input-label rt-input-fixed">Always visible</label></div>
    <div id="disabled" class="rt-input-input rt-input-disabled"><input disabled class="rt-input-inputElement"><label class="rt-input-label">Disabled</label></div>
    <div id="error" class="rt-input-input rt-input-errored"><input class="rt-input-inputElement"><span class="rt-input-bar"></span><label class="rt-input-label">Error</label></div>
    <div id="dropdown" class="rt-dropdown-dropdown"><div class="rt-input-input rt-dropdown-value"><input class="rt-input-inputElement"></div></div>
    <div id="autocomplete" class="rt-input-input rt-autocomplete-input"><input class="rt-input-inputElement"></div>
  </div>`);
  expect(await color(page.locator('#idle label'), 'color')).toEqual([0, 0, 0, 138]);
  expect(await color(page.locator('#idle input'), 'border-bottom-color')).toEqual([0, 0, 0, 107]);
  expect(await color(page.locator('#idle .rt-input-counter'), 'color')).toEqual([0, 0, 0, 138]);
  await expect(page.locator('#idle')).toHaveCSS('margin-left', '40px');
  await expect(page.locator('#idle .rt-input-icon')).toHaveCSS('width', '24px');
  await expect(page.locator('#fixed label')).toBeVisible();
  await expect(page.locator('#fixed label')).toHaveCSS('font-size', '12px');
  await expect(page.locator('#disabled input')).toHaveCSS('border-bottom-style', 'dotted');
  expect(await color(page.locator('#disabled input'), 'color')).toEqual([0, 0, 0, 97]);
  expect(await color(page.locator('#disabled label'), 'color')).toEqual([0, 0, 0, 97]);
  await page.locator('#error input').focus();
  await page.locator('#error label').evaluate(element => Promise.all(element.getAnimations().map(animation => animation.finished)));
  await expect(page.locator('#error input')).toHaveCSS('border-bottom-width', '2px');
  await expect(page.locator('#error label')).toHaveCSS('color', 'rgb(222, 50, 38)');
  expect(await color(page.locator('#error .rt-input-bar'), 'background-color', '::before')).toEqual([222, 50, 38, 255]);
  expect(await color(page.locator('#dropdown .rt-dropdown-value'), 'border-top-color', '::after')).toEqual([0, 0, 0, 138]);
  expect(await color(page.locator('#autocomplete'), 'border-top-color', '::after')).toEqual([0, 0, 0, 138]);
  await page.locator('#dropdown input').focus();
  expect(await color(page.locator('#dropdown .rt-dropdown-value'), 'border-top-color', '::after')).toEqual([0, 0, 0, 222]);
  await page.locator('#autocomplete input').focus();
  expect(await color(page.locator('#autocomplete'), 'border-top-color', '::after')).toEqual([0, 0, 0, 222]);
  await page.locator('#autocomplete').evaluate(element => element.classList.add('rt-input-disabled'));
  expect(await color(page.locator('#autocomplete'), 'border-top-color', '::after')).toEqual([0, 0, 0, 97]);
});

// M1 selection controls and chips specify alpha ink, not opaque palette approximations.
test('M1 selection control ink and plain versus contact chip typography match their specified states', async ({ page }) => {
  await page.setContent(`<style>${css}</style>
    <span id="check" class="rt-checkbox-check"></span><span id="radio" class="rt-radio-radio"></span>
    <span id="switch" class="rt-switch-off"><span class="rt-switch-thumb"></span></span>
    <div id="plain" class="rt-chip-chip">Plain chip<span class="rt-chip-delete"><svg class="rt-chip-deleteIcon"></svg></span></div>
    <div id="contact" class="rt-chip-chip rt-chip-avatar">Contact chip</div>`);
  expect(await color(page.locator('#check'), 'border-top-color')).toEqual([0, 0, 0, 138]);
  expect(await color(page.locator('#radio'), 'border-top-color')).toEqual([0, 0, 0, 138]);
  expect(await color(page.locator('#switch'), 'background-color')).toEqual([0, 0, 0, 97]);
  await expect(page.locator('#switch')).toHaveCSS('width', '36px');
  await expect(page.locator('#switch .rt-switch-thumb')).toHaveCSS('width', '20px');
  await expect(page.locator('#plain')).toHaveCSS('font-size', '13px');
  await expect(page.locator('#contact')).toHaveCSS('font-size', '14px');
  expect(await color(page.locator('#plain'), 'color')).toEqual([0, 0, 0, 222]);
  expect(await color(page.locator('#plain .rt-chip-deleteIcon'), 'background-color')).toEqual([0, 0, 0, 138]);
});

test('gallery pickers keep compact dialog styling and restore focus without reopening', async ({ page }) => {
  await page.goto('/playground');
  const date = page.getByLabel('Travel date', { exact: true });
  await date.focus();
  await expect(date).toHaveAttribute('aria-expanded', 'false');
  await date.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Choose date' });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(':scope > section')).toHaveCSS('padding', '0px');
  await expect(dialog.getByRole('button', { name: 'Ok', exact: true })).toHaveCSS('color', 'rgb(63, 81, 181)');
  await dialog.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(date).toBeFocused();
  await expect(date).toHaveAttribute('aria-expanded', 'false');
  await page.getByLabel('Departure time', { exact: true }).click();
  const clock = page.getByRole('dialog', { name: 'Choose time' });
  await expect(clock.locator(':scope > section')).toHaveCSS('padding', '0px');
  await expect(clock.locator('.rt-time-picker-clockWrapper')).toHaveCSS('background-color', 'rgb(238, 238, 238)');
  await clock.getByRole('button', { name: 'AM', exact: true }).click();
  await clock.getByRole('button', { name: 'Ok', exact: true }).click();
  await expect(page.getByLabel('Departure time', { exact: true })).toHaveValue('2:30 am');
});
