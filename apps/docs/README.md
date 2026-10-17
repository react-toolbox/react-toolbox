# React Toolbox documentation app

A Next.js App Router documentation site using React 19, Next.js 16, and Tailwind CSS 4. The landing page at `/` is a single hero with a live component composition. A shared header links to `/docs`, where a persistent sidebar groups introduction, installation, theming, and all 27 component families. Component pages at `/docs/components/<name>` include an interactive preview, a keyboard-accessible Code tab, copyable install commands, and usage notes. `/components` redirects to the docs catalog. The component gallery at `/playground` demonstrates the default palette and motion. `/layout-demo` demonstrates Layout, Panel, NavDrawer, and Sidebar; `/theme-demo` shows scoped CSS variables and inheritance through portals.

This private workspace package is named `@react-toolbox/docs`. It consumes the compiled exports of the private `react-toolbox` workspace dependency for development. Public consumers install editable source through the shadcn registry instead. It has no aliases to library source and does not use `transpilePackages`.

Use Node.js 24.15 or newer. Unless stated otherwise, run every command below from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:3000. The root development command runs the app and the private library/registry watcher together, so component changes rebuild the package used by the app.

`pnpm docs:dev` starts the documentation app and its library watcher. Use `pnpm docs:build` and `pnpm docs:start` for the production documentation site.

Library builds preserve existing `dist` files, like the watcher does, so running a production build does not remove exports used by the live development server.

To run only the app after building its dependency:

```sh
pnpm --filter react-toolbox build
pnpm --filter @react-toolbox/docs dev
```

To build and serve the production app, including its private library and registry dependencies:

```sh
pnpm exec turbo run build --filter=@react-toolbox/docs
pnpm --filter @react-toolbox/docs start
```

The production server uses http://127.0.0.1:3100.

Run this package's checks with `pnpm --filter @react-toolbox/docs typecheck` and `pnpm --filter @react-toolbox/docs lint`. Browser tests belong to the workspace and run from the repository root.

The landing page is a TypeScript Server Component with a small interactive client demo. It uses the original Toolbox and GitHub marks, credits Javi Velasco, and reads the public GitHub star count on the server with hourly revalidation. If GitHub is unavailable or rate limited, the repository link remains visible without inventing a count. No token or browser request to GitHub is needed.

The landing and documentation pages include canonical URLs, page-specific descriptions, Open Graph metadata, and large-image Twitter cards. Public URLs use the registry catalog's `homepage`, including in local and preview builds. The two 1200 × 630 social cards at `/opengraph-image` and `/docs/opengraph-image` are generated at build time from the existing Toolbox mark and bundled Roboto fonts; Twitter shares the same images. Site icons use the same mark. `/robots.txt` points to `/sitemap.xml`, which lists the landing page, documentation guides, and current component pages, excluding redirects and demo routes.

The homepage identifies the site with `WebSite` structured data. Documentation pages share visible breadcrumbs and matching `BreadcrumbList` structured data, with all URLs pointing to the canonical domain. The standalone `/playground`, `/layout-demo`, and `/theme-demo` pages use `noindex` metadata; they remain crawlable so search engines can read that directive.

The docs app explicitly sets `@theme { --spacing: 4px; }` in `app/globals.css` for its Material page layouts: `gap-2` is 8px, `p-4` is 16px, and `p-6` is 24px. The library preserves each consuming app's own spacing scale. The landing card keeps the built-in title and content padding; the action labels align to those same responsive keylines, and the switch has a 48px interaction row. The `toolbox-desktop:` variant matches the library's 600px width and height breakpoint.

The gallery remains JavaScript and serves as an interactive example for component integration checks. The app's type check validates the landing components, generated Next route contracts, and internal workspace import examples in `apps/docs/tests/types/package-contract.ts`; the library has its own strict TypeScript checks.

## Vercel deployment

Keep the workspace available during installation and building: `apps/docs`, `packages/react-toolbox`, and the root package, lockfile, workspace, and Turbo configuration. The app's `workspace:*` dependency is built locally; deploying it does not require publishing the library to npm.

Import the repository into Vercel with these settings:

| Setting | Value |
| --- | --- |
| Root Directory | `apps/docs` |
| Include source files outside the Root Directory | Enabled |
| Framework Preset | Next.js |
| Node.js Version | 24.x |
| Environment variable, Production and Preview | `ENABLE_EXPERIMENTAL_COREPACK=1` |
| Output Directory | Next.js default; leave override disabled |

The included [`vercel.json`](vercel.json) runs installation and the docs build from the repository root. Corepack selects the exact pnpm version from the root `packageManager` field; do not rely on Vercel's lockfile-based pnpm detection. Turbo builds the registry and private library before Next.js. The root `.vercelignore` excludes local build caches, generated registry data, environment files, and test reports; the remote build regenerates its artifacts from source. Vercel manages the production server; `pnpm docs:start` is only a local preview.

