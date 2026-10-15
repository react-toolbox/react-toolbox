import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { ComponentSlug } from './catalog';
import CodeBlock from './code-block';
import DialogComposition from './examples/dialog';
import DrawerComposition from './examples/drawer';
import TabsComposition from './examples/tabs';
import MenuComposition from './examples/menu';
import DropdownComposition from './examples/dropdown';
import AutocompleteComposition from './examples/autocomplete';
import TableComposition from './examples/table';
import TooltipComposition from './examples/tooltip';

const examples = {
  dialog: {
    Component: DialogComposition,
    note: 'Own the form, body, and footer independently. Radix handles focus, dismissal, and accessible titles. Close the controlled root after a successful save.',
  },
  drawer: {
    Component: DrawerComposition,
    note: 'Compose a right-hand drawer with a nested dialog. Escape closes the topmost surface and restores focus to its trigger.',
  },
  tabs: {
    Component: TabsComposition,
    note: 'Stable values allow custom trigger wrappers and reordered tabs. Manual activation separates arrow-key focus from selection; forceMount preserves a draft.',
  },
  menu: {
    Component: MenuComposition,
    note: 'DropdownMenu parts add portaled submenus, checkbox and radio items, typeahead, and collision handling. Prevent the selection event to keep a checkbox menu open.',
  },
  dropdown: {
    Component: DropdownComposition,
    note: 'Compose the trigger, selected value, groups, and options. The native form receives the value; keyboard navigation and popup positioning come from Radix Select.',
  },
  autocomplete: {
    Component: AutocompleteComposition,
    note: 'Base UI powers filtering, multiple selection, removable chips, object values, and native form fields. Style any part with className; use render to substitute its element.',
  },
  table: {
    Component: TableComposition,
    note: 'Use native table sections and custom row components. Row values keep selection stable through reordering and filtering. Header cells inherit their semantics through wrappers.',
  },
  tooltip: {
    Component: TooltipComposition,
    note: 'A shared provider coordinates hover delays. Each root also supports controlled state, keyboard descriptions, collision handling, and touch long-press.',
  },
};
export function hasCompositionExample(slug: ComponentSlug): slug is keyof typeof examples {
  return slug in examples;
}
export default async function CompositionPreview({ slug }: { slug: keyof typeof examples }) {
  const { Component, note } = examples[slug];
  let source = await readFile(path.join(process.cwd(), 'app/docs/examples', `${slug}.tsx`), 'utf8');
  if (slug === 'drawer') {
    const dialog = await readFile(path.join(process.cwd(), 'app/docs/examples/dialog.tsx'), 'utf8');
    source =
      source.replace("import DialogComposition from './dialog';", '') +
      '\n' +
      dialog
        .replace("'use client';", '')
        .replace("import { useState } from 'react';", '')
        .replace("import { Button } from 'react-toolbox/button';", '')
        .replace('export default function DialogComposition', 'function DialogComposition');
    source = source.replace("'use client';", "'use client';\nimport { useState } from 'react';");
  }
  source = source.replaceAll("'react-toolbox/", "'@/components/ui/material/");
  return (
    <div className="space-y-6">
      <p className="text-toolbox-body/6 text-toolbox-text">{note} Parts accept native or primitive props and refs.</p>
      <div data-composition-example={slug} className="rounded border border-toolbox-divider bg-white p-6">
        <Component />
      </div>
      <details>
        <summary className="cursor-pointer py-3 text-toolbox-body font-medium text-toolbox-primary focus-visible:outline-2 focus-visible:outline-offset-2">
          Show composition code
        </summary>
        <CodeBlock label={`${slug} composition`} code={source} />
      </details>
    </div>
  );
}
