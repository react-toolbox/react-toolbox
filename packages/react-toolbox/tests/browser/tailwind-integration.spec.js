import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import { test, expect } from '@playwright/test';

const root = fileURLToPath(new URL('../../', import.meta.url));
const source = `
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, IconButton, BrowseButton, AppBar, Avatar, Card, CardTitle, CardText, CardActions, CardMedia, Checkbox, Chip,
  Input, Dropdown, Autocomplete, ProgressBar, RadioButton, RadioGroup, Slider, Switch, List, ListItem, ListDivider, ListSubHeader,
  Table, TableHead, TableRow, TableCell, Tabs, Tab, DatePicker, TimePicker, ThemeProvider, Dialog } from './src';
import { shadcnThemeVariables } from './src/material/foundations/theme/shadcn';
function Bridge() { return <>
  <div id="host" className="bg-primary">Host</div><Button id="default-color" primary raised label="Original" />
  <ThemeProvider variables={{...shadcnThemeVariables, ...window.__SCOPE_TOKENS__}}>
    <Button id="bridged-color" primary raised label="Bridged" />
    <Button id="bridged-accent" accent raised label="Bridged accent" />
    <Card id="bridged-card"><CardText>Card text</CardText></Card>
    <Input id="bridged-input" label="Input" value="Value" />
    <Dialog active title="Themed portal" actions={[{label:'Action',primary:true,raised:true}]}><p>Portal content</p></Dialog>
  </ThemeProvider>
</> }
function App() { return <main id="fixture" style={{ width: 1000, padding: 24, display:'grid',gridTemplateColumns:'1fr 1fr', gap:24,background:'white',color:'#212121' }}>
  <section><Button className={window.__CLASSES__?.button} primary raised label="Primary" /><Button accent label="Accent" /><IconButton icon="+" /><BrowseButton label="Upload" />
    <AppBar title="Heading" leftIcon="+" /><Avatar title="Name" />
    <Card className={window.__CLASSES__?.card}><CardTitle title="Card title" subtitle="Card subtitle" /><CardText className={window.__CLASSES__?.text}>Card body text.</CardText><CardActions className={window.__CLASSES__?.actions}><Button label="Read" /></CardActions></Card>
    <List selectable><ListSubHeader caption="Contacts" /><ListItem caption="One line" /><ListItem caption="Two lines" legend="More text" /><ListDivider /></List>
  </section>
  <section><Input label="Name" value="Value" hint="Hint" /><Input label="Blank" hint="Placeholder" multiline />
    <Checkbox label="Selected" checked /><Switch label="Enabled" checked /><RadioGroup value="a"><RadioButton label="First" value="a" /><RadioButton label="Second" value="b" /></RadioGroup>
    <Chip deletable>Chip</Chip><ProgressBar mode="determinate" value={40} buffer={60} /><ProgressBar type="circular" mode="determinate" value={40} />
    <Slider editable snaps pinned value={4} min={0} max={10} step={2} />
    <Tabs index={0}><Tab label="Selected">Tab body</Tab><Tab label="Other" /></Tabs>
    <Table><TableHead><TableCell sorted="asc">Name</TableCell><TableCell numeric>Number</TableCell></TableHead><TableRow selected><TableCell>Alpha</TableCell><TableCell numeric>10</TableCell></TableRow></Table>
    <Dropdown label="Country" source={[{value:'a',label:'Option A'},{value:'b',label:'Option B'}]} value="a" />
    <Autocomplete label="Search" source={['One','Two']} value="One" multiple={false} />
    <DatePicker label="Date" value={new Date(2025,2,1)} /><TimePicker label="Time" value={new Date(2025,2,1,10,30)} />
  </section>
</main>};
createRoot(document.getElementById('root')).render(window.__TAILWIND_BRIDGE__ ? <Bridge /> : <App />);
`;
let javascript, plain, integrated, semantic, customSpacing, materialSpacing, fonts;
test.beforeAll(async () => {
  fonts = (
    await Promise.all(
      [300, 400, 500, 700].map(
        async (weight) =>
          `@font-face{font-family:Roboto;font-style:normal;font-weight:${weight};src:url(data:font/woff2;base64,${(await readFile(`${root}/node_modules/@fontsource/roboto/files/roboto-latin-${weight}-normal.woff2`)).toString('base64')}) format('woff2');}`,
      ),
    )
  ).join('');
  fonts += `@font-face{font-family:'Material Icons';font-style:normal;font-weight:400;src:url(data:font/woff2;base64,${(await readFile(`${root}/node_modules/material-icons/iconfont/material-icons.woff2`)).toString('base64')}) format('woff2');}@layer base{.material-icons{font-family:'Material Icons';font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:'liga';-webkit-font-smoothing:antialiased;}}`;
  javascript = (
    await build({
      stdin: { contents: source, resolveDir: root, loader: 'jsx' },
      bundle: true,
      write: false,
      // Compare independently compiled host styles in this fixture.
      loader: { '.css': 'empty' },
      format: 'iife',
      define: { 'process.env.NODE_ENV': '"production"' },
    })
  ).outputFiles[0].text;
  plain = (
    await postcss([tailwind()]).process(
      '@layer theme, base, components, utilities; @import "tailwindcss/theme.css" layer(theme); @import "tailwindcss/utilities.css" layer(utilities) source(none); @import "./src/material/foundations/styles/styles.css"; @source "./src/material";',
      { from: `${root}/integration.css` },
    )
  ).css;
  integrated = (
    await postcss([tailwind()]).process(
      '@import "tailwindcss"; @import "./src/material/foundations/styles/styles.css"; @import "./src/material/foundations/styles/tailwind.css"; @source inline("h-20 bg-toolbox-primary! text-toolbox-accent! p-4 p-6! gap-2 p-toolbox px-2 toolbox-desktop:px-4 text-toolbox-title text-toolbox-primary");',
      { from: `${root}/integration.css` },
    )
  ).css;
  customSpacing = (
    await postcss([tailwind()]).process(
      '@import "tailwindcss"; @theme { --spacing: 6px; } @import "./src/material/foundations/styles/styles.css"; @import "./src/material/foundations/styles/tailwind.css"; @source inline("p-4 p-6! gap-2 p-toolbox");',
      { from: `${root}/integration.css` },
    )
  ).css;
  materialSpacing = (
    await postcss([tailwind()]).process(
      '@import "tailwindcss"; @import "./src/material/foundations/styles/styles.css"; @import "./src/material/foundations/styles/tailwind.css"; @theme { --spacing: 4px; } @source inline("p-4 p-6! gap-2 p-toolbox");',
      { from: `${root}/integration.css` },
    )
  ).css;
  semantic = (
    await postcss([tailwind()]).process(
      '@import "tailwindcss"; @import "./src/material/foundations/styles/styles.css"; @import "./src/material/foundations/styles/shadcn.css"; @theme inline { --color-primary: var(--primary); } @source inline("bg-primary");',
      { from: `${root}/integration.css` },
    )
  ).css;
});
async function fixture(page, css, lineHeight = 'normal', classes = {}) {
  // Match the host environment on both pages, including the body containing
  // portals. Host typography is intentionally inherited: this compatibility
  // entry reverses element resets without overriding application typography.
  await page.setContent(
    `<!doctype html><style>${fonts}${css}</style><style>body{margin:0;font-family:Arial,sans-serif;font-size:16px;line-height:${lineHeight}}#fixture section{min-width:0;box-sizing:content-box;border-style:none}#fixture{box-sizing:content-box}*,*::before,*::after{animation:none!important;transition:none!important}</style><div id="root"></div>`,
  );
  await page.evaluate(async () => {
    await Promise.all([300, 400, 500, 700].map((weight) => document.fonts.load(`${weight} 14px Roboto`)));
    await document.fonts.load('24px "Material Icons"');
  });
  await page.evaluate((classes) => {
    window.__CLASSES__ = classes;
  }, classes);
  await page.addScriptTag({ content: javascript });
  await page.locator('#fixture [data-react-toolbox="input"]').first().waitFor();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.rt-tabs-pointer')).not.toHaveCSS('width', '0px');
}
/** Primitive hidden form bridges have no visible geometry; compare every rendered surface. */
async function geometry(page, selector = '#fixture *:not(input[aria-hidden="true"])') {
  return page.locator(selector).evaluateAll((nodes) =>
    nodes.map((node) => {
      const style = getComputedStyle(node),
        rect = node.getBoundingClientRect();
      return {
        tag: node.tagName,
        classes: node.className.baseVal ?? node.className,
        rect: [rect.x, rect.y, rect.width, rect.height],
        style: Object.fromEntries(
          [
            'font-family',
            'font-size',
            'font-weight',
            'line-height',
            'display',
            'margin',
            'padding',
            'border',
            'border-radius',
            'color',
            'background-color',
            'vertical-align',
            'appearance',
            'box-sizing',
            'text-decoration',
            'letter-spacing',
            'max-width',
            'fill',
            'stroke',
            'stroke-width',
            'stroke-dasharray',
            'stroke-dashoffset',
            'opacity',
            'box-shadow',
          ].map((key) => [key, style.getPropertyValue(key)]),
        ),
      };
    }),
  );
}
test('standard Tailwind Preflight retains exact Material component geometry and pixels', async ({
  browser,
}, testInfo) => {
  const base = await browser.newPage({ viewport: { width: 1100, height: 1400 } }),
    full = await browser.newPage({ viewport: { width: 1100, height: 1400 } });
  await fixture(base, plain);
  await fixture(full, integrated);
  const before = await geometry(base),
    after = await geometry(full);
  const differences = before.flatMap((value, index) =>
    JSON.stringify(value) === JSON.stringify(after[index]) ? [] : [{ index, before: value, after: after[index] }],
  );
  if (differences.length)
    await testInfo.attach('preflight-differences', {
      body: JSON.stringify(differences, null, 2),
      contentType: 'application/json',
    });
  const [baseImage, fullImage] = await Promise.all([
    base.locator('#fixture').screenshot(),
    full.locator('#fixture').screenshot(),
  ]);
  if (!baseImage.equals(fullImage)) {
    await writeFile(testInfo.outputPath('plain.png'), baseImage);
    await writeFile(testInfo.outputPath('tailwind.png'), fullImage);
    await testInfo.attach('plain', { body: baseImage, contentType: 'image/png' });
    await testInfo.attach('tailwind', { body: fullImage, contentType: 'image/png' });
  }
  await writeFile(testInfo.outputPath('differences.json'), JSON.stringify(differences, null, 2));
  expect(differences.length, 'computed differences; inspect differences.json').toBe(0);
  expect(fullImage.equals(baseImage)).toBe(true);
  await base.close();
  await full.close();
});

