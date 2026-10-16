// @vitest-environment node
import assert from 'node:assert/strict';
import path from 'node:path';
import { it } from 'vitest';
import postcss from 'postcss';
import { createRegistry, imports } from '../scripts/build-registry.mjs';
import { installedFiles } from './helpers/registry.mjs';

it('installs family tokens without unrelated component declarations', async () => {
  const registry = await createRegistry();
  const files = installedFiles(registry, 'button');
  const css = files
    .filter((file) => file.path.endsWith('.css'))
    .map((file) => file.content)
    .join('\n');
  assert(css.includes('--button-height:'), 'Button defaults must be installed');
  assert(css.includes('--ripple-duration:'), 'Ripple defaults must be installed');
  assert(!css.includes('--slider-knob-size:'), 'Button must not install Slider defaults');
  assert(
    !files.some((file) => file.path === 'src/material/foundations/styles/styles.css'),
    'Isolated installs must not import the complete stylesheet',
  );
  assert(
    files.some((file) => file.path.endsWith('/tailwind.css')),
    'Host Tailwind integration remains available',
  );
});

it('loads each referenced family token through actual module and CSS imports', async () => {
  const registry = await createRegistry();
  const files = new Map(registry.items.flatMap((item) => item.files).map((file) => [file.path, file.content]));
  const owners = new Map();
  for (const [file, content] of files) {
    if (!/^src\/material\/[^/]+\/tokens.css$/.test(file)) continue;
    postcss.parse(content).walkDecls(/^--/, (declaration) => owners.set(declaration.prop, file));
  }
  function resolve(file, specifier) {
    const base = path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier));
    return [base, `${base}.ts`, `${base}.tsx`, `${base}/index.ts`, `${base}/index.tsx`].find((name) => files.has(name));
  }
  const dependencies = new Map();
  for (const [file, content] of files) {
    if (!/\.(?:tsx?|css)$/.test(file)) continue;
    const references = [];
    if (file.endsWith('.css'))
      postcss.parse(content).walkAtRules('import', (rule) => {
        references.push(rule.params.match(/^["']([^"']+)["']/)?.[1]);
      });
    else references.push(...imports(content, file));
    dependencies.set(
      file,
      references
        .filter((specifier) => specifier?.startsWith('.'))
        .map((specifier) => {
          const target = resolve(file, specifier);
          assert(target, `${file} cannot resolve ${specifier}`);
          return target;
        }),
    );
  }
  for (const [file, content] of files) {
    if (!/^src\/material\/[^/]+\/[^/]+\.(?:tsx?|css)$/.test(file)) continue;
    const loaded = new Set();
    function visit(file) {
      if (loaded.has(file)) return;
      loaded.add(file);
      for (const dependency of dependencies.get(file) ?? []) visit(dependency);
    }
    visit(file);
    const classes =
      content +
      [...loaded]
        .filter((dependency) => dependency.endsWith('/composition.ts') || dependency.endsWith('/styles.ts'))
        .map((dependency) => files.get(dependency))
        .join('\n');
    for (const [token] of classes.matchAll(/--[\w-]+/g)) {
      const owner = owners.get(token);
      if (owner) assert(loaded.has(owner), `${file} uses ${token} without importing ${owner}`);
    }
  }
});
