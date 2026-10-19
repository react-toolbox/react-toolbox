# Contributing to React Toolbox

Both workspaces are private. The docs app consumes the compiled library; public consumers install source from the registry served by the docs app. The public domain must serve the deployed docs app before URL installation is available.

## Develop

Use Node.js 24 LTS, version 24.15 or newer, and the pnpm version pinned in `package.json`. Run commands from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:3000. Development builds the library and registry first, then watches component and documentation changes.

```sh
pnpm build               # Library, registry, and production documentation
pnpm docs:start          # Serve the production site at http://127.0.0.1:3100
pnpm build:library       # Library and generated registry/API data
```

```text
apps/docs/                 Documentation site, component examples, and registry routes
packages/react-toolbox/
  src/material/            Component families and shared foundations
  src/examples/            Installable application examples
  scripts/                 Build, registry, release, and consumer checks
  tests/                   Component, browser, registry, and type coverage
  registry/                Generated registry payloads and API reference
docs/                      Maintainer guides; historical audits in archive/
```

See the [docs app guide](apps/docs/README.md) for routes and maintenance.

## Verify

```sh
pnpm check
pnpm --filter react-toolbox exec playwright install chromium webkit
pnpm test:browser
TOOLBOX_BROWSER=webkit pnpm test:browser
pnpm test:registry:install
```

`pnpm check` runs lint, types, component/registry/release tests, and [footprint budgets](docs/footprint.md). Browser tests cover the website and components, starting a production site when port 3100 is free. The installation check requires network access and tests the actual shadcn CLI in clean Next.js and Vite consumers. See [accessibility guidance](docs/accessibility.md) for manual release checks.

## Guides

- [Installation, theming, and updates](docs/source-registry.md)
- [Calendars and scheduling](docs/calendar-and-scheduling.md)
- [Deployment](docs/deployment.md) and [source releases](docs/releases.md)
- [Historical Material 1 audit](docs/archive/material-1-audit.md) and [component review](docs/archive/component-review.md)
