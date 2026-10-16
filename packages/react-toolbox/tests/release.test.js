// @vitest-environment node
import { it } from 'vitest';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm, mkdir, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { registrySchema, registryItemSchema } from 'shadcn/schema';
import { createReleaseSnapshot, verifyReleaseSnapshot, committedReleaseSource } from '../scripts/release-registry.mjs';

it('records only committed release inputs with a matching tag', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'toolbox-release-'));
  try {
    const repository = path.join(directory, 'git-source');
    await mkdir(path.join(repository, 'src'), { recursive: true });
    const git = (args) =>
      execFileSync('git', args, {
        cwd: repository,
        encoding: 'utf8',
        env: { ...process.env, GIT_CONFIG_GLOBAL: '/dev/null', GIT_CONFIG_SYSTEM: '/dev/null' },
      }).trim();
    git(['init', '--quiet']);
    await writeFile(path.join(repository, '.gitignore'), 'src/ignored.ts\n');
    const component = path.join(repository, 'src/component.ts');
    await writeFile(component, 'export const value = 1;\n');
    git(['add', '.']);
    const commit = () =>
      git([
        '-c',
        'user.name=Release Fixture',
        '-c',
        'user.email=fixture@example.test',
        '-c',
        'commit.gpgsign=false',
        'commit',
        '--quiet',
        '-m',
        'Fixture',
      ]);
    commit();
    const initialCommit = git(['rev-parse', 'HEAD']);
    assert.equal(committedReleaseSource(repository, ['src']), initialCommit);
    await writeFile(component, 'export const value = 2;\n');
    assert.throws(() => committedReleaseSource(repository, ['src']), /Commit all release inputs/);
    await writeFile(component, 'export const value = 1;\n');
    for (const name of ['new.ts', 'ignored.ts']) {
      const file = path.join(repository, 'src', name);
      await writeFile(file, 'export const uncommitted = true;\n');
      assert.throws(() => committedReleaseSource(repository, ['src']), /Commit all release inputs/);
      await rm(file);
    }
    await writeFile(path.join(repository, 'unrelated.txt'), 'Unrelated work may remain uncommitted.\n');
    assert.equal(committedReleaseSource(repository, ['src']), initialCommit);
    assert.throws(() => committedReleaseSource(repository, ['missing.json']), /not tracked/);
    git(['tag', 'v1.0.0']);
    await writeFile(component, 'export const value = 2;\n');
    git(['add', 'src/component.ts']);
    commit();
    assert.throws(() => committedReleaseSource(repository, ['src'], 'v1.0.0'), /does not identify HEAD/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

it('creates reproducible snapshots and rejects mismatched or tampered assets', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'toolbox-release-'));
  try {
    const options = { commit: 'a'.repeat(40) };
    const first = await createReleaseSnapshot({ ...options, output: path.join(directory, 'first') });
    const second = await createReleaseSnapshot({ ...options, output: path.join(directory, 'second') });
    assert.deepEqual(first.manifest, second.manifest, 'Release manifests must be reproducible');
    assert.deepEqual(
      await readFile(path.join(first.destination, 'source-registry.tgz')),
      await readFile(path.join(second.destination, 'source-registry.tgz')),
      'Release archives must be reproducible',
    );
    registrySchema.parse(JSON.parse(await readFile(path.join(first.destination, 'registry.json'), 'utf8')));
    for (const item of first.items) registryItemSchema.parse(item);
    await assert.rejects(
      createReleaseSnapshot({ ...options, tag: 'v0.0.0', output: path.join(directory, 'wrong') }),
      /must match/,
    );
    const manifestPath = path.join(second.destination, 'manifest.json');
    const originalManifest = await readFile(manifestPath, 'utf8');
    for (const filename of ['../outside.json', '..\\outside.json', '.']) {
      const manifest = JSON.parse(originalManifest);
      manifest.files[filename] = { sha256: 'a'.repeat(64), bytes: 0 };
      await writeFile(manifestPath, JSON.stringify(manifest));
      await assert.rejects(verifyReleaseSnapshot(second.destination), /Invalid release filename/);
    }
    await writeFile(manifestPath, JSON.stringify({ ...JSON.parse(originalManifest), tag: 'v0.0.0' }));
    await assert.rejects(verifyReleaseSnapshot(second.destination));
    await writeFile(manifestPath, originalManifest);
    const linkedButton = path.join(second.destination, 'button.json');
    await rm(linkedButton);
    await symlink(path.join(first.destination, 'button.json'), linkedButton);
    await assert.rejects(verifyReleaseSnapshot(second.destination), /must be a regular file/);

    const button = path.join(first.destination, 'button.json');
    const original = await readFile(button, 'utf8');
    await writeFile(button, original.replace('Original Material', 'Modified Material'));
    await assert.rejects(verifyReleaseSnapshot(first.destination), /checksum mismatch/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}, 30_000);
