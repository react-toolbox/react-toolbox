# React Toolbox

React Toolbox's original Material Design components, modernized for React 19.3, Next.js 16.4, and Tailwind CSS 4.3. The library is written in strict TypeScript with function components and hooks. The original palette, motion, and practical component props remain the foundation, with documented corrections against Google's Material Design 1 specification.

This is the `3.0.0-next.0` development version. It follows Material Design 1. See the [M1 audit](docs/material-1-audit.md) for corrected dimensions, states, keyboard behavior, sources, and remaining limitations. It does not adopt Material 2 or Material 3.

## Run the example

Use Node.js 24.15 or newer in the 24.x line (see `.nvmrc`), then:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The Next.js App Router gallery exercises the component families with local Roboto and Material Icons fonts, including dialogs, pickers, dropdowns, ripples, tables, and a separate `/layout-demo` page. The example uses the built package itself; after editing library TypeScript, run `npm run build` to refresh it. Next.js reloads example changes automatically.

```sh
npm run example:build
npm run example:start
```

The production example runs on port 3100.

## Use the library

Import the stylesheet once in your application root. The library ships compiled ES modules with React client boundaries, TypeScript declarations, and plain CSS. Consumers do not need CSS Modules, a custom PostCSS pipeline, or Tailwind to render the original design.

```jsx
// app/layout.jsx
import 'react-toolbox/styles.css';

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
```

```jsx
// app/page.jsx
'use client';
import { useState } from 'react';
import { Button, Input } from 'react-toolbox';

export default function Page() {
  const [name, setName] = useState('');
  return (
    <>
      <Input label="Name" value={name} onChange={setName} />
      <Button primary raised label="Save" onClick={() => console.log(name)} />
    </>
  );
}
```

Component imports such as `react-toolbox/button` and the original `react-toolbox/lib/button` are also supported. Existing callbacks retain their value-first signatures. Controlled components synchronize when a prop value changes; rerendering with every prop unchanged no longer forces an internal state reset. Interactive event handlers belong in client components when using Next.js.

Load Roboto and Material Icons in your application if you use the original typography and string icons. The example uses `@fontsource/roboto` and `material-icons` without remote font requests; SVG/React-node icons still work. Import the icon stylesheet with `@import 'material-icons/iconfont/material-icons.css' layer(base);` so the icon defaults respect the component styles.

## Tailwind CSS

Tailwind utilities can customize the surrounding layout, root classes, and individual theme slots. Original component rules live in the `components` cascade layer, below `utilities`. Keep Tailwind Preflight disabled for the original visual baseline: its element resets change the old component styling.

With `@tailwindcss/postcss`, import:

```css
@layer theme, base, components, utilities;
@import 'tailwindcss/theme.css' layer(theme);
@import 'react-toolbox/tailwind.css';
@import 'tailwindcss/utilities.css' layer(utilities);
```

The Tailwind entry includes `styles.css`. The optional token bridge exposes utilities such as `bg-toolbox-primary`, `text-toolbox-accent`, and `ease-toolbox` using the original design tokens. Put utility names in source files scanned by Tailwind.

Exact component geometry and animations remain explicit CSS. This avoids rounding the original values to a utility framework's defaults and preserves complex selectors and keyframes. There are no runtime CSS Modules or generated class-name hashes.

## Themes and customization

`ThemeProvider` scopes CSS custom properties and carries them through portals. Components import their own styles and dependencies directly; no component injection or styling wrapper is involved.

```jsx
import { Button, ThemeProvider } from 'react-toolbox';

<ThemeProvider
  variables={{ '--color-primary': '#00695c', '--color-accent': '#ff6d00' }}
>
  <Button primary raised label="Save" theme={{ button: 'tracking-wide' }} />
</ThemeProvider>
```

`variables` accepts CSS custom properties and creates a scoped wrapper. Only tokens affected by an explicit override recalculate inside that scope; unrelated global colors, fonts, sizing, and component overrides keep inheriting. Scoped variables follow dialogs, drawers, and tooltips into their portals. Nested providers inherit parent variables. A provider with no variables, class, or style adds no DOM wrapper.

Use `className` for the root element and the typed component `theme` prop for local slot classes. These classes append to the structural defaults, so Tailwind utilities can override them without replacing the component stylesheet. Global changes belong in CSS variables, not identifier-indexed class maps. See `components/variables.css`, `components/colors.css`, and component `config.css` files for the original tokens.

