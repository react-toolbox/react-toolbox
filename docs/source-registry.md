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
components/ui/
  material/
    button.tsx              Public entry: exports the family and loads styles
    font-icon.tsx           Required dependency entry
    ripple.tsx              Required dependency entry
    theme.tsx               ThemeProvider and its types
  react-toolbox/            Editable implementation, helpers, CSS, and license
```

The `material/` directory avoids collisions with existing shadcn components without prefixing every filename. Each entry exports the named exports, types, and default export where available. `all` adds `material/index.tsx`, which re-exports the public collection. Standard imports use these entries so styles load automatically.

Earlier installations used `toolbox-button`, `toolbox-theme`, and similar entry names. Rerun the relevant add command, change imports to `material/button`, `material/theme`, etc., and remove old entry files after updating their consumers. The CLI does not delete files from earlier installations or migrate imports automatically. The internal `react-toolbox/` directory stays in place. After updating all installed components, obsolete internal `<family>/theme.ts` class-map files can also be removed; the public `material/theme.tsx` provider entry is still used for scoped color tokens.

React Server Component boundaries stay in the source. Pure utilities, shared style helpers, and `shadcnThemeVariables` remain usable on the server through the adjacent implementation files. Event handlers still belong in a client component.

The shared foundation contains ordered custom-property definitions, local Roboto fonts, Material Icons, scoped Preflight compatibility, keyframe registrations, and the MIT license. Tailwind classes live beside the JSX they style, with small shared constants and variant helpers for related components. Optional `theme` props add classes to individual parts; they do not construct runtime style maps. The installed `setup.css` explicitly registers copied source with `@source`, including in hosts that disable automatic detection. Tailwind emits utilities for installed families and only their referenced keyframes; a Button installation no longer includes presentation rules for every component. Source files are copied byte-for-byte; entry files are generated from their exports.

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

For deliberate host-color mapping, import the installed `react-toolbox/shadcn.css` from your global stylesheet and use `shadcnThemeVariables` from the adjacent `react-toolbox/shadcn.ts` with `ThemeProvider`. This optional bridge preserves Material geometry and motion. Pass host colors through `ThemeProvider.variables` if they are scoped below the root and must follow portaled content.

Use `className` for root utilities and `theme={{ slot: "..." }}` for internal slots. The shared merger resolves conflicting base utilities in favor of the consumer. State and responsive variants still follow normal Tailwind precedence. To override every CardText inset, including its sibling and desktop rules, use `className="p-6!"`; for palette changes across states, prefer the scoped color tokens.

## Updates

The installed source belongs to the application. Commit local changes, rerun the relevant `add` command, and review the CLI’s overwrite prompts and the resulting diff. The CLI does not automatically merge local customizations. There is no `react-toolbox` npm version to upgrade.

`/r/<name>.json` follows the currently deployed source. Each item records the implementation version and a SHA-256 source digest for provenance. Consumers who need to retain a specific source revision should keep their installed files in version control.

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
| `foundation` | Shared theme, portal, hooks, utilities, styles, fonts, license |
| `all` | Every family and the complete public barrel |


Link and Navigation are retired from the public registry. Use Next.js Link, another router’s link, or a native anchor, composed inside `nav` or a Toolbox List. M1 defines navigation behavior and styling, not a required routing wrapper. Their old implementations remain in the private workspace solely for the historical comparison gallery; neither is included in the copied public TypeScript source or `material/index.tsx`.

Family dependencies come from parsed TypeScript imports and exports, including type-only imports. A date picker installs its dialog, button, input, overlay, font-icon, and ripple dependencies. Shared implementation files have one registry owner.

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

For standalone inspection or static hosting of the same registry:

```sh
pnpm registry:serve
REGISTRY_ORIGIN=https://your-domain.example/toolbox pnpm registry:build
```

The inspection server uses port 4173. Static output is `packages/react-toolbox/registry/public`, containing `registry.json`, `r/registry.json`, and `r/<name>.json`. Static dependency URLs use the configured origin, including an optional subpath. This is the same source registry, not a separate installation format.

`registry.json` is a generated source catalog; its file paths are relative to `packages/react-toolbox`. Generated entry files, the bundled snapshot, and public payloads are ignored by Git. Run `pnpm registry:build` before inspecting or consuming the catalog directly. Never hand-edit generated files.

## Verification

```sh
pnpm registry:build
pnpm test:registry
pnpm test:registry:install
```

Checks validate the official shadcn schemas, exact source and CSS contents, provenance, client boundaries, every family’s isolated dependency closure, strict TypeScript, and standalone CSS/font bundles.

The installer test runs the actual pinned shadcn CLI in a clean pnpm application. It installs a date picker by URL, then all families through the namespace with a non-default UI alias. It verifies exact source files, dependency installation without `react-toolbox`, idempotent theme injection, retained host CSS, strict types, and a production Next.js build. Chromium checks hydration, clicks, original button geometry and palette, and Tailwind spacing/color utilities without manual Toolbox stylesheet imports.

Set `REGISTRY_TEST_ORIGIN=http://127.0.0.1:3100` to run the same installer test against the actual docs endpoint. Otherwise it uses a temporary local HTTP fixture. It needs network access and the Chromium browser installed by the command in the root README. Temporary consumers are removed unless `KEEP_REGISTRY_SMOKE=1` is set.

Upstream references: [Magic UI installation](https://magicui.design/docs/installation), [registry items](https://ui.shadcn.com/docs/registry/registry-item-json), and [namespaces](https://ui.shadcn.com/docs/registry/namespace).