test('Material text roles retain both size and color when composed through className', async ({ page }) => {
  await fixture(page, integrated, 'normal', { card: 'text-toolbox-title text-toolbox-primary' });
  const card = page.locator('#fixture [data-react-toolbox="card"]');
  await expect(card).toHaveCSS('font-size', '20px');
  await expect(card).toHaveCSS('line-height', '28px');
  await expect(card).toHaveCSS('font-weight', '500');
  await expect(card).toHaveCSS('color', 'rgb(63, 81, 181)');
});

test('Tailwind utilities override component geometry and resolve scoped Toolbox colors', async ({ page }) => {
  // Color overrides intentionally supersede the primary/disabled appearance
  // variants. Base geometry overrides merge without requiring important.
  await fixture(page, integrated, 'normal', { button: 'h-20 bg-toolbox-primary! text-toolbox-accent!' });
  const button = page.locator('#fixture button').first();
  await button.evaluate((node) => {
    node.style.setProperty('--rt-color-primary', '#00695c');
    node.style.setProperty('--rt-color-accent', '#aabbcc');
  });
  await expect(button).toHaveCSS('height', '80px');
  await expect(button).toHaveCSS('background-color', 'rgb(0, 105, 92)');
  await expect(button).toHaveCSS('color', 'rgb(170, 187, 204)');
});

