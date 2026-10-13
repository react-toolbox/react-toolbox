import { defineConfig } from 'vitest/config';
import { transform } from 'esbuild';

export default defineConfig({
  plugins: [{
    name: 'toolbox-jsx',
    enforce: 'pre',
    async transform(code, id) {
      if (!/\/(components|tests)\/.*\.js$/.test(id)) return null;
      return transform(code, { loader: 'jsx', jsx: 'automatic', sourcemap: 'inline', sourcefile: id });
    },
  }],
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{js,jsx,ts,tsx}'],
    setupFiles: ['tests/setup.js'],
    restoreMocks: true,
  },
});