## TypeScript and refs

Public props and handles are exported alongside each component. Use React's standard `ref` prop; inputs retain their useful imperative methods through `InputHandle`:

```tsx
import { useRef } from 'react';
import { Input, type InputHandle } from 'react-toolbox';

function NameField() {
  const input = useRef<InputHandle>(null);
  return <Input ref={input} label="Name" />;
}

```

`innerRef`, `themeNamespace`, `composeTheme`, `mapThemrProps`, named `ThemeProvider` class maps, injection identifiers, and the old global component-type checker have been removed. Replace them with `ref`, local class slots, or scoped CSS variables. Deep component imports now resolve to the same styled component as the package barrel. `useRipple` is available for custom components; the small `Ripple(options)(Component)` and `Tooltip(Component)` application helpers remain available without dependency injection.

## Verification

```sh
npm run check                 # build, public TypeScript API, React tests, style parity
npm run example:build         # production Next.js build and prerender
npx playwright install chromium
npm run test:browser           # interaction, hydration, responsive, visual parity
```

Run the suite in WebKit, plus focused checks for token inheritance and gradient rendering in both engines:

```sh
npx playwright install chromium webkit
TOOLBOX_BROWSER=webkit npm run test:browser
node scripts/verify-theme-scopes.mjs chromium webkit
node scripts/verify-gradient-paint.mjs chromium webkit
```

The migration keeps all 55 original CSS sources under `tests/fixtures/legacy-styles`. `reference.css` was compiled independently using the original PostCSS pipeline. `npm run test:styles` compares modern defaults and all 334 style slots against that immutable reference plus individually reviewed corrections in `tests/fixtures/m1-style-corrections.json`. Each correction records its old/new value, M1 source, rationale, and cascade position for new selectors. Any unreviewed drift fails.

Browser comparisons apply those explicit corrections to the archived CSS without copying current styles into the reference. Circular progress still matches the untouched original at 11 animation times. Focused M1 tests cover geometry, colors, state changes, responsive layouts, and interaction. An independent React 16 fixture uses all 113 original component source files unchanged, with narrowly documented test adapters for corrected semantics; see `tests/fixtures/legacy-runtime.md`.

`node scripts/migrate-styles.mjs --output=/private/tmp/react-toolbox-historical-css` reproduces the historical translation in a scratch directory. It cannot overwrite maintained component sources, which now include M1 corrections. Reference regeneration is documented in `tests/fixtures/legacy-styles/README.md` and uses isolated legacy dependencies, never the modern application dependency graph.

Tests verify the covered states, not every browser, font rasterizer, or combination of props. Preserve the reference artifacts when making future changes; do not approve differences by replacing the baseline with the new output.

## Migration details

- React 19.3 and modern context replace the React 15/16 and `react-css-themr` requirements.
- Explicit refs and `createPortal` replace removed React DOM APIs. Calendar and clock transitions retain their original timing with explicit transition refs.
- Function components and hooks replace class lifecycles. Effect cleanup supports Strict Mode and server rendering. Ripple behavior is a hook shared by direct components.
- CSS Modules, experimental CSS mixins, `color-mod()`, and build-time theme substitution are replaced with stable namespaced CSS and live custom properties.
- ES module packaging, esbuild, and TypeScript declaration emission replace the old Babel/Gulp/Webpack library toolchain. Vitest/Testing Library and Playwright cover the new runtime; the original Enzyme specs remain under `legacy/component-tests` as historical reference.
- Strict TypeScript checks the implementations and generates the public declarations. Native props, events, value-first callbacks, and ref handles are typed at their source; there is no separate handwritten component declaration tree. The internal portal helper accepts DOM nodes, DOM refs, or functions returning them; mounted React component instances can no longer be resolved through the removed `findDOMNode` API.
- The old README and root tooling are preserved in `legacy/`. The old `docs/` and `spec/` applications are historical sources; `examples/nextjs` is the maintained example.

The package is ES-module-only, targets current browsers, and requires a single explicit stylesheet import. Previous CSS Module import paths, IE11 polyfills, dependency-injection factories, and the `themr` styling layer are not supported. No release or deployment is performed by these scripts.

## License

[MIT](LICENSE). Original project and design implementation by Javier Velasco Arjona and the React Toolbox contributors.
