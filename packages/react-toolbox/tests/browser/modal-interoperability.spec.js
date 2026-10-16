import { css as styles } from './material-fixture.js';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { test, expect } from '@playwright/test';

const source = `
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Dialog, { DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle } from './src/material/dialog';
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuItem } from './src/material/menu';
import { DropdownRoot, DropdownTrigger, DropdownPortal, DropdownContent, DropdownViewport, DropdownOption, DropdownOptionText } from './src/material/dropdown';
import { DrawerRoot, DrawerPortal, DrawerOverlay, DrawerContent, DrawerTitle } from './src/material/drawer';
function Compound({ active, setActive, title, trigger, children }) {
  return <DialogRoot open={active} onOpenChange={setActive}>
    {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
    <DialogPortal><DialogOverlay/><DialogContent aria-describedby={undefined}>
      <DialogTitle>{title}</DialogTitle>{children}
    </DialogContent></DialogPortal>
  </DialogRoot>;
}
function Convenience({ active, setActive, title, trigger, children }) {
  return <>{trigger}<Dialog active={active} title={title} onEscKeyDown={()=>setActive(false)}>{children}</Dialog></>;
}
function App() {
  const [outer,setOuter]=useState(false);
  const [inner,setInner]=useState(false);
  const [picked,setPicked]=useState('');
  const Outer=window.reverse ? Compound : Convenience;
  const Inner=window.reverse ? Convenience : Compound;
  return <>
    <button onClick={()=>setOuter(true)}>Open outer</button>
    <Outer active={outer} setActive={setOuter} title="Outer">
      <Inner active={inner} setActive={setInner} title="Inner" trigger={<button onClick={()=>setInner(true)}>Open inner</button>}>
        <button onClick={()=>setPicked('clicked')}>Inner action</button>
        {window.autofocus && <input aria-label="Initial field" autoFocus/>}
      </Inner>
      <DropdownMenuRoot><DropdownMenuTrigger>Options</DropdownMenuTrigger><DropdownMenuPortal>
        <DropdownMenuContent><DropdownMenuItem onSelect={()=>setPicked('archive')}>Archive</DropdownMenuItem></DropdownMenuContent>
      </DropdownMenuPortal></DropdownMenuRoot>
      <DropdownRoot value={picked} onValueChange={setPicked}><DropdownTrigger aria-label="Color"/>
        <DropdownPortal><DropdownContent><DropdownViewport>
          <DropdownOption value="blue"><DropdownOptionText>Blue</DropdownOptionText></DropdownOption>
        </DropdownViewport></DropdownContent></DropdownPortal>
      </DropdownRoot>
      <output>{picked}</output>
    </Outer>
  </>;
}
createRoot(document.getElementById('root')).render(window.side
  ? <DrawerRoot defaultOpen><DrawerPortal><DrawerOverlay/><DrawerContent side={window.side} aria-describedby={undefined}>
      <DrawerTitle>Edge sheet</DrawerTitle><button>Content</button>
    </DrawerContent></DrawerPortal></DrawerRoot>
  : <App/>);
`;
let javascript;
test.beforeAll(async () => {
  const result = await build({
    stdin: { contents: source, resolveDir: fileURLToPath(new URL('../../', import.meta.url)), loader: 'jsx' },
    bundle: true,
    write: false,
    format: 'iife',
    loader: { '.css': 'empty' },
    define: { 'process.env.NODE_ENV': '"production"' },
  });
  javascript = result.outputFiles[0].text;
});
async function mount(page, options = {}) {
  await page.setContent(`<!doctype html><style>${styles}</style><div id="root"></div>`);
  await page.evaluate((value) => Object.assign(window, value), options);
  await page.addScriptTag({ content: javascript });
}

for (const reverse of [false, true]) {
  test(`mixed dialog nesting owns focus, stacking and Escape (${reverse ? 'convenience inside compound' : 'compound inside convenience'})`, async ({
    page,
  }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await mount(page, { reverse });
    await page.getByRole('button', { name: 'Open outer' }).click();
    const trigger = page.getByRole('button', { name: 'Open inner' });
    await trigger.focus();
    await page.keyboard.press('Enter');
    const inner = page.getByRole('dialog', { name: 'Inner', exact: true });
    await expect(inner).toBeVisible();
    await expect.poll(() => inner.evaluate((node) => node.contains(document.activeElement))).toBe(true);
    /** A real pointer click must reach the inner surface through the outer scrim. */
    await page.getByRole('button', { name: 'Inner action' }).click();
    await page.keyboard.press('Tab');
    await expect.poll(() => inner.evaluate((node) => node.contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'Inner', exact: true })).toHaveCount(0);
    await expect(trigger).toBeFocused();
    const outer = page.getByRole('dialog', { name: 'Outer', exact: true });
    await expect(outer).toBeVisible();
    /** Radix releases the child's layer before the parent accepts its next interaction. */
    await expect(outer).toHaveCSS('pointer-events', 'auto');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
    expect(errors).toEqual([]);
  });
}

test('portaled compound menu and select remain usable within a convenience modal', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await mount(page);
  await page.getByRole('button', { name: 'Open outer' }).click();
  await page.getByRole('button', { name: 'Options' }).click();
  await page.getByRole('menuitem', { name: 'Archive' }).click();
  await expect(page.locator('output')).toHaveText('archive');
  await page.getByRole('combobox', { name: 'Color' }).click();
  await page.getByRole('option', { name: 'Blue' }).click();
  await expect(page.locator('output')).toHaveText('blue');
  await expect(page.getByRole('combobox', { name: 'Color' })).toBeFocused();
  expect(errors).toEqual([]);
});

for (const side of ['top', 'bottom']) {
  test(`compound drawer supports the ${side} edge and reduced motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await mount(page, { side });
    const sheet = page.getByRole('dialog', { name: 'Edge sheet' });
    await expect(sheet).toBeVisible();
    await expect(sheet).toHaveCSS(side, '0px');
    await expect(sheet).toHaveCSS('animation-name', 'none');
    const bounds = await sheet.boundingBox();
    expect(bounds.width).toBe(page.viewportSize().width);
    await page.keyboard.press('Escape');
    await expect(sheet).toHaveCount(0);
  });
}

test('React child autofocus runs after the containing modal releases focus', async ({ page }) => {
  await mount(page, { reverse: true, autofocus: true });
  await page.getByRole('button', { name: 'Open outer' }).click();
  const trigger = page.getByRole('button', { name: 'Open inner' });
  /** Safari does not focus buttons on pointer activation; use a focused opener. */
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('textbox', { name: 'Initial field' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});
