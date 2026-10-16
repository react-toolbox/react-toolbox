import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, readFile, writeFile, rm, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { build } from 'esbuild';
import { chromium } from '@playwright/test';
import postcss from 'postcss';
import { createRegistry } from './build-registry.mjs';
import { installedFiles, verifyStyles } from '../tests/helpers/registry.mjs';

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
function run(command, args, cwd = directory, { declineOverwrite = false } = {}) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, {
      cwd,
      env: { ...globalThis.process.env, CI: 'true', NO_COLOR: '1' },
      stdio: [declineOverwrite ? 'pipe' : 'ignore', 'pipe', 'pipe'],
    });
    let output = '';
    let answered = 0;
    const receive = (chunk) => {
      output += chunk;
      if (declineOverwrite) {
        if (!answered && /Would you like to overwrite/i.test(output)) {
          answered = 1;
          process.stdin.end('n\n');
        }
      }
    };
    process.stdout.on('data', receive);
    process.stderr.on('data', receive);
    const timeout = setTimeout(
      () => {
        process.kill();
        reject(new Error(`Timed out: ${command} ${args.join(' ')}\n${output}`));
      },
      declineOverwrite ? 60_000 : 240_000,
    );
    process.on('close', () => clearTimeout(timeout));
    process.on('error', reject);
    process.on('exit', (code) => {
      if (code !== 0) reject(new Error(`${command} ${args.join(' ')} exited ${code}\n${output}`));
      else if (declineOverwrite && !answered) reject(new Error('Expected an overwrite prompt for customized source'));
      else resolve(output);
    });
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
  // Compile and hydrate the exact public composition recipes in an isolated
  // consumer. This catches missing primitive dependencies and private imports.
  const compositionFamilies = ['dialog', 'drawer', 'tabs', 'menu', 'dropdown', 'autocomplete', 'table', 'tooltip'];
  await mkdir(path.join(directory, 'src/app/examples'), { recursive: true });
  for (const family of compositionFamilies) {
    const source = await readFile(path.resolve(root, '../../apps/docs/app/docs/examples', `${family}.tsx`), 'utf8');
    await writeFile(
      path.join(directory, 'src/app/examples', `${family}.tsx`),
      source.replaceAll("'react-toolbox/", "'@/widgets/ui/material/"),
    );
  }
  await writeFile(
    path.join(directory, 'src/app/compositions.tsx'),
    "'use client';\n" +
      compositionFamilies.map((family, index) => `import Example${index} from './examples/${family}';`).join('\n') +
      '\nexport default function Compositions() { return <section aria-label="Composition examples">' +
      compositionFamilies.map((family, index) => `<div data-example="${family}"><Example${index} /></div>`).join('') +
      '</section>; }\n',
  );
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
import { shadcnThemeVariables } from '@/widgets/ui/material/foundations/theme/shadcn';
import { range } from '@/widgets/ui/material/foundations/collections/range';
import Interaction from './interaction';
import Compositions from './compositions';
export default function Page() {
  return <main data-server-theme={shadcnThemeVariables['--rt-shadcn']}
    data-server-values={range(3).join(',')}>
    <h1 className="text-toolbox-title text-toolbox-primary">Copied Material components</h1>
    <Interaction />
    <Compositions />
    <div data-testid="spacing" className="min-h-toolbox-touch p-6 bg-toolbox-primary" />
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
    page.setDefaultTimeout(15_000);
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
    const animations = await page.evaluate(() => {
      const names = [];
      const visit = (rules) => {
        for (const rule of rules) {
          if (rule.type === CSSRule.KEYFRAMES_RULE) names.push(rule.name);
          else if ('cssRules' in rule) visit(rule.cssRules);
        }
      };
      for (const sheet of document.styleSheets) visit(sheet.cssRules);
      return names;
    });
    for (const name of ['toolbox-enter', 'toolbox-exit', 'toolbox-drawer-out', 'rt-checkbox-checkmark-expand']) {
      assert(animations.includes(name), `Copied styles must register ${name} in the consumer stylesheet`);
    }
    console.log('Checking copied dialog motion and form composition.');
    const composedDialog = page.locator('[data-example="dialog"]');
    await composedDialog.getByRole('button', { name: 'Edit profile' }).click();
    const modal = page.getByRole('dialog', { name: 'Edit profile' });
    await modal.getByRole('textbox', { name: 'Display name' }).fill('Copied composition');
    assert.notEqual(await modal.evaluate((element) => getComputedStyle(element).boxShadow), 'none');
    await modal.getByRole('button', { name: 'Save changes' }).click();
    await assertEventually(async () =>
      assert.equal(await composedDialog.getByRole('status').textContent(), 'Copied composition'),
    );
    await assertEventually(async () => assert.equal(await modal.count(), 0));
    console.log('Checking copied autocomplete object selection and form values.');
    const composedAutocomplete = page.locator('[data-example="autocomplete"]');
    await composedAutocomplete.getByRole('combobox', { name: 'Invite teammates' }).fill('Gra');
    await page.getByRole('option', { name: /Grace Hopper/ }).click();
    await composedAutocomplete.getByRole('combobox').press('Escape');
    await composedAutocomplete.getByRole('button', { name: 'Save teammates' }).click();
    await assertEventually(async () =>
      assert.equal(await composedAutocomplete.getByRole('status').textContent(), 'ada, grace'),
    );
    const spacing = await page.getByTestId('spacing').evaluate((element) => getComputedStyle(element).padding);
    assert.equal(spacing, '36px', 'Registry installation must preserve the host spacing scale');
    const utilityColor = await page
      .getByTestId('spacing')
      .evaluate((element) => getComputedStyle(element).backgroundColor);
    assert.equal(utilityColor, 'rgb(63, 81, 181)', 'Registry installation must register Toolbox color utilities');
    const title = await page.getByRole('heading', { name: 'Copied Material components' }).evaluate((element) => {
      const style = getComputedStyle(element);
      return [style.fontSize, style.lineHeight, style.fontWeight, style.color];
    });
    assert.deepEqual(
      title,
      ['20px', '28px', '500', 'rgb(63, 81, 181)'],
      'Registry installation must include M1 text-role metadata',
    );
    assert.equal(await page.getByTestId('spacing').evaluate((element) => getComputedStyle(element).minHeight), '48px');
    assert.deepEqual(errors, [], 'Copied components must hydrate without browser errors');
  } finally {
    await browser.close();
    app.kill();
  }
}
async function verifyCustomizedUpdate(registry, cli) {
  const file = installedFiles(registry, 'button').find((entry) => entry.target.endsWith('/button/Button.tsx'));
  assert(file, 'Button implementation must be present for the update test');
  const target = path.join(directory, 'src/widgets/ui', file.target.slice('@ui/'.length));
  const customized = `${file.content}\n// Consumer customization: retain this until overwrite is explicit.\n`;
  await writeFile(target, customized);
  console.log(
    'Checking that a declined update preserves customized source and explicit overwrite restores the release.',
  );
  await run(cli, ['add', '@react-toolbox/button', '--yes', '--cwd', directory], directory, {
    declineOverwrite: true,
  });
  assert.equal(await readFile(target, 'utf8'), customized, 'A declined overwrite must retain consumer source');
  await run(cli, ['add', '@react-toolbox/button', '--yes', '--overwrite', '--cwd', directory]);
  assert.equal(await readFile(target, 'utf8'), file.content, 'Explicit overwrite must restore the registry source');
}

