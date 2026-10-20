import { defineConfig, devices } from '@playwright/test';

const browser = process.env.TOOLBOX_BROWSER ?? 'chromium';
const device = { chromium: 'Desktop Chrome', webkit: 'Desktop Safari' }[browser];
if (!device) throw new Error('TOOLBOX_BROWSER must be chromium or webkit');

export default defineConfig({
  testDir: '.',
  testMatch: [
    'apps/docs/tests/browser/**/*.spec.js',
    'packages/react-toolbox/tests/browser/**/*.spec.js',
  ],
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:3100',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: browser, use: { ...devices[device], viewport: { width: 1440, height: 1000 } } },
  ],
  webServer: {
    command: 'pnpm --workspace-root docs:build && pnpm --workspace-root docs:start',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
