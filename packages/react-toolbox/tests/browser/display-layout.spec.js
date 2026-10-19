import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import { test, expect } from '@playwright/test';

const root = fileURLToPath(new URL('../../', import.meta.url));
let javascript, css;
test.beforeAll(async () => {
  const bundle = await build({
    stdin: {
      contents: `
          import React from 'react';
          import { createRoot } from 'react-dom/client';
          import { List, ListItem, ListItemContent, ListItemText, ListSubHeader, ListDivider } from './src/material/list';
          import { Tabs, Tab } from './src/material/tabs';
          import Chip from './src/material/chip';
          import ProgressBar from './src/material/progress-bar';
          import Checkbox from './src/material/checkbox';
          import { RadioButton } from './src/material/radio';
          import Switch from './src/material/switch';
          import { TableRoot, TableHeader, TableHead, TableBody, TableRow, TableCell } from './src/material/table';
          import { InputFormRecipe, AvatarGroupRecipe, AvatarStatusRecipe, DestructiveActionRecipe } from './src/examples/recipes';
          function App() {
            if (window.fixtureCancellation) return <main>
              <Checkbox label="Locked unchecked" checked={false} onChange={(_, event) => event.preventDefault()} />
              <Checkbox label="Locked checked" defaultChecked onChange={(_, event) => event.preventDefault()} />
              <Checkbox label="Locked mixed" checked={false} indeterminate onClick={event => event.preventDefault()} />
              <TableRoot aria-label="Locked table" selectionMode="multiple">
                <TableHeader><TableHead onSelectionChange={(_, event) => event.preventDefault()}><TableCell>Name</TableCell></TableHead></TableHeader>
                <TableBody><TableRow value="ada" onSelectionChange={(_, event) => event.preventDefault()}><TableCell>Ada</TableCell></TableRow></TableBody>
              </TableRoot>
            </main>;
            if (window.fixtureMetrics) return <main dir={window.fixtureDirection}>
              <Tabs defaultValue="overview" aria-label="Project views"><Tab value="overview" label="Overview"/><Tab value="details" label="Details"/></Tabs>
              <List aria-label="Messages">
                {[false, true].flatMap(interactive => ['icon', 'avatar'].map(leading => (
                  <ListItem key={leading + interactive}
                    leftIcon={leading === 'icon' ? 'folder' : undefined}
                    avatar={leading === 'avatar' ? <span>A</span> : undefined}
                    onClick={interactive ? () => {} : undefined}>
                    <ListItemContent caption="Project notes" legend="Updated today">
                      <ListItemText>Ready for review</ListItemText>
                    </ListItemContent>
                  </ListItem>
                )))}
              </List>
            </main>;
            if (window.fixtureRecipes) return <main dir={window.fixtureDirection} style={{padding:24,maxWidth:600}}>
              <h1>Composition recipes</h1>
              <AvatarGroupRecipe people={[{id:'ada',name:'Ada'},{id:'lin',name:'Lin'},{id:'sam',name:'Sam'}]} maxVisible={2} />
              <AvatarStatusRecipe person={{id:'ada',name:'Ada'}} status="online" />
              <InputFormRecipe />
              <Checkbox label="Remember choice" />
              <RadioButton label="Standard delivery" name="delivery" value="standard" />
              <Switch label="Notifications" defaultChecked />
              <DestructiveActionRecipe itemName="draft" onDelete={() => {}} />
              <ProgressBar aria-label="Import progress" mode="determinate" value={25} />
              <TableRoot aria-label="Selection table" selectionMode="multiple">
                <TableHeader><TableHead><TableCell>Name</TableCell></TableHead></TableHeader>
                <TableBody><TableRow value="ada"><TableCell>Ada</TableCell></TableRow></TableBody>
              </TableRoot>
              <TableRoot aria-label="Reference table">
                <TableHeader><TableRow><TableCell>Name</TableCell></TableRow></TableHeader>
                <TableBody><TableRow><TableCell>Ada</TableCell></TableRow></TableBody>
              </TableRoot>
            </main>;
            return <main dir={window.fixtureDirection}>
              <List selectable>
                <ListSubHeader>Tasks</ListSubHeader>
                <ListItem caption="Read details" />
                <ListItem caption="Edit details" onClick={() => {}} />
                <ListDivider />
              </List>
              <Chip deletable deleteLabel="Remove passive">Passive</Chip>
              <Chip deletable onClick={() => {}} deleteLabel="Remove interactive">Interactive</Chip>
            </main>;
          }
          createRoot(document.getElementById('root')).render(<App />);
        `,
      resolveDir: root,
      loader: 'jsx',
    },
    bundle: true,
    write: false,
    loader: { '.css': 'empty' },
    format: 'iife',
    define: { 'process.env.NODE_ENV': '"production"' },
  });
  javascript = bundle.outputFiles[0].text;
  css = (
    await postcss([tailwind()]).process(
      '@import "tailwindcss"; @import "./src/material/foundations/styles/styles.css"; @import "./src/material/foundations/styles/tailwind.css";',
      { from: `${root}/display-layout.css` },
    )
  ).css;
});

