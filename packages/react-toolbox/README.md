# React Toolbox implementation workspace

This **private** workspace maintains the Material Design 1 components and builds the shadcn registry. It also compiles an internal `react-toolbox` dependency for the Next.js docs app. It is not published to npm.

Consumer installation uses the [source registry](../../docs/source-registry.md). The registry copies these exact TypeScript implementations and CSS files, plus small generated entry files that load the styles automatically. It does not substitute shadcn, Radix, or Base UI components.

## Use installed components

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/material/button';
import { Input } from '@/components/ui/material/input';

export default function NameForm() {
  const [name, setName] = useState('');
  return <>
    <Input label="Name" value={name} onChange={setName} />
    <Button primary raised label="Save" onClick={() => console.log(name)} />
  </>;
}
```

Component entries preserve React client boundaries. Server Components can render them with serializable props; event handlers belong in client components. The public entries load local Roboto, Material Icons, and the original styles, including scoped Tailwind Preflight compatibility. SVG and React-node icons also work.

## Styling and customization

The CLI adds Tailwind theme aliases such as `bg-toolbox-primary` and the `toolbox-desktop:` variant. The spacing unit is 4px: `gap-2` is 8px, `p-4` is 16px, and `p-6` is 24px. Component presentation uses Tailwind classes beside the JSX they style. Shared constants and variant helpers cover styles reused by related components; no per-component theme maps are built at runtime. Shared CSS contains the original tokens, scoped Preflight compatibility, and keyframe definitions. Tailwind generates utilities from installed source and only includes referenced keyframes.

Use `className` for the root and the typed `theme` prop for local slot classes. Conflicting base utilities are merged with consumer classes last. State, descendant, and responsive styles keep normal Tailwind specificity; match the variant or use an intentional important utility such as `p-6!` to override all CardText keylines. Use `ThemeProvider` for scoped custom properties that follow components into portals:

```tsx
import { ThemeProvider } from '@/components/ui/material/theme';
import { Button } from '@/components/ui/material/button';

<ThemeProvider variables={{ '--rt-color-primary': '#455a64' }}>
  <Button primary raised label="Save" />
</ThemeProvider>
```

Internal palette variables use `--rt-color-*`, keeping the original M1 palette independent of the host’s semantic colors. For an optional host-color mapping, see the registry guide. Edit the installed CSS or source for deeper changes.

## Compatibility

Public component props remain compatible where practical. Component refs are standard React 19 `ref` props. Controlled and uncontrolled form inputs are supported; rerendering unchanged props does not reset internal state. Dependency-injection factories, `themr`, `innerRef`, global component class maps, and CSS Module import paths are removed. `useRipple`, `Ripple(options)(Component)`, and `Tooltip(Component)` remain available for composition.

## Development

From the monorepo root:

```sh
pnpm build:library
pnpm registry:build
pnpm test:registry
pnpm test:registry:install
```

The registry covers 27 public component families, shared foundations, and `all`. The builder derives family dependencies from imports, preserves source bytes, generates the public UI entries, and emits the snapshot served by the docs app. Keep one implementation tree; do not edit generated files.

The docs app still consumes the internal compiled exports and styles. This keeps its development build efficient without adding a second public installation model. Package-style import examples in internal type tests protect those workspace contracts.

[MIT](LICENSE). Original implementation by Javier Velasco Arjona and the React Toolbox contributors.