async function verifyViteConsumer(registry, cli) {
  const vite = await mkdtemp(path.join(tmpdir(), 'react-toolbox-vite-'));
  let app;
  let browser;
  try {
    await mkdir(path.join(vite, 'src/styles'), { recursive: true });
    await mkdir(path.join(vite, 'src/lib'), { recursive: true });
    await writeFile(
      path.join(vite, 'package.json'),
      JSON.stringify(
        {
          name: 'toolbox-vite-shadcn-consumer',
          version: '1.0.0',
          private: true,
          type: 'module',
          packageManager: workspace.packageManager,
          dependencies: {
            react: versions.react,
            'react-dom': versions['react-dom'],
            'tailwind-merge': versions['tailwind-merge'],
            // Standard dependency installed by shadcn init, before individual components.
            'class-variance-authority': '^0.7.1',
          },
          devDependencies: { ...devDependencies, vite: versions.vite },
        },
        null,
        2,
      ),
    );
    const config = JSON.parse(await readFile(path.join(directory, 'components.json'), 'utf8'));
    config.rsc = false;
    await writeFile(path.join(vite, 'components.json'), JSON.stringify(config, null, 2));
    await writeFile(
      path.join(vite, 'tsconfig.json'),
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
            types: ['react', 'react-dom', 'vite/client'],
            paths: { '@/*': ['./src/*'] },
          },
          include: ['src/**/*.ts', 'src/**/*.tsx'],
        },
        null,
        2,
      ),
    );
    await writeFile(
      path.join(vite, 'vite.config.ts'),
      `
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({ resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } } });
`,
    );
    /** Vite resolves imported font URLs after PostCSS, then minifies the CSS itself. */
    await writeFile(
      path.join(vite, 'postcss.config.mjs'),
      "export default { plugins: { '@tailwindcss/postcss': { optimize: false } } };\n",
    );
    await writeFile(
      path.join(vite, 'index.html'),
      '<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>Source consumer</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n',
    );
    await writeFile(path.join(vite, 'src/main.tsx'), "import './styles/globals.css';\n");
    await writeFile(
      path.join(vite, 'src/lib/utils.ts'),
      `
import { twMerge } from 'tailwind-merge';
export function cn(...values: (string | undefined | false | null)[]) { return twMerge(values.filter(Boolean).join(' ')); }
`,
    );
    await writeFile(
      path.join(vite, 'src/styles/globals.css'),
      `
@import "tailwindcss";
@theme inline { --color-primary: var(--primary); --color-primary-foreground: var(--primary-foreground); }
:root { --primary: #172554; --primary-foreground: white; --host-theme: kept; }
`,
    );
    console.log('Installing a clean Vite consumer and an official shadcn Button before adding Material components.');
    await run('pnpm', ['install', '--ignore-scripts', '--no-frozen-lockfile'], vite);
    await run(cli, ['add', 'button', '--yes', '--cwd', vite], vite);
    const hostButton = path.join(vite, 'src/widgets/ui/button.tsx');
    const hostButtonSource = await readFile(hostButton, 'utf8');
    const hostUtilities = await readFile(path.join(vite, 'src/lib/utils.ts'), 'utf8');
    await run(cli, ['add', '@react-toolbox/app-bar', '--yes', '--cwd', vite], vite);
    assert.equal(
      await readFile(hostButton, 'utf8'),
      hostButtonSource,
      'Material installation must preserve the existing shadcn Button',
    );
    assert.equal(
      await readFile(path.join(vite, 'src/lib/utils.ts'), 'utf8'),
      hostUtilities,
      'Material installation must preserve host utilities',
    );
    const globals = await readFile(path.join(vite, 'src/styles/globals.css'), 'utf8');
    const css = postcss.parse(globals);
    const hostPrimary = [];
    css.walkDecls('--primary', (declaration) => hostPrimary.push(declaration.value));
    assert.deepEqual(hostPrimary, ['#172554'], 'Material installation must not replace the host color palette');
    assert(globals.includes('--host-theme: kept'), 'The host stylesheet must survive installation');
    assert(
      !(await readdir(path.join(vite, 'src/widgets/ui/material/foundations'))).includes('date-time'),
      'An AppBar consumer must not receive date/time helpers',
    );
    for (const file of installedFiles(registry, 'app-bar')) {
      assert.equal(
        await readFile(path.join(vite, 'src/widgets/ui', file.target.slice('@ui/'.length)), 'utf8'),
        file.content,
        `Vite CLI installation changed maintained source: ${file.path}`,
      );
    }
    await writeFile(
      path.join(vite, 'src/main.tsx'),
      `
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button as HostButton } from '@/widgets/ui/button';
import { Button } from '@/widgets/ui/material/button';
import { AppBar } from '@/widgets/ui/material/app-bar';
import './styles/globals.css';
function App() {
  const [count, setCount] = useState(0);
  return <><AppBar title="Independent workspace" leftIcon="menu" leftIconLabel="Open navigation" onLeftIconClick={() => setCount(count + 1)} />
  <main><h2>Independent Vite consumer</h2>
    <HostButton onClick={() => setCount(count + 1)}>Host action</HostButton>
    <Button primary raised label="Material action" onClick={() => setCount(count + 1)} />
    <output aria-label="Clicks">{count}</output>
  </main></>;
}
createRoot(document.getElementById('root')!).render(<App />);
`,
    );
    await run(path.join(vite, 'node_modules/.bin/tsc'), ['--noEmit'], vite);
    await run(path.join(vite, 'node_modules/.bin/vite'), ['build'], vite);
    const socket = createServer();
    await new Promise((resolve) => socket.listen(0, '127.0.0.1', resolve));
    const port = socket.address().port;
    await new Promise((resolve) => socket.close(resolve));
    app = spawn(
      path.join(vite, 'node_modules/.bin/vite'),
      ['preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
      { cwd: vite, stdio: 'ignore' },
    );
    const url = `http://127.0.0.1:${port}`;
    await assertEventually(async () => assert((await fetch(url)).ok));
    browser = await chromium.launch();
    const page = await browser.newPage();
    page.setDefaultTimeout(15_000);
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(url);
    const fonts = await page.evaluate(async () => {
      const roboto = await document.fonts.load('500 20px Roboto', 'Independent workspace');
      const icons = await document.fonts.load('24px "Material Icons"', 'menu');
      return { roboto: roboto.length, icons: icons.length };
    });
    assert(fonts.roboto > 0 && fonts.icons > 0, 'The production consumer must load Roboto and Material Icons');
    const material = page.getByRole('button', { name: 'Material action' });
    const host = page.getByRole('button', { name: 'Host action' });
    await material.click();
    await host.click();
    await page.getByRole('button', { name: 'Open navigation' }).press('Enter');
    assert.equal(await page.getByLabel('Clicks').textContent(), '3', 'Host, Material and AppBar actions must work');
    await page.mouse.move(0, 0);
    assert.equal(await material.evaluate((element) => element.getBoundingClientRect().height), 36);
    assert.equal(await material.evaluate((element) => getComputedStyle(element).backgroundColor), 'rgb(63, 81, 181)');
    await assertEventually(async () =>
      assert.equal(
        await host.evaluate((element) => getComputedStyle(element).backgroundColor),
        'rgb(23, 37, 84)',
        'The shadcn button must retain the host palette after its hover transition',
      ),
    );
    for (const [width, height, barHeight, padding] of [
      [1280, 900, 64, 24],
      [390, 844, 56, 16],
      [844, 390, 48, 16],
    ]) {
      await page.setViewportSize({ width, height });
      const geometry = await page.getByRole('banner').evaluate((element) => ({
        height: element.getBoundingClientRect().height,
        width: element.getBoundingClientRect().width,
        padding: getComputedStyle(element).paddingLeft,
        pageWidth: document.documentElement.scrollWidth,
      }));
      assert.deepEqual(geometry, { height: barHeight, width, padding: `${padding}px`, pageWidth: width });
    }
    assert.deepEqual(errors, [], 'Copied components must run in Vite without browser errors');
  } finally {
    await browser?.close();
    app?.kill();
    if (process.env.KEEP_REGISTRY_SMOKE) console.log(`Vite consumer retained at ${vite}`);
    else await rm(vite, { recursive: true, force: true });
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
    '@import "tailwindcss";\n@theme { --spacing: 6px; }\n:root { --host-theme: kept; }\n',
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
  const hostSpacing = [];
  rules.walkDecls('--spacing', (declaration) => hostSpacing.push(declaration.value));
  assert.deepEqual(hostSpacing, ['6px'], 'Repeated adds must preserve the host spacing scale');
  const primaryTokens = [];
  rules.walkDecls('--color-toolbox-primary', (declaration) => primaryTokens.push(declaration.value));
  assert.deepEqual(primaryTokens, ['var(--rt-color-primary)'], 'Repeated adds must install the theme exactly once');
  await build({
    entryPoints: [path.join(directory, 'src/widgets/ui/material/index.ts')],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'browser',
    outdir: path.join(directory, 'build'),
    loader: { '.woff': 'file', '.woff2': 'file', '.ttf': 'file', '.eot': 'file' },
    logLevel: 'silent',
  });
  await verifyStyles(directory, path.join(directory, 'src/widgets/ui/material/foundations/styles'));
  await verifyCustomizedUpdate(registry, cli);
  await verifyNextConsumer();
  await verifyViteConsumer(registry, cli);
  console.log(
    `shadcn CLI installation passed: ${registry.families.length} families, custom ui alias, exact source, automatic CSS/fonts/theme, strict types, Next.js server rendering, Vite, existing shadcn components, safe customized-source updates, and Chromium interaction/geometry.`,
  );
} finally {
  await new Promise((resolve) => server.close(resolve));
  if (process.env.KEEP_REGISTRY_SMOKE) console.log(`Consumer retained at ${directory}`);
  else await rm(directory, { recursive: true, force: true });
}
