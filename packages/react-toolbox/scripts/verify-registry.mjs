import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { build } from 'esbuild';
import { registrySchema, registryItemSchema } from 'shadcn/schema';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import { createRegistry } from './build-registry.mjs';

const root = path.resolve(import.meta.dirname, '..');
export function dependencyClosure(registry, name) {
  const byName = new Map(registry.items.map((item) => [item.name, item]));
  const result = new Map();
  const visiting = new Set();
  function visit(current) {
    if (visiting.has(current)) throw new Error(`Registry dependency cycle at ${current}`);
    if (result.has(current)) return;
    const item = byName.get(current);
    assert(item, `Missing registry dependency ${current}`);
    visiting.add(current);
    for (const url of item.registryDependencies) {
      assert(url.startsWith(registry.baseUrl), `Dependency escapes this release: ${url}`);
      visit(
        new URL(url).pathname
          .split('/')
          .at(-1)
          .replace(/\.json$/, ''),
      );
    }
    visiting.delete(current);
    result.set(current, item);
  }
  visit(name);
  return [...result.values()];
}
export function installedFiles(registry, name) {
  const files = new Map();
  for (const item of dependencyClosure(registry, name))
    for (const file of item.files) {
      const previous = files.get(file.target);
      assert(!previous || previous.content === file.content, `Conflicting contents for ${file.target}`);
      files.set(file.target, file);
    }
  return [...files.values()];
}
export async function materialize(registry, name, directory, componentDirectory = 'src/components/ui') {
  for (const file of installedFiles(registry, name)) {
    assert(file.target.startsWith('@ui/'));
    const target = path.join(directory, componentDirectory, file.target.slice('@ui/'.length));
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, file.content);
  }
}
export async function verifyStyles(directory, componentRoot) {
  const css = await build({
    entryPoints: [path.join(componentRoot, 'setup.css')],
    bundle: true,
    write: false,
    outdir: path.join(directory, 'build'),
    loader: { '.woff': 'file', '.woff2': 'file', '.ttf': 'file', '.eot': 'file' },
    logLevel: 'silent',
  });
  assert(css.outputFiles.some((file) => file.path.endsWith('.css')));
  const relative = path.relative(directory, componentRoot).split(path.sep).join('/');
  for (const entry of ['tailwind.css', 'shadcn.css']) {
    const fullTailwind = await postcss([tailwind({ base: directory })]).process(
      `@import 'tailwindcss';\n@import './${relative}/setup.css';\n@import './${relative}/${entry}';\n`,
      { from: path.join(directory, 'consumer.css') },
    );
    assert(fullTailwind.css.includes('.rt-button-button'), 'Full Tailwind consumer did not load component styles');
    assert(fullTailwind.css.includes('box-sizing: border-box'), 'Full Tailwind consumer did not include Preflight');
    if (entry === 'shadcn.css')
      assert(fullTailwind.css.includes('--rt-shadcn'), 'Optional semantic theme bridge was not included');
  }
}
export async function verifyRegistry() {
  const registry = await createRegistry();
  registrySchema.parse(registry.catalog);
  registry.items.forEach((item) => registryItemSchema.parse(item));
  const sourceCatalog = registrySchema.parse(JSON.parse(await readFile(path.join(root, 'registry.json'), 'utf8')));
  const catalogItems = new Map(sourceCatalog.items.map((item) => [item.name, item]));
  assert.deepEqual(
    [...catalogItems.keys()],
    registry.items.map((item) => item.name),
    'Source catalog is stale; run pnpm registry:build',
  );
  assert.deepEqual(await createRegistry(), registry, 'Registry generation must be deterministic');
  assert.equal(registry.items.length, registry.families.length + 2);
  assert.equal(new Set(registry.items.map((item) => item.name)).size, registry.items.length);
  for (const retired of ['link', 'navigation']) {
    assert(!registry.items.some((item) => item.name === retired), `${retired} must not have a public registry item`);
    assert(
      !registry.items.some((item) =>
        item.files.some((file) => file.path.startsWith(`components/${retired}/`) && /\.tsx?$/.test(file.path)),
      ),
      `${retired} implementation must not ship in the public source`,
    );
  }
  for (const item of registry.items) {
    const entry = item.files.find((file) => file.type === 'registry:ui');
    assert(entry?.target.startsWith('@ui/material/'), `Public entry must use the material directory: ${item.name}`);
    assert(
      !entry.content.includes('react-toolbox/link') && !entry.content.includes('react-toolbox/navigation'),
      'Public entries must not export retired wrappers',
    );
  }
  const expected = new Set();
  for (const item of registry.items) {
    const catalogItem = catalogItems.get(item.name);
    assert.deepEqual(
      catalogItem.files,
      item.files.map(({ content: ignored, ...file }) => file),
      `Catalog paths differ from maintained source: ${item.name}`,
    );
    const hash = createHash('sha256');
    for (const dependency of [...item.dependencies, ...item.devDependencies])
      assert(!dependency.startsWith('react-toolbox@'));
    for (const file of item.files) {
      const sourcePath = path.resolve(root, file.path);
      assert(
        !path.isAbsolute(file.path) && sourcePath.startsWith(`${root}${path.sep}`),
        `Catalog source escapes the library package: ${file.path}`,
      );
      assert.equal(path.posix.normalize(file.path), file.path, `Catalog source is not normalized: ${file.path}`);
      assert.equal(file.content, await readFile(sourcePath, 'utf8'), `Source drift: ${file.path}`);
      hash.update(file.path).update('\0').update(file.content).update('\0');
      assert(!expected.has(file.path), `Source file belongs to multiple registry items: ${file.path}`);
      expected.add(file.path);
      assert(
        !file.content.match(/(?:from\s+|import\s*)['"]react-toolbox(?:\/|['"])/),
        `Package import in copied file ${file.path}`,
      );
      if (
        file.path.endsWith('.tsx') ||
        /\/use\w+\.ts$/.test(file.path) ||
        file.path === 'components/ThemeProvider.ts' ||
        (file.path.endsWith('/index.ts') && item.name !== 'foundation')
      ) {
        assert(file.content.startsWith("'use client';"), `Missing copied-source client boundary: ${file.path}`);
      }
      if (
        file.path === 'components/shadcn.ts' ||
        /\/(theme|types)\.ts$/.test(file.path) ||
        file.path.startsWith('components/utils/')
      ) {
        assert(
          !file.content.startsWith("'use client';"),
          `Pure data and helpers must remain usable by server components: ${file.path}`,
        );
      }
    }
    const digest = hash.digest('hex');
    assert.equal(item.meta.sourceSha256, digest, `Incorrect source provenance: ${item.name}`);
    assert.equal(
      catalogItem.meta?.sourceSha256,
      digest,
      `Source catalog is stale for ${item.name}; run pnpm registry:build`,
    );
    dependencyClosure(registry, item.name);
  }
  const temporary = await mkdtemp(path.join(tmpdir(), 'react-toolbox-registry-check-'));
  try {
    // Bundle every isolated family closure; an accidentally omitted dependency
    // cannot be satisfied by a sibling from the all-components installation.
    for (const family of registry.families) {
      const directory = path.join(temporary, family);
      await materialize(registry, family.replaceAll('_', '-'), directory);
      await build({
        entryPoints: [path.join(directory, 'src/components/ui/material', `${family.replaceAll('_', '-')}.tsx`)],
        bundle: true,
        write: false,
        format: 'esm',
        platform: 'browser',
        outdir: path.join(directory, 'build'),
        packages: 'external',
        logLevel: 'silent',
      });
    }
    const all = path.join(temporary, 'all');
    await materialize(registry, 'all', all);
    await symlink(path.join(root, 'node_modules'), path.join(all, 'node_modules'), 'dir');
    await writeFile(
      path.join(all, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          target: 'ES2022',
          lib: ['ES2022', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          moduleResolution: 'Bundler',
          jsx: 'react-jsx',
          strict: true,
          noEmit: true,
          skipLibCheck: false,
          types: ['react', 'react-dom'],
        },
        include: ['src/**/*.ts', 'src/**/*.tsx'],
      }),
    );
    execFileSync(path.join(root, 'node_modules/.bin/tsc'), ['-p', path.join(all, 'tsconfig.json')], {
      stdio: 'inherit',
    });
    await verifyStyles(all, path.join(all, 'src/components/ui/react-toolbox'));
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
  console.log(
    `Verified ${registry.families.length} isolated family closures, exact source/CSS contents, and a strict standalone all-components TypeScript build.`,
  );
  return registry;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) await verifyRegistry();
