import { readFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

const root = new URL('../../components/', import.meta.url);
const files = ['colors.css', 'variables.css', 'progress_bar/config.css', 'progress_bar/theme.css', 'slider/config.css', 'slider/theme.css'];
const css = (await Promise.all(files.map(file => readFile(new URL(file, root), 'utf8')))).join('\n');

// M1's slider state chart specifies 26% black at rest/disabled and 38% on
// focus/press. Continuous thumbs use M1's 12px rest / 18px pressed geometry.
test('M1 slider inactive contrast, focus, disabled disconnection, and continuous-thumb sizing', async ({ page }) => {
  await page.setContent(`<style>${css}</style>
    <div id="slider" class="rt-slider-slider" style="width:320px">
      <div class="rt-slider-container" role="slider" tabindex="0">
        <div class="rt-slider-knob" style="left:50%"><div class="rt-slider-innerknob"></div></div>
        <div class="rt-slider-progress"><div class="rt-progress-bar-linear rt-slider-innerprogress"><span data-ref="value" class="rt-progress-bar-value" style="transform:scaleX(.5)"></span></div></div>
      </div>
    </div>`);
  const colors = () => page.locator('#slider').evaluate(element => {
    // Relative colors may serialize as color(srgb) or rgba across engines.
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    const sample = selector => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = getComputedStyle(element.querySelector(selector)).backgroundColor;
      ctx.fillRect(0, 0, 1, 1);
      return [...ctx.getImageData(0, 0, 1, 1).data];
    };
    return { track: sample('.rt-slider-innerprogress'), thumb: sample('.rt-slider-innerknob') };
  });
  expect((await colors()).track).toEqual([0, 0, 0, 66]);
  await expect(page.locator('.rt-slider-innerknob')).toHaveCSS('width', '12px');
  await page.locator('.rt-slider-knob').hover();
  await expect(page.locator('.rt-slider-innerknob')).toHaveCSS('width', '14px');
  await page.mouse.move(400, 200);
  await expect(page.locator('.rt-slider-innerknob')).toHaveCSS('width', '12px');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('slider')).toBeFocused();
  expect((await colors()).track).toEqual([0, 0, 0, 97]);
  await page.locator('#slider').evaluate(element => element.classList.add('rt-slider-pressed'));
  await expect(page.locator('.rt-slider-innerknob')).toHaveCSS('width', '18px');
  await page.locator('#slider').evaluate(element => {
    element.classList.remove('rt-slider-pressed');
    element.setAttribute('disabled', '');
  });
  await expect(page.locator('.rt-slider-innerknob')).toHaveCSS('width', '8px');
  expect((await colors()).track).toEqual([0, 0, 0, 66]);
  expect((await colors()).thumb).toEqual([0, 0, 0, 66]);
  await expect(page.locator('.rt-slider-innerknob')).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 2px');
});

test('disabled circular progress uses its disabled ink while retaining the M1 arc animation', async ({ page }) => {
  await page.setContent(`<style>${css}</style>
    <div disabled class="rt-progress-bar-circular rt-progress-bar-indeterminate rt-progress-bar-multicolor">
      <svg class="rt-progress-bar-circle" viewBox="0 0 60 60"><circle class="rt-progress-bar-path" cx="30" cy="30" r="25" /></svg>
    </div>`);
  const circle = page.locator('circle');
  await expect(circle).toHaveCSS('animation-name', 'rt-progress-bar-circular-indeterminate-bar-dash');
  const alpha = await circle.evaluate(element => {
    const color = getComputedStyle(element).stroke;
    return Number(color.match(/(?:,\s*|\/\s*)([\d.]+)\)$/)?.[1]);
  });
  expect(alpha).toBeCloseTo(0.26);
  await expect(circle).toHaveCSS('animation-duration', '1.5s, 6s');
});

test('gallery sliders support keyboard changes and keep their numeric editor independent', async ({ page }) => {
  await page.goto('/');
  const slider = page.locator('#progress').getByRole('slider').first();
  await slider.focus();
  await slider.press('Home');
  await expect(slider).toHaveAttribute('aria-valuenow', '0');
  await slider.press('ArrowRight');
  await expect(slider).toHaveAttribute('aria-valuenow', '1');
  await slider.press('End');
  await expect(slider).toHaveAttribute('aria-valuenow', '100');
  const input = slider.locator('..').getByRole('textbox');
  await input.fill('42');
  await input.press('Enter');
  await expect(slider).toHaveAttribute('aria-valuenow', '42');
});
