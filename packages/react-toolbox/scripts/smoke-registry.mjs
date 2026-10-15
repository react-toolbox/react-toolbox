import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { build } from 'esbuild';
import { chromium } from '@playwright/test';
import postcss from 'postcss';
import { createRegistry } from './build-registry.mjs';
import { installedFiles, verifyStyles } from './verify-registry.mjs';

const root = path.resolve(import.meta.dirname, '..');
const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const workspace = JSON.parse(await readFile(path.resolve(root, '../../package.json'), 'utf8'));
assert(workspace.packageManager?.startsWith('pnpm@'), 'The workspace must pin pnpm for the isolated consumer');
const directory = await mkdtemp(path.join(tmpdir(), 'react-toolbox-shadcn-'));
const payloads = new Map();
const server = createServer((request, response) => {
  const item = payloads.get(new URL(request.url || '/', 'http://localhost').pathname);
  response.writeHead(item ? 200 : 404, { 'Content-Type': 'application/json' });
  response.end(item ? JSON.stringify(item) : '{}');
});
function run(command, args, cwd = directory) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, {
      cwd,
      env: { ...globalThis.process.env, CI: 'true', NO_COLOR: '1' },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let output = '';
    process.stdout.on('data', (chunk) => {
      output += chunk;
    });
    process.stderr.on('data', (chunk) => {
      output += chunk;
    });
    process.on('error', reject);
    process.on('exit', (code) =>
      code === 0 ? resolve(output) : reject(new Error(`${command} ${args.join(' ')} exited ${code}\n${output}`)),
    );
  });
}
const versions = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
const dependencies = Object.fromEntries(['next', 'react', 'react-dom'].map((name) => [name, versions[name]]));
const devDependencies = Object.fromEntries(
  [
    'typescript',
    '@types/node',
    '@types/react',
    '@types/react-dom',
    'tailwindcss',
    '@tailwindcss/postcss',
    'postcss',
  ].map((name) => [name, versions[name]]),
);
async function verifyNextConsumer() {
  const configPath = path.join(directory, 'tsconfig.json');
  const config = JSON.parse(await readFile(configPath, 'utf8'));
  // Next's standard app configuration skips its bundled third-party declaration
  // internals. Copied Toolbox source was already checked above with this off;
  // strict checking of application and component implementations stays enabled.
  config.compilerOptions.skipLibCheck = true;
  config.compilerOptions.lib = ['ESNext', 'DOM', 'DOM.Iterable'];
  await writeFile(configPath, JSON.stringify(config, null, 2));
  await writeFile(path.join(directory, 'src/styles.d.ts'), "declare module '*.css';\n");
  await mkdir(path.join(directory, 'src/app'), { recursive: true });
  await writeFile(
    path.join(directory, 'postcss.config.mjs'),
    "export default { plugins: { '@tailwindcss/postcss': {} } };\n",
  );
  await writeFile(path.join(directory, 'next.config.mjs'), 'export default { experimental: { cpus: 2 } };\n');
  await writeFile(
    path.join(directory, 'src/app/interaction.tsx'),
    `
'use client';
import { useState } from 'react';
import { Button } from '@/widgets/ui/material/button';
export default function Interaction() {
  const [count, setCount] = useState(0);
  return <div><Button primary raised icon="add" label="Copied action" onClick={() => setCount(count + 1)} />
    <output aria-label="Clicks">{count}</output></div>;
}
`,
  );
  await writeFile(
    path.join(directory, 'src/app/layout.tsx'),
    `
import type { ReactNode } from 'react';
import '../styles/globals.css';
export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
`,
  );
  // This page deliberately remains a server component. Exercise the root
  // barrel, family barrels, and a direct source entry without a client wrapper
  // or the npm build's injected banner. The pure token helper is read server-side.
  await writeFile(
    path.join(directory, 'src/app/page.tsx'),
    `
import { Button } from '@/widgets/ui/material';
import Checkbox from '@/widgets/ui/material/checkbox';
import Input from '@/widgets/ui/material/input';
import Slider from '@/widgets/ui/material/slider';
import { ThemeProvider } from '@/widgets/ui/material/theme';
import { shadcnThemeVariables } from '@/widgets/ui/react-toolbox/shadcn';
import buttonTheme from '@/widgets/ui/react-toolbox/button/theme';
import { range } from '@/widgets/ui/react-toolbox/utils';
import Interaction from './interaction';
export default function Page() {
  return <main data-server-theme={shadcnThemeVariables['--rt-shadcn']}
    data-server-class={buttonTheme.button} data-server-values={range(3).join(',')}>
    <h1>Copied Material components</h1>
    <Interaction />
    <div data-testid="spacing" className="p-6 bg-toolbox-primary" />
    <ThemeProvider variables={shadcnThemeVariables}>
      <Button label="Source button" />
      <Checkbox label="Source checkbox" />
      <Input label="Source input" defaultValue="Server rendered input" />
      <Slider aria-label="Source slider" value={25} />
    </ThemeProvider>
  </main>;
}
`,
  );
  console.log('Building a Next.js App Router consumer with server-to-client source imports.');
  await run(path.join(directory, 'node_modules/.bin/next'), ['build']);
  const html = await readFile(path.join(directory, '.next/server/app/index.html'), 'utf8');
  for (const content of [
    'Copied Material components',
    'Source button',
    'Source checkbox',
    'Server rendered input',
    'Source slider',
    'data-server-theme="1"',
    'data-server-class="rt-button-button"',
    'data-server-values="0,1,2"',
  ]) {
    assert(html.includes(content), `Next.js did not server-render copied source content: ${content}`);
  }
  const socket = createServer();
  await new Promise((resolve) => socket.listen(0, '127.0.0.1', resolve));
  const port = socket.address().port;
  await new Promise((resolve) => socket.close(resolve));
  const app = spawn(
    path.join(directory, 'node_modules/.bin/next'),
    ['start', '--hostname', '127.0.0.1', '--port', String(port)],
    {
      cwd: directory,
      stdio: 'ignore',
    },
  );
  const browser = await chromium.launch();
  try {
    const url = `http://127.0.0.1:${port}`;
    await assertEventually(async () => assert((await fetch(url)).ok));
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    const button = page.getByRole('button', { name: 'Copied action' });
    await button.click();
    await assertEventually(async () => assert.equal(await page.getByLabel('Clicks').textContent(), '1'));
    const styles = await button.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        height: element.getBoundingClientRect().height,
        font: style.fontFamily,
        background: style.backgroundColor,
      };
    });
    assert.equal(styles.height, 36, 'M1 button geometry must survive a standard Tailwind installation');
    assert(styles.font.includes('Roboto'), 'The public entry must load the original typography');
    assert.equal(styles.background, 'rgb(63, 81, 181)', 'The original M1 palette must remain the default');
    const spacing = await page.getByTestId('spacing').evaluate((element) => getComputedStyle(element).padding);
    assert.equal(spacing, '24px', 'Registry installation must register Material spacing utilities');
    const utilityColor = await page
      .getByTestId('spacing')
      .evaluate((element) => getComputedStyle(element).backgroundColor);
    assert.equal(utilityColor, 'rgb(63, 81, 181)', 'Registry installation must register Toolbox color utilities');
    assert.deepEqual(errors, [], 'Copied components must hydrate without browser errors');
  } finally {
    await browser.close();
    app.kill();
  }
}
async function assertEventually(check) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await check();
    } catch (error) {
      if (attempt >= 60) throw error;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
}
try {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  assert(address && typeof address === 'object');
  const registry = await createRegistry({
    origin: process.env.REGISTRY_TEST_ORIGIN || `http://127.0.0.1:${address.port}`,
  });
  payloads.set('/registry.json', registry.catalog);
  for (const item of registry.items) payloads.set(new URL(`${item.name}.json`, registry.baseUrl).pathname, item);
  // A non-default configured component directory proves target placeholders
  // work without assuming components/, src/, or a specific import alias.
  await mkdir(path.join(directory, 'src/styles'), { recursive: true });
  await writeFile(
    path.join(directory, 'package.json'),
    JSON.stringify(
      {
        name: 'toolbox-source-smoke',
        version: '1.0.0',
        private: true,
        type: 'module',
        packageManager: workspace.packageManager,
        dependencies,
        devDependencies,
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(directory, 'tsconfig.json'),
    JSON.stringify(
      {
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
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(directory, 'src/styles/globals.css'),
    '@import \"tailwindcss\";\n:root { --host-theme: kept; }\n',
  );
  await writeFile(
    path.join(directory, 'components.json'),
    JSON.stringify(
      {
        $schema: 'https://ui.shadcn.com/schema.json',
        style: 'new-york',
        rsc: true,
        tsx: true,
        tailwind: { config: '', css: 'src/styles/globals.css', baseColor: 'neutral', cssVariables: true, prefix: '' },
        aliases: { components: '@/widgets', ui: '@/widgets/ui', lib: '@/lib', hooks: '@/hooks', utils: '@/lib/utils' },
        registries: { '@react-toolbox': `${registry.baseUrl}{name}.json` },
      },
      null,
      2,
    ),
  );
  console.log('Installing dependencies into a clean consumer (no react-toolbox package).');
  await run('pnpm', ['install', '--ignore-scripts', '--no-frozen-lockfile']);
  const cli = path.join(root, 'node_modules/.bin/shadcn');
  console.log('Installing the date-picker URL with its component, style, and utility dependencies.');
  await run(cli, ['add', `${registry.baseUrl}date-picker.json`, '--yes', '--cwd', directory]);
  const verify = async (name) => {
    for (const file of installedFiles(registry, name)) {
      const installed = path.join(directory, 'src/widgets/ui', file.target.slice('@ui/'.length));
      assert.equal(await readFile(installed, 'utf8'), file.content, `CLI changed maintained source: ${file.path}`);
    }
    const installedPackage = JSON.parse(await readFile(path.join(directory, 'package.json'), 'utf8'));
    assert(!installedPackage.dependencies?.['react-toolbox'] && !installedPackage.devDependencies?.['react-toolbox']);
    await run(path.join(root, 'node_modules/.bin/tsc'), ['-p', path.join(directory, 'tsconfig.json')]);
  };
  await verify('date-picker');
  console.log(`Installing all ${registry.families.length} families through the configured @react-toolbox namespace.`);
  await run(cli, ['add', '@react-toolbox/all', '--yes', '--overwrite', '--cwd', directory]);
  await verify('all');
  const globals = await readFile(path.join(directory, 'src/styles/globals.css'), 'utf8');
  assert(globals.includes('--host-theme: kept'), 'Installation must preserve the host stylesheet');
  const rules = postcss.parse(globals);
  const primaryTokens = [];
  rules.walkDecls('--color-toolbox-primary', (declaration) => primaryTokens.push(declaration.value));
  assert.deepEqual(primaryTokens, ['var(--rt-color-primary)'], 'Repeated adds must install the theme exactly once');
  await build({
    entryPoints: [path.join(directory, 'src/widgets/ui/material/index.tsx')],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'browser',
    outdir: path.join(directory, 'build'),
    loader: { '.woff': 'file', '.woff2': 'file', '.ttf': 'file', '.eot': 'file' },
    logLevel: 'silent',
  });
  await verifyStyles(directory, path.join(directory, 'src/widgets/ui/react-toolbox'));
  await verifyNextConsumer();
  console.log(
    `shadcn CLI installation passed: ${registry.families.length} families, custom ui alias, exact source, automatic CSS/fonts/theme, strict types, Next.js server rendering, and Chromium interaction/geometry.`,
  );
} finally {
  await new Promise((resolve) => server.close(resolve));
  if (process.env.KEEP_REGISTRY_SMOKE) console.log(`Consumer retained at ${directory}`);
  else await rm(directory, { recursive: true, force: true });
}
