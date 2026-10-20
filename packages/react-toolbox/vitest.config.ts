import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{js,jsx,ts,tsx}'],
    setupFiles: ['tests/setup.js'],
    restoreMocks: true,
  },
});
