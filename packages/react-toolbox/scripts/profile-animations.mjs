import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { chromium } from '@playwright/test';
import { css } from '../tests/browser/material-fixture.js';

/** Run outside concurrent test/build workloads. Compare layout work, not headless FPS. */
const root = fileURLToPath(new URL('../', import.meta.url));
const javascript = (
  await build({
    stdin: {
      resolveDir: root,
      loader: 'jsx',
      contents: `
    import React, { useState } from 'react';
    import { createRoot } from 'react-dom/client';
    import { flushSync } from 'react-dom';
    import { Switch } from './src/material/switch';
    import { Input } from './src/material/input';
    import { Checkbox } from './src/material/checkbox';
    import { Slider } from './src/material/slider';
    import { Tabs, Tab, TabsRoot, TabsList, TabsTrigger, TabsIndicator } from './src/material/tabs';
    function Fixture() {
      const [active, setActive] = useState(false);
      const [sliderValue, setSliderValue] = useState(0);
      window.toggle = () => setActive(value => !value);
      window.moveSlider = value => flushSync(() => setSliderValue(value));
      return <div style={{display:'grid',gridTemplateColumns:'repeat(4, 280px)',gap:8}}>{Array.from({length: window.count}, (_, i) => <div key={i}>
        {window.kind === 'switch' && <Switch checked={active} ripple={false} onChange={setActive} />}
        {window.kind === 'checkbox' && <Checkbox checked={active} ripple={false} onChange={setActive} />}
        {window.kind === 'slider-snaps' && <Slider aria-label='Dense slider' min={0} max={1000} step={1} snaps value={sliderValue} onChange={setSliderValue} />}
        {window.kind.startsWith('input') && <Input label={window.kind === 'input-label' ? 'Name' : undefined} />}
        {window.kind === 'tabs' && <Tabs value={active ? 'a-longer-second-tab' : 'one'}><Tab value='one' label='One' ripple={false}/><Tab value='a-longer-second-tab' label='A longer second tab' ripple={false}/></Tabs>}
        {window.kind === 'compound-tabs' && <TabsRoot value={active ? 'two' : 'one'}><TabsList><TabsTrigger value='one' ripple={false}>One</TabsTrigger><TabsTrigger value='two' style={{minWidth:220,width:220}} ripple={false}>Second</TabsTrigger><TabsIndicator /></TabsList></TabsRoot>}
      </div>)}</div>;
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
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const session = await page.context().newCDPSession(page);
await session.send('Performance.enable');
const metrics = async () =>
  Object.fromEntries((await session.send('Performance.getMetrics')).metrics.map((item) => [item.name, item.value]));
const results = [];
const cases = ['switch', 'input-underline', 'input-label', 'tabs', 'compound-tabs', 'checkbox', 'slider-snaps'];
const selectedCases = process.argv.slice(3);
try {
  if (selectedCases.some((kind) => !cases.includes(kind)))
    throw new Error(`Unknown case; choose from ${cases.join(', ')}`);
  for (const kind of selectedCases.length ? selectedCases : cases) {
    await page.goto('about:blank');
    await page.setContent(`<style>${css}</style><div id='root'></div>`);
    await page.evaluate((kind) => {
      window.kind = kind;
      window.count = kind.startsWith('input') || kind === 'slider-snaps' ? 1 : 40;
    }, kind);
    await page.addScriptTag({ content: javascript });
    await page.waitForTimeout(700);
    const samples = [];
    for (let sample = 0; sample < 5; sample++) {
      const before = await metrics();
      const timing = await page.evaluate(
        async ({ kind, sample }) => {
          const intervals = [];
          const updates = [];
          let previous;
          const start = performance.now();
          if (kind.startsWith('input')) document.querySelector('input').focus();
          else if (kind !== 'slider-snaps') window.toggle();
          await new Promise((resolve) => {
            const frame = (now) => {
              if (previous !== undefined) intervals.push(now - previous);
              previous = now;
              if (kind === 'slider-snaps') {
                const beforeUpdate = performance.now();
                window.moveSlider(1 + sample * 50 + updates.length);
                updates.push(performance.now() - beforeUpdate);
              }
              if (kind === 'slider-snaps' ? updates.length < 50 : now - start < 500) requestAnimationFrame(frame);
              else resolve();
            };
            requestAnimationFrame(frame);
          });
          return { intervals, updates };
        },
        { kind, sample },
      );
      const after = await metrics();
      samples.push({
        action:
          kind === 'slider-snaps'
            ? '50 controlled value updates'
            : kind.startsWith('input')
              ? 'focus'
              : sample % 2 === 0
                ? 'activate'
                : 'deactivate',
        layouts: after.LayoutCount - before.LayoutCount,
        layoutMs: (after.LayoutDuration - before.LayoutDuration) * 1000,
        styleRecalcs: after.RecalcStyleCount - before.RecalcStyleCount,
        styleMs: (after.RecalcStyleDuration - before.RecalcStyleDuration) * 1000,
        frameP95Ms: timing.intervals.toSorted((a, b) => a - b)[Math.floor(timing.intervals.length * 0.95)],
        ...(timing.updates.length
          ? {
              updateMedianMs: timing.updates.toSorted((a, b) => a - b)[Math.floor(timing.updates.length / 2)],
              updateP95Ms: timing.updates.toSorted((a, b) => a - b)[Math.floor(timing.updates.length * 0.95)],
              updateTotalMs: timing.updates.reduce((total, duration) => total + duration, 0),
            }
          : {}),
      });
      await page.evaluate(() => document.activeElement?.blur());
      await page.waitForTimeout(400);
    }
    results.push({ kind, count: kind.startsWith('input') || kind === 'slider-snaps' ? 1 : 40, samples });
  }
} finally {
  await browser.close();
}
const version = browser.version();
const report = {
  browser: `Playwright Chromium ${version} headless`,
  note: 'Frame intervals are rAF scheduling, not proof of presented compositor FPS. CSS layout counters measured with production React fixtures.',
  results,
};
if (process.argv[2]) await writeFile(process.argv[2], JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
