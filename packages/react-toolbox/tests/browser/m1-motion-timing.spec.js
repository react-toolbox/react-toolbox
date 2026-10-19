import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { expect, test } from '@playwright/test';
import { css } from './material-fixture.js';

const enterCurve = 'cubic-bezier(0, 0, 0.2, 1)';
const exitCurve = 'cubic-bezier(0.4, 0, 1, 1)';
const popupKinds = ['menu', 'dropdown', 'autocomplete', 'compound-dialog', 'compound-drawer'];
const convenienceKinds = ['dialog', 'drawer', 'snackbar'];
const selectors = {
  menu: '[data-slot="DropdownMenuContent"]',
  dropdown: '[data-slot="DropdownContent"]',
  'compound-dropdown': '[data-slot="DropdownContent"]',
  autocomplete: '[data-slot="AutocompletePopup"]',
  'compound-autocomplete': '[data-slot="AutocompletePopup"]',
  'compound-dialog': '[data-slot="DialogContent"]',
  'compound-drawer': '[data-slot="DrawerContent"]',
  dialog: '[data-react-toolbox="dialog"]',
  drawer: '[data-react-toolbox="drawer"]',
  snackbar: '[data-react-toolbox="snackbar"]',
  tooltip: '[data-slot="TooltipContent"]',
};

let javascript;
test.beforeAll(async () => {
  javascript = (
    await build({
      stdin: {
        resolveDir: fileURLToPath(new URL('../../', import.meta.url)),
        loader: 'jsx',
        contents: `
          import React, { useState } from 'react';
          import { createRoot } from 'react-dom/client';
          import { flushSync } from 'react-dom';
          import { ThemeProvider } from './src/material/theme';
          import { IconMenu, MenuItem } from './src/material/menu';
          import Dropdown, { DropdownRoot, DropdownTrigger, DropdownPortal, DropdownContent, DropdownViewport, DropdownOption, DropdownOptionText } from './src/material/dropdown';
          import Autocomplete, { AutocompleteRoot, AutocompleteInput, AutocompletePortal, AutocompletePositioner, AutocompletePopup, AutocompleteList, AutocompleteItem } from './src/material/autocomplete';
          import Dialog, { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle } from './src/material/dialog';
          import Drawer, { DrawerRoot, DrawerPortal, DrawerOverlay, DrawerContent, DrawerTitle } from './src/material/drawer';
          import Snackbar from './src/material/snackbar';
          import { TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent } from './src/material/tooltip';
          const options = window.fixtureOptions;
          let portalInitialized = false;
          /** Consumer portal resolution can outlast the entrance delay on a busy main thread. */
          const portalContainer = options.slowPortal ? () => {
            if (!portalInitialized) {
              portalInitialized = true;
              const until = performance.now() + 100;
              while (performance.now() < until) {}
            }
            return document.body;
          } : undefined;
          function Fixture() {
            const [open, setOpen] = useState(false);
            window.setFixtureOpen = value => flushSync(() => setOpen(value));
            return <ThemeProvider variables={options.variables}>
              <button onClick={() => setOpen(true)}>Open surface</button>
              {options.kind === 'menu' && <IconMenu aria-label='Actions' open={open} onOpenChange={setOpen} iconRipple={false} menuRipple={false}>
                <MenuItem caption='Archive' /><MenuItem caption='Delete' />
              </IconMenu>}
              {options.kind === 'dropdown' && <Dropdown label='Choice' source={['Alpha', 'Beta']} open={open} onOpenChange={setOpen} />}
              {options.kind === 'compound-dropdown' && <DropdownRoot open={open} onOpenChange={setOpen}>
                <DropdownTrigger>Choice</DropdownTrigger><DropdownPortal><DropdownContent style={options.surfaceStyle}>
                  <DropdownViewport><DropdownOption value='alpha'><DropdownOptionText>Alpha</DropdownOptionText></DropdownOption></DropdownViewport>
                </DropdownContent></DropdownPortal>
              </DropdownRoot>}
              {options.kind === 'autocomplete' && <Autocomplete label='Search' multiple={false} source={['Alpha', 'Beta']} open={open} onOpenChange={setOpen} />}
              {options.kind === 'compound-autocomplete' && <AutocompleteRoot items={['Alpha', 'Beta']} open={open} onOpenChange={setOpen}>
                <AutocompleteInput aria-label='Search' /><AutocompletePortal><AutocompletePositioner>
                  <AutocompletePopup style={state => ({'--animation-duration': state.open ? '400ms' : '800ms'})}>
                    <AutocompleteList>{item => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList>
                  </AutocompletePopup>
                </AutocompletePositioner></AutocompletePortal>
              </AutocompleteRoot>}
              {options.kind === 'compound-dialog' && <DialogRoot open={open} onOpenChange={setOpen}>
                <DialogPortal><DialogOverlay /><DialogContent aria-describedby={undefined} style={options.surfaceStyle}>
                  <DialogTitle>Details</DialogTitle><button onClick={() => setOpen(false)}>Close</button>
                </DialogContent></DialogPortal>
              </DialogRoot>}
              {options.kind === 'compound-drawer' && <DrawerRoot open={open} onOpenChange={setOpen}>
                <DrawerPortal><DrawerOverlay /><DrawerContent aria-describedby={undefined}>
                  <DrawerTitle>Sections</DrawerTitle><button onClick={() => setOpen(false)}>Close</button>
                </DrawerContent></DrawerPortal>
              </DrawerRoot>}
              {options.kind === 'dialog' && <Dialog active={open} title='Details' delay={options.delay} portalContainer={portalContainer}
                onEscKeyDown={() => setOpen(false)} actions={[{label:'Close', onClick:() => setOpen(false)}]} />}
              {options.kind === 'drawer' && <Drawer active={open} aria-label='Sections' delay={options.delay} portalContainer={portalContainer}
                onEscKeyDown={() => setOpen(false)}><button onClick={() => setOpen(false)}>Close</button></Drawer>}
              {options.kind === 'snackbar' && <Snackbar active={open} label='Saved' action='Dismiss' delay={options.delay} onClick={() => setOpen(false)} />}
              {options.kind === 'tooltip' && <TooltipRoot open={open} onOpenChange={setOpen}>
                <TooltipTrigger>Help</TooltipTrigger><TooltipPortal><TooltipContent>Helpful text</TooltipContent></TooltipPortal>
              </TooltipRoot>}
            </ThemeProvider>;
          }
          createRoot(document.getElementById('root')).render(<Fixture />);
        `,
      },
      bundle: true,
      write: false,
      format: 'iife',
      loader: { '.css': 'empty' },
      define: { 'process.env.NODE_ENV': '"production"' },
    })
  ).outputFiles[0].text;
});

