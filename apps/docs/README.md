# React Toolbox documentation app

The Next.js App Router site serves documentation, interactive examples, and the source registry. This private `@react-toolbox/docs` workspace consumes the compiled `react-toolbox` workspace dependency. Consumer instructions use [installed registry source](../../docs/source-registry.md).

## Develop

Use the [root setup](../../CONTRIBUTING.md#develop). Run these commands from the repository root:

```sh
pnpm docs:dev             # Build dependencies, then watch the library and site
pnpm docs:build           # Build the library, registry, API data, and production site
pnpm docs:start           # Serve the production build
```

Development uses http://127.0.0.1:3000; production preview uses http://127.0.0.1:3100. Use these root commands so the generated registry and API data are available before Next.js starts.

## Routes and source

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/docs` | Introduction, installation, and theming |
| `/docs/components/<name>` | Component preview, copyable source, and API reference |
| `/playground` | Component integration gallery |
| `/theme-demo` | Scoped-theme example |
| `/r/registry.json`, `/r/<name>.json` | Registry catalog and installable source |

Demo routes use `noindex` metadata.

- [app/docs/catalog.tsx](app/docs/catalog.tsx) defines component pages and introductory examples; [app/docs/examples/](app/docs/examples/) contains runnable compositions.
- [app/docs/api-reference.tsx](app/docs/api-reference.tsx) selects useful props from the generated API data. Types and defaults come from the maintained component source.
- [app/globals.css](app/globals.css) contains site styling and the optional 4px spacing scale. Component entries load their styles automatically; the site adds the shadcn theme bridge.
- [app/fonts.ts](app/fonts.ts) loads bundled fonts through `next/font/local`; [app/site-metadata.ts](app/site-metadata.ts) defines canonical URLs and shared metadata.

## Verify

```sh
pnpm --filter @react-toolbox/docs lint
pnpm --filter @react-toolbox/docs typecheck
pnpm --filter @react-toolbox/docs test:browser
```

Build dependencies with `pnpm build:library` before type checking a fresh checkout. Browser tests build the production site automatically when port 3100 is free. The [root verification commands](../../CONTRIBUTING.md#verify) install browsers and run both website and component suites. Reports and failure artifacts are written at the repository root.

## Deploy

Follow the [deployment guide](../../docs/deployment.md) for Vercel settings, public-domain setup, and registry verification. The site and its bundled registry ship together. Public install commands always use `https://react-toolbox.io`; use an explicit preview URL when testing unreleased source.
