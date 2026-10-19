import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'tsdown';

const source = path.join(import.meta.dirname, 'src');
const clientEntries = new Set(
  readdirSync(source, { recursive: true })
    .filter(
      (file) =>
        /\.tsx?$/.test(file) && /^[\t ]*['"]use client['"];?\s*$/m.test(readFileSync(path.join(source, file), 'utf8')),
    )
    .map((file) => file.replaceAll(path.sep, '/').replace(/\.tsx?$/, '.js')),
);

export default defineConfig({
  entry: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/__tests__/**'],
  root: 'src',
  outDir: 'dist',
  /** Next watches these imports; keep them available until replacement output is written. */
  clean: false,
  platform: 'neutral',
  format: 'esm',
  target: 'es2022',
  unbundle: true,
  dts: { sourcemap: false, compilerOptions: { declarationMap: false } },
  sourcemap: true,
  deps: { neverBundle: [/\.css$/] },
  // Preserve source boundaries in the private docs build. Pure utilities, shared
  // style constants, and the shadcn preset stay usable in Server Components.
  banner: ({ fileName }) => ({ js: clientEntries.has(fileName) ? '"use client";' : '' }),
  logLevel: 'warn',
  inputOptions: {
    // The banner restores each source directive on its emitted module.
    onwarn(warning, defaultHandler) {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) return;
      defaultHandler(warning);
    },
  },
  exports: false,
  report: false,
});
