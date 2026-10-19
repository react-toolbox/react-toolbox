import { expect, test } from '@playwright/test';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { css } from './material-fixture.js';

let javascript;
test.beforeAll(async () => {
  javascript = (
    await build({
      stdin: {
        resolveDir: fileURLToPath(new URL('../../', import.meta.url)),
        loader: 'jsx',
        contents: `import React from 'react';
      import {createRoot} from 'react-dom/client';
      import {ThemeProvider} from './src/material/theme';
      import {Tabs,Tab,TabsRoot,TabsList,TabsTrigger} from './src/material/tabs';
      import {Dropdown,DropdownRoot,DropdownTrigger,DropdownSelection,DropdownPortal,DropdownContent,DropdownViewport,DropdownOption,DropdownOptionText} from './src/material/dropdown';
      import {Autocomplete,AutocompleteRoot,AutocompleteLabel,AutocompleteInputGroup,AutocompleteInput,AutocompletePortal,AutocompletePositioner,AutocompletePopup,AutocompleteList,AutocompleteItem} from './src/material/autocomplete';
      import {SliderRoot,SliderTrack,SliderRange,SliderThumb} from './src/material/slider';
      import {TooltipRoot,TooltipTrigger,TooltipContent} from './src/material/tooltip';
      import {DropdownMenuRoot,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem,DropdownMenuSub,DropdownMenuSubTrigger,DropdownMenuPortal,DropdownMenuSubContent} from './src/material/menu';
      createRoot(document.getElementById('root')).render(<main style={{padding:100}}>
        <div id="fixed-tabs" style={{width:400}}><Tabs defaultValue="first" fixed><Tab value="first" label="First"/><Tab value="second" label="Second"/><Tab value="third" label="Third"/></Tabs></div>
        <TabsRoot defaultValue="first"><TabsList aria-label="Scrollable tabs"><TabsTrigger value="first">First</TabsTrigger><TabsTrigger value="second">Second</TabsTrigger></TabsList></TabsRoot>
        <SliderRoot orientation="vertical" defaultValue={[20,80]} style={{height:200}}>
          <SliderTrack><SliderRange /></SliderTrack><SliderThumb aria-label="Low"/><SliderThumb aria-label="High"/>
        </SliderRoot>
        <TooltipRoot defaultOpen><TooltipTrigger style={{marginTop:100}}>Tooltip anchor</TooltipTrigger><TooltipContent style={{'--tooltip-margin':'0px'}}>No gap</TooltipContent></TooltipRoot>
        <DropdownMenuRoot density="compact"><DropdownMenuTrigger>Menu</DropdownMenuTrigger><DropdownMenuPortal><DropdownMenuContent><DropdownMenuItem>Normal choice</DropdownMenuItem><DropdownMenuSub><DropdownMenuSubTrigger>More</DropdownMenuSubTrigger><DropdownMenuPortal><DropdownMenuSubContent><DropdownMenuItem>Nested choice</DropdownMenuItem></DropdownMenuSubContent></DropdownMenuPortal></DropdownMenuSub></DropdownMenuContent></DropdownMenuPortal></DropdownMenuRoot>
        <ThemeProvider variables={{'--input-field-font-size':'24px','--input-label-font-size':'18px','--input-field-padding':'12px','--input-text-label-color':'#334455'}}>
          <Dropdown label="Convenience dropdown" source={['Alpha','Beta']} defaultValue="Alpha" />
          <Autocomplete label="Convenience autocomplete" source={['Alpha','Beta']} multiple={false} defaultValue="Alpha" />
          <DropdownRoot defaultValue="Alpha"><DropdownTrigger aria-label="Compound dropdown"><DropdownSelection /></DropdownTrigger><DropdownPortal><DropdownContent><DropdownViewport><DropdownOption value="Alpha"><DropdownOptionText>Alpha</DropdownOptionText></DropdownOption><DropdownOption value="Beta"><DropdownOptionText>Beta</DropdownOptionText></DropdownOption></DropdownViewport></DropdownContent></DropdownPortal></DropdownRoot>
          <AutocompleteRoot items={['Alpha','Beta']}><AutocompleteLabel>Compound autocomplete</AutocompleteLabel><AutocompleteInputGroup><AutocompleteInput /></AutocompleteInputGroup><AutocompletePortal><AutocompletePositioner><AutocompletePopup><AutocompleteList>{item=><AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup></AutocompletePositioner></AutocompletePortal></AutocompleteRoot>
        </ThemeProvider>
      </main>);`,
      },
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
    `<style>${css}*,*::before,*::after{animation:none!important;transition:none!important}</style><div id="root"></div>`,
  );
  await page.addScriptTag({ content: javascript });
}

test('fixed tabs fit narrow and wide containers while scrollable tabs retain Material minimums', async ({ page }) => {
  await mount(page);
  const container = page.locator('#fixed-tabs');
  for (const width of [400, 1000]) {
    await container.evaluate((node, value) => {
      node.style.width = `${value}px`;
    }, width);
    const tabs = container.getByRole('tab');
    for (const tab of await tabs.all()) expect((await tab.boundingBox()).width).toBeCloseTo(width / 3, 0);
    expect(await container.evaluate((node) => node.scrollWidth)).toBe(width);
  }
  await expect(page.getByRole('tablist', { name: 'Scrollable tabs' }).getByRole('tab').first()).toHaveCSS(
    'min-width',
    '160px',
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('tablist', { name: 'Scrollable tabs' }).getByRole('tab').first()).toHaveCSS(
    'min-width',
    '72px',
  );
});

test('vertical selected range follows the two values instead of filling the track', async ({ page }) => {
  await mount(page);
  const track = page.locator('[data-slot=SliderTrack]');
  const range = page.locator('[data-slot=SliderRange]');
  await expect(track).toHaveCSS('height', '200px');
  const trackBox = await track.boundingBox();
  const rangeBox = await range.boundingBox();
  expect(rangeBox.height).toBeCloseTo(trackBox.height * 0.6, 0);
  expect(rangeBox.y - trackBox.y).toBeCloseTo(trackBox.height * 0.2, 0);
  await page.getByRole('slider', { name: 'High' }).press('ArrowUp');
  await expect(page.getByRole('slider', { name: 'High' })).toHaveAttribute('aria-valuenow', '81');
  expect((await range.boundingBox()).height).toBeCloseTo(trackBox.height * 0.61, 0);
});

test('tooltip respects a zero margin token', async ({ page }) => {
  await mount(page);
  const anchor = page.getByRole('button', { name: 'Tooltip anchor' });
  const tooltip = page.locator('[data-slot=TooltipContent]');
  await expect(tooltip).toBeVisible();
  await expect
    .poll(async () => {
      const trigger = await anchor.boundingBox(),
        content = await tooltip.boundingBox();
      return content.y - trigger.y - trigger.height;
    })
    .toBe(0);
});

test('compact menu density survives a portaled submenu', async ({ page }) => {
  await mount(page);
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await expect(page.getByRole('menuitem', { name: 'Normal choice' })).toHaveCSS('min-height', '24px');
  await page.getByRole('menuitem', { name: 'More', exact: true }).hover();
  await expect(page.getByRole('menuitem', { name: 'Nested choice' })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: 'Nested choice' })).toHaveCSS('min-height', '24px');
  await expect(page.getByRole('menuitem', { name: 'Nested choice' })).toHaveCSS('font-size', '13px');
});

test('custom input typography and padding reach convenience fields, compound fields and portals', async ({ page }) => {
  await mount(page);
  for (const name of [
    'Convenience dropdown',
    'Convenience autocomplete',
    'Compound dropdown',
    'Compound autocomplete',
  ]) {
    await expect(page.getByRole('combobox', { name, exact: true })).toHaveCSS('font-size', '24px');
    await expect(page.getByRole('combobox', { name, exact: true })).toHaveCSS('padding-top', '12px');
  }
  await expect(page.locator('[data-slot=AutocompleteLabel]')).toHaveCSS('font-size', '18px');
  await expect(page.locator('[data-slot=AutocompleteLabel]')).toHaveCSS('color', 'rgb(51, 68, 85)');
  await page.getByRole('combobox', { name: 'Convenience dropdown', exact: true }).click();
  await expect(page.getByRole('option', { name: 'Alpha', exact: true })).toHaveCSS('font-size', '24px');
  await page.keyboard.press('Escape');
  await page.getByRole('combobox', { name: 'Convenience autocomplete', exact: true }).fill('Al');
  await expect(page.getByRole('option', { name: 'Alpha', exact: true })).toHaveCSS('font-size', '24px');
  await page.keyboard.press('Escape');
  await page.getByRole('combobox', { name: 'Compound dropdown', exact: true }).click();
  await expect(page.getByRole('option', { name: 'Alpha', exact: true })).toHaveCSS('font-size', '24px');
  await page.keyboard.press('Escape');
  await page.getByRole('combobox', { name: 'Compound autocomplete', exact: true }).fill('Al');
  await expect(page.getByRole('option', { name: 'Alpha', exact: true })).toHaveCSS('font-size', '24px');
});
