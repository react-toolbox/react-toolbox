import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile, readdir, lstat } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { gzipSync, gunzipSync } from 'node:zlib';
import { createRegistry } from './build-registry.mjs';

const root = path.resolve(import.meta.dirname, '..');
const repository = 'react-toolbox/react-toolbox';
const workspace = path.resolve(root, '../..');
const validVersion = (version) =>
  typeof version === 'string' &&
  /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/.test(version) &&
  !version
    .split('-')
    .slice(1)
    .join('-')
    .split('.')
    .some((part) => /^0\d+$/.test(part));
const validFilename = (name) => /^(?:[a-z][a-z0-9-]*\.json|README\.md|RELEASE_NOTES\.md)$/.test(name);
const releaseInputs = (version) => [
  'package.json',
  'pnpm-lock.yaml',
  'pnpm-workspace.yaml',
  '.nvmrc',
  'packages/react-toolbox/src',
  'packages/react-toolbox/package.json',
  'packages/react-toolbox/registry.config.mjs',
  'packages/react-toolbox/LICENSE',
  'packages/react-toolbox/scripts/build-registry.mjs',
  'packages/react-toolbox/scripts/release-registry.mjs',
  `docs/releases/${version}.md`,
];

/** Resolve real release provenance only from committed inputs, including new or ignored source files. */
export function committedReleaseSource(repositoryRoot, inputs, tag) {
  const git = (args) => execFileSync('git', args, { cwd: repositoryRoot, encoding: 'utf8' }).trim();
  const status = git(['status', '--porcelain=v1', '--untracked-files=all', '--ignored=matching', '--', ...inputs]);
  const changes = status.split('\n').filter(Boolean);
  assert(
    !changes.length,
    `Commit all release inputs before creating a source snapshot. Dirty or untracked inputs:\n${changes.slice(0, 12).join('\n')}${changes.length > 12 ? `\n… and ${changes.length - 12} more` : ''}`,
  );
  // A required file absent from both HEAD and the working tree must not be
  // silently treated as clean. Directories need at least one tracked input.
  for (const input of inputs) assert(git(['ls-files', '--', input]), `Release input is not tracked: ${input}`);
  const commit = git(['rev-parse', 'HEAD']);
  if (tag) {
    const tags = git(['tag', '--list', tag]).split('\n');
    if (tags.includes(tag))
      assert.equal(
        git(['rev-parse', `refs/tags/${tag}^{commit}`]),
        commit,
        `Existing tag ${tag} does not identify HEAD`,
      );
  }
  return commit;
}

async function readSnapshotFile(directory, name) {
  const file = path.join(directory, name);
  assert((await lstat(file)).isFile(), `Release input must be a regular file: ${name}`);
  return readFile(file);
}
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;

// A small deterministic ustar archive: flat UTF-8 release files, fixed metadata,
// no filesystem timestamps or platform-dependent tar flags in release hashes.
function archiveContents(files) {
  const blocks = [];
  for (const [name, content] of [...files].sort(([a], [b]) => a.localeCompare(b))) {
    assert(Buffer.byteLength(name) < 100 && !name.includes('/'), `Invalid archive filename: ${name}`);
    const bytes = Buffer.from(content);
    const header = Buffer.alloc(512);
    const field = (offset, length, value) => header.write(value, offset, length, 'ascii');
    const octal = (offset, length, value) => field(offset, length, `${value.toString(8).padStart(length - 1, '0')}\0`);
    field(0, 100, name);
    octal(100, 8, 0o644);
    octal(108, 8, 0);
    octal(116, 8, 0);
    octal(124, 12, bytes.length);
    octal(136, 12, 0);
    field(148, 8, '        ');
    field(156, 1, '0');
    field(257, 6, 'ustar\0');
    field(263, 2, '00');
    const checksum = header.reduce((sum, value) => sum + value, 0);
    field(148, 8, `${checksum.toString(8).padStart(6, '0')}\0 `);
    blocks.push(header, bytes, Buffer.alloc((512 - (bytes.length % 512)) % 512));
  }
  blocks.push(Buffer.alloc(1024));
  return Buffer.concat(blocks);
}
function archive(files) {
  return gzipSync(archiveContents(files), { level: 9 });
}