for (const spacing of [
  { name: 'the default rem scale', scale: 5 },
  { name: 'an existing application theme', scale: 6 },
  { name: 'an explicit Material subgrid opt-in', scale: 4 },
]) {
  test(`Tailwind spacing preserves ${spacing.name} without resizing components`, async ({ page }) => {
    /** Important padding overrides CardText's sibling and responsive keylines
     * as well as its base spacing; exercise the public className API. */
    const css = spacing.scale === 5 ? integrated : spacing.scale === 6 ? customSpacing : materialSpacing;
    await fixture(page, css, 'normal', {
      card: 'p-4',
      text: 'p-6!',
      actions: 'gap-2',
    });
    /** A 20px host root turns Tailwind's default .25rem spacing into 5px.
     * Application pixel scales and Material geometry remain independent. */
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '20px';
    });
    const card = page.locator('.rt-card-card').first();
    const text = card.locator('.rt-card-cardText');
    const actions = card.locator('.rt-card-cardActions');
    await page.locator('#fixture').evaluate((node) => {
      const probe = document.createElement('div');
      probe.id = 'toolbox-spacing';
      probe.className = 'p-toolbox';
      node.append(probe);
    });
    await expect(card).toHaveCSS('padding', `${spacing.scale * 4}px`);
    await expect(text).toHaveCSS('padding', `${spacing.scale * 6}px`);
    await expect(actions).toHaveCSS('gap', `${spacing.scale * 2}px`);
    await expect(page.locator('#toolbox-spacing')).toHaveCSS('padding', '10px');
    await expect(page.locator('#fixture button').first()).toHaveCSS('height', '36px');
    /** Nested application scopes can customize spacing without changing
     * component --unit or the rest of the page. */
    await card.evaluate((node) => node.style.setProperty('--spacing', '7px'));
    await expect(card).toHaveCSS('padding', '28px');
    await expect(text).toHaveCSS('padding', '42px');
    await expect(actions).toHaveCSS('gap', '14px');
    await expect(page.locator('#toolbox-spacing')).toHaveCSS('padding', '10px');
    await expect(page.locator('#fixture button').first()).toHaveCSS('height', '36px');
  });
}

