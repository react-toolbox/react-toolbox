// @vitest-environment node
import { it, vi } from 'vitest';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { build } from 'esbuild';
import { build as buildVite } from 'vite';
import { registrySchema, registryItemSchema } from 'shadcn/schema';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import { createRegistry } from '../scripts/build-registry.mjs';
import { dependencyClosure, installedFiles, materialize, verifyStyles } from './helpers/registry.mjs';
import { compositionSlugs, readCompositionSource } from '../../../apps/docs/app/docs/composition-source.ts';

const root = path.resolve(import.meta.dirname, '..');

it('generates deterministic registry items with exact source and complete dependencies', async () => {
  const registry = await createRegistry();
  const catalog = registrySchema.parse(registry.catalog);
  registry.items.forEach((item) => registryItemSchema.parse(item));
  const catalogItems = new Map(catalog.items.map((item) => [item.name, item]));
  assert.deepEqual(
    [...catalogItems.keys()],
    registry.items.map((item) => item.name),
    'Catalog must include every registry item in order',
  );
  assert.deepEqual(await createRegistry(), registry, 'Registry generation must be deterministic');
  assert.equal(
    registry.items.length,
    registry.families.length +
      registry.items.filter((item) => item.name.startsWith('foundation') || item.name.startsWith('example-')).length +
      1,
  );
  assert.equal(new Set(registry.items.map((item) => item.name)).size, registry.items.length);
  const buttonFiles = installedFiles(registry, 'button');
  for (const capability of ['date-time', 'portal', 'collections']) {
    assert(
      !buttonFiles.some((file) => file.target.includes(`/foundations/${capability}/`)),
      `Button must not install unrelated ${capability} helpers`,
    );
  }
  for (const item of registry.items) {
    if (item.name.startsWith('foundation-')) continue;
    const entry = item.files.find((file) => file.type === 'registry:ui');
    assert(
      entry?.target.startsWith(item.name.startsWith('example-') ? '@ui/examples/' : '@ui/material/'),
      `Public entry must use the material directory: ${item.name}`,
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
        file.path === 'src/material/theme/index.ts' ||
        (file.path.endsWith('/index.ts') && !item.name.startsWith('foundation'))
      ) {
        assert(file.content.startsWith("'use client';"), `Missing copied-source client boundary: ${file.path}`);
      }
      if (
        file.path === 'src/material/foundations/theme/shadcn.ts' ||
        /\/(styles|types)\.ts$/.test(file.path) ||
        file.path.startsWith('src/material/foundations/date-time/') ||
        file.path.startsWith('src/material/foundations/collections/') ||
        file.path.endsWith('/cn.ts')
      ) {
        assert(
          !file.content.startsWith("'use client';"),
          `Shared style constants and helpers must remain usable by server components: ${file.path}`,
        );
      }
    }
    const digest = hash.digest('hex');
    assert.equal(item.meta.sourceSha256, digest, `Incorrect source provenance: ${item.name}`);
    assert.equal(catalogItem.meta?.sourceSha256, digest, `Incorrect catalog source provenance: ${item.name}`);
    dependencyClosure(registry, item.name);
  }
});

