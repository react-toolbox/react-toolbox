import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { css } from './material-fixture.js';

const source = `
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from './src/material/button';
import { Autocomplete } from './src/material/autocomplete';
import { Dropdown } from './src/material/dropdown';
import { Slider } from './src/material/slider';
import { Tabs, Tab } from './src/material/tabs';
import { IconMenu, MenuCheckboxItem, MenuRadioGroup, MenuRadioItem } from './src/material/menu';
import { Tooltip } from './src/material/tooltip';
const HintButton = Tooltip(Button);
function App() {
  const [saved, setSaved] = useState('');
  const [commit, setCommit] = useState(40);
  return <main style={{ margin: 32, width: 420 }}>
    <h1>Consumer workflows</h1>
    <form onSubmit={event => { event.preventDefault(); setSaved(JSON.stringify(Array.from(new FormData(event.currentTarget)))); }}>
      <Autocomplete label="People" name="people" required clearable defaultValue={['ada']} emptyMessage="No people found"
        source={[
          { value: 'ada', label: <strong>Ada</strong>, textValue: 'Ada', group: 'Engineering' },
          { value: 'grace', label: 'Grace', group: 'Engineering' },
          { value: 'alan', label: 'Alan', group: 'Research', disabled: true },
        ]} />
      <Slider aria-label="Volume" name="volume" defaultValue={40} step={1} onValueCommit={setCommit} />
      <Button type="submit" label="Save" /><Button type="reset" label="Reset" />
    </form>
    <output aria-label="Saved values">{saved}</output>
    <output aria-label="Committed volume">{commit}</output>
    <Dropdown label="Destination" defaultValue="fr" source={[
      { value: 'fr', label: 'France', group: 'Europe' },
      { value: 'jp', label: 'Japan', group: 'Asia' },
      { value: 'cn', label: 'China', group: 'Asia', disabled: true },
    ]} />
    <IconMenu trigger={<HintButton asChild tooltip="Change display settings" tooltipDelay={0}><button type="button">Display options</button></HintButton>}>
      <MenuCheckboxItem caption="Toolbar" defaultChecked />
      <MenuRadioGroup aria-label="Density" defaultValue="comfortable">
        <MenuRadioItem value="comfortable" caption="Comfortable" />
        <MenuRadioItem value="compact" caption="Compact" />
      </MenuRadioGroup>
    </IconMenu>
    <Tabs defaultIndex={0} activationMode="manual" hideMode="display" aria-label="Settings">
      <Tab label="Profile"><input aria-label="Display name" defaultValue="Ada" /></Tab>
      <Tab label="Notifications">Notifications panel</Tab>
    </Tabs>
    <Slider dir="rtl" defaultValue={25} step={1} aria-label="RTL volume" />
    <HintButton asChild tooltip="Go to the destination" tooltipDelay={0}><a href="#destination">Router destination</a></HintButton>
  </main>;
}
createRoot(document.getElementById('root')).render(<App />);
`;
let javascript;
test.beforeAll(async () => {
  javascript = (
    await build({
      stdin: { contents: source, resolveDir: fileURLToPath(new URL('../../', import.meta.url)), loader: 'jsx' },
      bundle: true,
      write: false,
      format: 'iife',
      loader: { '.css': 'empty' },
      define: { 'process.env.NODE_ENV': '"production"' },
    })
  ).outputFiles[0].text;
});
async function mount(page) {
  await page.setContent(
    `<!doctype html><html lang="en"><head><title>Consumer workflows</title><style>${css}</style></head><body><div id="root"></div></body></html>`,
  );
  await page.addScriptTag({ content: javascript });
  await expect(page.getByRole('heading', { name: 'Consumer workflows' })).toBeVisible();
}

test('submits selected IDs and slider values, validates and resets native forms', async ({ page }) => {
  await mount(page);
  const combo = page.getByRole('combobox', { name: 'People' });
  await combo.fill('Gr');
  await page.getByRole('option', { name: 'Grace' }).click();
  await page.getByRole('slider', { name: 'Volume', exact: true }).press('ArrowRight');
  await expect(page.getByRole('status', { name: 'Committed volume' })).toHaveText('41');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  const submitted = JSON.parse(await page.getByRole('status', { name: 'Saved values' }).textContent());
  expect(submitted).toEqual(
    expect.arrayContaining([
      ['people', 'ada'],
      ['people', 'grace'],
      ['volume', '41'],
    ]),
  );
  await page.getByRole('button', { name: 'Clear selection' }).click();
  await combo.press('Escape');
  await expect(combo).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(combo).toBeFocused();
  await expect(combo).toHaveAttribute('aria-invalid', 'true');
  await combo.press('Escape');
  await expect(combo).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.getByRole('slider', { name: 'Volume', exact: true })).toHaveAttribute('aria-valuenow', '40');
  await expect(combo).not.toHaveAttribute('aria-invalid', 'true');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  expect(JSON.parse(await page.getByRole('status', { name: 'Saved values' }).textContent())).toEqual([
    ['people', 'ada'],
    ['volume', '40'],
  ]);
});

