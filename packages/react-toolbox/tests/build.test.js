// @vitest-environment node
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { it } from 'vitest';

it('keeps live style imports available during rebuilds and removes deleted modules', async () => {
  const root = path.resolve(import.meta.dirname, '..');
  const directory = await mkdtemp(path.join(tmpdir(), 'toolbox-rebuild-'));
  let monitor;
  try {
    for (const file of ['src', 'scripts', 'package.json', 'tsconfig.json', 'tsdown.config.ts']) {
      await cp(path.join(root, file), path.join(directory, file), { recursive: true });
    }
    await symlink(path.join(root, 'node_modules'), path.join(directory, 'node_modules'), 'dir');
    await mkdir(path.join(directory, 'dist/material/removed'), { recursive: true });
    const stylesheet = path.join(directory, 'dist/shadcn.css');
    await writeFile(stylesheet, '/* Previous build remains available to Next. */');
    const staleFiles = ['removed.js', 'removed.js.map', 'removed.d.ts', 'removed/tokens.css'].map((file) =>
      path.join(directory, 'dist/material', file),
    );
    for (const file of staleFiles) await writeFile(file, '');
    let missingStylesheet = false;
    monitor = setInterval(() => {
      missingStylesheet ||= !existsSync(stylesheet);
    }, 5);
    const pkg = JSON.parse(await readFile(path.join(directory, 'package.json'), 'utf8'));
    await new Promise((resolve, reject) => {
      const child = spawn('/bin/sh', ['-c', pkg.scripts.build], {
        cwd: directory,
        env: { ...process.env, PATH: `${path.join(root, 'node_modules/.bin')}${path.delimiter}${process.env.PATH}` },
        stdio: ['ignore', 'pipe', 'pipe'],
      });
      let log = '';
      child.stdout.on('data', (chunk) => {
        log += chunk;
      });
      child.stderr.on('data', (chunk) => {
        log += chunk;
      });
      child.on('error', reject);
      child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(log))));
    });
    assert(!missingStylesheet, 'A rebuild must not temporarily delete the CSS imported by the live docs app');
    assert((await readFile(stylesheet, 'utf8')).includes('@layer'));
    assert(existsSync(path.join(directory, 'dist/material/button/Button.js')));
    for (const file of staleFiles) assert(!existsSync(file), `${file} should be pruned`);
  } finally {
    clearInterval(monitor);
    await rm(directory, { recursive: true, force: true });
  }
}, 30_000);
