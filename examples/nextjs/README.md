# React Toolbox with Next.js

A working Next.js App Router example of every public React Toolbox component family, using React 19, Next.js 16, and Tailwind CSS 4. The gallery preserves the default Material Design palette and motion. A separate `/layout-demo` page demonstrates Layout, Panel, NavDrawer, and Sidebar. `/theme-demo` shows scoped CSS variables, live palette changes, and theme inheritance through portals.

Run from the repository root with Node.js 24.15 or newer:

```sh
npm install
npm run example:dev
```

Open http://127.0.0.1:3000. To build and serve a production example:

```sh
npm run example:build
npm run example:start
```

The production server uses http://127.0.0.1:3100.

## Integration

Import the component stylesheet once in the server layout, and put interactive components in a client component:

```jsx
// app/layout.jsx
import 'react-toolbox/styles.css';

export default function Layout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
```

```jsx
// app/example.jsx
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

`app/globals.css` imports Tailwind's theme and utilities, without Preflight. Preflight resets default browser styles and would change the original component appearance. Utility classes style the gallery around the components; the component colors, dimensions, shadows, and animation curves come from the library.

Roboto and Material Icons are bundled locally through `@fontsource/roboto` and `material-icons`. Import the icon stylesheet into Tailwind's `base` layer, as this example does, so its default font size and line height do not override the component styles. No Google Fonts request, CDN, or remote image is needed. Dates are initialized with fixed local values so server and browser output agree.

## Browser checks

```sh
npx playwright install chromium
npm run test:browser
```

Playwright builds and starts the production example automatically. The suite covers form interactions, toggles, menus, tooltips, ripples, dialogs, drawers, date/time pickers, tables, layouts, and mobile width. Browser errors fail the interaction tests.

Chromium runs by default. Run the same complete suite in WebKit with:

```sh
npx playwright install webkit
TOOLBOX_BROWSER=webkit npm run test:browser
```

Visual checks use two independent references:

- The original stylesheet compiled through the legacy PostCSS pipeline, compared against modern CSS on identical markup. The checks include geometry, colors, typography, animation declarations, and exact screenshots, including buffered progress and open pickers.
- The untouched original component JavaScript running on React 16.14, compared in a separate page with the modern React implementation. Both pages use the same gallery inputs and preloaded local fonts. The checks include initial components, selected controls, tabs, pressed and released continuous/pinned sliders, portaled dialogs and pickers, and a real ripple animation frame paused at 200 milliseconds.

Screenshot comparisons require exact equality, with no pixel tolerance. The surrounding gallery section corners are squared in comparison pages to isolate component rendering from shell antialiasing; component corners, shadows, and geometry are unchanged. Computed-style strings normalize equivalent color syntax and fractional pixel serialization below 0.0001px; this does not relax image comparisons. Images are attached to the Playwright report. The original-runtime fixture records the Git revision, dependency versions, and source hashes; regenerate it with `node scripts/build-legacy-runtime.mjs` whenever the shared gallery source changes. See `tests/fixtures/legacy-runtime.md` for its provenance and regeneration details. These checks verify rendering and representative behavior; they do not claim that the old and new React runtimes have identical performance.