test('Toolbox desktop spacing matches both card breakpoint boundaries', async ({ page }) => {
  await fixture(page, integrated, 'normal', { actions: 'px-2 toolbox-desktop:px-4' });
  const card = page.locator('.rt-card-card').first();
  const title = card.locator('.rt-card-cardTitle');
  const text = card.locator('.rt-card-cardText');
  const actions = card.locator('.rt-card-cardActions');
  for (const width of [599, 600]) {
    for (const height of [599, 600]) {
      await page.setViewportSize({ width, height });
      const desktop = width >= 600 && height >= 600;
      const keyline = desktop ? '24px' : '16px';
      const inset = desktop ? '16px' : '8px';
      await expect(title).toHaveCSS('padding-left', keyline);
      await expect(text).toHaveCSS('padding-left', keyline);
      await expect(actions).toHaveCSS('padding-left', inset);
      await expect(actions).toHaveCSS('padding-right', inset);
    }
  }
  // The component query is screen-only; printed content keeps mobile keylines.
  await page.emulateMedia({ media: 'print' });
  await expect(text).toHaveCSS('padding-left', '16px');
  await expect(actions).toHaveCSS('padding-left', '8px');
});

for (const scoped of [false, true]) {
  test(`shadcn bridge is explicit and preserves host tokens, including ${scoped ? 'scoped' : 'root'} portal colors`, async ({
    page,
  }) => {
    await page.setContent(`<!doctype html><style>${semantic}</style><style>
      :root { --primary:#663399; --primary-foreground:#ffffff; --background:#fafafa; --foreground:#222222;
        --card:#f0f0ff; --card-foreground:#112233; --popover:#fff0ff; --popover-foreground:#332244;
        --input:#777777; --border:#aaaaaa; --accent:#eee0ff; --accent-foreground:#222222; }
      *,*::before,*::after{transition:none!important;animation:none!important}
    </style><div id="root"></div>`);
    await page.evaluate((scoped) => {
      window.__TAILWIND_BRIDGE__ = true;
      if (scoped)
        window.__SCOPE_TOKENS__ = {
          '--primary': '#00695c',
          '--primary-foreground': '#ffffff',
          '--popover': '#e0ffff',
          '--popover-foreground': '#003333',
        };
    }, scoped);
    await page.addScriptTag({ content: javascript });
    await expect(page.locator('#default-color')).toHaveCSS('background-color', 'rgb(63, 81, 181)');
    await expect(page.locator('#host')).toHaveCSS('background-color', 'rgb(102, 51, 153)');
    await expect(page.locator('#bridged-color')).toHaveCSS(
      'background-color',
      scoped ? 'rgb(0, 105, 92)' : 'rgb(102, 51, 153)',
    );
    await expect(page.locator('#bridged-card')).toHaveCSS('background-color', 'rgb(240, 240, 255)');
    await expect(page.locator('#bridged-card')).toHaveCSS('color', 'rgb(17, 34, 51)');
    await expect(page.locator('#bridged-accent')).toHaveCSS('background-color', 'rgb(238, 224, 255)');
    await expect(page.locator('#bridged-accent')).toHaveCSS('color', 'rgb(34, 34, 34)');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveCSS('background-color', scoped ? 'rgb(224, 255, 255)' : 'rgb(255, 240, 255)');
    await expect(dialog).toHaveCSS('color', scoped ? 'rgb(0, 51, 51)' : 'rgb(51, 34, 68)');
    await expect(dialog.getByRole('button')).toHaveCSS(
      'background-color',
      scoped ? 'rgb(0, 105, 92)' : 'rgb(102, 51, 153)',
    );
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()),
    ).toBe('#663399');
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--primary', '#dddddd');
      document.documentElement.style.setProperty('--primary-foreground', '#111111');
      document.documentElement.style.setProperty('--card', '#222222');
      document.documentElement.style.setProperty('--card-foreground', '#eeeeee');
    });
    await expect(page.locator('#host')).toHaveCSS('background-color', 'rgb(221, 221, 221)');
    await expect(page.locator('#default-color')).toHaveCSS('background-color', 'rgb(63, 81, 181)');
    await expect(page.locator('#bridged-color')).toHaveCSS(
      'background-color',
      scoped ? 'rgb(0, 105, 92)' : 'rgb(221, 221, 221)',
    );
    await expect(page.locator('#bridged-card')).toHaveCSS('color', 'rgb(238, 238, 238)');
  });
}

