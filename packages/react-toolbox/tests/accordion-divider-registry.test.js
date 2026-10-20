// @vitest-environment node
import { expect, it } from 'vitest';
import { createRegistry } from '../scripts/build-registry.mjs';
import { installedFiles } from './helpers/registry.mjs';

it('registers Accordion and Divider with isolated source and dependency closure', async () => {
  const registry = await createRegistry();
  for (const family of ['accordion', 'divider']) {
    expect(registry.families).toContain(family);
    const item = registry.items.find((entry) => entry.name === family);
    expect(item.files.some((file) => file.path === `src/material/${family}/index.ts`)).toBe(true);
    expect(item.registryDependencies).toEqual([`${registry.baseUrl}foundation.json`]);
    expect(item.files.every((file) => file.path.startsWith(`src/material/${family}/`))).toBe(true);
    expect(registry.items.find((entry) => entry.name === 'all').registryDependencies).toContain(
      `${registry.baseUrl}${family}.json`,
    );
    const files = installedFiles(registry, family);
    expect(files.some((file) => file.path === 'src/material/foundations/styles/cn.ts')).toBe(true);
    expect(files.some((file) => file.path.includes('/button/'))).toBe(false);
    expect(files.some((file) => file.path.includes('/list/'))).toBe(false);
  }
  const accordion = registry.items.find((item) => item.name === 'accordion');
  expect(accordion.dependencies.some((dependency) => dependency.startsWith('@base-ui/react@'))).toBe(true);
  const divider = registry.items.find((item) => item.name === 'divider');
  expect(divider.dependencies).toEqual([]);
});