async function mount(page, kind, options = {}) {
  await page.goto('about:blank');
  await page.setContent(
    `<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><div id="root" style="padding:40px;max-width:360px"></div>`,
  );
  await page.evaluate(
    (options) => {
      window.fixtureOptions = options;
    },
    { kind, ...options },
  );
  await page.addScriptTag({ content: javascript });
  await expect(page.getByRole('button', { name: 'Open surface', exact: true })).toBeVisible();
  return page.locator(selectors[kind]);
}

/** Pause actual browser motion as its styles change, before short transitions can finish. */
async function captureNextMotion(page, kind) {
  await page.evaluate((selector) => {
    window.stopMotionCapture?.();
    window.capturedMotion = undefined;
    const previousAnimations = new Set(document.querySelector(selector)?.getAnimations());
    const capture = () => {
      const element = document.querySelector(selector);
      if (!element) return;
      const animations = element
        .getAnimations()
        .filter(
          (animation) =>
            animation.effect?.target === element &&
            !previousAnimations.has(animation) &&
            animation.playState !== 'finished' &&
            animation.playState !== 'idle',
        );
      if (!animations.length) return;
      const style = getComputedStyle(element);
      window.capturedMotion = {
        element,
        animations,
        durations: animations.map((animation) => animation.effect.getTiming().duration),
        curves: (animations[0] instanceof CSSAnimation
          ? style.animationTimingFunction
          : style.transitionTimingFunction
        ).match(/cubic-bezier\([^)]*\)|[\w-]+/g),
      };
      for (const animation of animations) animation.pause();
      window.stopMotionCapture();
    };
    /** Mutation delivery precedes rendering; animation events may arrive after a short motion has ended. */
    const observer = new MutationObserver(capture);
    window.stopMotionCapture = () => {
      observer.disconnect();
      document.removeEventListener('animationstart', capture, true);
      document.removeEventListener('transitionrun', capture, true);
    };
    observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true });
    document.addEventListener('animationstart', capture, true);
    document.addEventListener('transitionrun', capture, true);
  }, selectors[kind]);
}

async function expectMotion(page, duration, curve) {
  await expect.poll(() => page.evaluate(() => Boolean(window.capturedMotion))).toBe(true);
  const actual = await page.evaluate(() => ({
    durations: window.capturedMotion.durations,
    curves: window.capturedMotion.curves,
    retained: window.capturedMotion.element.isConnected,
  }));
  expect(actual.retained).toBe(true);
  expect(actual.durations.length).toBeGreaterThan(0);
  for (const milliseconds of actual.durations) expect(milliseconds).toBeCloseTo(duration, 4);
  expect(actual.curves.length).toBeGreaterThan(0);
  for (const actualCurve of actual.curves) expect(actualCurve).toBe(curve);
}