test('shadcn bridge falls back to the Material accent when host colors are absent', async ({ page }) => {
  await page.setContent(`<!doctype html><style>${semantic}</style><div id="root"></div>`);
  await page.evaluate(() => {
    window.__TAILWIND_BRIDGE__ = true;
  });
  await page.addScriptTag({ content: javascript });
  await expect(page.locator('#bridged-accent')).toHaveCSS('background-color', 'rgb(216, 27, 96)');
  await expect(page.locator('#bridged-accent')).toHaveCSS('color', 'rgb(255, 255, 255)');
});

for (const [label, lineHeight] of ['Date', 'Time'].flatMap((label) =>
  ['normal', '1.5'].map((height) => [label, height]),
)) {
  test(`standard Preflight preserves exact ${label.toLowerCase()} picker portal pixels with host line-height ${lineHeight}`, async ({
    browser,
  }, testInfo) => {
    const base = await browser.newPage({ viewport: { width: 1100, height: 1400 } });
    const full = await browser.newPage({ viewport: { width: 1100, height: 1400 } });
    await fixture(base, plain, lineHeight);
    await fixture(full, integrated, lineHeight);
    for (const page of [base, full]) {
      await page.getByLabel(label, { exact: true }).click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.mouse.move(0, 0);
      await page.evaluate(async () => {
        await Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => {})));
      });
    }
    const geometryBefore = await geometry(base, '.rt-dialog-dialog, .rt-dialog-dialog *');
    const geometryAfter = await geometry(full, '.rt-dialog-dialog, .rt-dialog-dialog *');
    const differences = geometryBefore.flatMap((value, index) =>
      JSON.stringify(value) === JSON.stringify(geometryAfter[index])
        ? []
        : [{ index, before: value, after: geometryAfter[index] }],
    );
    await writeFile(testInfo.outputPath('differences.json'), JSON.stringify(differences, null, 2));
    const before = await base.getByRole('dialog').screenshot();
    const after = await full.getByRole('dialog').screenshot();
    if (!before.equals(after)) {
      await writeFile(testInfo.outputPath('plain.png'), before);
      await writeFile(testInfo.outputPath('tailwind.png'), after);
      await testInfo.attach('plain-picker', { body: before, contentType: 'image/png' });
      await testInfo.attach('tailwind-picker', { body: after, contentType: 'image/png' });
    }
    expect(differences).toEqual([]);
    expect(after.equals(before)).toBe(true);
    await base.close();
    await full.close();
  });
}
