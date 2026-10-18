import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [390, 1440]) {
  test(`project story opens, traps focus and returns to the page at ${width}px`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const trigger = page.locator('footer').getByRole('button', { name: 'What is this?' });
    await trigger.focus();
    await trigger.press('Enter');
    const story = page.getByRole('dialog', { name: /Some things/ });
    await expect(story).toBeVisible();
    await expect(story).toContainText('2015');
    await expect(story).toContainText('AI');
    const close = story.getByRole('button', { name: 'Close project story' });
    await expect(story).toBeFocused();
    /** Safari uses Option-Tab to include buttons when full keyboard navigation is disabled. */
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
    await expect(close).toBeFocused();
    await expect(close).toHaveCSS('outline-style', 'solid');
    await close.press('Shift+Tab');
    await expect(story.getByRole('button', { name: '[ Back to Material ]', exact: true })).toBeFocused();
    await page.evaluate(async () => {
      await Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => {})));
    });
    const bounds = await story.boundingBox();
    expect(bounds).toMatchObject({ x: 0, y: 0, width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(violations).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(story).toBeHidden();
    await expect(trigger).toBeFocused();
    await trigger.press('Enter');
    await story.getByRole('button', { name: '[ Back to Material ]', exact: true }).click();
    await expect(story).toBeHidden();
    await expect(trigger).toBeFocused();
  });
}

test('the introduction offers the story with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/docs');
  const trigger = page.locator('article').getByRole('button', { name: 'What is this?' });
  await trigger.click();
  const story = page.getByRole('dialog', { name: /Some things/ });
  await expect(story).toBeVisible();
  await expect(story).toBeFocused();
  await expect(story).toHaveCSS('outline-style', 'none');
  await expect(story).toHaveCSS('background-color', 'rgb(5, 5, 5)');
  await expect(story.getByRole('button', { name: 'Close project story' })).toHaveCSS('outline-style', 'none');
  expect(await story.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
  await story.getByRole('button', { name: 'Close project story' }).click();
  await expect(story).toBeHidden();
  await expect(trigger).toBeFocused();
});
