/** Generate the documentation contract from the same TypeScript users install. */
import { parse } from '@babel/parser';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const material = path.join(root, 'src/material');
const output = path.join(root, 'registry/api.json');
const modules = new Map();
const declarationTypes = new Set(['TSInterfaceDeclaration', 'TSTypeAliasDeclaration']);
const nameOf = (node) => node?.name ?? node?.value;
const parameterTypes = (node) => node.typeParameters?.params ?? node.typeArguments?.params ?? [];
const qualify = (node) =>
  node?.type === 'TSQualifiedName' ? `${qualify(node.left)}.${qualify(node.right)}` : nameOf(node);

function resolveFile(file, specifier) {
  if (!specifier.startsWith('.')) return null;
  const base = path.resolve(path.dirname(file), specifier);
  return (
    [base, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts')].find(
      (candidate) => existsSync(candidate) && /\.tsx?$/.test(candidate),
    ) ?? null
  );
}
function readModule(file) {
  if (modules.has(file)) return modules.get(file);
  const source = readFileSync(file, 'utf8');
  const ast = parse(source, { sourceType: 'module', plugins: ['typescript', 'jsx'] });
  const module = { file, source, declarations: new Map(), imports: new Map(), exports: new Map(), stars: [] };
  modules.set(file, module);
  const declare = (node) => {
    if (node.type === 'VariableDeclaration') {
      for (const item of node.declarations)
        if (item.id.type === 'Identifier') module.declarations.set(item.id.name, item);
    } else if (node.id) module.declarations.set(node.id.name, node);
  };
  for (const statement of ast.program.body) {
    if (statement.type === 'ImportDeclaration') {
      for (const item of statement.specifiers)
        module.imports.set(item.local.name, {
          file: resolveFile(file, statement.source.value),
          name: nameOf(item.imported) ?? (item.type === 'ImportDefaultSpecifier' ? 'default' : '*'),
          source: statement.source.value,
        });
    } else if (statement.type === 'ExportAllDeclaration') {
      module.stars.push({
        file: resolveFile(file, statement.source.value),
        typesOnly: statement.exportKind === 'type',
      });
    } else if (statement.type === 'ExportNamedDeclaration') {
      if (statement.declaration) {
        declare(statement.declaration);
        const declaration = statement.declaration;
        const names =
          declaration.type === 'VariableDeclaration'
            ? declaration.declarations.map((item) => item.id.name)
            : [declaration.id.name];
        for (const name of names)
          module.exports.set(name, {
            file,
            name,
            typesOnly: declarationTypes.has(declaration.type) || declaration.type === 'TSDeclareFunction',
          });
      }
      for (const item of statement.specifiers)
        module.exports.set(nameOf(item.exported), {
          file: statement.source ? resolveFile(file, statement.source.value) : file,
          name: nameOf(item.local),
          typesOnly: statement.exportKind === 'type' || item.exportKind === 'type',
        });
    } else if (statement.type === 'ExportDefaultDeclaration') {
      const declaration = statement.declaration;
      if (declaration.type === 'Identifier')
        module.exports.set('default', { file, name: declaration.name, typesOnly: false });
      else if (declaration.id) {
        declare(declaration);
        module.exports.set('default', { file, name: declaration.id.name, typesOnly: false });
      }
    } else declare(statement);
  }
  return module;
}
function exported(file, seen = new Set()) {
  if (!file || seen.has(file)) return new Map();
  seen.add(file);
  const module = readModule(file);
  const result = new Map(module.exports);
  for (const star of module.stars)
    for (const [name, ref] of exported(star.file, seen)) {
      if (name !== 'default' && !result.has(name))
        result.set(name, { ...ref, typesOnly: star.typesOnly || ref.typesOnly });
    }
  return result;
}
function resolveSymbol(file, name, seen = new Set()) {
  const key = `${file}:${name}`;
  if (!file || seen.has(key)) return null;
  seen.add(key);
  const module = readModule(file);
  if (module.declarations.has(name)) return { module, node: module.declarations.get(name), name };
  const imported = module.imports.get(name);
  if (imported?.file) return resolveSymbol(imported.file, imported.name, seen);
  const ref = exported(file).get(name);
  if (ref && (ref.file !== file || ref.name !== name)) return resolveSymbol(ref.file, ref.name, seen);
  return null;
}
function sourceText(module, node) {
  return module.source.slice(node.start, node.end).replace(/\s+/g, ' ').trim();
}
function literalKeys(module, node, seen = new Set()) {
  if (!node) return [];
  if (node.type === 'TSLiteralType' && node.literal.type === 'StringLiteral') return [node.literal.value];
  if (node.type === 'TSUnionType' || node.type === 'TSIntersectionType')
    return node.types.flatMap((item) => literalKeys(module, item, seen));
  if (node.type === 'TSParenthesizedType') return literalKeys(module, node.typeAnnotation, seen);
  if (node.type === 'TSTypeReference') {
    const name = qualify(node.typeName);
    const args = parameterTypes(node);
    if (name === 'Partial' || name === 'Readonly' || name === 'Record') return literalKeys(module, args[0], seen);
    const resolved = resolveSymbol(module.file, name);
    const key = `${resolved?.module.file}:${name}`;
    if (resolved && !seen.has(key)) {
      seen.add(key);
      return literalKeys(resolved.module, resolved.node.typeAnnotation ?? resolved.node.body, seen);
    }
  }
  if (node.type === 'TSTypeLiteral' || node.type === 'TSInterfaceBody')
    return (
      node.members?.map((item) => nameOf(item.key)).filter(Boolean) ??
      node.body.map((item) => nameOf(item.key)).filter(Boolean)
    );
  return [];
}
function callbackType(module, node, seen = new Set()) {
  if (node.type === 'TSIndexedAccessType') {
    const key = literalKeys(module, node.indexType)[0];
    const property = propsFor(module, node.objectType, new Set(seen)).properties.get(key);
    if (property) return property.type;
  }
  if (node.type === 'TSTypeReference') {
    const name = qualify(node.typeName);
    const reference = `${module.file}:${name}`;
    const resolved = resolveSymbol(module.file, name);
    if (resolved?.node.type === 'TSTypeAliasDeclaration' && /(?:Event|Handler)$/.test(name) && !seen.has(reference)) {
      seen.add(reference);
      return callbackType(resolved.module, resolved.node.typeAnnotation, seen);
    }
  }
  const replacements = [];
  const visit = (child) => {
    if (!child || typeof child !== 'object') return;
    if (child !== node && ['TSTypeReference', 'TSIndexedAccessType'].includes(child.type)) {
      const expanded = callbackType(module, child, new Set(seen));
      if (expanded !== sourceText(module, child))
        replacements.push({ start: child.start, end: child.end, text: expanded });
      return;
    }
    for (const [key, value] of Object.entries(child)) {
      if (['loc', 'leadingComments', 'trailingComments', 'innerComments'].includes(key)) continue;
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  };
  visit(node);
  let text = module.source.slice(node.start, node.end);
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    text = text.slice(0, replacement.start - node.start) + replacement.text + text.slice(replacement.end - node.start);
  }
  return text.replace(/\s+/g, ' ').trim();
}
function documentation(node) {
  return (node.leadingComments ?? [])
    .filter((comment) => comment.type === 'CommentBlock')
    .map((comment) => comment.value.replace(/^\s*\*\s?/gm, '').trim())
    .join('\n');
}
function emptyProps() {
  return { properties: new Map(), native: new Set() };
}
function mergeProps(parts, union = false) {
  const result = emptyProps();
  for (const part of parts) {
    for (const native of part.native) result.native.add(native);
    for (const [name, prop] of part.properties) {
      const existing = result.properties.get(name);
      if (!union || !existing) result.properties.set(name, prop);
      else
        result.properties.set(name, {
          ...prop,
          type: existing.type === prop.type ? prop.type : `(${existing.type}) | (${prop.type})`,
          required: existing.required && prop.required,
        });
    }
  }
  if (union)
    for (const [name, prop] of result.properties)
      if (!parts.every((part) => part.properties.has(name))) result.properties.set(name, { ...prop, required: false });
  return result;
}
function propsFor(module, node, seen = new Set()) {
  if (!node) return emptyProps();
  if (node.type === 'TSInterfaceDeclaration')
    return mergeProps([
      ...(node.extends ?? []).map((item) =>
        propsFor(module, { ...item, type: 'TSTypeReference', typeName: item.expression }, new Set(seen)),
      ),
      propsFor(module, node.body, seen),
    ]);
  if (node.type === 'TSTypeAliasDeclaration' || node.type === 'TSParenthesizedType')
    return propsFor(module, node.typeAnnotation, seen);
  if (node.type === 'TSIntersectionType' || node.type === 'TSUnionType')
    return mergeProps(
      node.types.map((item) => propsFor(module, item, new Set(seen))),
      node.type === 'TSUnionType',
    );
  if (node.type === 'TSInterfaceBody' || node.type === 'TSTypeLiteral') {
    const result = emptyProps();
    for (const member of node.body ?? node.members) {
      if (!['TSPropertySignature', 'TSMethodSignature'].includes(member.type)) continue;
      const name = nameOf(member.key);
      if (!name) continue;
      const type = member.typeAnnotation?.typeAnnotation;
      const callback = /^on[A-Z]/.test(name) || type?.type === 'TSFunctionType';
      const annotation = type
        ? callback
          ? callbackType(module, type, new Set(seen))
          : sourceText(module, type)
        : sourceText(module, member).replace(/;$/, '');
      result.properties.set(name, {
        name,
        type: annotation,
        required: !member.optional,
        description: documentation(member),
        callback,
        slots: ['classNames', 'theme'].includes(name) ? literalKeys(module, type) : [],
      });
    }
    return result;
  }
  if (node.type === 'TSTypeReference' || node.type === 'TSExpressionWithTypeArguments') {
    const name = qualify(node.typeName ?? node.expression);
    const args = parameterTypes(node);
    if (['Omit', 'Pick', 'Partial', 'Required', 'Readonly', 'PropsWithChildren'].includes(name)) {
      const result = propsFor(module, args[0], seen);
      const keys = literalKeys(module, args[1]);
      if (name === 'Omit') for (const key of keys) result.properties.delete(key);
      if (name === 'Pick')
        for (const key of result.properties.keys()) if (!keys.includes(key)) result.properties.delete(key);
      if (result.native.size && ['Omit', 'Pick', 'Partial', 'Required', 'Readonly'].includes(name)) {
        const native = [...result.native].map(
          (base) => `${name}<${base}${args[1] ? `, ${sourceText(module, args[1])}` : ''}>`,
        );
        result.native = new Set(native);
      }
      if (name === 'Partial' || name === 'Required')
        for (const [key, prop] of result.properties)
          result.properties.set(key, { ...prop, required: name === 'Required' });
      return result;
    }
    const resolved = resolveSymbol(module.file, name);
    const key = `${resolved?.module.file}:${name}`;
    if (resolved && declarationTypes.has(resolved.node.type) && !seen.has(key)) {
      seen.add(key);
      return propsFor(resolved.module, resolved.node, seen);
    }
    const result = emptyProps();
    result.native.add(sourceText(module, node));
    return result;
  }
  throw new Error(
    `Unsupported public props type ${node.type} in ${path.relative(root, module.file)}: ${sourceText(module, node)}`,
  );
}
function defaultsFor(module, fn) {
  const defaults = {};
  const readPattern = (pattern) => {
    if (pattern?.type === 'AssignmentPattern') return readPattern(pattern.left);
    if (pattern?.type !== 'ObjectPattern') return;
    for (const property of pattern.properties)
      if (property.type === 'ObjectProperty' && property.value.type === 'AssignmentPattern')
        defaults[nameOf(property.key)] = sourceText(module, property.value.right);
  };
  for (const parameter of fn.params ?? []) readPattern(parameter);
  const first = fn.params?.[0];
  const parameterName = first?.type === 'Identifier' ? first.name : first?.left?.name;
  for (const statement of fn.body?.body ?? []) {
    if (statement.type !== 'VariableDeclaration') continue;
    for (const declaration of statement.declarations)
      if (declaration.init?.type === 'Identifier' && declaration.init.name === parameterName)
        readPattern(declaration.id);
  }
  return defaults;
}
function argumentType(fn) {
  const parameter = fn.params?.[0];
  return parameter?.typeAnnotation?.typeAnnotation ?? parameter?.left?.typeAnnotation?.typeAnnotation;
}
function apiFor(file, exportName, reference) {
  const resolved = resolveSymbol(reference.file, reference.name);
  if (!resolved) throw new Error(`Could not resolve public export ${exportName} from ${file}`);
  const { module } = resolved;
  let node = resolved.node;
  let decoratedProps = null;
  let kind = /^use[A-Z]/.test(exportName)
    ? 'hook'
    : /Factory$/.test(exportName) || exportName === 'Ripple' || exportName === 'Tooltip'
      ? 'factory'
      : 'component';
  if (node.type === 'VariableDeclarator' && node.init?.type === 'CallExpression') {
    const factory = resolveSymbol(module.file, qualify(node.init.callee));
    if (!factory) throw new Error(`Unsupported exported factory ${exportName}`);
    const decorator = factory.node.body.body.find((statement) => statement.type === 'ReturnStatement')?.argument;
    if (decorator?.type !== 'FunctionExpression') throw new Error(`Unsupported decorator ${exportName}`);
    node = decorator;
    decoratedProps = resolveSymbol(module.file, `${exportName}Props`);
    kind = 'decorator';
  }
  if (!['FunctionDeclaration', 'ArrowFunctionExpression', 'FunctionExpression'].includes(node.type))
    throw new Error(`Unsupported runtime export ${exportName}: ${node.type}`);
  const type = argumentType(node);
  const props = decoratedProps ? propsFor(decoratedProps.module, decoratedProps.node) : propsFor(module, type);
  const behavior = decoratedProps && resolveSymbol(module.file, `use${exportName}`);
  const defaults = defaultsFor(module, behavior?.node ?? node);
  const properties = [...props.properties.values()].map((prop) => ({ ...prop, default: defaults[prop.name] ?? null }));
  return {
    name: exportName,
    kind,
    signature: module.source
      .slice(node.start, node.body.start)
      .trim()
      .replace(/^export\s+/, ''),
    description: documentation(resolved.node),
    source: path.relative(root, module.file).split(path.sep).join('/'),
    propsType: decoratedProps ? decoratedProps.name : type ? sourceText(module, type) : null,
    properties,
    nativeProps: [...props.native],
    nativeDefaults: Object.entries(defaults)
      .filter(([name]) => !props.properties.has(name))
      .map(([name, value]) => ({ name, value })),
    styleSlots: [...new Set(properties.flatMap((prop) => prop.slots))].sort(),
  };
}