async function fixture(page, { direction = 'ltr', recipes = false, metrics = false, cancellation = false } = {}) {
  await page.setContent(
    `<!doctype html><html lang="en"><head><title>Display regression fixture</title><style>${css}body{margin:0}*{transition:none!important}</style></head><body><div id="root"></div></body></html>`,
  );
  await page.evaluate(
    (options) => {
      window.fixtureDirection = options.direction;
      window.fixtureRecipes = options.recipes;
      window.fixtureMetrics = options.metrics;
      window.fixtureCancellation = options.cancellation;
    },
    { direction, recipes, metrics, cancellation },
  );
  await page.addScriptTag({ content: javascript });
  await expect(page.getByRole('main')).toBeVisible();
}

test('cancelled checkbox activation keeps native state, visual state and table selection synchronized', async ({
  page,
}) => {
  await fixture(page, { cancellation: true });
  for (const activation of ['click', 'keyboard']) {
    for (const name of ['Locked unchecked', 'Locked checked', 'Locked mixed', 'Select all rows', 'Select row ada']) {
      const checkbox = page.getByRole('checkbox', { name, exact: true });
      if (activation === 'click') await checkbox.locator('..').click();
      else await checkbox.press('Space');
      await expect(checkbox).toBeChecked({ checked: name === 'Locked checked' });
      if (name === 'Locked mixed') await expect(checkbox).toBeChecked({ indeterminate: true });
      await expect(checkbox.locator('..').locator('.rt-checkbox-checked')).toHaveCount(
        name === 'Locked checked' || name === 'Locked mixed' ? 1 : 0,
      );
    }
  }
});

