import { test, expect } from '@playwright/test';

test('the docs deployment serves a complete same-origin source registry', async ({ request, baseURL }) => {
  const catalogResponse = await request.get('/r/registry.json');
  expect(catalogResponse.ok()).toBeTruthy();
  const catalog = await catalogResponse.json();
  expect(catalog.items).toHaveLength(34);
  expect(catalog.items.filter((item) => item.type === 'registry:ui')).toHaveLength(27);
  const names = new Set(catalog.items.map((item) => item.name));
  expect(names.has('foundation-forms')).toBe(true);
  expect(names.has('link')).toBe(false);
  expect(names.has('navigation')).toBe(false);
  expect((await request.get('/r/link.json')).status()).toBe(404);
  expect((await request.get('/r/navigation.json')).status()).toBe(404);
  for (const entry of catalog.items) {
    for (const dependency of entry.registryDependencies) {
      expect(dependency.startsWith(`${baseURL}/r/`)).toBeTruthy();
      expect(names.has(new URL(dependency).pathname.split('/').at(-1).replace('.json', ''))).toBeTruthy();
    }
  }
  const buttonResponse = await request.get('/r/button.json');
  expect(buttonResponse.headers()['access-control-allow-origin']).toBe('*');
  const button = await buttonResponse.json();
  expect(
    button.files.some(
      (file) =>
        file.target === '@ui/material/button/index.ts' &&
        file.content.includes("import '../foundations/styles/setup.css'"),
    ),
  ).toBeTruthy();
  expect(button.dependencies.some((dependency) => dependency.startsWith('react-toolbox@'))).toBeFalsy();
  const foundation = await (await request.get('/r/foundation.json')).json();
  expect(foundation.cssVars.theme['color-toolbox-primary']).toBe('var(--rt-color-primary)');
  expect(foundation.cssVars.theme.spacing).toBe('4px');
  expect((await request.get('/r/unknown.json')).status()).toBe(404);
  expect((await request.get('/r/button')).status()).toBe(404);
  const proxied = await (
    await request.get('/r/button.json', {
      headers: { 'x-forwarded-host': 'preview.example', 'x-forwarded-proto': 'https' },
    })
  ).json();
  expect(proxied.registryDependencies.every((url) => url.startsWith('https://preview.example/r/'))).toBeTruthy();
});

test('installation keeps the public registry URL on local previews and narrow screens', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  await expect(page.getByLabel('Install React Toolbox button', { exact: true })).toHaveCount(0);
  await page.getByRole('link', { name: /Get started/i }).click();
  await expect(page.getByLabel('Install React Toolbox button', { exact: true })).toContainText(
    'pnpm dlx shadcn@latest add https://react-toolbox.io/r/button.json',
  );
  await expect(page.getByText('pnpm pack:library', { exact: false })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Installation', exact: true })).toBeVisible();
  await expect(page.getByLabel('Install React Toolbox button', { exact: true })).toContainText(
    'https://react-toolbox.io/r/button.json',
  );
  await expect(page.getByLabel('Registry configuration', { exact: true })).toContainText(
    'https://react-toolbox.io/r/{name}.json',
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});
