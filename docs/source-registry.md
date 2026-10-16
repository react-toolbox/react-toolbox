# Source registry

React Toolbox has one public installation model: editable source installed with the shadcn CLI, following Magic UI’s distribution model. The existing Material Design implementations remain ours. All workspace packages are private; the compiled workspace dependency is only for local development and the docs app.

## Install

In a React 19, TypeScript, Tailwind CSS 4 application, initialize shadcn once:

```sh
pnpm dlx shadcn@latest init
```

Then add a component from the public documentation site:

```sh
pnpm dlx shadcn@latest add https://react-toolbox.io/r/button.json
```

```tsx
import { Button } from '@/components/ui/material/button';

export function Save() {
  return <Button primary raised label="Save" />;
}
```

The public URL is `https://react-toolbox.io`. It must point to the deployed docs app with valid HTTPS before installation is available. The endpoint is served by the docs app; there is no separate registry service to start. Public installation instructions keep this canonical URL even when viewed on a local or preview deployment.

The CLI installs required dependencies and source files, adds Tailwind tokens to the configured stylesheet, and preserves unrelated host CSS. Public component entries load fonts and component styles automatically. No separate React Toolbox package, provider, or stylesheet import is required.

For Vite, prefer [Tailwind's Vite plugin](https://tailwindcss.com/docs/installation/using-vite). If an existing Vite project uses `@tailwindcss/postcss`, set its `optimize` option to `false` and let Vite minify the final CSS:

```js
export default {
  plugins: { '@tailwindcss/postcss': { optimize: false } },
};
```

With Vite 8 and Tailwind 4.3, the PostCSS production optimizer can lose the original paths of imported font stylesheets before Vite resolves their URLs. This configuration preserves the bundled Roboto and Material Icons assets. Next.js can keep its standard PostCSS configuration.

## Namespace shortcut

Until the namespace is listed in shadcn’s public directory, merge this entry into the application’s existing `components.json`:

```json
{
  "registries": {
    "@react-toolbox": "https://react-toolbox.io/r/{name}.json"
  }
}
```

Then use the same namespaced flow as Magic UI:

```sh
pnpm dlx shadcn@latest add @react-toolbox/button
pnpm dlx shadcn@latest add @react-toolbox/date-picker
pnpm dlx shadcn@latest add @react-toolbox/all
```

Namespace configuration and direct URLs use the same registry, files, and updater. They are two ways to address a single distribution. Registration in the [public directory](https://ui.shadcn.com/docs/registry/namespace) is a separate step after deployment; it is not claimed to be live yet.

## Installed files

Entries use the official [`@ui/` target placeholder](https://ui.shadcn.com/docs/registry/registry-item-json#target), so installation respects `aliases.ui`, including custom directories and import prefixes.

With the default UI alias, a button installation includes:

```text
components/ui/material/
  button/                  Editable Button family; index.ts loads styles
  font-icon/               Required component dependency
  ripple/                  Required interaction dependency
  theme/                   ThemeProvider and its types
  foundations/
    styles/                Design tokens, fonts, keyframes, cn, style slots
    theme/                 Theme scopes and optional shadcn color mapping
    motion/                Reduced-motion behavior
  LICENSE
```

The maintained `src/material/` tree is copied directly into `material/`, avoiding collisions with existing shadcn components. Public imports stay `@/components/ui/material/button`. Each family entry exports named components, types, and a default export where available. `all` adds `material/index.ts`. Extra shared capabilities, such as portals and date/time calculations, are installed only when required by the selected family.

**Migrating an earlier installation:** commit your customized files first. Earlier versions used flat `material/button.tsx` entries beside a `react-toolbox/` implementation tree (or older `toolbox-button` entries). Copy customizations into the new `material/button/` files, then remove the old flat entries; otherwise module resolution can select the old file instead of the new directory. Once every installed family has migrated and imports have been checked, remove the obsolete `react-toolbox/` implementation tree and `toolbox-*` entries. The CLI does not delete or merge previous layouts automatically. Public import paths remain the same when moving from flat Material entries.

React Server Component boundaries stay in the source. Pure utilities, shared style helpers, and `shadcnThemeVariables` remain usable on the server through the adjacent implementation files. Event handlers still belong in a client component.

The shared foundation contains ordered custom-property definitions, local Roboto fonts, Material Icons, scoped Preflight compatibility, keyframe registrations, and the MIT license. Tailwind classes live beside the JSX they style, with small shared constants and variant helpers for related components. Each exported component accepts `className` for Tailwind customization. Existing style-slot props remain compatible. The installed `setup.css` explicitly registers copied source with `@source`, including in hosts that disable automatic detection. Tailwind emits utilities for installed families and only their referenced keyframes; a Button installation no longer includes presentation rules for every component. Source files are copied byte-for-byte; including the maintained entry files.

## Themes and spacing

The registry adds the maintained Tailwind theme aliases and responsive variant through shadcn’s `cssVars` and `css` fields. `bg-toolbox-primary`, `text-toolbox-text`, `shadow-toolbox-2p`, and the other utilities resolve against the nearest Toolbox scope. Standard spacing uses the M1 4px subgrid: `gap-2` is 8px and `p-6` is 24px. The `toolbox-desktop:` variant matches the component keyline breakpoint at 600px width and height.

Keep the host’s ordinary Tailwind import. Component geometry and motion use the classes in the copied components, with shared tokens and keyframes in CSS. They retain the M1 values. Internal colors use `--rt-color-*`, so a host shadcn theme does not silently change the M1 palette.

```tsx
import { Button } from '@/components/ui/material/button';
import { ThemeProvider } from '@/components/ui/material/theme';

<ThemeProvider variables={{ '--rt-color-primary': '#455a64' }}>
  <Button primary raised label="Save" />
</ThemeProvider>
```

For deliberate host-color mapping, import the installed `material/foundations/styles/shadcn.css` from your global stylesheet and use `shadcnThemeVariables` from the `material/foundations/theme/shadcn.ts` with `ThemeProvider`. This optional bridge preserves Material geometry and motion. Pass host colors through `ThemeProvider.variables` if they are scoped below the root and must follow portaled content.

Set global colors in CSS with `:root { --rt-color-primary: #455a64; }`; no provider is needed for global tokens. Use `className` on composed parts such as Card, CardText, and CardActions. Edit the installed JSX for internal nodes that are not exposed. The shared merger resolves conflicting base utilities in favor of the consumer; state and responsive variants follow normal Tailwind precedence. Existing `classNames` and `theme` maps remain supported for compatibility (`classNames` wins when both provide a slot), but new customization should start with CSS variables, composition, and source edits.

## Updates

The installed source belongs to the application. Commit local changes, rerun the relevant `add` command, and review the CLI’s overwrite prompts and the resulting diff. The CLI does not automatically merge local customizations. There is no `react-toolbox` npm version to upgrade.

`/r/<name>.json` follows the currently deployed source. Each item records the implementation version and a SHA-256 source digest for provenance. Tagged source releases archive exact payloads with dependencies pinned to the same release. See the [release and rollback guide](releases.md); keep customized installed files in version control.

## Available items

| Item | Public component family |
| --- | --- |
| `app-bar` | AppBar |
| `autocomplete` | Autocomplete |
| `avatar` | Avatar |
| `button` | Button, IconButton, BrowseButton |
| `card` | Card and its content/action helpers |
| `checkbox` | Checkbox |
| `chip` | Chip |
| `date-picker` | DatePicker |
| `dialog` | Dialog |
| `drawer` | Drawer |
| `dropdown` | Dropdown |
| `font-icon` | FontIcon |
| `input` | Input |
| `layout` | Layout, NavDrawer, Panel, Sidebar |
| `list` | List and its item helpers |
| `menu` | Menu, MenuItem, MenuDivider, IconMenu |
| `overlay` | Overlay |
| `progress-bar` | ProgressBar |
| `radio` | RadioButton, RadioGroup |
| `ripple` | Ripple behavior and compatibility decorator |
| `slider` | Slider |
| `snackbar` | Snackbar |
| `switch` | Switch |
| `table` | Table and its row/cell helpers |
| `tabs` | Tabs, Tab, TabContent |
| `time-picker` | TimePicker |
| `tooltip` | Tooltip, useTooltip |
| `foundation` | Shared theme, styles, fonts, license |
| `foundation-motion` | Reduced-motion preference and visibility lifecycle |
| `foundation-portal` | Portal placement and merged refs |
| `foundation-date-time` | Shared calendar and locale calculations |
| `foundation-collections` | Shared numeric range helper |
| `foundation-forms` | Native form reset and checked-state synchronization |
| `all` | Every family and the complete public barrel |


Link and Navigation are retired from the public registry. Use Next.js Link, another router’s link, or a native anchor, composed inside `nav` or a Toolbox List. M1 defines navigation behavior and styling, not a required routing wrapper. Their old implementations remain in the private workspace solely for the historical comparison gallery; neither is included in the copied public TypeScript source or `material/index.ts`.

Family dependencies come from parsed TypeScript imports and exports, including type-only imports. A date picker installs its dialog, button, input, overlay, font-icon, and ripple dependencies. Shared implementation files have one registry owner.

Behavioral npm dependencies are also derived from imports. Button and the convenience Menu use Radix Slot; Avatar uses Radix Avatar. Compound Dialog/Drawer, Tabs, DropdownMenu, Dropdown and Tooltip parts install their respective Radix primitives, and Autocomplete parts install Base UI Combobox. Existing implementations may also need roving focus or `aria-hidden`. Other families do not acquire these dependencies unless they compose those components. The installed source keeps its M1 styling and existing public APIs; it can coexist with ordinary shadcn components.

Each family also registers the keyframes referenced by its TypeScript import graph through registry `css` metadata. This keeps animations available when the host compiles imported setup CSS and its Tailwind utility sheet separately, as Next.js does. The definitions are derived from the maintained CSS; a minimal Button installation still excludes unrelated checkbox and progress animations.

## Maintainer workflow

```sh
pnpm install --frozen-lockfile
pnpm docs:dev
```

The normal docs build generates registry payloads before building the application. `/r/registry.json` serves the catalog and `/r/<name>.json` serves items. Dependency URLs follow the request origin, so previews and deployments install from their own registry. Unknown item names return 404. The app bundles a generated snapshot and does not read implementation files at runtime.

To test unreleased source, explicitly use the local or preview deployment URL. For example, after `pnpm docs:build` and `pnpm docs:start`:

```sh
pnpm dlx shadcn@latest add http://127.0.0.1:3100/r/button.json
```

For Vercel deployment settings and public-domain checks, see the [docs app deployment guide](../apps/docs/README.md#vercel-deployment).

The private implementation package keeps its internal build for the docs app. Its version is registry provenance metadata; npm publishing and Changesets are not part of the release workflow. Deploy the docs app to ship the website and registry together.

For local inspection, use the docs app's `/r/registry.json` and `/r/<name>.json` routes. To generate the same registry for static hosting:

```sh
REGISTRY_ORIGIN=https://your-domain.example/toolbox pnpm registry:build
```

Static output is `packages/react-toolbox/registry/public`, containing `registry.json`, `r/registry.json`, and `r/<name>.json`. Static dependency URLs use the configured origin, including an optional subpath. This is the same source registry, not a separate installation format.

`registry.json` is a generated source catalog; its file paths are relative to `packages/react-toolbox`. The bundled snapshot, generated API reference, and public payloads are ignored by Git. Public entry files are maintained alongside their components. Run `pnpm registry:build` before inspecting or consuming the catalog directly. Never hand-edit generated files.

## Verification

```sh
pnpm test
pnpm test:registry:install
```

Checks validate the official shadcn schemas, exact source and CSS contents, provenance, client boundaries, every family’s isolated dependency closure, strict TypeScript, and standalone CSS/font bundles, including an AppBar production build in Vite.

The installer test runs the actual pinned shadcn CLI in a clean pnpm application. It installs a date picker by URL, then all families through the namespace with a non-default UI alias. It verifies exact source files, dependency installation without `react-toolbox`, idempotent theme injection, retained host CSS, strict types, and a production Next.js build. Chromium checks hydration, clicks, original button geometry and palette, and Tailwind spacing/color utilities without manual Toolbox stylesheet imports.

Set `REGISTRY_TEST_ORIGIN=http://127.0.0.1:3100` to run the same installer test against the actual docs endpoint. Otherwise it uses a temporary local HTTP fixture. It needs network access and the Chromium browser installed by the command in the root README. Temporary consumers are removed unless `KEEP_REGISTRY_SMOKE=1` is set.

Upstream references: [Magic UI installation](https://magicui.design/docs/installation), [registry items](https://ui.shadcn.com/docs/registry/registry-item-json), and [namespaces](https://ui.shadcn.com/docs/registry/namespace).