for (const direction of ['ltr', 'rtl']) {
  test(`text tabs center their labels and interactive three-line lists retain top alignment in ${direction}`, async ({
    page,
  }) => {
    await fixture(page, { direction, metrics: true });
    for (const viewport of [
      { width: 390, height: 844 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(viewport);
      for (const tab of await page.getByRole('tab').all()) {
        const geometry = await tab.evaluate((element) => {
          const range = document.createRange();
          range.selectNodeContents(element);
          const label = range.getBoundingClientRect();
          const bounds = element.getBoundingClientRect();
          return { labelCenter: label.left + label.width / 2, tabCenter: bounds.left + bounds.width / 2 };
        });
        expect(geometry.labelCenter).toBeCloseTo(geometry.tabCenter, 1);
      }
      for (const row of await page.getByRole('listitem').all()) {
        const geometry = await row.evaluate((element) => {
          const leading = element.querySelector('.rt-list-left [data-react-toolbox]');
          return { rowTop: element.getBoundingClientRect().top, leadingTop: leading.getBoundingClientRect().top };
        });
        expect(geometry.leadingTop - geometry.rowTop).toBeCloseTo(16, 1);
      }
    }
  });
}

test('native list and chip actions retain the passive geometry', async ({ page }) => {
  await fixture(page);
  const rows = await page
    .locator('.rt-list-listItem')
    .evaluateAll((items) => items.map((item) => item.getBoundingClientRect().height));
  expect(rows).toEqual([48, 48]);
  const chips = await page
    .locator('[data-react-toolbox="chip"]')
    .evaluateAll((items) => items.map((item) => item.getBoundingClientRect().height));
  expect(chips).toEqual([32, 32]);
  const remove = page.getByRole('button', { name: 'Remove interactive' });
  await expect(remove).toBeVisible();
  await expect(page.getByRole('button', { name: 'Interactive', exact: true })).toBeVisible();
});

for (const direction of ['ltr', 'rtl']) {
  test(`form recipe affordances and linear progress follow ${direction}`, async ({ page }) => {
    await fixture(page, { direction, recipes: true });
    const password = page.getByLabel(/^Password/);
    const emptyInput = await password.boundingBox();
    const hiddenReveal = await page.getByRole('button', { name: 'Show password' }).boundingBox();
    expect(hiddenReveal.height).toBe(48);
    expect(hiddenReveal.width).toBe(48);
    expect(hiddenReveal.y + hiddenReveal.height / 2).toBeCloseTo(emptyInput.y + emptyInput.height / 2, 1);
    await password.fill('secret-words');
    await page.getByRole('button', { name: 'Show password' }).click();
    await expect(password).toHaveAttribute('type', 'text');
    await page.getByRole('button', { name: 'Save preferences' }).click();
    await expect(page.getByRole('status')).toHaveText('Preferences saved.');
    const input = await password.boundingBox();
    const reveal = await page.getByRole('button', { name: 'Hide password' }).boundingBox();
    expect(reveal.y + reveal.height / 2).toBeCloseTo(input.y + input.height / 2, 1);
    expect(direction === 'ltr' ? reveal.x + reveal.width : reveal.x).toBe(
      direction === 'ltr' ? input.x + input.width : input.x,
    );
    const progress = await page.getByRole('progressbar').boundingBox();
    const fill = await page.locator('.rt-progress-bar-value').boundingBox();
    expect(fill.width).toBeCloseTo(progress.width / 4, 1);
    expect(direction === 'ltr' ? fill.x : fill.x + fill.width).toBe(
      direction === 'ltr' ? progress.x : progress.x + progress.width,
    );
    const table = page.getByRole('table', { name: 'Selection table' });
    const rowHeights = (rows) => rows.map((row) => row.getBoundingClientRect().height);
    expect(await table.getByRole('row').evaluateAll(rowHeights)).toEqual(
      await page.getByRole('table', { name: 'Reference table' }).getByRole('row').evaluateAll(rowHeights),
    );
    for (const checkbox of await table.locator('.rt-checkbox-field').all()) {
      const box = await checkbox.boundingBox();
      expect(box.width).toBe(48);
      expect(box.height).toBe(48);
    }
    for (const label of ['.rt-checkbox-text', '.rt-radio-text', '.rt-switch-text']) {
      await expect(page.locator(label)).toHaveCSS('padding-inline-start', '10px');
      await expect(page.locator(label)).toHaveCSS('padding-inline-end', '0px');
    }
    const toggle = page.getByRole('switch', { name: 'Notifications' });
    await expect(toggle).toBeChecked();
    const track = await page.locator('.rt-switch-on').boundingBox();
    const thumb = page.locator('.rt-switch-thumb');
    const checkedThumb = await thumb.boundingBox();
    expect(direction === 'ltr' ? checkedThumb.x + checkedThumb.width : checkedThumb.x).toBe(
      direction === 'ltr' ? track.x + track.width : track.x,
    );
    await page.getByText('Notifications', { exact: true }).click();
    await expect(toggle).not.toBeChecked();
    const uncheckedThumb = await thumb.boundingBox();
    expect(direction === 'ltr' ? uncheckedThumb.x : uncheckedThumb.x + uncheckedThumb.width).toBe(
      direction === 'ltr' ? track.x : track.x + track.width,
    );
    await page.getByRole('button', { name: 'Delete draft' }).click();
    await expect(page.getByRole('alertdialog', { name: 'Delete draft?' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();
  });
}