test('supports grouped choices and selection menus with keyboard access and valid semantics', async ({ page }) => {
  await mount(page);
  const dropdown = page.getByRole('combobox', { name: 'Destination' });
  await dropdown.click();
  await expect(page.getByRole('group', { name: 'Asia' })).toBeVisible();
  await page.keyboard.press('j');
  await expect(page.getByRole('option', { name: 'Japan' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(dropdown).toHaveValue('Japan');
  const trigger = page.getByRole('button', { name: 'Display options' });
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  const toolbar = page.getByRole('menuitemcheckbox', { name: 'Toolbar' });
  await expect(toolbar).toBeFocused();
  await toolbar.press('Space');
  await expect(toolbar).toHaveAttribute('aria-checked', 'false');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await toolbar.press('End');
  const compact = page.getByRole('menuitemradio', { name: 'Compact' });
  await expect(compact).toBeFocused();
  await compact.press('Enter');
  await expect(compact).toHaveAttribute('aria-checked', 'true');
  await expect(page.getByRole('menu')).toHaveCSS('opacity', '1');
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(audit.violations).toEqual([]);
  await compact.press('Escape');
  await expect(trigger).toBeFocused();
});

test('keeps grouped and empty autocomplete results accessible', async ({ page }) => {
  await mount(page);
  const combo = page.getByRole('combobox', { name: 'People' });
  const auditPage = () => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect((await auditPage()).violations).toEqual([]);
  /** Base UI's untrapped combobox hides outside controls from AT only while open.
   * Audit the open composite without suppressing rules, then verify native Tab closes it
   * before outside focus and audit the entire restored page. */
  const auditOpen = () =>
    new AxeBuilder({ page })
      .include('[data-react-toolbox="autocomplete"]')
      .include('[data-slot="AutocompletePositioner"]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
  await combo.fill('Gr');
  await expect(page.getByRole('group', { name: 'Engineering' })).toBeVisible();
  await expect(page.locator('[data-slot="AutocompletePopup"]')).toHaveCSS('opacity', '1');
  expect((await auditOpen()).violations).toEqual([]);
  await combo.fill('No matching person');
  await expect(page.getByRole('status').filter({ hasText: 'No people found' })).toBeVisible();
  expect((await auditOpen()).violations).toEqual([]);
  await combo.press('Tab');
  await expect(combo).toHaveAttribute('aria-expanded', 'false');
  await expect
    .poll(() => page.evaluate(() => document.activeElement?.closest('[aria-hidden="true"], [inert]') === null))
    .toBe(true);
  expect((await auditPage()).violations).toEqual([]);
});

test('activates tabs manually and keeps their panel state', async ({ page }) => {
  await mount(page);
  await page.getByRole('textbox', { name: 'Display name' }).fill('Grace');
  await page.getByRole('tab', { name: 'Profile' }).focus();
  await page.keyboard.press('ArrowRight');
  const notifications = page.getByRole('tab', { name: 'Notifications' });
  await expect(notifications).toBeFocused();
  await expect(notifications).toHaveAttribute('aria-selected', 'false');
  await notifications.press('Space');
  await expect(page.getByRole('tabpanel')).toHaveText('Notifications panel');
  await notifications.press('ArrowLeft');
  await expect(page.getByRole('tab', { name: 'Profile' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('textbox', { name: 'Display name' })).toHaveValue('Grace');
});

test('moves the RTL slider thumb and active track toward the same value', async ({ page }) => {
  await mount(page);
  const slider = page.getByRole('slider', { name: 'RTL volume' });
  await slider.press('ArrowLeft');
  await expect(slider).toHaveAttribute('aria-valuenow', '26');
  const bounds = await slider.locator('xpath=ancestor::*[contains(@class, "rt-slider-container")]').boundingBox();
  const knob = await slider.locator('.rt-slider-knob').boundingBox();
  expect(knob.x + knob.width / 2 - bounds.x).toBeCloseTo(bounds.width * 0.74, 0);
  await page.mouse.click(bounds.x + bounds.width * 0.2, bounds.y + bounds.height / 2);
  await expect(slider).toHaveAttribute('aria-valuenow', '80');
  await expect(page.getByRole('link', { name: 'Router destination' })).toHaveAttribute('href', '#destination');
});

test('composes tooltips with slotted links and menu triggers without adding interactive wrappers', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await mount(page);
  const link = page.getByRole('link', { name: 'Router destination' });
  await link.focus();
  await expect(page.getByRole('tooltip')).toHaveText('Go to the destination');
  await expect(link).toHaveAccessibleDescription('Go to the destination');
  await expect(link.locator('a, button')).toHaveCount(0);
  await link.press('Escape');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  const trigger = page.getByRole('button', { name: 'Display options' });
  await trigger.focus();
  await expect(page.getByRole('tooltip')).toHaveText('Change display settings');
  await expect(trigger.locator('button')).toHaveCount(0);
  await trigger.press('Enter');
  await expect(page.getByRole('menuitemcheckbox', { name: 'Toolbar' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(errors).toEqual([]);
});
