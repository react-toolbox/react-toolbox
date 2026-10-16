import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function example(page, slug) {
  await page.goto(`/docs/components/${slug}#composition`);
  const demo = page.locator(`[data-composition-example="${slug}"]`);
  await demo.scrollIntoViewIfNeeded();
  return demo;
}
async function accessible(page, scope) {
  const builder = new AxeBuilder({ page });
  if (scope) builder.include(scope);
  const { violations } = await builder.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  expect(
    violations.map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
    })),
  ).toEqual([]);
}

for (const slug of [
  'dialog',
  'drawer',
  'tabs',
  'menu',
  'dropdown',
  'autocomplete',
  'table',
  'tooltip',
  'slider',
  'date-picker',
  'time-picker',
  'sheet',
]) {
  test(`${slug} composition documentation is accessible and fits mobile`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewportSize({ width: 390, height: 844 });
    await example(page, slug);
    await accessible(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByText('Show composition code', { exact: true }).click();
    await expect(page.getByLabel(`${slug} composition`, { exact: true })).toContainText('@/components/ui/material/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('sheet composition supports keyboard resizing and dismissal', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  const demo = await example(page, 'sheet');
  const trigger = demo.getByRole('button', { name: 'Open visit notes' });
  await trigger.focus();
  await trigger.press('Enter');
  const sheet = page.getByRole('dialog', { name: 'Visit notes', exact: true });
  await expect.poll(async () => Math.round((await sheet.boundingBox()).y)).toBe(450);
  const resize = sheet.getByRole('button', { name: 'Expand notes' });
  await resize.focus();
  await resize.press('Enter');
  await expect(sheet.getByRole('button', { name: 'Reduce notes' })).toHaveAttribute('aria-expanded', 'true');
  await expect.poll(async () => Math.round((await sheet.boundingBox()).y)).toBe(90);
  await accessible(page);
  await sheet.getByRole('button', { name: 'Done', exact: true }).press('Enter');
  await expect(sheet).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('composed dialog saves through an independent footer and restores focus', async ({ page }) => {
  const demo = await example(page, 'dialog');
  const trigger = demo.getByRole('button', { name: 'Edit profile' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Edit profile' });
  await expect(dialog).toHaveAccessibleDescription('Change the name shown to your teammates.');
  await expect(dialog.getByRole('textbox', { name: 'Display name' })).toBeFocused();
  await expect(dialog).toHaveCSS('border-radius', '2px');
  await expect(dialog).toHaveCSS('width', '560px');
  await expect(dialog.locator('[data-slot=DialogBody]')).toHaveCSS('padding', '24px');
  await expect(dialog).not.toHaveCSS('box-shadow', 'none');
  await expect(dialog).toHaveCSS('opacity', '1');
  await accessible(page);
  await dialog.getByRole('textbox', { name: 'Display name' }).fill('Grace');
  await dialog.getByRole('button', { name: 'Save changes' }).click();
  await expect(dialog).toBeHidden();
  await expect(demo.getByRole('status')).toHaveText('Grace');
  await expect(trigger).toBeFocused();
});

test('nested drawer and dialog close in order without unlocking the page early', async ({ page }) => {
  const demo = await example(page, 'drawer');
  await demo.getByRole('button', { name: 'Open account drawer' }).click();
  const drawer = page.getByRole('dialog', { name: 'Your account' });
  await expect(drawer).toHaveCSS('width', '320px');
  await expect(drawer).not.toHaveCSS('box-shadow', 'none');
  await drawer.getByRole('button', { name: 'Edit profile' }).click();
  await expect(page.getByRole('dialog', { name: 'Edit profile' }).getByRole('textbox')).toBeFocused();
  await expect(page.getByRole('dialog', { name: 'Edit profile' })).toHaveCSS('opacity', '1');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Edit profile' })).toBeHidden();
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole('button', { name: 'Edit profile' })).toBeFocused();
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(demo.getByRole('button')).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('manual wrapped tabs preserve drafts and move the M1 indicator', async ({ page }) => {
  const demo = await example(page, 'tabs');
  const profile = demo.getByRole('tab', { name: 'Profile' });
  const notifications = demo.getByRole('tab', { name: 'Notifications' });
  await demo.getByRole('textbox', { name: 'Persistent draft' }).fill('Unsubmitted');
  await profile.focus();
  await page.keyboard.press('ArrowRight');
  await expect(notifications).toBeFocused();
  await expect(profile).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Enter');
  await expect(demo.getByRole('tabpanel')).toHaveText('Choose how you receive updates.');
  const indicator = demo.locator('[data-slot=TabsIndicator]');
  await expect(indicator).toHaveCSS('height', '2px');
  await expect
    .poll(async () => {
      const [bar, tab] = await Promise.all([indicator.boundingBox(), notifications.boundingBox()]);
      return Math.abs(bar.x - tab.x) + Math.abs(bar.width - tab.width);
    })
    .toBeLessThan(1);
  await profile.click();
  await expect(demo.getByRole('textbox')).toHaveValue('Unsubmitted');
});

test('portaled submenus handle keyboard navigation, checkboxes, and focus restoration', async ({ page }) => {
  const demo = await example(page, 'menu');
  const trigger = demo.getByRole('button', { name: 'Project actions' });
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Rename' })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitemcheckbox', { name: 'Show toolbar' })).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.getByRole('menuitemcheckbox', { name: 'Show toolbar' })).toHaveAttribute('aria-checked', 'false');
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Density' })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  const comfortable = page.getByRole('menuitemradio', { name: 'Comfortable' });
  await expect(comfortable).toBeFocused();
  await expect(page.locator('[data-slot=DropdownMenuSubContent]')).not.toHaveCSS('box-shadow', 'none');
  await expect(page.locator('[data-slot=DropdownMenuSubContent]')).toHaveCSS('opacity', '1');
  await accessible(page, '[data-slot=DropdownMenuSubContent]');
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitemradio', { name: 'Compact' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('menu')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(demo.getByRole('status')).toContainText('compact; toolbar hidden');
});

test('composed select submits stable option values from a keyboard choice', async ({ page }) => {
  const demo = await example(page, 'dropdown');
  await demo.getByRole('combobox', { name: 'Destination' }).focus();
  await page.keyboard.press('Space');
  await expect(page.getByRole('option', { name: 'Madrid' })).toBeVisible();
  await expect(page.locator('[data-slot=DropdownContent]')).not.toHaveCSS('box-shadow', 'none');
  await expect(page.locator('[data-slot=DropdownContent]')).toHaveCSS('opacity', '1');
  // The primitive temporarily hides the page while its focus scope owns navigation.
  // Audit the active surface here; audit the whole page again after dismissal.
  await accessible(page, '[data-slot=DropdownContent]');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('option', { name: 'Madrid' })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('option', { name: 'Lisbon' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-slot=DropdownContent]')).toBeHidden();
  await accessible(page);
  await demo.getByRole('button', { name: 'Save destination' }).click();
  await expect(demo.getByRole('status')).toHaveText('Destination: lisbon');
});

test('composed autocomplete filters objects, removes chips, and submits multiple values', async ({ page }) => {
  const demo = await example(page, 'autocomplete');
  const input = demo.getByRole('combobox', { name: 'Invite teammates' });
  await input.fill('Gra');
  const grace = page.getByRole('option', { name: /Grace Hopper/ });
  await expect(grace).toBeVisible();
  await expect(page.locator('[data-slot=AutocompletePopup]')).not.toHaveCSS('box-shadow', 'none');
  await expect(page.locator('[data-slot=AutocompletePopup]')).toHaveCSS('opacity', '1');
  await accessible(page, '[data-slot=AutocompletePopup]');
  await input.press('ArrowDown');
  await input.press('Enter');
  await input.press('Escape');
  await expect(demo.getByRole('button', { name: 'Remove Grace Hopper' })).toBeVisible();
  await demo.getByRole('button', { name: 'Save teammates' }).click();
  await expect(demo.getByRole('status')).toHaveText('ada, grace');
  await demo.getByRole('button', { name: 'Remove Ada Lovelace' }).click();
  await demo.getByRole('button', { name: 'Save teammates' }).click();
  await expect(demo.getByRole('status')).toHaveText('grace');
  await input.fill('zzz');
  await expect(page.getByText('No teammates found.', { exact: true })).toBeVisible();
  await expect(page.locator('[data-slot=AutocompletePopup]')).toHaveCSS('opacity', '1');
  await accessible(page, '[data-slot=AutocompletePopup]');
  await input.press('Tab');
  await expect(page.locator('[data-slot=AutocompletePopup]')).toBeHidden();
  expect(await page.evaluate(() => document.activeElement.closest('[aria-hidden=true]'))).toBeNull();
  await accessible(page);
});

test('wrapped table rows retain selection when their order changes', async ({ page }) => {
  const demo = await example(page, 'table');
  await expect(demo.getByRole('columnheader', { name: 'Name', exact: true })).toBeVisible();
  await demo.getByRole('button', { name: 'Reverse row order' }).click();
  await expect(demo.getByRole('checkbox', { name: 'Select Ada Lovelace' })).toBeChecked();
  await expect(demo.getByRole('checkbox', { name: 'Select Grace Hopper' })).not.toBeChecked();
  await demo
    .locator('label')
    .filter({ has: page.getByRole('checkbox', { name: 'Select all rows' }) })
    .click();
  await expect(demo.getByRole('status')).toHaveText('Selected: ada, grace');
});

test('shared tooltip timing, keyboard descriptions, and reduced motion', async ({ page }) => {
  const demo = await example(page, 'tooltip');
  const archive = demo.getByRole('button', { name: 'Archive' });
  await archive.hover();
  await expect(page.getByRole('tooltip')).toHaveText('Move this project to the archive');
  await expect(archive).toHaveAccessibleDescription('Move this project to the archive');
  const duplicate = await demo.getByRole('button', { name: 'Duplicate' }).boundingBox();
  await page.mouse.move(duplicate.x + duplicate.width / 2, duplicate.y + duplicate.height / 2, { steps: 12 });
  await expect(page.locator('[data-slot=TooltipContent][data-state=instant-open]')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await archive.focus();
  await expect(page.getByRole('tooltip')).toHaveText('Move this project to the archive');
  await expect(page.locator('[data-slot=TooltipContent]')).toHaveCSS('animation-name', 'none');
});

test('compound M1 geometry also works with standalone CSS and no host Preflight', async ({ page }) => {
  const { build } = await import('esbuild');
  const { readFile } = await import('node:fs/promises');
  const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../../', import.meta.url));
  const { outputFiles } = await build({
    stdin: {
      loader: 'tsx',
      resolveDir: root,
      contents: `
      import React from 'react';
      import { createRoot } from 'react-dom/client';
      import { TabsRoot, TabsList, TabsTrigger, TabsContent } from './src/material/tabs/parts';
      import { AutocompleteRoot, AutocompleteLabel, AutocompleteInputGroup, AutocompleteInput } from './src/material/autocomplete/parts';
      import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuItem } from './src/material/menu/parts';
      createRoot(document.getElementById('root')).render(<main>
        <TabsRoot defaultValue="one"><TabsList aria-label="Standalone tabs"><TabsTrigger value="one">One</TabsTrigger></TabsList><TabsContent value="one">Panel</TabsContent></TabsRoot>
        <AutocompleteRoot items={['One']}><AutocompleteLabel>Standalone field</AutocompleteLabel><AutocompleteInputGroup><AutocompleteInput /></AutocompleteInputGroup></AutocompleteRoot>
        <DropdownMenuRoot><DropdownMenuTrigger>Standalone menu</DropdownMenuTrigger><DropdownMenuPortal><DropdownMenuContent><DropdownMenuItem>One action</DropdownMenuItem></DropdownMenuContent></DropdownMenuPortal></DropdownMenuRoot>
      </main>);
    `,
    },
    bundle: true,
    write: false,
    format: 'iife',
    loader: { '.css': 'empty' },
  });
  await page.goto('about:blank');
  await page.setContent('<div id="root"></div>');
  await page.addStyleTag({ content: await readFile(`${root}/dist/styles.css`, 'utf8') });
  await page.addScriptTag({ content: outputFiles[0].text });
  await expect(page.getByRole('tab', { name: 'One' })).toHaveCSS('height', '48px');
  const field = page.getByRole('combobox', { name: 'Standalone field' });
  await expect(field).toHaveCSS('height', '48px');
  const before = await page.locator('[data-slot=AutocompleteInputGroup]').boundingBox();
  await field.focus();
  const focused = await page.locator('[data-slot=AutocompleteInputGroup]').boundingBox();
  expect(focused.height).toBe(before.height);
  await page.getByRole('button', { name: 'Standalone menu' }).click();
  await expect(page.getByRole('menuitem', { name: 'One action' })).toHaveCSS('height', '48px');
  await expect(page.locator('[data-slot=DropdownMenuContent]')).not.toHaveCSS('box-shadow', 'none');
  await expect(page.locator('[data-slot=DropdownMenuContent]')).toHaveCSS('opacity', '1');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('menu')).toHaveCount(0);
});
