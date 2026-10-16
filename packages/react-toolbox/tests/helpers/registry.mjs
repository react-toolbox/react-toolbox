import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { build } from 'esbuild';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';

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
