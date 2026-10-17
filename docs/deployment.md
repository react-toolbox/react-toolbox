# Deploying the documentation and registry

The documentation app and source registry deploy together. Keep `apps/docs`, `packages/react-toolbox`, and the root package, lockfile, workspace, and Turbo configuration available during installation and building. The app's private `workspace:*` dependency is built locally; deployment does not require publishing an npm package.

## Vercel setup

Import the repository into Vercel with these settings:

| Setting | Value |
| --- | --- |
| Root Directory | `apps/docs` |
| Include source files outside the Root Directory | Enabled |
| Framework Preset | Next.js |
| Node.js Version | 24.x |
| Environment variable, Production and Preview | `ENABLE_EXPERIMENTAL_COREPACK=1` |
| Output Directory | Next.js default; leave override disabled |

The included [vercel.json](../apps/docs/vercel.json) runs installation and the docs build from the repository root. Corepack selects the exact pnpm version from the root `packageManager` field; do not rely on Vercel's lockfile-based pnpm detection. Turbo generates the registry and API data and builds the private library before Next.js.

The root [.vercelignore](../.vercelignore) excludes local build caches, generated registry data, environment files, and test reports; the remote build regenerates its artifacts from source. Vercel manages the production server; `pnpm docs:start` is only a local preview.

## Public domain

Add `react-toolbox.io` to the project's Domains settings and apply the DNS records Vercel provides. Wait for domain verification and a valid HTTPS certificate before publishing the install command. The production domain and `/r/*` endpoints must be publicly accessible without Vercel Authentication, password protection, or an interactive challenge, since the shadcn CLI fetches JSON directly. Preview protection can remain enabled.

The installation guide and component-page commands always use `https://react-toolbox.io`, taken from the registry catalog's `homepage`. They stay the same in local and preview builds. To test unreleased source, explicitly substitute the preview URL in a CLI command.

After deployment, submit `@react-toolbox` to the [shadcn registry directory](https://ui.shadcn.com/docs/registry/namespace). Until registration is complete, consumers can install by URL or configure the namespace in `components.json`, as described in the [source registry guide](source-registry.md#namespace-shortcut). This repository does not deploy or register the namespace automatically.

## Verify a deployment

Run these commands from the repository root:

```sh
pnpm --filter react-toolbox verify:deployment https://react-toolbox.io
REGISTRY_TEST_ORIGIN=https://react-toolbox.io pnpm test:registry:install
```

The deployment check validates HTTPS, documentation pages, and every registry item's exact source and dependency URLs. The consumer check uses the actual shadcn CLI, follows component dependencies, builds clean Next.js and Vite apps, and verifies rendering, interaction, coexistence with shadcn, and customized-source updates. Install Chromium using the [root verification instructions](../README.md#verify) before running the consumer check; it requires network access.

A local build alone does not verify production DNS, TLS, or access protection. Substitute the project's public `vercel.app` origin in both checks to validate a deployment before connecting the custom domain.

## Registry delivery and releases

The app serves `/r/registry.json` and `/r/<name>.json` from a generated snapshot bundled into the server. Registry dependency links use the request origin, including local previews. Serving registry payloads needs no separate service or runtime filesystem reads.

The live registry follows the deployed source. For tagged snapshots, version provenance, and rollback, follow the [source release guide](releases.md).

Vercel references: [Turborepo deployment](https://vercel.com/docs/monorepos/turborepo), [Corepack setup](https://vercel.com/docs/builds/configure-a-build#corepack), and [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
