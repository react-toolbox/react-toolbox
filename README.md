# React Toolbox

The original Material Design 1 components for modern React, TypeScript, and Tailwind CSS. Install editable source through the **shadcn registry**, following the same distribution model as Magic UI. Our component implementations, palette, geometry, and motion remain React Toolbox’s own.

## Install

Start with a React 19, TypeScript, Tailwind CSS 4 application. Initialize shadcn once:

```sh
pnpm dlx shadcn@latest init
```

Then add a component:

```sh
pnpm dlx shadcn@latest add https://react-toolbox.io/r/button.json
```

```tsx
import { Button } from '@/components/ui/material/button';

export function Save() {
  return <Button primary raised label="Save" />;
}
```

The CLI copies the source, installs dependencies, and adds Tailwind tokens. Public entries load component styles and local fonts automatically. No `react-toolbox` npm dependency or separate stylesheet setup is needed. Use your configured UI alias if it differs from `@/components/ui`.

Replace `button` with any of the 27 component family names, or `all`. The [installation guide](docs/source-registry.md) covers the `@react-toolbox` shortcut, customization, and updates. Public instructions always use `https://react-toolbox.io`, including in local and preview builds. The public domain must serve the deployed docs app before these commands work; namespace registration is a separate step.

## Workspace

```text
apps/docs/                 Next.js landing, documentation, component previews, and /r/*.json
packages/react-toolbox/     Private implementation workspace used by the docs app
  src/material/            Maintained source, matching the installed material/ tree
    <family>/              Components, types, and automatic-style entry
    foundations/           Shared styles, theme, motion, portals, and date/time behavior
  scripts/                 Builds, releases, deployment, and consumer installation checks
  tests/                   Component, style, registry, release, browser, and type tests
    fixtures/              Immutable references and their reproduction tools
  registry/                Generated registry payloads and API reference
  registry.json            Generated source catalog
```

All workspace packages are private. The compiled `react-toolbox` workspace dependency is an internal development convenience for the documentation app. **The registry is the only public distribution.** There is no npm publishing workflow. Tagged source releases archive the registry for repeatable installation and rollback.

The documentation application lives in `apps/docs/`. The `docs/` directory contains the maintained design audit and source-registry guide. Original rendering fixtures remain under `packages/react-toolbox/tests/fixtures/` for independent M1 regression checks.

## Develop

Use Node.js 24 LTS (24.15 or newer; see `.nvmrc`) and the pinned pnpm 12.11.2:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. Turbo builds the registry and private library first, then runs the library watcher alongside Next.js. Edits rebuild the package and registry snapshot consumed by the site.

```sh
pnpm build               # registry, private library, then production docs
pnpm docs:start          # http://127.0.0.1:3100
pnpm build:library       # private implementation build
```

`pnpm docs:dev` and `pnpm docs:build` run the docs app and its dependencies. The landing lives at `/`, documentation at `/docs`, installation at `/docs/installation`, and component pages at `/docs/components/<name>`. `/components` redirects to the docs catalog; the unchanged comparison gallery is available at `/playground`. The app also serves `/layout-demo`, `/theme-demo`, `/r/registry.json`, and `/r/<name>.json`.

See the [docs app guide](apps/docs/README.md) for deployment and the [implementation guide](packages/react-toolbox/README.md) for component conventions.

## Verify

```sh
pnpm check
pnpm --filter react-toolbox exec playwright install chromium webkit
pnpm test:browser
TOOLBOX_BROWSER=webkit pnpm test:browser
pnpm test:registry:install
```

`pnpm test` runs the component, style, registry, and release snapshot tests; `pnpm check` also runs lint and type checks. The registry tests check every family’s dependency closure, exact source and CSS contents, schemas, and strict TypeScript. The actual shadcn CLI is also tested in isolated Next.js and Vite apps, with a custom UI alias, existing host components, local source customizations, and no React Toolbox package. Browser checks cover automatic styles, fonts, tokens, hydration, keyboard interaction, and reduced motion. Automated accessibility checks complement the manual verification described in the release guide.

Browser tests start the production site automatically when port 3100 is free. CI builds its own instance. The [M1 audit](docs/material-1-audit.md) records intentional spec corrections. Original CSS and React 16 reference artifacts are never regenerated to approve visual differences; the shared gallery input remains unchanged.

## Release

Deploy the documentation app to Vercel with Root Directory `apps/docs`; follow the [Vercel setup](apps/docs/README.md#vercel-deployment). Its build includes the current registry snapshot, so the website and installable component source ship together. The endpoints contain editable source and dependency metadata; no separate npm release is required.

Follow the [source release guide](docs/releases.md). Review changes, run the checks, and update the private implementation manifest’s version when identifying a release. That version is provenance metadata in registry payloads. `/r/<name>.json` follows the deployed source, as in Magic UI. Consumers review and merge updates to their copied files through the shadcn CLI.

After deploying to the public domain, submit `@react-toolbox` to the [shadcn registry directory](https://ui.shadcn.com/docs/registry/namespace). Until listed, users can install by URL or configure the namespace themselves. This repository does not deploy or register the namespace automatically.

## License

[MIT](LICENSE). Original project and design implementation by Javier Velasco Arjona and the React Toolbox contributors.