export async function createReleaseSnapshot({ output, tag, commit } = {}) {
  const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
  assert(validVersion(pkg.version), 'The source release requires a semantic version');
  tag ??= `v${pkg.version}`;
  assert.equal(tag, `v${pkg.version}`, `Tag ${tag} must match the component source version ${pkg.version}`);
  // An explicit commit is used only by deterministic fixture tests. The CLI
  // always takes this checked path and offers no commit override.
  commit ??= committedReleaseSource(workspace, releaseInputs(pkg.version), tag);
  assert(/^[a-f0-9]{40}$/.test(commit), 'A release must record its full Git commit');
  const notes = await readFile(path.resolve(root, `../../docs/releases/${pkg.version}.md`), 'utf8');
  assert(notes.trim().length > 100, 'A release requires maintained release notes');
  const baseUrl = `https://github.com/${repository}/releases/download/${tag}/`;
  const registry = await createRegistry();
  const items = registry.items.map((item) => ({
    ...item,
    registryDependencies: item.registryDependencies.map(
      (url) => new URL(path.posix.basename(new URL(url).pathname), baseUrl).href,
    ),
    meta: { ...item.meta, release: { tag, commit, repository } },
  }));
  const catalog = {
    ...registry.catalog,
    items: items.map((item) => ({
      ...item,
      files: item.files.map(({ content: ignored, ...file }) => file),
    })),
  };
  const files = new Map(items.map((item) => [`${item.name}.json`, json(item)]));
  files.set('registry.json', json(catalog));
  files.set('RELEASE_NOTES.md', notes);
  files.set(
    'README.md',
    `# React Toolbox ${pkg.version}\n\nEditable source release from ${commit}.\n\nInstall an exact component release:\n\n\`\`\`sh\npnpm dlx shadcn@latest add ${baseUrl}button.json\n\`\`\`\n\nEvery dependency is pinned to this release. Commit your application before updating. Decline file overwrites to keep local changes; use --overwrite only after reviewing the diff. To roll back, restore your application commit (including its lockfile and styles), or install a previously reviewed release URL. SHA-256 checksums for every payload are in manifest.json. The archive contains these same files.\n`,
  );
  const manifest = {
    schemaVersion: 1,
    name: pkg.name,
    version: pkg.version,
    tag,
    commit,
    repository,
    baseUrl,
    platform: { node: pkg.engines.node, ...pkg.peerDependencies, tailwindcss: pkg.devDependencies.tailwindcss },
    families: registry.families,
    files: Object.fromEntries(
      [...files]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, content]) => [
          name,
          {
            sha256: sha256(content),
            bytes: Buffer.byteLength(content),
          },
        ]),
    ),
  };
  files.set('manifest.json', json(manifest));
  const destination = path.resolve(root, output ?? `dist/releases/${tag}`);
  await mkdir(destination, { recursive: true });
  // Refuse to mix stale files from another build into a published release.
  const existing = await readdir(destination);
  assert(
    existing.every((name) => files.has(name) || name === 'source-registry.tgz'),
    `Release output contains unexpected files: ${destination}`,
  );
  for (const name of existing)
    assert((await lstat(path.join(destination, name))).isFile(), `Release output must be a regular file: ${name}`);
  await Promise.all([...files].map(([name, content]) => writeFile(path.join(destination, name), content)));
  await writeFile(path.join(destination, 'source-registry.tgz'), archive(files));
  await verifyReleaseSnapshot(destination);
  return { destination, manifest, items };
}