it('compiles isolated families and standalone consumers with scoped styles', async () => {
  const registry = await createRegistry();
  const temporary = await mkdtemp(path.join(tmpdir(), 'react-toolbox-registry-check-'));
  try {
    /** Bundle every isolated family closure; an accidentally omitted dependency
     * cannot be satisfied by a sibling from the all-components installation. */
    for (const family of registry.families) {
      const directory = path.join(temporary, family);
      await materialize(registry, family.replaceAll('_', '-'), directory);
      await build({
        entryPoints: [path.join(directory, 'src/components/ui/material', family, 'index.ts')],
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
    for (const item of ['example-recipes', 'example-snackbar-queue']) await materialize(registry, item, all);
    await mkdir(path.join(all, 'src/compositions'), { recursive: true });
    for (const slug of compositionSlugs) {
      const source = await readCompositionSource(slug, path.resolve(root, '../../apps/docs/app/docs/examples'));
      assert(!source.includes('react-toolbox/'), `${slug} must import installed source, not the workspace package`);
      await writeFile(path.join(all, 'src/compositions', `${slug}.tsx`), source);
    }
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
          paths: { '@/*': ['./src/*'] },
        },
        include: ['src/**/*.ts', 'src/**/*.tsx'],
      }),
    );
    execFileSync(path.join(root, 'node_modules/.bin/tsc'), ['-p', path.join(all, 'tsconfig.json')], {
      stdio: 'inherit',
    });
    await verifyStyles(all, path.join(all, 'src/components/ui/material/foundations/styles'));

    /** Compile only copied source, with host auto-detection disabled. A Button
     * install must not ship presentation or keyframes from unrelated families. */
    const subset = path.join(temporary, 'button');
    await symlink(path.join(root, 'node_modules'), path.join(subset, 'node_modules'), 'dir');
    const minimal = await postcss([tailwind({ base: subset })]).process(
      '@import "tailwindcss" source(none); @import "./src/components/ui/material/foundations/styles/setup.css";',
      { from: path.join(subset, 'consumer.css') },
    );
    assert(minimal.css.includes('height: var(--button-height)'), 'Copied Button source must generate its utilities');
    assert(minimal.css.includes('var(--ripple-duration)'), 'Required Ripple utilities must be detected');
    assert(!minimal.css.includes('height: var(--slider-knob-size)'), 'Button must not include Slider presentation');
    assert(!minimal.css.includes('@keyframes rt-progress-bar-'), 'Button must not include unused progress animations');
    assert(!minimal.css.includes('@keyframes rt-checkbox-'), 'Button must not include unused checkbox animations');
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}, 60_000);

it('bundles fonts in an isolated AppBar production consumer', async () => {
  const registry = await createRegistry();
  const directory = await mkdtemp(path.join(tmpdir(), 'react-toolbox-appbar-'));
  try {
    vi.stubEnv('NODE_ENV', 'production');
    await materialize(registry, 'app-bar', directory);
    await symlink(path.join(root, 'node_modules'), path.join(directory, 'node_modules'), 'dir');
    await writeFile(path.join(directory, 'tsconfig.json'), JSON.stringify({ compilerOptions: { jsx: 'react-jsx' } }));
    await writeFile(
      path.join(directory, 'index.html'),
      '<div id="root"></div><script type="module" src="/src/main.tsx"></script>',
    );
    await writeFile(
      path.join(directory, 'src/main.tsx'),
      `
import { createRoot } from 'react-dom/client';
import { AppBar } from './components/ui/material/app-bar';
import './styles.css';
createRoot(document.getElementById('root')!).render(<AppBar title="Independent workspace" leftIcon="menu" />);
`,
    );
    await writeFile(path.join(directory, 'src/styles.css'), '@import "tailwindcss";');
    const bundle = await buildVite({
      root: directory,
      configFile: false,
      logLevel: 'silent',
      /** Preserve imported font origins until Vite resolves URLs and minifies CSS. */
      css: { postcss: { plugins: [tailwind({ base: directory, optimize: false })] } },
      build: { write: false },
    });
    const assets = bundle.output.filter((file) => file.type === 'asset');
    const stylesheet = assets.find((file) => file.fileName.endsWith('.css'));
    assert(stylesheet, 'The standalone consumer must emit component CSS');
    for (const font of ['roboto-latin-500-normal.woff2', 'material-icons.woff2']) {
      const asset = assets.find((file) => file.names.includes(font));
      assert(asset, `The production build must bundle ${font}`);
      assert(stylesheet.source.includes(`/${asset.fileName}`), 'Font URLs must point to emitted assets');
    }
    assert(!stylesheet.source.includes('url(./files/'), 'Production CSS must not retain unresolved font URLs');
  } finally {
    vi.unstubAllEnvs();
    await rm(directory, { recursive: true, force: true });
  }
}, 30_000);
