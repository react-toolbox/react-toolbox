import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { build } from 'esbuild';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import { createRegistry } from './build-registry.mjs';

const root = path.resolve(import.meta.dirname, '..');
const budgets = JSON.parse(await readFile(path.join(import.meta.dirname, 'footprint-budgets.json'), 'utf8'));
const args = process.argv.slice(2);
assert(
  args.every((arg, index) => arg === '--check' || arg === '--json' || args[index - 1] === '--json'),
  'Usage: node scripts/measure-footprint.mjs [--check] [--json report.json]',
);
const reportPath = args.includes('--json') ? args[args.indexOf('--json') + 1] : undefined;
assert(!args.includes('--json') || (reportPath && !reportPath.startsWith('--')), '--json requires a path');

const cases = [
  { name: 'button', exports: { button: ['Button'] } },
  {
    name: 'svg-icon-button',
    fontFree: true,
    exports: { button: ['IconButton'] },
    component: `
export function SaveButton() {
  return <IconButton aria-label="Save" icon={<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h14v18H5z" /></svg>} />;
}`,
  },
  { name: 'input', exports: { input: ['Input'] } },
  {
    name: 'compound-selection',
    exports: {
      dropdown: [
        'DropdownRoot',
        'DropdownTrigger',
        'DropdownSelection',
        'DropdownPortal',
        'DropdownContent',
        'DropdownViewport',
        'DropdownOption',
        'DropdownOptionText',
      ],
      autocomplete: [
        'AutocompleteRoot',
        'AutocompleteInputGroup',
        'AutocompleteLabel',
        'AutocompleteInput',
        'AutocompletePortal',
        'AutocompletePositioner',
        'AutocompletePopup',
        'AutocompleteList',
        'AutocompleteItem',
      ],
    },
  },
  {
    name: 'mixed-settings',
    exports: {
      button: ['Button'],
      input: ['Input'],
      checkbox: ['Checkbox'],
      switch: ['Switch'],
      slider: ['SliderRoot', 'SliderTrack', 'SliderRange', 'SliderThumb'],
      'date-picker': ['DatePicker'],
      'time-picker': ['TimePicker'],
    },
  },
];
const size = (value) => ({ raw: Buffer.byteLength(value), gzip: gzipSync(value).byteLength });
const slash = (value) => value.split(path.sep).join('/');
const registry = await createRegistry();
const items = new Map(registry.items.map((item) => [item.name, item]));
const results = [];

