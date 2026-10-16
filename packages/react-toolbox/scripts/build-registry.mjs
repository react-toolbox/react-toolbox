import { createHash } from 'node:crypto';
import { readdir, readFile, mkdir, writeFile, access, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse } from '@babel/parser';
import postcss from 'postcss';
import config from '../registry.config.mjs';

// Resolve from this package rather than process.cwd(): workspace-root commands
// and direct package commands must emit the same catalog and source hashes.
const root = path.resolve(import.meta.dirname, '..');
const source = path.join(root, 'src/material');
const exampleSource = path.join(root, 'src/examples');
const slash = (value) => value.split(path.sep).join('/');
const schema = 'https://ui.shadcn.com/schema/registry-item.json';
const familyName = (value) => value;
async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const lists = await Promise.all(
    entries
      .filter((entry) => !entry.name.startsWith('__'))
      .map((entry) =>
        entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name),
      ),
  );
  return lists.flat().sort();
}
export function imports(content, file) {
  const tree = parse(content, {
    sourceType: 'module',
    plugins: file.endsWith('.tsx') ? ['typescript', 'jsx'] : ['typescript'],
    sourceFilename: file,
  });
  const found = new Set();
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    const moduleReference =
      node.type === 'ImportDeclaration' ||
      node.type === 'ExportNamedDeclaration' ||
      node.type === 'ExportAllDeclaration' ||
      node.type === 'ImportExpression';
    if (moduleReference && node.source?.type === 'StringLiteral') found.add(node.source.value);
    if (node.type === 'TSImportType' && node.argument?.type === 'StringLiteral') found.add(node.argument.value);
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  }
  visit(tree.program);
  return [...found];
}

function registryTheme(content) {
  const theme = {};
  const css = {};
  postcss.parse(content).walkAtRules((rule) => {
    if (rule.name === 'theme')
      rule.walkDecls((declaration) => {
        theme[declaration.prop.slice(2)] = declaration.value;
      });
    if (rule.name === 'custom-variant') css[`@custom-variant ${rule.params}`] = {};
  });
  return { cssVars: { theme }, css };
}
async function resolveSource(file, specifier) {
  const candidate = path.resolve(path.dirname(file), specifier);
  for (const target of [
    candidate,
    `${candidate}.ts`,
    `${candidate}.tsx`,
    `${candidate}/index.ts`,
    `${candidate}/index.tsx`,
  ]) {
    if ((await exists(target)) && /\.(?:tsx?|css)$/.test(target)) return target;
  }
  throw new Error(`Cannot resolve ${specifier} from ${slash(path.relative(root, file))}`);
}
function npmName(specifier) {
  return specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0];
}

