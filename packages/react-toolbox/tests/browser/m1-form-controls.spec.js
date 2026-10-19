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
        contents: `import React, {useState} from 'react';
          import {createRoot} from 'react-dom/client';
          import {Dropdown,DropdownRoot,DropdownTrigger,DropdownSelection,DropdownPortal,DropdownContent,DropdownViewport,DropdownOption,DropdownOptionText} from './src/material/dropdown';
          import {Autocomplete,AutocompleteRoot,AutocompleteLabel,AutocompleteInputGroup,AutocompleteInput,AutocompletePortal,AutocompletePositioner,AutocompletePopup,AutocompleteList,AutocompleteItem,AutocompleteGroup,AutocompleteGroupLabel,AutocompleteEmpty,AutocompleteStatus} from './src/material/autocomplete';
          import {Slider,SliderRoot,SliderTrack,SliderRange,SliderThumb} from './src/material/slider';
          import {Input} from './src/material/input';
          function Example() {
            const [disabled,setDisabled] = useState(true);
            return <main style={{padding:24,width:280}}>
              <Dropdown label="Dropdown" source={['Alpha','Beta']} defaultValue="Alpha"/>
              <Autocomplete label="Autocomplete" source={['Alpha','Beta']} multiple={false}/>
              <DropdownRoot defaultValue="Alpha"><DropdownTrigger aria-label="Composed dropdown"><DropdownSelection/></DropdownTrigger><DropdownPortal><DropdownContent><DropdownViewport>{['Alpha','Beta'].map(item=><DropdownOption key={item} value={item}><DropdownOptionText>{item}</DropdownOptionText></DropdownOption>)}</DropdownViewport></DropdownContent></DropdownPortal></DropdownRoot>
              <AutocompleteRoot items={['Alpha','Beta']}><AutocompleteLabel>Composed autocomplete</AutocompleteLabel><AutocompleteInputGroup><AutocompleteInput/></AutocompleteInputGroup><AutocompletePortal><AutocompletePositioner><AutocompletePopup><AutocompleteGroup><AutocompleteGroupLabel>Letters</AutocompleteGroupLabel><AutocompleteList>{item=><AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompleteGroup><AutocompleteEmpty>No letters found.</AutocompleteEmpty><AutocompleteStatus>Choose a letter.</AutocompleteStatus></AutocompletePopup></AutocompletePositioner></AutocompletePortal></AutocompleteRoot>
              <DropdownRoot disabled={disabled} defaultValue="Alpha"><DropdownTrigger aria-label="Unavailable dropdown"><DropdownSelection/></DropdownTrigger></DropdownRoot>
              <AutocompleteRoot disabled={disabled} items={['Alpha']}><AutocompleteLabel>Unavailable autocomplete</AutocompleteLabel><AutocompleteInputGroup id="unavailable-autocomplete"><AutocompleteInput/></AutocompleteInputGroup></AutocompleteRoot>
              <SliderRoot disabled={disabled} defaultValue={[50]} id="composed-slider"><SliderTrack><SliderRange/></SliderTrack><SliderThumb aria-label="Composed volume"/></SliderRoot>
              <Slider disabled={disabled} defaultValue={50} aria-label="Volume"/>
              <button onClick={()=>setDisabled(!disabled)}>Toggle availability</button>
              <Input label="Short title" maxLength={30} defaultValue="Ada" error="Use a title that explains the project clearly to other people."/>
            </main>;
          }
          createRoot(document.getElementById('root')).render(<Example/>);`,
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
  await page.setContent(`<style>${css}</style><div id="root"></div>`);
  await page.addScriptTag({ content: javascript });
}

for (const name of ['Dropdown', 'Autocomplete', 'Composed dropdown', 'Composed autocomplete']) {
  test(`${name} preserves M1 option targets and menu insets`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await mount(page);
    const trigger = page.getByRole('combobox', { name, exact: true });
    if (name.toLowerCase().includes('autocomplete')) await trigger.fill('Al');
    else await trigger.click();
    const option = page.getByRole('option', { name: 'Alpha', exact: true });
    await expect(option).toBeVisible();
    await expect.poll(async () => (await option.boundingBox()).height).toBeCloseTo(48, 0);
    await expect(option).toHaveCSS('padding-left', '16px');
    const popup = page.locator('[data-slot=DropdownContent], [data-slot=AutocompletePopup]').filter({ visible: true });
    await expect(popup).toHaveCSS('padding-top', '8px');
    await expect(popup).toHaveCSS('padding-bottom', '8px');
    await option.click();
    await expect(option).not.toBeVisible();
  });
}