for (const consumer of cases) {
  const installed = new Map();
  function collect(name) {
    if (installed.has(name)) return;
    const item = items.get(name);
    assert(item, `Registry item ${name} is missing`);
    installed.set(name, item);
    for (const dependency of item.registryDependencies) collect(path.basename(new URL(dependency).pathname, '.json'));
  }
  for (const family of Object.keys(consumer.exports)) collect(family);
  const files = [
    ...new Map([...installed.values()].flatMap((item) => item.files).map((file) => [file.path, file])).values(),
  ];
  const directory = await mkdtemp(path.join(tmpdir(), 'react-toolbox-footprint-'));
  try {
    await symlink(path.join(root, 'node_modules'), path.join(directory, 'node_modules'), 'dir');
    for (const file of files) {
      const target = path.join(directory, file.path.replace(/^src\//, ''));
      await mkdir(path.dirname(target), { recursive: true });
      const content =
        consumer.fontFree && file.path.endsWith('/styles/setup.css')
          ? file.content.replace('@import "./fonts.css";\n', '')
          : file.content;
      await writeFile(target, content);
    }
    const entry =
      Object.entries(consumer.exports)
        .map(
          ([family, names]) =>
            `${consumer.component ? 'import' : 'export'} { ${names.join(', ')} } from './material/${family}/index.ts';`,
        )
        .join('\n') + (consumer.component ?? '');
    await writeFile(path.join(directory, 'consumer.tsx'), entry);
    const bundle = await build({
      absWorkingDir: directory,
      entryPoints: ['consumer.tsx'],
      outfile: 'consumer.js',
      bundle: true,
      minify: true,
      write: false,
      metafile: true,
      format: 'esm',
      platform: 'browser',
      target: 'es2022',
      jsx: 'automatic',
      external: ['react', 'react/*', 'react-dom', 'react-dom/*', '*.woff', '*.woff2', '*.ttf', '*.eot', '*.svg'],
      define: { 'process.env.NODE_ENV': '"production"' },
      logLevel: 'silent',
    });
    const javascript = bundle.outputFiles.find((file) => file.path.endsWith('.js'));
    assert(javascript, `${consumer.name} emitted no JavaScript`);
    const emittedCss = Object.entries(bundle.metafile.outputs).find(([file]) => file.endsWith('.css'))?.[1];
    assert(emittedCss, `${consumer.name} emitted no component CSS`);
    const loadedCss = new Set(Object.keys(emittedCss.inputs));
    /** Use imports from the emitted module graph, including direct component imports.
     * Compiling setup.css alone would silently omit family token sheets. */
    const cssEntries = [
      ...new Set(
        Object.entries(bundle.metafile.inputs)
          .filter(([file]) => !file.endsWith('.css'))
          .flatMap(([, input]) =>
            input.imports.filter((dependency) => loadedCss.has(dependency.path)).map((dependency) => dependency.path),
          ),
      ),
    ].sort();
    assert(
      cssEntries.some((file) => /\/tokens\.css$/.test(file)),
      `${consumer.name} must load family tokens`,
    );
    const cssSource =
      '@import "tailwindcss" source(none);\n' +
      '@import "./material/foundations/styles/tailwind.css";\n' +
      cssEntries.map((file) => `@import ${JSON.stringify(`./${slash(file)}`)};`).join('\n');
    const compiled = await postcss([tailwind({ optimize: true })]).process(cssSource, {
      from: path.join(directory, 'consumer.css'),
    });
    const tokens = [...loadedCss].filter((file) => /(?:^|\/)material\/.+\/tokens\.css$/.test(file)).sort();
    const tokenSources = await Promise.all(tokens.map((file) => readFile(path.join(directory, file), 'utf8')));
    const fontFaces = (compiled.css.match(/@font-face\b/g) ?? []).length;
    if (consumer.fontFree) assert.equal(fontFaces, 0, 'The SVG consumer must not emit font-face declarations');
    results.push({
      name: consumer.name,
      js: size(javascript.contents),
      css: size(compiled.css),
      tokenCss: size(tokenSources.join('\n')),
      fontFaces,
      installed: {
        items: [...installed.keys()].sort(),
        dependencies: [...new Set([...installed.values()].flatMap((item) => item.dependencies))].sort(),
        files: files.length,
        source: size(files.map((file) => file.content).join('\n')),
      },
      cssEntries,
      tokenFiles: tokens,
    });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

const failures = [];
for (const result of results) {
  const budget = budgets.cases[result.name];
  assert(budget, `Missing budget for ${result.name}`);
  for (const [metric, actual] of [
    ['jsGzip', result.js.gzip],
    ['cssGzip', result.css.gzip],
    ['tokenCssRaw', result.tokenCss.raw],
    ['fontFaces', result.fontFaces],
  ]) {
    assert(Number.isFinite(budget[metric]) && budget[metric] >= 0, `Invalid ${metric} budget for ${result.name}`);
    if (actual > budget[metric]) failures.push(`${result.name}: ${metric} ${actual} exceeds ${budget[metric]}`);
  }
}
const baseline = budgets.auditBaseline;
const button = results.find((result) => result.name === 'button');
const report = {
  method:
    'Production esbuild browser ESM, selected public exports, React/ReactDOM external, CSS separate. Exact registry source closure; emitted JS-imported CSS plus host Tailwind 4 integration; production PostCSS optimization and installed-source scanning. Font-face declarations included, font binaries excluded. SVG consumer removes only the copied setup.css fonts.css import. Sizes are bytes; gzip uses the Node default level.',
  versions: Object.fromEntries(
    await Promise.all(
      ['esbuild', 'tailwindcss', '@tailwindcss/postcss'].map(async (name) => [
        name,
        JSON.parse(await readFile(path.join(root, 'node_modules', name, 'package.json'), 'utf8')).version,
      ]),
    ),
  ),
  results,
  auditComparison: {
    note: baseline.note,
    button: {
      jsGzip: { before: baseline.button.jsGzip, after: button.js.gzip },
      cssGzip: { before: baseline.button.cssGzip, after: button.css.gzip },
      tokenCssRaw: { before: baseline.button.tokenCssRaw, after: button.tokenCss.raw },
      fontFaces: { before: baseline.button.fontFaces, after: button.fontFaces },
    },
  },
  budgetFailures: failures,
};
if (reportPath) await writeFile(path.resolve(reportPath), `${JSON.stringify(report, null, 2)}\n`);
console.table(
  results.map((result) => ({
    consumer: result.name,
    'JS gzip KiB': (result.js.gzip / 1024).toFixed(2),
    'CSS gzip KiB': (result.css.gzip / 1024).toFixed(2),
    'token CSS KiB': (result.tokenCss.raw / 1024).toFixed(2),
    'font-face rules': result.fontFaces,
  })),
);
console.log(
  `Audit Button CSS gzip: ${(baseline.button.cssGzip / 1024).toFixed(2)} → ${(button.css.gzip / 1024).toFixed(2)} KiB; token CSS: ${(baseline.button.tokenCssRaw / 1024).toFixed(2)} → ${(button.tokenCss.raw / 1024).toFixed(2)} KiB.`,
);
if (failures.length) {
  console.error(failures.join('\n'));
  if (args.includes('--check')) process.exitCode = 1;
} else console.log('All footprint budgets passed.');
