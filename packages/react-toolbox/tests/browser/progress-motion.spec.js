import { readFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

const components = new URL('../../components/', import.meta.url);
const entry = await readFile(new URL('styles.css', components), 'utf8');
const sheets = [...entry.matchAll(/@import "\.\/([^"]+)"/g)].map(match => match[1]);
const modern = (await Promise.all(sheets.map(name => readFile(new URL(name, components), 'utf8')))).join('\n');
const original = await readFile(new URL('../fixtures/legacy-styles/reference.css', import.meta.url), 'utf8');
const times = [0, 250, 500, 750, 1000, 1250, 1499, 2250, 3250, 4750, 5999];

async function animationFrames(page, css, multicolor) {
  // Identical SVG/viewBox geometry from ProgressBar, with only its stylesheet
  // changed. Hold actual animations at intermediate times: disabling animations
  // would miss discrete interpolation between otherwise correct keyframes.
  await page.setContent(`<style>${css}
    body { margin:0; background:white; }
    #capture { width:120px; height:120px; padding:30px; box-sizing:border-box; }
    /* Start paused so the compositor cannot paint an advancing first frame
       while the animation's initial pause/seek is being committed. */
    #capture * { animation-play-state:paused; }
    </style>
    <div id="capture"><div class="rt-progress-bar-circular rt-progress-bar-indeterminate ${multicolor ? 'rt-progress-bar-multicolor' : ''}">
      <svg class="rt-progress-bar-circle" viewBox="0 0 60 60">
        <circle class="rt-progress-bar-path" cx="30" cy="30" r="25" />
      </svg>
    </div></div>`);
  const frames = [];
  for (const time of times) {
    const styles = await page.evaluate(async currentTime => {
      const animations = document.getAnimations();
      for (const animation of animations) {
        animation.pause();
        animation.currentTime = currentTime;
      }
      await Promise.all(animations.map(animation => animation.ready));
      const path = document.querySelector('circle');
      const style = getComputedStyle(path);
      return {
        dash: style.strokeDasharray,
        offset: style.strokeDashoffset,
        color: style.stroke,
        rotation: getComputedStyle(path.ownerSVGElement).transform,
        duration: style.animationDuration,
        easing: style.animationTimingFunction,
      };
    }, time);
    frames.push({ time, styles, image: await page.locator('#capture').screenshot() });
  }
  return frames;
}

for (const multicolor of [false, true]) {
  test(`original circular progress motion: ${multicolor ? 'multicolor' : 'primary'}`, async ({ page }, testInfo) => {
    const expected = await animationFrames(page, original, multicolor);
    const actual = await animationFrames(page, modern, multicolor);
    // Prove this test samples the growing arc, not just static endpoints.
    expect(expected[1].styles.dash).not.toBe(expected[0].styles.dash);
    expect(expected[1].styles.dash).not.toBe(expected[3].styles.dash);
    for (let index = 0; index < times.length; index++) {
      const time = times[index];
      expect(actual[index].styles, `computed motion at ${time}ms`).toEqual(expected[index].styles);
      const equal = actual[index].image.equals(expected[index].image);
      if (!equal) {
        await testInfo.attach(`original-${time}ms`, { body: expected[index].image, contentType: 'image/png' });
        await testInfo.attach(`modern-${time}ms`, { body: actual[index].image, contentType: 'image/png' });
      }
      expect(equal, `pixels at ${time}ms must exactly match original animated CSS`).toBe(true);
    }
  });
}
