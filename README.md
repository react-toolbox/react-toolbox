# React Toolbox

The original Material Design 1 components for modern React, TypeScript, and Tailwind CSS. Install editable source through the **shadcn registry**, then customize it in your application.

## Install

Start with React 19, TypeScript, and Tailwind CSS 4. Initialize shadcn once, then add a component:

```sh
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add https://react-toolbox.io/r/button.json
```

```tsx
import { Button } from '@/components/ui/material/button';

export function Save() {
  return <Button primary raised label="Save" />;
}
```

The CLI copies source, installs dependencies, and adds Tailwind tokens. Component entries load styles and local fonts automatically. Use your configured UI alias if it differs from `@/components/ui`.

Replace `button` with another family name, or `all`. The [source registry guide](docs/source-registry.md) covers available items, framework setup, customization, migration, and updates. The public domain must serve the deployed docs app before URL installation is available.

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

Both workspaces are private. The docs app consumes the compiled library; public consumers install source from the registry. See the [docs app guide](apps/docs/README.md) for routes and maintenance.

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

## License

[MIT](LICENSE). Original project and design implementation by Javier Velasco Arjona and the React Toolbox contributors.
