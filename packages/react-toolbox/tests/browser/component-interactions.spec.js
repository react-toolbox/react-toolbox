import { expect, test } from '@playwright/test';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { css } from './material-fixture.js';

test.use({ hasTouch: true });

const source = `
  import React, { useState } from 'react';
  import { createRoot } from 'react-dom/client';
  import Autocomplete from './src/material/autocomplete/Autocomplete';
  import {AutocompleteRoot, AutocompleteLabel, AutocompleteInput, AutocompletePortal, AutocompletePositioner, AutocompletePopup, AutocompleteList, AutocompleteItem} from './src/material/autocomplete';
  function MultipleSelection({compound}) {
    const [value, setValue] = useState([]);
    const [changes, setChanges] = useState(0);
    const label = compound ? 'Compound choices' : 'Convenience choices';
    const change = next => {setValue(next); setChanges(count => count + 1);};
    return <>
      {compound ? <AutocompleteRoot multiple value={value} onValueChange={change} items={['Alpha','Beta']}>
        <AutocompleteLabel>{label}</AutocompleteLabel><AutocompleteInput/>
        <AutocompletePortal><AutocompletePositioner><AutocompletePopup><AutocompleteList>
          <AutocompleteItem value="Alpha">Alpha</AutocompleteItem><AutocompleteItem value="Beta">Beta</AutocompleteItem>
        </AutocompleteList></AutocompletePopup></AutocompletePositioner></AutocompletePortal>
      </AutocompleteRoot> : <Autocomplete label={label} multiple keepFocusOnChange value={value} onChange={change} source={['Alpha','Beta']}/>}
      <output aria-label={label + ' result'}>{value.join(',')}:{changes}</output>
    </>;
  }
  import Avatar from './src/material/avatar/Avatar';
  import Checkbox from './src/material/checkbox/Checkbox';
  import Dropdown from './src/material/dropdown/Dropdown';
  import Input from './src/material/input/Input';
  import RadioButton from './src/material/radio/RadioButton';
  import RadioGroup from './src/material/radio/RadioGroup';
  import Tabs from './src/material/tabs/Tabs';
  import Tab from './src/material/tabs/Tab';
  import { useTooltip } from './src/material/tooltip/useTooltip';
  function App() {
    const [submitted, setSubmitted] = useState('');
    const [country, setCountry] = useState('');
    const [queries, setQueries] = useState(0);
    const [tab, setTab] = useState('First');
    const tip = useTooltip({ tooltip: 'This description remains available while you hover it.', tooltipPosition: 'right', tooltipDelay: 150 });
    return <main style={{ margin: 32, maxWidth: 400 }}>
      <h1>Component quality</h1>
      <form onSubmit={event => {
        event.preventDefault();
        setSubmitted(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
      }}>
        <Input label="Name" name="name" defaultValue="Ada" maxLength={20} />
        <Dropdown name="city" label="City" required source={['Paris', 'Tokyo']} />
        <Checkbox name="alerts" label="Alerts" defaultChecked />
        <RadioGroup name="size" aria-label="Size" defaultValue="small">
          <div><RadioButton label="Small" value="small" /></div>
          <><RadioButton label="Large" value="large" /></>
        </RadioGroup>
        <button type="submit">Submit</button><button type="reset">Reset</button>
      </form>
      <output aria-label="Submitted data">{submitted}</output>
      <Checkbox label="Partial selection" indeterminate checked={false} />
      <Autocomplete label="Country" multiple={false} value={country}
        source={['Spain', 'Japan', 'France']} onChange={setCountry}
        onQueryChange={() => setQueries(value => value + 1)} />
      <output aria-label="Selected country">{country}</output>
      <output aria-label="Query changes">{queries}</output>
      {window.multipleExamples && <><MultipleSelection compound={false}/><MultipleSelection compound/></>}
      <div style={{ width: 280 }}><Tabs dir="rtl" value={tab} onValueChange={setTab}>
        {['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'].map(label => <Tab key={label} value={label} label={label}>{label} panel</Tab>)}
      </Tabs></div>
      <Avatar image="data:image/png;base64,broken" alt="Unavailable photo" title="Ada" />
      <Avatar image="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='indigo'/%3E%3C/svg%3E" alt="Loaded photo" title="Loaded" />
      <Avatar cover image="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='indigo'/%3E%3C/svg%3E" alt="Cover photo" title="Cover" />
      <div style={{ height: 400 }} />
      <button {...tip.triggerProps} style={{ position: 'absolute', right: 0, top: 800 }}>Information</button>
      {tip.tooltip}
      <div style={{ height: 1000 }} />
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

async function mount(page, multipleExamples = false) {
  await page.setContent(
    `<!doctype html><html lang="en"><head><title>Component quality</title><style>${css}</style></head><body><div id="root"></div></body></html>`,
  );
  await page.evaluate((value) => {
    window.multipleExamples = value;
  }, multipleExamples);
  await page.addScriptTag({ content: javascript });
  await expect(page.getByRole('heading', { name: 'Component quality' })).toBeVisible();
}

test('native validation, nested radios, submission and reset work in a browser', async ({ page }) => {
  await mount(page);
  const mixed = page.getByRole('checkbox', { name: 'Partial selection' });
  await expect(mixed).toBeChecked({ indeterminate: true });
  expect(
    await mixed.evaluate((input) => {
      const mark = getComputedStyle(input.nextElementSibling, '::after');
      return { width: mark.width, height: mark.height, transform: mark.transform, animation: mark.animationName };
    }),
  ).toEqual({ width: '10px', height: '2px', transform: 'none', animation: 'none' });
  await page.getByRole('button', { name: 'Submit' }).click();
  const city = page.getByRole('combobox', { name: /City/ });
  await expect(city).toBeFocused();
  await expect(city).toHaveAttribute('aria-invalid', 'true');
  await city.click();
  await page.getByRole('option', { name: 'Tokyo' }).click();
  await page.getByText('Large', { exact: true }).click();
  await expect(page.getByRole('radio', { name: 'Small' })).not.toBeChecked();
  await expect(page.locator('.rt-radio-radioChecked')).toHaveCount(1);
  await page.getByRole('textbox', { name: 'Name' }).fill('Grace');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByLabel('Submitted data')).toHaveText(
    '{"name":"Grace","city":"Tokyo","alerts":"on","size":"large"}',
  );
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(city).toHaveValue('');
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('Ada');
  await expect(page.getByText('3/20')).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Small' })).toBeChecked();
  await expect(page.locator('.rt-radio-radioChecked')).toHaveCount(1);
});

test('touch selection commits a suggestion and parent renders preserve the query', async ({ page }) => {
  await mount(page);
  const input = page.getByRole('combobox', { name: 'Country' });
  await input.fill('Ja');
  await expect(input).toHaveValue('Ja');
  await page.getByRole('option', { name: 'Japan' }).tap();
  await expect(page.getByLabel('Selected country')).toHaveText('Japan');
  await input.focus();
  await page.keyboard.press('Escape');
  await expect(input).toBeFocused();
  await input.fill('Sp');
  await expect(page.getByRole('option', { name: 'Spain' })).toBeVisible();
});

for (const kind of ['Convenience', 'Compound']) {
  test(`${kind} autocomplete commits each touch choice once while staying open`, async ({ page }) => {
    await mount(page, true);
    await page.getByRole('combobox', { name: `${kind} choices`, exact: true }).tap();
    await page.getByRole('option', { name: 'Alpha', exact: true }).tap();
    await expect(page.getByLabel(`${kind} choices result`)).toHaveText('Alpha:1');
    await page.getByRole('option', { name: 'Beta', exact: true }).tap();
    const selected = (await page.getByLabel(`${kind} choices result`).textContent()).split(':');
    expect(selected[0].split(',').sort()).toEqual(['Alpha', 'Beta']);
    expect(selected[1]).toBe('2');
  });
}

test('avatars replace fallback content only after a usable image loads', async ({ page }) => {
  await mount(page);
  await expect(page.getByText('A', { exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Loaded photo' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Cover photo' })).toBeVisible();
  await expect(page.getByText('L', { exact: true })).toHaveCount(0);
  await expect(page.getByText('C', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('img', { name: 'Unavailable photo' })).toHaveCount(0);
});

test('RTL tab scrolling exposes both ends and keeps the active label visible', async ({ page }) => {
  await mount(page);
  const first = page.getByRole('tab', { name: 'First' });
  await expect(page.getByRole('button', { name: 'Scroll tabs left' })).toBeVisible();
  const arrow = page.getByRole('button', { name: 'Scroll tabs left' }).locator('[data-react-toolbox="font-icon"]');
  const glyph = await arrow.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      width: element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight),
      fontSize: parseFloat(style.fontSize),
    };
  });
  expect(glyph.width, 'The padded tab arrow must retain room for its glyph').toBeGreaterThanOrEqual(glyph.fontSize);
  await first.focus();
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: 'Sixth' })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toHaveText('Sixth panel');
  await expect(page.getByRole('button', { name: 'Scroll tabs right' })).toBeVisible();
  await page.getByRole('button', { name: 'Scroll tabs right' }).click();
  await expect(page.getByRole('button', { name: 'Scroll tabs left' })).toBeVisible();
});

test('tooltip stays hoverable and within the viewport as its trigger moves', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mount(page);
  const trigger = page.getByRole('button', { name: 'Information' });
  await trigger.hover();
  const tooltip = page.getByRole('tooltip');
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveCSS('pointer-events', 'auto');
  await tooltip.hover();
  await page.waitForTimeout(250); // Exceed both the traversal grace and exit duration.
  await expect(tooltip).toBeVisible();
  const bounds = await tooltip.boundingBox();
  expect(bounds.x).toBeGreaterThanOrEqual(7);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(383);
  await page.keyboard.press('Escape');
  await expect(tooltip).toHaveCount(0);
  await trigger.focus();
  await expect(tooltip).toBeVisible();
  await page.evaluate(() => window.scrollBy(0, 100));
  await expect.poll(async () => (await tooltip.boundingBox()).y).toBeLessThan(744);
  await page.setViewportSize({ width: 320, height: 640 });
  await expect
    .poll(async () => {
      const rect = await tooltip.boundingBox();
      return rect.x + rect.width;
    })
    .toBeLessThanOrEqual(313);
});