/** Build schema-shaped source catalog and JSON payloads directly from maintained files. */
export async function createRegistry({ origin = process.env.REGISTRY_ORIGIN || config.defaultOrigin } = {}) {
  const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
  const base = new URL('/r/', origin.endsWith('/') ? origin : `${origin}/`);
  // Keep a deployment subpath, when one is explicitly supplied.
  const prefix = new URL(origin).pathname.replace(/\/$/, '');
  base.pathname = `${prefix}/r/`;
  const retired = new Set(config.retiredFamilies);
  const files = [...(await walk(source)), ...((await exists(exampleSource)) ? await walk(exampleSource) : [])].filter(
    (file) => {
      const relative = slash(path.relative(source, file));
      return /\.(?:tsx?|css)$/.test(file) && !(retired.has(relative.split('/')[0]) && /\.tsx?$/.test(file));
    },
  );
  const content = new Map(await Promise.all(files.map(async (file) => [file, await readFile(file, 'utf8')])));
  const publicImports = imports(await readFile(path.join(source, 'index.ts'), 'utf8'), 'index.ts');
  const families = [];
  for (const specifier of publicImports) {
    if (!specifier.startsWith('./')) throw new Error(`Unexpected public barrel import ${specifier}`);
    const family = specifier.slice(2);
    if (retired.has(family) || family === 'theme') continue;
    if (await exists(path.join(source, family, 'index.ts'))) families.push(family);
    else if (!content.has(path.join(source, `${family}.ts`)) && !content.has(path.join(source, `${family}.tsx`))) {
      throw new Error(`Public export ${family} has no registry owner`);
    }
  }
  const familySet = new Set(families);
  const examples = [
    ...new Set(
      files
        .filter((file) => file.startsWith(`${exampleSource}/`))
        .map((file) => `example-${slash(path.relative(exampleSource, file)).split('/')[0]}`),
    ),
  ];
  const owner = (file) => {
    if (file.startsWith(`${exampleSource}/`))
      return `example-${slash(path.relative(exampleSource, file)).split('/')[0]}`;
    const relative = slash(path.relative(source, file));
    const [directory, capability] = relative.split('/');
    if (relative === 'index.ts' || relative === 'foundations/styles/styles.css') return 'all';
    if (directory === 'theme') return 'foundation';
    if (directory === 'foundations')
      return ['styles', 'theme'].includes(capability) ? 'foundation' : `foundation-${capability}`;
    if (familySet.has(directory)) return directory;
    throw new Error(`Source has no registry owner: ${relative}`);
  };
  const names = [
    'foundation',
    ...new Set(files.map(owner).filter((name) => name.startsWith('foundation-'))),
    ...families,
    ...examples,
    'all',
  ];
  const groups = new Map(
    names.map((name) => [
      name,
      { files: [], registryDependencies: new Set(), dependencies: new Set(), devDependencies: new Set() },
    ]),
  );
  const versions = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
  const dependency = (group, name) => {
    // React is the consumer's platform, not a dependency for the installer to upgrade.
    if (Object.hasOwn(pkg.peerDependencies ?? {}, name)) return;
    if (name === pkg.name) throw new Error('A copied component must never depend on the react-toolbox package');
    if (!versions[name]) throw new Error(`Missing declared package version for ${name}`);
    group.dependencies.add(`${name}@${versions[name]}`);
    if (name === 'react-transition-group')
      group.devDependencies.add(`@types/react-transition-group@${versions['@types/react-transition-group']}`);
  };
  const localImports = new Map();
  for (const file of files) {
    localImports.set(file, []);
    const itemName = owner(file);
    const group = groups.get(itemName);
    const relative = slash(path.relative(source, file));
    group.files.push({
      path: slash(path.relative(root, file)),
      type:
        relative === 'index.ts' || (/\/index\.tsx?$/.test(relative) && !relative.startsWith('foundations/'))
          ? 'registry:ui'
          : 'registry:file',
      target: file.startsWith(`${exampleSource}/`)
        ? `${config.target.replace(/\/material$/, '')}/examples/${slash(path.relative(exampleSource, file))}`
        : `${config.target}/${relative}`,
      content: content.get(file),
    });
    const references = [];
    if (file.endsWith('.css')) {
      postcss.parse(content.get(file)).walkAtRules('import', (rule) => {
        const specifier = rule.params.match(/^["']([^"']+)["']/)?.[1];
        if (specifier) references.push(specifier);
      });
    } else references.push(...imports(content.get(file), file));
    for (const specifier of references) {
      if (specifier.startsWith('.')) {
        const target = await resolveSource(file, specifier);
        if (!content.has(target)) throw new Error(`Import escapes distributable source: ${file} -> ${specifier}`);
        localImports.get(file).push(target);
        const targetOwner = owner(target);
        if (targetOwner !== itemName) group.registryDependencies.add(targetOwner);
      } else dependency(group, npmName(specifier));
    }
  }
  const foundation = groups.get('foundation');
  foundation.files.push({
    path: 'LICENSE',
    type: 'registry:file',
    target: `${config.target}/LICENSE`,
    content: await readFile(path.join(root, 'LICENSE'), 'utf8'),
  });
  dependency(foundation, '@fontsource/roboto');
  dependency(foundation, 'material-icons');
  for (const family of families) groups.get(familyName(family)).registryDependencies.add('foundation');
  // Source CSS and the host utility sheet may be compiled independently (Next).
  // Register animations in the host through the supported registry CSS API as
  // well. Only include names referenced by the family's actual JS import graph.
  const keyframes = new Map();
  for (const [file, text] of content) {
    if (!file.endsWith('.css')) continue;
    postcss.parse(text).walkAtRules('keyframes', (rule) => {
      keyframes.set(
        rule.params,
        Object.fromEntries(
          rule.nodes
            .filter((node) => node.type === 'rule')
            .map((step) => [
              step.selector,
              Object.fromEntries(
                step.nodes.filter((node) => node.type === 'decl').map((decl) => [decl.prop, decl.value]),
              ),
            ]),
        ),
      );
    });
  }
  const animationCss = new Map();
  for (const family of families) {
    const seen = new Set();
    const visit = (file) => {
      if (seen.has(file)) return;
      seen.add(file);
      for (const target of localImports.get(file) ?? []) visit(target);
    };
    visit(path.join(source, family, 'index.ts'));
    const implementation = [...seen].map((file) => content.get(file)).join('\n');
    animationCss.set(
      family,
      Object.fromEntries(
        [...keyframes]
          .filter(([name]) => implementation.includes(name))
          .map(([name, rules]) => [`@keyframes ${name}`, rules]),
      ),
    );
  }
  const items = names.map((name) => {
    const group = groups.get(name);
    const files = group.files.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
    const hash = createHash('sha256');
    for (const file of files) hash.update(file.path).update('\0').update(file.content).update('\0');
    return {
      $schema: schema,
      name,
      type: name.startsWith('foundation')
        ? 'registry:lib'
        : name === 'all' || name.startsWith('example-')
          ? 'registry:block'
          : 'registry:ui',
      title:
        name === 'all'
          ? 'React Toolbox · all components'
          : name === 'foundation'
            ? 'React Toolbox foundations'
            : `React Toolbox ${name.replaceAll('-', ' ')}`,
      description:
        'Original Material Design components. Editable TypeScript source, styles, and dependencies installed into your application.',
      ...(name === 'foundation'
        ? registryTheme(content.get(path.join(source, 'foundations/styles/tailwind.css')))
        : animationCss.get(name) && Object.keys(animationCss.get(name)).length
          ? { css: animationCss.get(name) }
          : {}),
      dependencies: [...group.dependencies].sort(),
      devDependencies: [...group.devDependencies].sort(),
      registryDependencies: [...group.registryDependencies]
        .sort()
        .map((dependency) => new URL(`${dependency}.json`, base).href),
      files,
      docs: name.startsWith('foundation-')
        ? `Shared implementation installed automatically by the components that need it. See ${config.homepage}/docs/installation.`
        : name.startsWith('example-')
          ? `Editable composition example. Import from your configured ui alias: examples/${name.slice('example-'.length)}. See ${config.homepage}/docs/theming.`
          : `Import from your configured ui alias: material${name === 'all' ? '' : name === 'foundation' ? '/theme' : `/${name}`}. Styles and local Roboto 400/500 fonts load automatically. See ${config.homepage}/docs/installation.`,
      categories: ['material-design', 'react-toolbox'],
      meta: {
        version: pkg.version,
        sourceSha256: hash.digest('hex'),
        source: 'src/material/',
        distribution: 'copy-source',
      },
    };
  });
  const catalog = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: config.name,
    homepage: config.homepage,
    items: items.map((item) => ({ ...item, files: item.files.map(({ content: ignored, ...file }) => file) })),
  };
  return { catalog, items, version: pkg.version, baseUrl: base.href, families };
}

