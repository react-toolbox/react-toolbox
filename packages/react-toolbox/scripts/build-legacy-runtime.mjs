/**
 * Build an independent browser baseline from the unmodified historical sources.
 * Legacy dependencies live only in an isolated temporary directory.
 */
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const fixture = path.join(root, 'tests/fixtures');
const workspace = path.resolve(process.env.REACT_TOOLBOX_LEGACY_DIR || path.join(os.tmpdir(), 'react-toolbox-legacy-runtime'));
const sourceRevision = 'de8578c1187bdf5db5777d403b5880a7e5ec3f5d';
const dependencies = {
  '@babel/runtime': '7.1.2',
  classnames: '2.2.6',
  'core-js': '2.5.7',
  'prop-types': '15.6.2',
  ramda: '0.25.0',
  react: '16.14.0',
  'react-dom': '16.14.0',
  'react-css-themr': '2.1.2',
  'react-style-proptype': '3.2.2',
  'react-transition-group': '2.5.0',
};
await mkdir(workspace, { recursive: true });
await writeFile(path.join(workspace, 'package.json'), JSON.stringify({
  name: 'react-toolbox-legacy-verification', private: true, version: '1.0.0', dependencies,
}, null, 2) + '\n');

const archivedLock = path.join(fixture, 'legacy-runtime-lock.json');
if (!existsSync(path.join(workspace, 'node_modules/react/package.json')) || process.argv.includes('--install')) {
  if (existsSync(archivedLock)) {
    await writeFile(path.join(workspace, 'package-lock.json'), await readFile(archivedLock));
  }
  execFileSync('npm', [existsSync(archivedLock) ? 'ci' : 'install',
    '--ignore-scripts', '--legacy-peer-deps', '--no-audit', '--no-fund'], { cwd: workspace, stdio: 'inherit' });
}
for (const [name, expected] of Object.entries(dependencies)) {
  const installed = JSON.parse(await readFile(path.join(workspace, 'node_modules', name, 'package.json'), 'utf8'));
  if (installed.version !== expected) throw new Error(`${name}: expected ${expected}, found ${installed.version}`);
}

const original = path.join(workspace, sourceRevision);
await mkdir(original, { recursive: true });
const archive = execFileSync('git', ['archive', '--format=tar', sourceRevision, 'components'], {
  cwd: root, maxBuffer: 10 * 1024 * 1024,
});
execFileSync('tar', ['-xf', '-', '-C', original], { input: archive });
const gallery = await readFile(path.resolve(root, '../../apps/docs/app/gallery.jsx'), 'utf8');
await writeFile(path.join(workspace, 'gallery.jsx'), gallery);
const themes = JSON.parse(await readFile(path.join(fixture, 'legacy-styles/reference-themes.json'), 'utf8'));
const metadata = {
  sourceRevision,
  dependencies,
  gallerySha256: createHash('sha256').update(gallery).digest('hex'),
  renderer: 'ReactDOM.render (React 16)',
  styles: 'tests/fixtures/legacy-styles/reference.css',
};
await writeFile(path.join(workspace, 'entry.jsx'), `
import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './gallery.jsx';
window.__REACT_TOOLBOX_LEGACY__ = ${JSON.stringify(metadata)};
window.__REACT_TOOLBOX_LEGACY_READY__ = false;
const container = document.getElementById('legacy-root');
if (!container) throw new Error('The legacy runtime fixture requires div#legacy-root.');
ReactDOM.render(<Gallery />, container, () => {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    window.__REACT_TOOLBOX_LEGACY_READY__ = true;
    window.dispatchEvent(new Event('react-toolbox-legacy-ready'));
  }));
});
`);

await build({
  entryPoints: [path.join(workspace, 'entry.jsx')],
  outfile: path.join(fixture, 'legacy-runtime.js'),
  absWorkingDir: workspace,
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2018',
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
  define: { 'process.env.NODE_ENV': '"production"' },
  minify: true,
  legalComments: 'inline',
  banner: { js: `/* Test-only original React Toolbox runtime. Source: ${sourceRevision}. Rebuild: node scripts/build-legacy-runtime.mjs */` },
  plugins: [{
    name: 'original-toolbox-and-compiled-style-maps',
    setup(builder) {
      builder.onResolve({ filter: /^react-toolbox$/ }, () => ({ path: path.join(original, 'components/index.js') }));
      builder.onLoad({ filter: /\.module\.css$/ }, ({ path: file }) => {
        const component = path.basename(path.dirname(file));
        if (!themes[component]) throw new Error(`Missing independently compiled style map for ${file}`);
        return { contents: `export default ${JSON.stringify(themes[component])};`, loader: 'js' };
      });
    },
  }],
  metafile: true,
  logLevel: 'info',
}).then(async ({ metafile }) => {
  const modernSources = Object.keys(metafile.inputs).filter(file =>
    path.resolve(workspace, file).startsWith(path.join(root, 'components') + path.sep));
  if (modernSources.length) throw new Error(`Modern component sources leaked into legacy baseline: ${modernSources.join(', ')}`);
  await writeFile(path.join(fixture, 'legacy-runtime.json'), JSON.stringify({
    ...metadata,
    bundleSha256: createHash('sha256').update(await readFile(path.join(fixture, 'legacy-runtime.js'))).digest('hex'),
    componentSourceCount: Object.keys(metafile.inputs).filter(file => file.includes(`${sourceRevision}/components/`) && file.endsWith('.js')).length,
  }, null, 2) + '\n');
});
await writeFile(archivedLock, await readFile(path.join(workspace, 'package-lock.json')));
console.log(`Archived independent React 16 runtime from ${sourceRevision}.`);
