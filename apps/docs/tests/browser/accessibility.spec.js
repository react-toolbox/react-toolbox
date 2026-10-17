import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

const componentSlugs = [
  ...readFileSync(
    new URL('../../../../packages/react-toolbox/src/material/index.ts', import.meta.url),
    'utf8',
  ).matchAll(/from '\.\/([^']+)'/g),
]
  .map(([, slug]) => slug)
  .filter((slug) => slug !== 'theme');

async function expectAccessible(page) {
  /** Audit settled colors while allowing indeterminate progress to keep running. */
  await page.evaluate(async () => {
    await new Promise(requestAnimationFrame);
    await Promise.all(
      document
        .getAnimations()
        .filter((animation) => animation.effect?.getTiming().iterations !== Infinity)
        .map((animation) => animation.finished.catch(() => {})),
    );
  });
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  if (result.violations.length) {
    await test.info().attach('axe-violations', {
      body: JSON.stringify(result.violations, null, 2),
      contentType: 'application/json',
    });
  }
  expect(
    result.violations.map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
    })),
  ).toEqual([]);
}

for (const route of [
  '/',
  '/docs',
  '/docs/installation',
  '/docs/theming',
  '/docs/components',
  ...componentSlugs.map((slug) => `/docs/components/${slug}`),
]) {
  test(`documentation passes automated accessibility checks: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expectAccessible(page);
  });
}
