# React Toolbox implementation workspace

This **private** workspace maintains the Material Design 1 components and builds the shadcn registry. It also compiles an internal `react-toolbox` dependency for the Next.js docs app. It is not published to npm.

Consumer installation uses the [source registry](../../docs/source-registry.md). The registry copies these exact TypeScript implementations and CSS files, including maintained entry files that load the styles automatically. Radix provides button composition, avatar loading, and the new Dialog, Drawer, Tabs, DropdownMenu, Dropdown and Tooltip parts. Autocomplete parts use Base UI Combobox; tables use native elements and React context. Existing convenience APIs remain available, and native inputs retain browser form semantics. These behavioral dependencies preserve the Material 1 presentation and are installed only for the families that need them. See the [composition guide](../../docs/material-1-audit.md#composition-implementation--16-october-2026) and [consumer feature matrix](../../docs/material-1-audit.md#consumer-feature-comparison--follow-up) for supported workflows and remaining differences.

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

Use the exported Root/Trigger/Content parts when you need independent nodes, custom wrappers, or control over portals and focus. The eight relevant documentation pages include working composition examples and their actual source. Radix parts support `asChild`; Base UI parts support `render`. Each part accepts its native or primitive props and refs.

## Styling and customization

The CLI adds Tailwind theme aliases such as `bg-toolbox-primary` and the `toolbox-desktop:` variant. The spacing unit is 4px: `gap-2` is 8px, `p-4` is 16px, and `p-6` is 24px. Component presentation uses Tailwind classes beside the JSX they style. Shared constants and variant helpers cover styles reused by related components; no per-component theme maps are built at runtime. Shared CSS contains the original tokens, scoped Preflight compatibility, and keyframe definitions. Tailwind generates utilities from installed source and only includes referenced keyframes.

Set global palette tokens such as `--rt-color-primary` in your stylesheet. Customize composed parts through ordinary `className` utilities, for example `<CardActions className="justify-end">`. Conflicting base utilities are merged with consumer classes last. State, descendant, and responsive styles keep normal Tailwind specificity; match the variant when overriding it. Edit internal JSX in the installed source when a part is not exposed. Existing `classNames` and legacy `theme` slot maps remain compatible, but are not required for customization.

Global colors need no provider. Use `ThemeProvider` only for scoped custom properties that must follow components into portals:

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

Prefer Tailwind's standard utilities and CSS variable shorthand (`h-(--button-height)`). Run `pnpm lint:tailwind` from the monorepo root to check the components and docs; add `--fix` to apply equivalent suggestions. This check also runs in `pnpm check`.

The check uses the installed Tailwind compiler and compares emitted CSS before suggesting a change. It preserves variants (which determine rule order), selectors, specificity, media conditions, and custom property references. Some editor suggestions intentionally remain: replacing an ancestor selector with `in-*` can lower specificity, and replacing a literal font weight with `font-medium` introduces a dependency on the host's font-weight token. M1 geometry and typography must remain stable when installed into another theme. After changing classes, run the style and browser checks to verify cascade and interaction as well.

From the monorepo root:

```sh
pnpm build:library
pnpm registry:build
pnpm test:registry
pnpm test:registry:install
```

The registry covers 27 public component families, shared foundations, and `all`. The builder derives family dependencies from imports, preserves source bytes and public UI entries, and emits the snapshot served by the docs app. Keep one implementation tree in `src/material/`; do not edit generated registry payloads. Each family owns its components and helpers. Shared foundations have separate registry owners so installers receive only required behavioral dependencies.

The docs app still consumes the internal compiled exports and styles. This keeps its development build efficient without adding a second public installation model. Package-style import examples in internal type tests protect those workspace contracts. The obsolete `react-toolbox/lib/*` aliases are removed; internal imports use `react-toolbox` or direct family paths such as `react-toolbox/button`. Component usage documentation lives in the Next.js docs app.

[MIT](LICENSE). Original implementation by Javier Velasco Arjona and the React Toolbox contributors.