export async function verifyReleaseSnapshot(directory) {
  const manifest = JSON.parse(await readSnapshotFile(directory, 'manifest.json'));
  assert(validVersion(manifest.version), 'Invalid release version');
  assert(/^[a-f0-9]{40}$/.test(manifest.commit), 'Invalid release commit');
  assert.equal(manifest.repository, repository);
  assert.equal(manifest.name, 'react-toolbox');
  assert(
    manifest.files && typeof manifest.files === 'object' && !Array.isArray(manifest.files),
    'Invalid release file manifest',
  );
  for (const name of Object.keys(manifest.files))
    assert(validFilename(name) && name !== 'manifest.json', `Invalid release filename ${name}`);
  assert.equal(manifest.schemaVersion, 1);
  assert.equal(manifest.tag, `v${manifest.version}`);
  assert.equal(manifest.baseUrl, `https://github.com/${repository}/releases/download/${manifest.tag}/`);
  const expectedFiles = [...Object.keys(manifest.files), 'manifest.json', 'source-registry.tgz'].sort();
  assert.deepEqual(
    (await readdir(directory)).sort(),
    expectedFiles,
    'Release snapshot contains unexpected or missing files',
  );
  const content = new Map();
  for (const [name, expected] of Object.entries(manifest.files)) {
    assert(
      expected && /^[a-f0-9]{64}$/.test(expected.sha256) && Number.isSafeInteger(expected.bytes) && expected.bytes >= 0,
      `Invalid release checksum metadata: ${name}`,
    );
    const bytes = await readSnapshotFile(directory, name);
    assert.equal(bytes.length, expected.bytes, `Release size mismatch: ${name}`);
    assert.equal(sha256(bytes), expected.sha256, `Release checksum mismatch: ${name}`);
    content.set(name, bytes.toString('utf8'));
  }
  const catalog = JSON.parse(content.get('registry.json'));
  const payloadNames = Object.keys(manifest.files)
    .filter((name) => name.endsWith('.json') && name !== 'registry.json')
    .sort();
  assert.deepEqual(
    catalog.items.map((item) => `${item.name}.json`).sort(),
    payloadNames,
    'Catalog must identify every release payload exactly once',
  );
  for (const entry of catalog.items) {
    const item = JSON.parse(content.get(`${entry.name}.json`));
    assert.equal(item.meta.version, manifest.version);
    assert.equal(item.meta.release.commit, manifest.commit);
    assert.equal(item.meta.release.tag, manifest.tag);
    assert.equal(item.meta.release.repository, manifest.repository);
    for (const url of item.registryDependencies) {
      assert.equal(new URL(url).origin, 'https://github.com');
      const filename = url.slice(manifest.baseUrl.length);
      assert(
        url.startsWith(manifest.baseUrl) && Object.hasOwn(manifest.files, filename),
        `Dependency escapes the release: ${url}`,
      );
    }
    const source = createHash('sha256');
    for (const file of item.files) source.update(file.path).update('\0').update(file.content).update('\0');
    assert.equal(source.digest('hex'), item.meta.sourceSha256, `Source provenance mismatch: ${item.name}`);
    assert.deepEqual(entry, { ...item, files: item.files.map(({ content: ignored, ...file }) => file) });
  }
  content.set('manifest.json', (await readSnapshotFile(directory, 'manifest.json')).toString('utf8'));
  assert.deepEqual(
    gunzipSync(await readSnapshotFile(directory, 'source-registry.tgz')),
    archiveContents(content),
    'Archive must contain the exact verified snapshot',
  );
  return manifest;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  for (let index = 2; index < process.argv.length; index += 2) {
    assert(
      ['--tag', '--output', '--verify'].includes(process.argv[index]),
      `Unsupported release option: ${process.argv[index]}`,
    );
    assert(
      process.argv[index + 1] && !process.argv[index + 1].startsWith('--'),
      `Missing value for ${process.argv[index]}`,
    );
  }
  const option = (name) => {
    const index = process.argv.indexOf(name);
    return index < 0 ? undefined : process.argv[index + 1];
  };
  if (option('--verify')) {
    const manifest = await verifyReleaseSnapshot(path.resolve(option('--verify')));
    console.log(`Verified source release ${manifest.tag}: ${Object.keys(manifest.files).length} checksummed files.`);
  } else {
    const release = await createReleaseSnapshot({
      tag: option('--tag'),
      output: option('--output'),
    });
    console.log(`Prepared ${release.manifest.tag} source release at ${release.destination}`);
  }
}
