import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { registryItemSchema } from 'shadcn/schema';
import { createRegistry } from './build-registry.mjs';

const origin = new URL(process.argv[2] || 'https://react-toolbox.io');
assert.equal(origin.protocol, 'https:', 'Production validation requires HTTPS with a valid certificate');
assert(
  !origin.username && !origin.password && !origin.search && !origin.hash,
  'Use a production origin without credentials, query or fragment',
);
const registry = await createRegistry({ origin: origin.href });
async function get(relative) {
  const response = await fetch(new URL(relative, origin), { signal: AbortSignal.timeout(30_000) });
  assert(response.ok, `${response.url} returned HTTP ${response.status}`);
  assert.equal(new URL(response.url).protocol, 'https:', 'Production must not redirect to HTTP');
  return response;
}
for (const route of ['/', '/docs', '/docs/installation', '/docs/components/button']) {
  const response = await get(route);
  assert(response.headers.get('content-type')?.includes('text/html'), `${route} must serve HTML`);
  const html = await response.text();
  assert(html.includes('React Toolbox'), `${route} must render the documentation application`);
  assert(!html.includes('http://127.0.0.1:3100/r/'), `${route} must not advertise a local installation URL`);
}
// Batch requests without hammering the registry; every family and every optional
// foundation must be available at the same source revision as this checkout.
for (let offset = 0; offset < registry.items.length; offset += 4) {
  await Promise.all(
    registry.items.slice(offset, offset + 4).map(async (expected) => {
      const response = await get(`/r/${expected.name}.json`);
      assert(
        response.headers.get('content-type')?.includes('application/json'),
        `${expected.name} must serve registry JSON`,
      );
      const actual = registryItemSchema.parse(await response.json());
      assert.equal(actual.meta?.version, registry.version, `Wrong deployed version: ${expected.name}`);
      assert.deepEqual(actual.files, expected.files, `Deployed source differs from this checkout: ${expected.name}`);
      assert.deepEqual(
        actual.registryDependencies,
        expected.registryDependencies,
        `Dependencies must resolve within this deployment: ${expected.name}`,
      );
      assert.deepEqual(actual.dependencies, expected.dependencies, `Dependency versions differ: ${expected.name}`);
      assert.deepEqual(actual.cssVars, expected.cssVars, `Theme variables differ: ${expected.name}`);
      assert.deepEqual(actual.css, expected.css, `Tailwind variants differ: ${expected.name}`);
      assert.deepEqual(
        actual.devDependencies,
        expected.devDependencies,
        `Development dependency versions differ: ${expected.name}`,
      );
      const hash = createHash('sha256');
      for (const file of actual.files) hash.update(file.path).update('\0').update(file.content).update('\0');
      assert.equal(actual.meta.sourceSha256, hash.digest('hex'), `Invalid deployed source checksum: ${expected.name}`);
    }),
  );
}
console.log(
  `Verified HTTPS documentation and all ${registry.items.length} deployed registry items at ${origin.origin}, matching source ${registry.version}.`,
);
