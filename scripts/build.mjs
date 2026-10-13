import { build } from 'esbuild';
import { readdir, readFile, writeFile, rm, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const source = path.join(root, 'components');
const output = path.join(root, 'dist');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries
    .filter(entry => !entry.name.startsWith('__'))
    .map(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)));
  return files.flat();
}

const files = await walk(source);
await rm(output, { recursive: true, force: true });
await build({
  entryPoints: files.filter(file => /\.tsx?$/.test(file) && !file.endsWith('.d.ts')),
  outbase: source,
  outdir: output,
  bundle: true,
  splitting: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  jsx: 'automatic',
  packages: 'external',
  banner: { js: '"use client";' },
  sourcemap: true,
  logLevel: 'warning',
});

// Public declarations come from the checked implementation, never a parallel
// hand-maintained description that can drift from runtime behavior.
execFileSync(path.join(root, 'node_modules/.bin/tsc'), ['-p', 'tsconfig.build.json'], { cwd: root, stdio: 'inherit' });
for (const file of (await walk(output)).filter(file => file.endsWith('.d.ts'))) {
  let declaration = await readFile(file, 'utf8');
  const specifiers = [...declaration.matchAll(/from\s+['"](\.[^'"]+)['"]/g)];
  for (const [, specifier] of specifiers) {
    let target = `${specifier}.js`;
    try {
      await access(path.resolve(path.dirname(file), specifier, 'index.d.ts'));
      target = `${specifier}/index.js`;
    } catch { /* This specifier refers to a file. */ }
    declaration = declaration.replaceAll(`'${specifier}'`, `'${target}'`).replaceAll(`"${specifier}"`, `"${target}"`);
  }
  await writeFile(file, declaration);
}
console.log('Built React Toolbox ES modules and TypeScript declarations.');
