import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const compositionSlugs = [
  'button',
  'avatar',
  'input',
  'snackbar',
  'slider',
  'date-picker',
  'time-picker',
  'sheet',
  'dialog',
  'drawer',
  'tabs',
  'menu',
  'dropdown',
  'autocomplete',
  'table',
  'tooltip',
] as const;

export type CompositionSlug = (typeof compositionSlugs)[number];

/** Keep copied documentation and isolated consumer checks on the same source. */
export async function readCompositionSource(slug: CompositionSlug, examplesDirectory: string): Promise<string> {
  let source = await readFile(path.join(examplesDirectory, `${slug}.tsx`), 'utf8');
  if (slug === 'dialog' || slug === 'drawer') {
    const dialog = await readFile(path.join(examplesDirectory, 'profile-dialog.tsx'), 'utf8');
    source =
      source
        .replace("import ProfileDialog from './profile-dialog';", '')
        .replace("import { useState } from 'react';", '')
        .replace("import { Button } from 'react-toolbox/button';", '') +
      '\n' +
      dialog
        .replace("'use client';", '')
        .replace("import { useState } from 'react';", '')
        .replace("import { Button } from 'react-toolbox/button';", '')
        .replace('export default function ProfileDialog', 'function ProfileDialog');
    source = source.replace(
      "'use client';",
      "'use client';\nimport { useState } from 'react';\nimport { Button } from 'react-toolbox/button';",
    );
  }
  return source
    .replaceAll("'react-toolbox/examples/", "'@/components/ui/examples/")
    .replaceAll("'react-toolbox/", "'@/components/ui/material/");
}
