import { build } from 'esbuild';
import { copyFile, glob, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';

const root = path.resolve(import.meta.dirname, '..');
await mkdir(path.join(root, 'dist'), { recursive: true });
// Bundle shared tokens and keyframe registrations for the workspace Tailwind
// entry. Compile a separate complete stylesheet for plain-CSS compatibility.
await build({
  absWorkingDir: root,
  entryPoints: ['src/material/foundations/styles/styles.css'],
  outfile: 'dist/foundation.css',
  bundle: true,
  minify: false,
  target: 'esnext',
  logLevel: 'warning',
});
const standalone = await postcss([tailwind()]).process(
  '@layer theme, base, components, utilities; @import "tailwindcss/theme.css" layer(theme); @import "tailwindcss/utilities.css" layer(utilities) source(none); @import "./src/material/foundations/styles/styles.css"; @import "./src/material/foundations/styles/composition.css"; @source "./src/material";',
  { from: path.join(root, 'standalone.css') },
);
await writeFile(path.join(root, 'dist/styles.css'), standalone.css);
for (const name of ['tailwind-preflight.css', 'shadcn.css', 'composition.css']) {
  await copyFile(path.join(root, 'src/material/foundations/styles', name), path.join(root, 'dist', name));
}
await writeFile(
  path.join(root, 'dist/tailwind.css'),
  (await readFile(path.join(root, 'src/material/foundations/styles/tailwind.css'), 'utf8'))
    .replace('./base.css', './foundation.css')
    .replace('@source "../../"', '@source "./material"'),
);
// Typed side-effect imports work with TypeScript's noUncheckedSideEffectImports.
await writeFile(path.join(root, 'dist/css.d.mts'), 'export {};\n');
console.log('Built standalone CSS, Tailwind integration, and optional shadcn theme bridge.');

/** Prune deleted source modules after emission without removing styles used by the running docs app. */
const sourceModules = new Set();
for await (const file of glob(['src/**/*.ts', 'src/**/*.tsx'], { cwd: root, exclude: ['src/**/__tests__/**'] })) {
  sourceModules.add(file.slice('src/'.length).replace(/\.tsx?$/, ''));
}
for await (const file of glob(['dist/**/*.js', 'dist/**/*.js.map', 'dist/**/*.d.ts'], { cwd: root })) {
  const module = file.slice('dist/'.length).replace(/\.(?:js(?:\.map)?|d\.ts)$/, '');
  if (!sourceModules.has(module)) await rm(path.join(root, file));
}

// rolldown-plugin-dts with TypeScript 7 currently leaves map comments even when
// declaration maps are disabled. Do not publish editor links to absent files.
for await (const file of glob('dist/**/*.d.ts', { cwd: root })) {
  const filename = path.join(root, file);
  const source = await readFile(filename, 'utf8');
  await writeFile(filename, source.replace(/^\/\/[#@] sourceMappingURL=.*$/gm, ''));
}

// Private workspace imports share the same automatic style entry as copied source.
await mkdir(path.join(root, 'dist/material/foundations/styles'), { recursive: true });
await writeFile(path.join(root, 'dist/material/foundations/styles/setup.css'), '@import "../../../styles.css";\n');

/** Copied examples use the same relative bridge import in source and in the workspace package. */
await writeFile(path.join(root, 'dist/material/foundations/styles/shadcn.css'), '@import "../../../shadcn.css";\n');

/** Direct module imports load their family tokens without the global stylesheet. */
const copiedStyles = new Set();
for await (const file of glob(['src/material/*/tokens.css', 'src/examples/**/styles.css'], { cwd: root })) {
  const destination = path.join(root, 'dist', file.slice('src/'.length));
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(path.join(root, file), destination);
  copiedStyles.add(destination);
}

/** Removed families and examples must not leave stale styles in the emitted package. */
for await (const file of glob(['dist/material/*/tokens.css', 'dist/examples/**/*.css'], { cwd: root })) {
  const destination = path.join(root, file);
  if (!copiedStyles.has(destination)) await rm(destination);
}