async function finishCapturedMotion(page) {
  const completed = await page.evaluate(async () => {
    const animations = window.capturedMotion.animations;
    const completion = Promise.all(
      animations.map((animation) =>
        animation.finished.then(
          () => true,
          () => false,
        ),
      ),
    );
    for (const animation of animations) animation.play();
    return completion;
  });
  /** Removal must follow completion, rather than canceling a long custom animation early. */
  expect(completed.every(Boolean)).toBe(true);
}

async function setOpen(page, open) {
  await page.evaluate((open) => window.setFixtureOpen(open), open);
}

async function exerciseMotion(page, kind, enter, exit, options = {}) {
  const surface = await mount(page, kind, options);
  await captureNextMotion(page, kind);
  await page.getByRole('button', { name: 'Open surface', exact: true }).click();
  await expectMotion(page, enter, enterCurve);
  await finishCapturedMotion(page);
  await expect(surface).toBeVisible();
  await captureNextMotion(page, kind);
  await setOpen(page, false);
  await expectMotion(page, exit, exitCurve);
  await finishCapturedMotion(page);
  await expect(surface).toHaveCount(0, { timeout: 150 });
  await expect(page.locator('body')).not.toHaveCSS('pointer-events', 'none');
  await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
}

for (const coarse of [false, true]) {
  test.describe(coarse ? 'coarse pointer motion' : 'desktop motion', () => {
    test.use({ hasTouch: coarse });
    test('popup families use M1 role timings and complete their exits', async ({ page }) => {
      expect(await page.evaluate(() => matchMedia('(pointer: coarse)').matches)).toBe(coarse);
      for (const kind of popupKinds) {
        await test.step(kind, () => exerciseMotion(page, kind, coarse ? 225 : 200, coarse ? 195 : 150));
      }
    });

    test('tooltip keeps its explicit 150ms entrance and exit', async ({ page }) => {
      await exerciseMotion(page, 'tooltip', 150, 150);
    });
  });
}

test('global duration overrides scale popup role timings through portals', async ({ page }) => {
  for (const kind of ['menu', 'dropdown', 'autocomplete', 'compound-dialog']) {
    await test.step(kind, () =>
      exerciseMotion(page, kind, 400, 300, {
        variables: { '--animation-duration': '400ms' },
      }),
    );
  }
});

test('explicit role and menu durations override derived timings', async ({ page }) => {
  const variables = {
    '--animation-duration': '400ms',
    '--animation-duration-enter': '230ms',
    '--animation-duration-exit': '110ms',
  };
  await exerciseMotion(page, 'dropdown', 230, 110, { variables });
  await exerciseMotion(page, 'menu', 170, 90, {
    variables: { ...variables, '--menu-expand-duration': '170ms', '--menu-fade-duration': '90ms' },
  });
});

for (const kind of ['compound-dropdown', 'compound-dialog']) {
  test(`${kind} derives role timings from an inline duration override`, async ({ page }) => {
    await exerciseMotion(page, kind, 400, 300, { surfaceStyle: { '--animation-duration': '400ms' } });
  });
}

test('autocomplete derives durations from its state-dependent style callback', async ({ page }) => {
  await exerciseMotion(page, 'compound-autocomplete', 400, 600);
});

for (const kind of convenienceKinds) {
  test(`${kind} default retention follows custom CSS motion beyond the old 500ms delay`, async ({ page }) => {
    await exerciseMotion(page, kind, 800, 600, { variables: { '--animation-duration': '800ms' } });
  });
}

for (const kind of ['dialog', 'drawer']) {
  test(`${kind} entrance survives delayed portal setup`, async ({ page }) => {
    await exerciseMotion(page, kind, 200, 150, { slowPortal: true });
  });
}

test('explicit convenience delays retain their literal lifetime', async ({ page }) => {
  for (const kind of convenienceKinds) {
    await test.step(kind, async () => {
      const surface = await mount(page, kind, { delay: 700, variables: { '--animation-duration': '100ms' } });
      await captureNextMotion(page, kind);
      await setOpen(page, true);
      await expectMotion(page, 100, enterCurve);
      await finishCapturedMotion(page);
      await captureNextMotion(page, kind);
      await page.evaluate((selector) => {
        const surface = document.querySelector(selector);
        const started = performance.now();
        window.retentionDuration = new Promise((resolve) => {
          const observer = new MutationObserver(() => {
            if (surface.isConnected) return;
            observer.disconnect();
            resolve(performance.now() - started);
          });
          observer.observe(document.body, { childList: true, subtree: true });
        });
        window.setFixtureOpen(false);
      }, selectors[kind]);
      await expectMotion(page, 75, exitCurve);
      await finishCapturedMotion(page);
      await expect(surface).toHaveCount(1);
      await expect(surface).toHaveCount(0, { timeout: 1000 });
      const retainedFor = await page.evaluate(() => window.retentionDuration);
      expect(retainedFor).toBeGreaterThanOrEqual(650);
      expect(retainedFor).toBeLessThan(1000);
    });
  }
});

