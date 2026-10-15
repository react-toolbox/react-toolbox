import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { css } from './material-fixture.js';
import { components } from '../../../../apps/docs/app/docs/catalog';

const source = `
  import React, { useState } from 'react';
  import { createRoot } from 'react-dom/client';
  import Button from './src/material/button/Button';
  import Input from './src/material/input/Input';
  import Dropdown from './src/material/dropdown/Dropdown';
  import Checkbox from './src/material/checkbox/Checkbox';
  import Switch from './src/material/switch/Switch';
  import Slider from './src/material/slider/Slider';
  import Dialog from './src/material/dialog/Dialog';
  import Drawer from './src/material/drawer/Drawer';
  import DatePicker from './src/material/date-picker/DatePicker';
  import TimePicker from './src/material/time-picker/TimePicker';
  import ProgressBar from './src/material/progress-bar/ProgressBar';
  import IconMenu from './src/material/menu/IconMenu';
  import MenuItem from './src/material/menu/MenuItem';
  import { useTooltip } from './src/material/tooltip/Tooltip';
  function App() {
    const [name, setName] = useState('Ada');
    const [destination, setDestination] = useState('Madrid');
    const [checked, setChecked] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [volume, setVolume] = useState(40);
    const [dialog, setDialog] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const tip = useTooltip({ tooltip: 'More information' });
    return <main style={{ maxWidth: 600, margin: 32 }}>
      <h1>Material accessibility</h1>
      <div data-testid="host-motion" style={{ transitionDuration: '1s' }} />
      <Input label="Name" value={name} onChange={setName} />
      <Dropdown label="Destination" value={destination} onChange={setDestination}
        source={['Madrid', 'Barcelona', 'London']} />
      <DatePicker label="Start date" value={new Date(2026, 9, 13, 9, 30)} />
      <TimePicker label="Reminder" value={new Date(2026, 9, 13, 9, 30)} />
      <TimePicker label="Twelve-hour time" format="ampm" value={new Date(2026, 9, 13, 9, 30)} />
      <Checkbox label="Subscribe" checked={checked} onChange={setChecked} />
      <Switch label="Notifications" checked={notifications} onChange={setNotifications} />
      <Slider aria-label="Volume" value={volume} onChange={setVolume} step={1} />
      <Button primary raised label="Save" />
      <Button primary label="Open dialog" onClick={() => setDialog(true)} />
      <Button primary label="Open drawer" onClick={() => setDrawer(true)} />
      <Button primary {...tip.triggerProps} label="Information" />{tip.tooltip}
      <IconMenu aria-label="File actions"><MenuItem caption="Archive" /><MenuItem caption="Delete" /></IconMenu>
      <ProgressBar aria-label="Loading records" type="circular" multicolor />
      <ProgressBar aria-label="Loading messages" />
      <ProgressBar aria-label="Upload progress" mode="determinate" value={40} />
      <Dialog active={dialog} title="Save changes" onEscKeyDown={() => setDialog(false)}
        actions={[{ label: 'Cancel', onClick: () => setDialog(false) }, { label: 'Save', onClick: () => setDialog(false) }]}>
        <p>Save your updated preferences?</p>
      </Dialog>
      <Drawer active={drawer} aria-label="Sections" onEscKeyDown={() => setDrawer(false)}>
        <nav aria-label="Drawer sections"><a href="#home">Home</a></nav>
      </Drawer>
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
    `<!doctype html><html lang="en"><head><title>Material accessibility</title><style>${css}</style></head><body><div id="root"></div></body></html>`,
  );
  await page.addScriptTag({ content: javascript });
  await expect(page.getByRole('heading', { name: 'Material accessibility' })).toBeVisible();
}

async function expectAccessible(page) {
  // Audit the settled state; a partially faded entrance is not its final color.
  // Indeterminate progress intentionally runs forever in the default M1 mode.
  await page.evaluate(async () => {
    await new Promise(requestAnimationFrame);
    await Promise.all(
      document
        .getAnimations()
        .filter((animation) => animation.effect?.getTiming().iterations !== Infinity)
        .map((animation) => animation.finished.catch(() => {})),
    );
  });
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  if (result.violations.length) {
    await test.info().attach('axe-violations', {
      body: JSON.stringify(result.violations, null, 2),
      contentType: 'application/json',
    });
  }
  expect(
    result.violations.map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
    })),
  ).toEqual([]);
}

test('form controls expose their names, state and keyboard operation to assistive technology', async ({ page }) => {
  await mount(page);
  await expectAccessible(page);
  const subscribe = page.getByRole('checkbox', { name: 'Subscribe' });
  await subscribe.focus();
  await page.keyboard.press('Space');
  await expect(subscribe).toBeChecked();
  const volume = page.getByRole('slider', { name: 'Volume' });
  await volume.focus();
  await page.keyboard.press('ArrowRight');
  await expect(volume).toHaveAttribute('aria-valuenow', '41');
  const destination = page.getByRole('combobox', { name: 'Destination' });
  await destination.focus();
  await page.keyboard.press('ArrowDown');
  await expect(destination).toHaveAttribute('aria-expanded', 'true');
  await expectAccessible(page);
  await page.keyboard.press('End');
  await page.keyboard.press('Enter');
  await expect(destination).toHaveValue('London');
  await expect(destination).toBeFocused();
});

test('menu and modal keyboard journeys retain accessible names, focus containment and restoration', async ({
  page,
}) => {
  await mount(page);
  const menu = page.getByRole('button', { name: 'File actions' });
  await menu.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Archive' })).toBeFocused();
  await expectAccessible(page);
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  const opener = page.getByRole('button', { name: 'Open dialog' });
  await opener.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Save changes' });
  await expect(dialog).toBeFocused();
  await expectAccessible(page);
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Save', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Cancel' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
});

test('reduced motion removes decorative animation while loading indicators stay visible and correctly named', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await mount(page);
  await expect(page.getByTestId('host-motion')).toHaveCSS('transition-duration', '1s');
  const circular = page.getByRole('progressbar', { name: 'Loading records' });
  const linear = page.getByRole('progressbar', { name: 'Loading messages' });
  await expect(circular).not.toHaveAttribute('aria-valuenow');
  await expect(linear).not.toHaveAttribute('aria-valuenow');
  await expect(circular.locator('svg')).toHaveCSS('animation-name', 'none');
  await expect(circular.locator('circle')).toHaveCSS('animation-name', 'none');
  expect(
    await circular.locator('circle').evaluate((element) => parseFloat(getComputedStyle(element).strokeDasharray)),
  ).toBeGreaterThan(0);
  await expect(linear.locator('[data-ref="value"]')).toHaveCSS('transform', 'matrix(0.35, 0, 0, 1, 0, 0)');
  await expect(page.getByRole('progressbar', { name: 'Upload progress' })).toHaveAttribute('aria-valuenow', '40');
  await expect(page.getByRole('progressbar', { name: 'Upload progress' }).locator('[data-ref="value"]')).toHaveCSS(
    'transform',
    'matrix(0.4, 0, 0, 1, 0, 0)',
  );
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.locator('[data-react-toolbox="ripple"]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Information' }).focus();
  await expect(page.getByRole('tooltip')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  for (const [name, title] of [
    ['Open dialog', 'Save changes'],
    ['Open drawer', 'Sections'],
  ]) {
    const opener = page.getByRole('button', { name });
    await opener.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('dialog', { name: title })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(opener).toBeFocused();
  }
  await expectAccessible(page);
});

test('changing motion preference while running stops loading motion and resumes the original animation', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await mount(page);
  const circle = page.getByRole('progressbar', { name: 'Loading records' }).locator('svg');
  await expect(circle).toHaveCSS('animation-name', 'rt-progress-bar-circular-indeterminate-bar-rotate');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(circle).toHaveCSS('animation-name', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(circle).toHaveCSS('animation-name', 'rt-progress-bar-circular-indeterminate-bar-rotate');
  await expect(circle).toHaveCSS('animation-duration', '2s');
});

for (const [name, dialogName] of [
  ['Start date', 'Choose date'],
  ['Reminder', 'Choose time'],
  ['Twelve-hour time', 'Choose time'],
]) {
  test(`${name} combobox exposes its dialog relationship and restores keyboard focus`, async ({ page }) => {
    await mount(page);
    const trigger = page.getByRole('combobox', { name });
    await trigger.focus();
    await page.keyboard.press('ArrowDown');
    const dialog = page.getByRole('dialog', { name: dialogName });
    await expect(dialog).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-controls', await dialog.getAttribute('id'));
    await expectAccessible(page);
    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).not.toHaveAttribute('aria-controls');
    await expect(trigger).toBeFocused();
  });
}

test('picker hit areas expand without shifting the visible header', async ({ page }) => {
  await mount(page);
  for (const [name, selectors] of [
    ['Start date', ['#years']],
    ['Twelve-hour time', ['.rt-time-picker-am', '.rt-time-picker-pm']],
  ]) {
    await page.getByRole('combobox', { name }).focus();
    await page.keyboard.press('ArrowDown');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const header = dialog.locator('header');
    const corrected = await header.screenshot({ animations: 'disabled' });
    for (const selector of selectors) {
      const target = dialog.locator(selector);
      expect((await target.boundingBox()).height).toBeGreaterThanOrEqual(24);
      await target.evaluate((element) => {
        element.style.paddingTop = '0px';
        element.style.paddingBottom = '0px';
        element.style.marginTop = '0px';
        element.style.marginBottom = '0px';
      });
    }
    const originalHitArea = await header.screenshot({ animations: 'disabled' });
    expect(corrected.equals(originalHitArea), 'Enlarging the hit area must preserve the header pixels').toBe(true);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('combobox', { name })).toBeFocused();
  }
});

for (const route of [
  '/',
  '/docs',
  '/docs/installation',
  '/docs/theming',
  '/docs/components',
  ...components.map(({ slug }) => `/docs/components/${slug}`),
]) {
  test(`documentation passes automated accessibility checks: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expectAccessible(page);
  });
}
