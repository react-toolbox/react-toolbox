# Independent original-runtime fixture

`legacy-runtime.js` mounts the current gallery using the untouched component JavaScript from commit `de8578c1187bdf5db5777d403b5880a7e5ec3f5d`, React/ReactDOM 16.14.0, react-css-themr 2.1.2 and react-transition-group 2.5.0. The component code and legacy dependencies are extracted/installed exclusively in a temporary directory. No modern component implementation is included.

Only CSS Module imports are intercepted: their exported slot maps come from `legacy-styles/reference-themes.json`, produced by the original PostCSS/CSS Modules compiler. Serve `legacy-styles/reference.css` to supply the corresponding original component styling. The shared gallery shell and fonts should use the same compiled gallery CSS/assets as the modern page, excluding modern component CSS.

The fixture is test-only; it is not shipped by the Next.js application or library package.

## Rebuilding

From `packages/react-toolbox`:

```sh
node tests/fixtures/build-legacy-runtime.mjs
```

The first run installs the exact dependencies into the OS temporary directory. Subsequent runs reuse that installation. `--install` reinstalls from the archived `legacy-runtime-lock.json`. Set `REACT_TOOLBOX_LEGACY_DIR` to select another isolated directory. The original source commit must remain available in Git. The script copies the current gallery as shared demo input and writes metadata/hashes to `legacy-runtime.json`.

## Browser interface

Render `<div id="legacy-root"></div>`, load the original component CSS and shared gallery shell/fonts, then execute `legacy-runtime.js`. Wait for `window.__REACT_TOOLBOX_LEGACY_READY__ === true` or the `react-toolbox-legacy-ready` event. `window.__REACT_TOOLBOX_LEGACY__` reports the original source revision and dependency versions. The ready signal indicates that React has mounted and two animation frames have elapsed; tests should separately await fonts, the 100 ms tab measurement, and any interaction-specific transition duration.

Use an isolated browser page for the baseline. Original React 16 includes its original imperative portal implementation and may create portal siblings directly under `<body>`, so include the whole document when testing dialogs, drawers, snackbars, and tooltips.

This baseline retains original bugs and obsolete behavior deliberately, including invalid ARIA roles and missing confirmation callbacks. A comparison failure should distinguish an intentional documented compatibility fix from an accidental visual or animation regression.

The M1 audit comparisons apply the independently reviewed `corrections/m1-style-corrections.json` declarations to the original stylesheet and make three explicit DOM adaptations after the archived bundle runs: set the native disabled attribute on the original disabled Switch input; position the gallery's discrete slider stops at 0, 2, 4, 6, 8 and 10, replacing its CSS endpoint with an explicit sixth marker; and focus the slider container on press to match the corrected control's focus target. Each adaptation asserts the modern contract, while the archived drag, ripple and component rendering code still runs. Static captures await finite transitions and offset the external slider demo canvas so its translated thumb lands on integral pixels, avoiding Chromium compositing differences at fractional shell offsets; internal component styles and relative geometry are unchanged. The live ripple comparison still samples exactly 200 ms. Bundle and gallery hashes remain checked, archived JavaScript/CSS are never rewritten, and pixels retain zero tolerance. Semantic roles, chip deletion markup and character counters require no visual adaptation in this gallery.

After the TypeScript rewrite, style comparison normalizes class whitespace and removes only the archived runtime’s inert `undefined` class token. Real class slots, computed declarations, and screenshots retain exact equality. The reviewed M1 slider correction is 18px pressed, 14px while hovered after release, and 12px once the pointer leaves.