Add `react-toolbox.io` to the project's Domains settings and apply the DNS records Vercel provides. Wait for domain verification and a valid HTTPS certificate before publishing the install command. The production domain and `/r/*` endpoints must be publicly accessible without Vercel Authentication, password protection, or an interactive challenge, since the shadcn CLI fetches JSON directly. Preview protection can remain enabled.

After deployment, verify the public registry and run the existing clean-consumer installation check against it:

```sh
pnpm --filter react-toolbox verify:deployment https://react-toolbox.io
REGISTRY_TEST_ORIGIN=https://react-toolbox.io pnpm test:registry:install
```

The deployment check validates HTTPS, documentation pages, and every registry item's exact source and dependency URLs. The consumer check uses the actual shadcn CLI, follows component dependencies, builds clean Next.js and Vite apps, and verifies rendering, interaction, coexistence with shadcn, and customized-source updates. A local build alone does not verify production DNS, TLS, or access protection. Substitute the project's public `vercel.app` origin in both checks to validate a deployment before connecting the custom domain.

The deployment also serves the source registry at `/r/registry.json` and `/r/<name>.json`. A snapshot generated during the private library build is bundled into the server. Dependency links use the request origin, including local previews. There is no separate service, package publish, or runtime filesystem read.

The installation guide at `/docs/installation` and component-page commands always use `https://react-toolbox.io`, taken from the registry catalog's `homepage`. They are rendered on the server and stay the same in local and preview builds. To test unreleased source, explicitly substitute the preview URL in a CLI command. The `@react-toolbox` shortcut requires a registry entry in the consuming app’s `components.json` until public directory registration is complete.

Vercel references: [Turborepo deployment](https://vercel.com/docs/monorepos/turborepo), [Corepack setup](https://vercel.com/docs/builds/configure-a-build#corepack), and [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

## Internal preview integration

These imports are private workspace plumbing; consumer instructions live in the [registry guide](../../docs/source-registry.md). Import the component stylesheet once in the server layout, and put interactive components in a client component:

```jsx
// apps/docs/app/layout.jsx
import 'react-toolbox/styles.css';

export default function Layout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
```

```jsx
// apps/docs/app/example.jsx
'use client';

import { useState } from 'react';
import { Button, Input } from 'react-toolbox';

export default function Example() {
  const [name, setName] = useState('');
  return (
    <>
      <Input label="Your name" value={name} onChange={setName} />
      <Button label="Save" raised primary onClick={() => { /* save */ }} />
    </>
  );
}
```

This internal app’s `apps/docs/app/globals.css` imports standard Tailwind, including Preflight, followed by `react-toolbox/tailwind.css`. The library's scoped compatibility rules preserve the original component appearance. Utility classes style the gallery around the components; the component colors, dimensions, shadows, and animation curves come from the library.

Roboto and Material Icons are bundled locally through `@fontsource/roboto` and `material-icons`. Import the icon stylesheet into Tailwind's `base` layer, as this example does, so its default font size and line height do not override the component styles. No Google Fonts request, CDN, or remote image is needed. Dates are initialized with fixed local values so server and browser output agree.

## Browser checks

```sh
pnpm --filter react-toolbox exec playwright install chromium
pnpm test:browser
```

Playwright builds and starts the production example automatically. The suite covers form interactions, toggles, menus, tooltips, ripples, dialogs, drawers, date/time pickers, tables, layouts, and mobile width. Browser errors fail the interaction tests.

The root `playwright.config.js` runs website checks from `apps/docs/tests/browser` and component integration checks from `packages/react-toolbox/tests/browser`. Run `pnpm --filter @react-toolbox/docs test:browser` for only the website suite. Reports and failure artifacts are written at the repository root.

Chromium runs by default. Run the same complete suite in WebKit with:

```sh
pnpm --filter react-toolbox exec playwright install webkit
TOOLBOX_BROWSER=webkit pnpm test:browser
```

Browser checks measure Material 1 geometry, colors, typography, hit areas, and motion directly on the current components. The suites also exercise keyboard and pointer interactions, responsive layouts, themes, Tailwind integration, hydration, and automated accessibility. See [the M1 audit](../../docs/material-1-audit.md) for design evidence and [accessibility guidance](../../docs/accessibility.md) for manual release checks.

The completed migration used independent original-CSS and React 16 comparisons. Those fixtures, correction ledgers, comparison tests, and rebuild tools have been retired; their provenance and past results remain available in Git history. The gallery no longer needs to remain byte-identical to a historical runtime fixture.