const families = [...exported(path.join(material, 'index.ts')).values()];
const publicEntries = [...new Set(families.map((item) => path.dirname(item.file)))]
  .filter((directory) => path.dirname(directory) === material && path.basename(directory) !== 'theme')
  .sort();
const result = {};
for (const directory of publicEntries) {
  const entry = path.join(directory, 'index.ts');
  const symbols = exported(entry);
  const apis = [];
  const types = [];
  for (const [name, ref] of symbols) {
    if (name === 'default') continue;
    const resolved = resolveSymbol(ref.file, ref.name);
    if (!resolved) throw new Error(`Unresolved export ${name} from ${entry}`);
    if (declarationTypes.has(resolved.node.type)) {
      types.push({
        name,
        declaration: resolved.module.source.slice(resolved.node.start, resolved.node.end),
        description: documentation(resolved.node),
      });
    } else if (!ref.typesOnly) apis.push(apiFor(entry, name, ref));
  }
  if (!apis.length) throw new Error(`No documented runtime API for ${directory}`);
  result[path.basename(directory)] = { apis, types };
}
if (Object.keys(result).length !== publicEntries.length || !publicEntries.length)
  throw new Error(`Expected ${publicEntries.length} public component families, found ${Object.keys(result).length}`);
const sourceHash = createHash('sha256');
for (const module of [...modules.values()].sort((a, b) => a.file.localeCompare(b.file)))
  sourceHash.update(path.relative(root, module.file)).update('\0').update(module.source).update('\0');
const data = `${JSON.stringify({ schemaVersion: 1, sourceHash: sourceHash.digest('hex'), families: result }, null, 2)}\n`;
writeFileSync(output, data);
console.log(
  `Documented ${Object.keys(result).length} families, ${Object.values(result).reduce((total, family) => total + family.apis.length, 0)} public components/hooks/factories.`,
);