test('dialog waits for replacement motion when its original exit is canceled', async ({ page }) => {
  const surface = await mount(page, 'dialog');
  await captureNextMotion(page, 'dialog');
  await setOpen(page, true);
  await expectMotion(page, 200, enterCurve);
  await finishCapturedMotion(page);
  await captureNextMotion(page, 'dialog');
  await setOpen(page, false);
  await expectMotion(page, 150, exitCurve);
  await page.evaluate(() => {
    window.originalExitCancellation = Promise.all(
      window.capturedMotion.animations.map((animation) =>
        animation.finished.then(
          () => false,
          () => true,
        ),
      ),
    );
  });
  await captureNextMotion(page, 'dialog');
  await surface.evaluate((element) => {
    const stylesheet = document.createElement('style');
    stylesheet.textContent = '@keyframes replacement-dialog-exit { from { opacity: 1 } to { opacity: 0 } }';
    document.head.append(stylesheet);
    /** A consumer can replace the CSS motion while the closed surface is still retained. */
    element.style.transition = 'none';
    element.style.animation = 'replacement-dialog-exit 600ms cubic-bezier(0.4, 0, 1, 1) both';
  });
  await expectMotion(page, 600, exitCurve);
  expect(await page.evaluate(async () => (await window.originalExitCancellation).every(Boolean))).toBe(true);
  await expect(surface).toHaveCount(1);
  await expect(page.locator('body')).toHaveAttribute('data-scroll-locked');
  await finishCapturedMotion(page);
  await expect(surface).toHaveCount(0, { timeout: 150 });
  await expect(page.locator('body')).not.toHaveCSS('pointer-events', 'none');
  await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
});

test('reopening cancels pending exits without later removing the open surface', async ({ page }) => {
  for (const kind of ['menu', 'dialog', 'drawer', 'snackbar']) {
    await test.step(kind, async () => {
      const surface = await mount(page, kind);
      await captureNextMotion(page, kind);
      await setOpen(page, true);
      await expectMotion(page, 200, enterCurve);
      await finishCapturedMotion(page);
      await captureNextMotion(page, kind);
      await setOpen(page, false);
      await expectMotion(page, 150, exitCurve);
      await setOpen(page, true);
      await page.waitForTimeout(350);
      await expect(surface).toBeVisible();
      await captureNextMotion(page, kind);
      await setOpen(page, false);
      await expectMotion(page, 150, exitCurve);
      await finishCapturedMotion(page);
      await expect(surface).toHaveCount(0, { timeout: 150 });
    });
  }
});

test('reduced motion removes closed surfaces and modal locks promptly', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const kind of [...popupKinds, ...convenienceKinds, 'tooltip']) {
    await test.step(kind, async () => {
      const surface = await mount(page, kind);
      await setOpen(page, true);
      await expect(surface).toBeVisible();
      const durations = await surface.evaluate((element) =>
        element.getAnimations().map((animation) => animation.effect.getTiming().duration),
      );
      expect(durations.every((duration) => duration <= 0.01)).toBe(true);
      await setOpen(page, false);
      await expect(surface).toHaveCount(0, { timeout: 200 });
      await expect(page.locator('body')).not.toHaveCSS('pointer-events', 'none');
      await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
    });
  }
});

for (const kind of popupKinds) {
  test(`${kind} releases retained content when reduced motion changes during exit`, async ({ page }) => {
    const surface = await mount(page, kind, { variables: { '--animation-duration-exit': '1000ms' } });
    await captureNextMotion(page, kind);
    await setOpen(page, true);
    await expectMotion(page, 200, enterCurve);
    await finishCapturedMotion(page);
    await setOpen(page, false);
    /** Keep this exit running naturally: a preference change must cancel motion and finish presence. */
    await expect.poll(() => surface.evaluate((element) => element.getAnimations().length)).toBeGreaterThan(0);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(surface).toHaveCount(0, { timeout: 300 });
    await expect(page.locator('body')).not.toHaveCSS('pointer-events', 'none');
    await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
  });
}
