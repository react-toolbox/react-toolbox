import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { parse } from '@babel/parser';

function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (node.type) visit(node);
  for (const [key, value] of Object.entries(node)) {
    if (['loc', 'extra', 'comments'].includes(key)) continue;
    if (Array.isArray(value)) value.forEach((child) => walk(child, visit));
    else walk(value, visit);
  }
}

/** Give browser fixtures the component classes from maintained JSX and shared constants. */
export async function componentClasses(root) {
  const modules = new Map();
  async function load(filename) {
    if (modules.has(filename)) return modules.get(filename);
    const source = await readFile(filename, 'utf8');
    const ast = parse(source, { sourceType: 'module', plugins: ['typescript', 'jsx'] });
    const module = { ast, values: new Map(), imports: new Map() };
    modules.set(filename, module);
    walk(ast, (node) => {
      if (node.type === 'VariableDeclarator' && node.id.type === 'Identifier')
        module.values.set(node.id.name, node.init);
      if (node.type === 'ImportDeclaration' && node.source.value.startsWith('.')) {
        for (const specifier of node.specifiers)
          if (specifier.type === 'ImportSpecifier' && specifier.importKind !== 'type') {
            module.imports.set(specifier.local.name, {
              file: path.resolve(path.dirname(filename), node.source.value),
              name: specifier.imported.name,
            });
          }
      }
    });
    return module;
  }
  async function value(node, module, seen = new Set()) {
    if (!node) return null;
    if (node.type === 'StringLiteral') return node.value;
    if (node.type === 'ArrayExpression') {
      const values = await Promise.all(node.elements.map((item) => value(item, module, seen)));
      return values.every((item) => typeof item === 'string') ? values : null;
    }
    if (node.type === 'CallExpression' && node.callee.property?.name === 'join') {
      const items = await value(node.callee.object, module, seen);
      return Array.isArray(items) ? items.join(' ') : null;
    }
    if (node.type === 'Identifier' && !seen.has(node)) {
      const next = new Set([...seen, node]);
      if (module.values.has(node.name)) return value(module.values.get(node.name), module, next);
      const imported = module.imports.get(node.name);
      if (imported && (node.name.endsWith('Classes') || ['materialRoot', 'materialDescendants'].includes(node.name))) {
        const other = await load(`${imported.file}.ts`);
        return value(other.values.get(imported.name), other, next);
      }
    }
    return null;
  }
  const slots = new Map();
  const record = (parts) => {
    let marker;
    for (const part of parts) {
      if (typeof part !== 'string') continue;
      for (const token of part.split(/\s+/).filter(Boolean)) {
        if (/^rt-[\w-]+$/.test(token)) {
          marker = token;
          if (!slots.has(marker)) slots.set(marker, new Set());
        } else if (marker) slots.get(marker).add(token);
      }
    }
  };
  for (const family of await readdir(path.join(root, 'src/material'), { withFileTypes: true })) {
    if (!family.isDirectory() || family.name === 'foundations') continue;
    for (const file of await readdir(path.join(root, 'src/material', family.name))) {
      if (!/\.(?:ts|tsx)$/.test(file) || file === 'types.ts' || file === 'index.ts') continue;
      const filename = path.join(root, 'src/material', family.name, file);
      const module = await load(filename);
      const expressions = [];
      walk(module.ast, (node) => {
        if (node.type === 'CallExpression' && node.callee.name === 'cn') expressions.push(node.arguments);
        if (node.type === 'VariableDeclarator' && node.id.name?.endsWith('Classes')) expressions.push([node.init]);
      });
      for (const expressionsList of expressions)
        record(await Promise.all(expressionsList.map((node) => value(node, module))));
    }
  }
  return Object.fromEntries([...slots].map(([marker, classes]) => [marker, [marker, ...classes].join(' ')]));
}
