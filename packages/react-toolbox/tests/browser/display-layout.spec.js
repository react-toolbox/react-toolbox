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
          import { Layout, NavDrawer, Sidebar, Panel } from './src/material/layout';
          import AppBar from './src/material/app-bar';
          import { List, ListItem, ListSubHeader, ListDivider } from './src/material/list';
          import Chip from './src/material/chip';
          import ProgressBar from './src/material/progress-bar';
          import Checkbox from './src/material/checkbox';
          import { RadioButton } from './src/material/radio';
          import Switch from './src/material/switch';
          import { TableRoot, TableHeader, TableHead, TableBody, TableRow, TableCell } from './src/material/table';
          import { InputFormRecipe, AvatarGroupRecipe, AvatarStatusRecipe, DestructiveActionRecipe } from './src/examples/recipes';
          function Navigation() { return <NavDrawer pinned>Navigation</NavDrawer>; }
          function Details() { return <Sidebar pinned width={window.fixtureWidth}>Details</Sidebar>; }
          function Header() { return <AppBar fixed title="Project" />; }
          function App() {
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
            return <Layout dir={window.fixtureDirection}>
              {window.fixtureNav && <Navigation />}
              <Header />
              <Panel><List selectable>
                <ListSubHeader>Tasks</ListSubHeader>
                <ListItem caption="Read details" />
                <ListItem caption="Edit details" onClick={() => {}} />
                <ListDivider />
              </List>
              <Chip deletable deleteLabel="Remove passive">Passive</Chip>
              <Chip deletable onClick={() => {}} deleteLabel="Remove interactive">Interactive</Chip>
              </Panel>
              <Details />
            </Layout>;
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

async function fixture(page, { width, direction = 'ltr', nav = false, recipes = false } = {}) {
  await page.setContent(
    `<!doctype html><html lang="en"><head><title>Display regression fixture</title><style>${css}body{margin:0}*{transition:none!important}</style></head><body><div id="root"></div></body></html>`,
  );
  await page.evaluate(
    (options) => {
      window.fixtureWidth = options.width;
      window.fixtureDirection = options.direction;
      window.fixtureNav = options.nav;
      window.fixtureRecipes = options.recipes;
    },
    { width, direction, nav, recipes },
  );
  await page.addScriptTag({ content: javascript });
  if (!recipes) await expect(page.locator('.rt-layout-layout')).toHaveClass(/rt-layout-sidebarPinned/);
}

for (const direction of ['ltr', 'rtl']) {
  test(`wrapped layout reserves the rendered percentage sidebar width in ${direction}`, async ({ page }) => {
    await fixture(page, { width: 50, direction, nav: true });
    const sidebar = await page.locator('.rt-layout-sidebarDrawer').boundingBox();
    const nav = await page.locator('.rt-layout-navDrawerDrawer').boundingBox();
    const panel = await page.locator('[data-react-toolbox="panel"]').boundingBox();
    expect(sidebar.width).toBe(720);
    expect(direction === 'ltr' ? panel.x : 1440 - panel.x - panel.width).toBe(nav.width);
    expect(direction === 'ltr' ? 1440 - panel.x - panel.width : panel.x).toBe(sidebar.width);
    expect(direction === 'ltr' ? sidebar.x : nav.x).toBeGreaterThan(0);
    const padding = await page.locator('[data-react-toolbox="app-bar"]').evaluate((element) => {
      const styles = getComputedStyle(element);
      return { start: parseFloat(styles.paddingInlineStart), end: parseFloat(styles.paddingInlineEnd) };
    });
    expect(padding.start).toBe(nav.width + 24);
    expect(padding.end).toBe(sidebar.width + 24);
  });
}

test('sidebar and panel share responsive numeric and percentage width resolution', async ({ page }) => {
  for (const width of [4, 10, 12, 50]) {
    await fixture(page, { width });
    for (const viewportWidth of [640, 760, 900]) {
      await page.setViewportSize({ width: viewportWidth, height: 1000 });
      const sidebar = await page.locator('.rt-layout-sidebarDrawer').boundingBox();
      const panel = await page.locator('[data-react-toolbox="panel"]').boundingBox();
      const reserved = viewportWidth - panel.x - panel.width;
      expect(reserved, `${width} at ${viewportWidth}`).toBeCloseTo(sidebar.width, 1);
    }
  }
});

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
    await password.fill('secret-words');
    await page.getByRole('button', { name: 'Show password' }).click();
    await expect(password).toHaveAttribute('type', 'text');
    await page.getByRole('button', { name: 'Save preferences' }).click();
    await expect(page.getByRole('status')).toHaveText('Preferences saved.');
    const input = await password.boundingBox();
    const reveal = await page.getByRole('button', { name: 'Hide password' }).boundingBox();
    expect(reveal.y).toBe(input.y);
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
