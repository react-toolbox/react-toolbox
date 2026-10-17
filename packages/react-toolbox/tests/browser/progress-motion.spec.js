import { test, expect } from '@playwright/test';

import { css, setMaterialContent } from './material-fixture.js';

async function renderProgress(page, multicolor) {
  await setMaterialContent(
    page,
    `<style>${css}
    .rt-progress-bar-circular * { animation-play-state:paused; }
    </style>
    <div class="rt-progress-bar-circular rt-progress-bar-indeterminate ${multicolor ? 'rt-progress-bar-multicolor' : ''}">
      <svg class="rt-progress-bar-circle" viewBox="0 0 60 60">
        <circle class="rt-progress-bar-path" cx="30" cy="30" r="25" />
      </svg>
    </div>`,
  );
}

async function animationFrame(page, time) {
  return page.evaluate(async (currentTime) => {
    const animations = document.getAnimations();
    for (const animation of animations) {
      animation.pause();
      animation.currentTime = currentTime;
    }
    await Promise.all(animations.map((animation) => animation.ready));
    const path = document.querySelector('circle');
    const style = getComputedStyle(path);
    const rotation = new DOMMatrix(getComputedStyle(path.ownerSVGElement).transform);
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d');
    context.fillStyle = style.stroke;
    context.fillRect(0, 0, 1, 1);
    return {
      dash: style.strokeDasharray.split(',').map(Number.parseFloat),
      offset: Number.parseFloat(style.strokeDashoffset),
      color: [...context.getImageData(0, 0, 1, 1).data],
      rotation: [rotation.a, rotation.b, rotation.c, rotation.d],
    };
  }, time);
}

for (const multicolor of [false, true]) {
  test(`circular progress animates continuously: ${multicolor ? 'multicolor' : 'primary'}`, async ({ page }) => {
    await renderProgress(page, multicolor);
    await expect(page.locator('circle')).toHaveCSS(
      'animation-timing-function',
      multicolor ? 'ease-in-out, ease-in-out' : 'ease-in-out',
    );
    /** Sample between keyframes as well as at their endpoints to catch discrete
     * interpolation. The 25px radius scales the M1 arc by 1.25. */
    for (const [time, dash, offset] of [
      [0, 1.25, 0],
      [375, 56.25, -21.875],
      [750, 111.25, -43.75],
      [1125, 111.25, -99.375],
      [1500, 1.25, 0],
    ]) {
      const frame = await animationFrame(page, time);
      expect(frame.dash[0], `arc length at ${time}ms`).toBeCloseTo(dash, 2);
      expect(frame.dash[1]).toBe(250);
      expect(frame.offset, `arc offset at ${time}ms`).toBeCloseTo(offset, 2);
      const angle = (time / 2000) * 2 * Math.PI;
      const rotation = [Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle)];
      for (let index = 0; index < rotation.length; index++) {
        expect(frame.rotation[index], `rotation at ${time}ms`).toBeCloseTo(rotation[index], 5);
      }
      if (!multicolor) expect(frame.color).toEqual([63, 81, 181, 255]);
    }

    if (multicolor) {
      for (const [time, color] of [
        [0, [66, 133, 244, 255]],
        [1500, [222, 62, 53, 255]],
        [3000, [247, 194, 35, 255]],
        [4500, [27, 154, 89, 255]],
        [6000, [66, 133, 244, 255]],
      ]) {
        expect((await animationFrame(page, time)).color, `color at ${time}ms`).toEqual(color);
      }
      const midpoint = (await animationFrame(page, 750)).color;
      expect(midpoint[0]).toBeGreaterThan(66);
      expect(midpoint[0]).toBeLessThan(222);
      expect(midpoint[1]).toBeGreaterThan(62);
      expect(midpoint[1]).toBeLessThan(133);
      expect(midpoint[2]).toBeGreaterThan(53);
      expect(midpoint[2]).toBeLessThan(244);
    }
  });
}
