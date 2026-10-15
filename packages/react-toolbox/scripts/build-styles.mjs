import { build } from 'esbuild';
import { copyFile, glob, mkdir, readFile, writeFile } from 'node:fs/promises';
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
  '@layer theme, base, components, utilities; @import "tailwindcss/theme.css" layer(theme); @import "tailwindcss/utilities.css" layer(utilities) source(none); @import "./src/material/foundations/styles/styles.css"; @source "./src/material";',
  { from: path.join(root, 'standalone.css') },
);
await writeFile(path.join(root, 'dist/styles.css'), standalone.css);
for (const name of ['tailwind.css', 'tailwind-preflight.css', 'shadcn.css']) {
  await copyFile(path.join(root, 'src/material/foundations/styles', name), path.join(root, 'dist', name));
}
await writeFile(
  path.join(root, 'dist/tailwind.css'),
  (await readFile(path.join(root, 'src/material/foundations/styles/tailwind.css'), 'utf8'))
    .replace('./styles.css', './foundation.css')
    .replace('@source "../../"', '@source "./material"'),
);
// Typed side-effect imports work with TypeScript's noUncheckedSideEffectImports.
await writeFile(path.join(root, 'dist/css.d.mts'), 'export {};\n');
console.log('Built standalone CSS, Tailwind integration, and optional shadcn theme bridge.');

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