test('composed fields use dotted disabled underlines without fading the whole control', async ({ page }) => {
  await mount(page);
  const dropdown = page.getByRole('combobox', { name: 'Unavailable dropdown', exact: true });
  const autocomplete = page.locator('#unavailable-autocomplete');
  await expect(dropdown).toHaveCSS('border-bottom-style', 'dotted');
  await expect(dropdown).toHaveCSS('border-bottom-width', '1px');
  const underline = await autocomplete.evaluate((element) => {
    const style = getComputedStyle(element, '::after');
    return { style: style.borderBottomStyle, width: style.borderBottomWidth, position: style.position };
  });
  expect(underline).toEqual({ style: 'dotted', width: '1px', position: 'absolute' });
  const disabledHeight = (await autocomplete.boundingBox()).height;
  expect(disabledHeight).toBe(48);
  for (const field of [dropdown, autocomplete]) {
    await expect(field).toHaveCSS('box-shadow', 'none');
    await expect(field).toHaveCSS('opacity', '1');
  }
  await expect(page.getByRole('combobox', { name: 'Unavailable autocomplete', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Toggle availability' }).click();
  await expect(dropdown).toBeEnabled();
  await expect(autocomplete).toHaveCSS('border-bottom-width', '0px');
  expect((await autocomplete.boundingBox()).height).toBe(disabledHeight);
});

test('autocomplete options, group labels and supporting messages share their text inset', async ({ page }) => {
  await mount(page);
  const input = page.getByRole('combobox', { name: 'Composed autocomplete', exact: true });
  await input.fill('Al');
  const option = page.getByRole('option', { name: 'Alpha', exact: true });
  await expect(option).toBeVisible();
  for (const selector of ['[data-slot=AutocompleteGroupLabel]', '[data-slot=AutocompleteStatus]']) {
    const supporting = page.locator(selector);
    await expect(supporting).toBeVisible();
    await expect(supporting).toHaveCSS('padding-left', '16px');
    await expect(supporting).toHaveCSS('padding-right', '16px');
    expect((await supporting.boundingBox()).x).toBeCloseTo((await option.boundingBox()).x, 0);
  }
  await input.fill('No match');
  const empty = page.locator('[data-slot=AutocompleteEmpty]');
  await expect(empty).toBeVisible();
  await expect(empty).toHaveCSS('padding-left', '16px');
  await expect(empty).toHaveCSS('padding-right', '16px');
});

test('disabled composed sliders disconnect grey thumbs and preserve convenience slider geometry', async ({ page }) => {
  await mount(page);
  const composed = page.locator('#composed-slider');
  const thumb = page.getByRole('slider', { name: 'Composed volume', exact: true });
  const conventional = page.locator('.rt-slider-innerknob');
  await expect(composed).toHaveCSS('opacity', '1');
  for (const knob of [thumb, conventional]) {
    await expect(knob).toHaveCSS('width', '8px');
    await expect(knob).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 2px');
  }
  const disabledInk = await conventional.evaluate((element) => getComputedStyle(element).backgroundColor);
  await expect(thumb).toHaveCSS('background-color', disabledInk);
  await expect(composed.locator('[data-slot=SliderRange]')).toHaveCSS('background-color', disabledInk);
  await expect(page.getByRole('slider', { name: 'Volume', exact: true })).toHaveCSS('width', '0px');
  await page.getByRole('button', { name: 'Toggle availability' }).click();
  await expect(thumb).toHaveCSS('width', '12px');
  await expect(thumb).toHaveCSS('box-shadow', 'none');
  await thumb.press('ArrowRight');
  await expect(thumb).toHaveAttribute('aria-valuenow', '51');
});

test('a wrapped input error reserves room for its character counter', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mount(page);
  const field = page
    .locator('[data-react-toolbox=input]')
    .filter({ has: page.getByRole('textbox', { name: 'Short title' }) });
  const error = await field.locator('.rt-input-error').boundingBox();
  const counter = await field.locator('.rt-input-counter').boundingBox();
  expect(error.x + error.width + 8).toBeLessThanOrEqual(counter.x);
  expect(error.height).toBeGreaterThan(counter.height);
  expect((await field.boundingBox()).y + (await field.boundingBox()).height).toBeGreaterThanOrEqual(
    error.y + error.height,
  );
  await expect(field.getByRole('textbox')).toHaveAccessibleDescription(
    'Use a title that explains the project clearly to other people. 3/30',
  );
});
