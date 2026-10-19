import { expect, test } from '@playwright/test';

for (const width of [1440, 390]) {
  test(`docs menu stays anchored while a selection updates its status at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/docs/components/menu');
    await page.evaluate(() => document.fonts.ready);
    const trigger = page.getByRole('button', { name: 'More actions', exact: true });
    const root = page.locator('[data-react-toolbox="menu"]');
    for (const caption of ['Download', 'Share']) {
      await trigger.click();
      await expect(page.getByRole('menu')).toHaveCSS('opacity', '1');
      const before = await root.boundingBox();
      await root.evaluate((element) => {
        window.menuClosingFrames = new Promise((resolve) => {
          element.addEventListener(
            'click',
            () => {
              const frames = [];
              const start = performance.now();
              function sample() {
                const content = element.querySelector('[data-slot=DropdownMenuContent]');
                if (!content?.isConnected) {
                  resolve(frames);
                  return;
                }
                const box = element.getBoundingClientRect();
                frames.push({ x: box.x, y: box.y, opacity: Number(getComputedStyle(content).opacity) });
                if (performance.now() - start < 650) requestAnimationFrame(sample);
                else resolve(frames);
              }
              requestAnimationFrame(sample);
            },
            { once: true },
          );
        });
      });
      await page.getByRole('menuitem', { name: caption, exact: false }).click();
      await expect(page.locator('#preview').getByRole('status')).toHaveText(caption.toLowerCase());
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      const frames = await page.evaluate(() => window.menuClosingFrames);
      await testInfo.attach(`menu-closing-${caption}`, {
        body: JSON.stringify({ before, frames }, null, 2),
        contentType: 'application/json',
      });
      const visibleFrames = frames.filter((frame) => frame.opacity > 0.01);
      expect(visibleFrames.length).toBeGreaterThan(0);
      expect(Math.max(...visibleFrames.map((frame) => Math.abs(frame.x - before.x)))).toBeLessThan(0.5);
      expect(Math.max(...visibleFrames.map((frame) => Math.abs(frame.y - before.y)))).toBeLessThan(0.5);
      await expect(root.locator('[data-slot=DropdownMenuContent]')).toHaveCount(0);
    }
  });
}
