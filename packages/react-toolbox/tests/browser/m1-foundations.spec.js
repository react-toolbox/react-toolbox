import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// These fixtures deliberately load the library styles directly, without depending on
// a built demo or its resets. Runtime tests cover the matching React DOM contract.
const files = ['colors.css', 'variables.css', 'button/config.css', 'button/theme.css',
  'app_bar/config.css', 'app_bar/theme.css', 'layout/theme.css', 'card/config.css',
  'card/theme.css', 'list/config.css', 'list/theme.css', 'avatar/config.css', 'avatar/theme.css', 'table/theme.css'];
const css = files.map(file => readFileSync(new URL(`../../components/${file}`, import.meta.url), 'utf8')).join('\n');
const icon = '<span data-react-toolbox="font-icon" class="rt-button-icon">+</span>';
const button = (id, classes, content = 'Action', attrs = '') => `<button id="${id}" class="rt-button-button rt-button-neutral ${classes}" ${attrs}>${content}</button>`;
async function fixture(page, content) {
  await page.setContent(`<style>body { margin: 0; } ${css}</style>${content}`);
}

// https://m1.material.io/components/buttons.html
// https://m1.material.io/components/buttons-floating-action-button.html
// https://m1.material.io/material-design/elevation-shadows.html
// https://m1.material.io/style/icons.html
// 12dp shadow implementation: Google's material-components-web v0.35.0 elevation variables.
test('M1 button geometry, elevation, focus, disabled states and token overrides', async ({ page }) => {
  await fixture(page, `<div style="padding:32px;display:flex;gap:24px;align-items:center">
    ${button('flat', 'rt-button-flat rt-button-squared')}
    ${button('raised', 'rt-button-raised rt-button-squared rt-button-solid')}
    ${button('fab', 'rt-button-floating rt-button-solid', icon)}
    ${button('mini', 'rt-button-floating rt-button-mini rt-button-solid', icon)}
    ${button('toggle', 'rt-button-toggle', icon)}
    ${button('disabled', 'rt-button-raised rt-button-squared rt-button-solid', 'Disabled', 'disabled')}
    ${button('inverse', 'rt-button-flat rt-button-squared rt-button-inverse', 'Disabled', 'disabled')}
  </div>`);
  await expect(page.locator('#flat')).toHaveCSS('min-width', '88px');
  await expect(page.locator('#flat')).toHaveCSS('height', '36px');
  await expect(page.locator('#flat')).toHaveCSS('padding-left', '16px');
  await expect(page.locator('#fab')).toHaveCSS('height', '56px');
  await expect(page.locator('#mini')).toHaveCSS('height', '40px');
  await expect(page.locator('#mini .rt-button-icon')).toHaveCSS('font-size', '24px');
  await expect(page.locator('#toggle')).toHaveCSS('height', '48px');
  await expect(page.locator('#toggle .rt-button-icon')).toHaveCSS('font-size', '24px');
  await expect(page.locator('#disabled')).toHaveCSS('box-shadow', 'none');
  await expect(page.locator('#inverse')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  expect(await page.locator('#flat').evaluate(node => getComputedStyle(node, '::after').minHeight)).toBe('48px');
  await page.locator('#flat').focus();
  expect(await page.locator('#flat').evaluate(node => getComputedStyle(node, '::before').opacity)).toBe('0.12');
  await page.locator('#flat').evaluate(node => node.addEventListener('click', () => { node.dataset.clicked = 'true'; }));
  const flatBounds = await page.locator('#flat').boundingBox();
  await page.mouse.click(flatBounds.x + flatBounds.width / 2, flatBounds.y - 4);
  await expect(page.locator('#flat')).toHaveAttribute('data-clicked', 'true');
  const expectedShadow = async name => page.evaluate(token => {
    const ref = document.createElement('span'); ref.style.boxShadow = `var(${token})`;
    document.body.append(ref); const value = getComputedStyle(ref).boxShadow; ref.remove(); return value;
  }, name);
  await expect(page.locator('#fab')).toHaveCSS('box-shadow', await expectedShadow('--shadow-6p'));
  await page.locator('#raised').hover(); await page.mouse.down();
  await expect(page.locator('#raised')).toHaveCSS('box-shadow', await expectedShadow('--shadow-8p'));
  await page.mouse.up();
  await page.locator('#fab').hover(); await page.mouse.down();
  await expect(page.locator('#fab')).toHaveCSS('box-shadow', await expectedShadow('--button-floating-pressed-shadow'));
  await page.mouse.up();
  await page.setViewportSize({ width: 460, height: 800 });
  await expect(page.locator('#fab')).toHaveCSS('height', '40px');
  await expect(page.locator('#fab .rt-button-icon')).toHaveCSS('font-size', '24px');

  // A centered expanded target must not create horizontal document overflow
  // on narrow WebKit viewports (transformed pseudo-elements used to do so).
  await page.setViewportSize({ width: 390, height: 844 });
  await fixture(page, `<div style="padding:16px">
    ${button('wide', 'rt-button-flat rt-button-squared', 'Full width action', 'style="display:block;width:100%"')}
  </div>`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await page.locator('#wide').evaluate(node => node.addEventListener('click', () => { node.dataset.clicked = 'true'; }));
  const wideBounds = await page.locator('#wide').boundingBox();
  await page.mouse.click(wideBounds.x + wideBounds.width / 2, wideBounds.y - 4);
  await expect(page.locator('#wide')).toHaveAttribute('data-clicked', 'true');

  await fixture(page, `<div data-react-toolbox-tokens="--unit --rt-color-accent-contrast" style="--unit:12px;--rt-color-accent-contrast:rgb(12,34,56)">
    ${button('accent', 'rt-button-raised rt-button-squared rt-button-solid rt-button-accent')}
    ${button('scaled-mini', 'rt-button-floating rt-button-mini rt-button-solid', icon)}
  </div>`);
  // Avoid the intentional neutral variant so accent contrast is what this fixture tests.
  await page.locator('#accent').evaluate(node => node.classList.remove('rt-button-neutral'));
  await expect(page.locator('#accent')).toHaveCSS('color', 'rgb(12, 34, 56)');
  expect(await page.locator('#accent').evaluate(node => parseFloat(getComputedStyle(node).minWidth))).toBeCloseTo(105.6, 4);
  expect(await page.locator('#scaled-mini .rt-button-icon').evaluate(node => parseFloat(getComputedStyle(node).fontSize))).toBeCloseTo(28.8, 4);
});

// https://m1.material.io/layout/structure.html#structure-app-bar
// https://m1.material.io/layout/responsive-ui.html#responsive-ui-breakpoints
for (const [width, height, barHeight, inset, titleX] of [[390, 844, 56, 16, 72], [500, 800, 56, 16, 72], [844, 390, 48, 16, 72], [768, 1024, 64, 24, 80]]) {
  test(`M1 app bar and clipped layout at ${width}×${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await fixture(page, `<div class="rt-layout-layout rt-layout-appbarFixed">
      <header class="rt-app-bar-appBar rt-app-bar-fixed"><div class="rt-app-bar-inner">
        ${button('nav', 'rt-button-toggle rt-app-bar-leftIcon', icon)}
        <h1 class="rt-app-bar-title">Title</h1>
      </div></header>
      <main class="rt-layout-panel rt-layout-bodyScroll">Content</main>
      <aside class="rt-layout-navDrawerDrawer rt-layout-clipped"></aside>
    </div>`);
    await expect(page.locator('header')).toHaveCSS('height', `${barHeight}px`);
    await expect(page.locator('header')).toHaveCSS('padding-left', `${inset}px`);
    expect((await page.locator('h1').boundingBox()).x).toBe(titleX);
    const glyph = await page.locator('#nav .rt-button-icon').boundingBox();
    expect(glyph.x + glyph.width / 2).toBeCloseTo(inset + 12, 1);
    await expect(page.locator('main')).toHaveCSS('top', `${barHeight}px`);
    await expect(page.locator('aside')).toHaveCSS('top', `${barHeight}px`);
  });
}

// https://m1.material.io/components/cards.html#cards-content-blocks
// https://m1.material.io/components/lists.html#lists-specs
// https://m1.material.io/components/data-tables.html#data-tables-specs
test('M1 card text spacing, list line counts and table column gutters', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await fixture(page, `<div class="rt-card-card">
    <div id="avatar-title" class="rt-card-cardTitle rt-card-small"><span data-react-toolbox="avatar" class="rt-avatar-avatar"></span><div><h5 class="rt-card-title">Name</h5><p class="rt-card-subtitle">Subtitle</p></div></div>
    <div id="large-title" class="rt-card-cardTitle rt-card-large"><h5 class="rt-card-title">Title</h5></div>
    <div class="rt-card-cardText"><p>Supporting text</p></div>
  </div>
  <div class="rt-card-card"><div id="sole-avatar-title" class="rt-card-cardTitle rt-card-small"><span data-react-toolbox="avatar" class="rt-avatar-avatar"></span><div><h5 class="rt-card-title">Name</h5><p class="rt-card-subtitle">Subtitle</p></div></div></div>
  <ul class="rt-list-list"><li class="rt-list-listItem"><span class="rt-list-item"><span class="rt-list-itemContentRoot rt-list-large" data-line-count="3"><span class="rt-list-itemText rt-list-primary">One</span><span class="rt-list-itemText">Two</span><span class="rt-list-itemText">Three</span></span></span></li></ul>
  <table class="rt-table-table"><thead><tr><th class="rt-table-headCell">Label</th><th class="rt-table-headCell">Value</th></tr></thead><tbody><tr class="rt-table-row"><td class="rt-table-rowCell">A</td><td class="rt-table-rowCell rt-table-numeric">1</td></tr></tbody></table>`);
  await expect(page.locator('#avatar-title .rt-card-title')).toHaveCSS('font-size', '14px');
  await page.evaluate(() => { document.documentElement.style.fontSize = '20px'; });
  await expect(page.locator('#avatar-title .rt-card-title')).toHaveCSS('font-size', '14px');
  await expect(page.locator('#avatar-title')).toHaveCSS('height', '72px');
  await expect(page.locator('#sole-avatar-title')).toHaveCSS('height', '72px');
  await expect(page.locator('#large-title')).toHaveCSS('padding-top', '24px');
  await expect(page.locator('#large-title')).toHaveCSS('padding-bottom', '16px');
  await expect(page.locator('.rt-card-cardText')).toHaveCSS('padding-bottom', '24px');
  await expect(page.locator('.rt-list-itemContentRoot')).toHaveCSS('min-height', '88px');
  expect((await page.locator('.rt-list-item').boundingBox()).height).toBeGreaterThanOrEqual(88);
  await expect(page.locator('td').first()).toHaveCSS('padding-right', '28px');
  await expect(page.locator('td').last()).toHaveCSS('padding-left', '28px');
  await expect(page.locator('td').last()).toHaveCSS('text-align', 'right');
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(page.locator('.rt-card-cardText')).toHaveCSS('padding-left', '24px');
});

// https://m1.material.io/components/dividers.html: 1dp, 12% ink opacity.
test('M1 dividers retain their 12% ink and accept scoped theme overrides', async ({ page }) => {
  await fixture(page, `<hr id="default-divider" class="rt-list-divider">
    <div data-react-toolbox-tokens="--rt-color-black" style="--rt-color-black:rgb(255,255,255)">
      <hr id="inverse-divider" class="rt-list-divider">
      <table class="rt-table-table"><tbody><tr><td class="rt-table-rowCell">Value</td></tr></tbody></table>
    </div>
    <div data-react-toolbox-tokens="--rt-color-divider" style="--rt-color-divider:rgb(12,34,56)">
      <table class="rt-table-table"><tbody><tr><td id="custom-divider" class="rt-table-rowCell">Value</td></tr></tbody></table>
    </div>`);
  const color = async selector => page.locator(selector).evaluate(node => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d');
    context.fillStyle = getComputedStyle(node).backgroundColor; context.fillRect(0, 0, 1, 1);
    return [...context.getImageData(0, 0, 1, 1).data];
  });
  expect(await color('#default-divider')).toEqual([0, 0, 0, 31]);
  expect(await color('#inverse-divider')).toEqual([255, 255, 255, 31]);
  await expect(page.locator('#custom-divider')).toHaveCSS('border-bottom-color', 'rgb(12, 34, 56)');
});