export async function buildRegistry(options = {}) {
  const registry = await createRegistry(options);
  const destination = path.resolve(root, options.output || config.output);
  await mkdir(destination, { recursive: true });
  const release = path.join(destination, 'r');
  await rm(release, { recursive: true, force: true });
  await mkdir(release, { recursive: true });
  await Promise.all(
    registry.items.map((item) =>
      writeFile(path.join(release, `${item.name}.json`), `${JSON.stringify(item, null, 2)}\n`),
    ),
  );
  await writeFile(path.join(destination, 'registry.json'), `${JSON.stringify(registry.catalog, null, 2)}\n`);
  await writeFile(path.join(release, 'registry.json'), `${JSON.stringify(registry.catalog, null, 2)}\n`);
  // The docs app imports this snapshot at build time; serving the registry
  // requires neither a separate server nor access to source files in production.
  await writeFile(
    path.join(root, 'registry/data.json'),
    `${JSON.stringify({ catalog: registry.catalog, items: registry.items })}\n`,
  );
  if (options.sourceCatalog !== false)
    await writeFile(path.join(root, 'registry.json'), `${JSON.stringify(registry.catalog, null, 2)}\n`);
  return { ...registry, destination };
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const option = (name) => {
    const index = process.argv.indexOf(name);
    return index < 0 ? undefined : process.argv[index + 1];
  };
  const registry = await buildRegistry({ origin: option('--origin'), output: option('--output') });
  console.log(
    `Built ${registry.items.length} registry items (${registry.families.length} public families) at ${registry.baseUrl}`,
  );
}
