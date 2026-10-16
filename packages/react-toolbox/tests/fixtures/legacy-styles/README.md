# Original Material Design reference

The `*.module.css` files are immutable copies of React Toolbox 2.0.0-beta.13,
before the modern CSS migration. Do not update these fixtures to make a failing
parity check pass.

`reference.css` and `reference-themes.json` were generated from those originals
by the original PostCSS 7 pipeline, including its color-mod, custom media,
mixins, loops, apply, nesting, calc, and CSS Modules implementations. Only the
CSS Modules name generator was changed to predictable `rt-<component>-<slot>`
names. These files provide an independent baseline for selector, composition,
default color, dimension, easing, keyframe, and timing comparisons.

The current stylesheet deliberately retains CSS variables for customization.
From `packages/react-toolbox`, `pnpm test styles.test.js` resolves their
original defaults and checks the result against the independently compiled
reference plus the individually reviewed corrections in `../m1-style-corrections.json`. That separate record
contains old/new values, M1 sources, rationale, and insertion anchors. Browser
tests apply those corrections to the archived CSS; they never substitute the
current stylesheet as their expected result. Circular motion tests still use
the untouched original reference.

To reproduce the reference, install the following **only in a temporary
directory**, then run `tests/fixtures/compile-legacy-reference.cjs` from
`packages/react-toolbox` with that directory as its first argument. They are not
application or library dependencies.

```sh
npm install --prefix /private/tmp/react-toolbox-legacy-css --no-save --ignore-scripts postcss@7 postcss-import@12 postcss-mixins@6 postcss-each@0.10 postcss-apply@0.11 postcss-preset-env@6.2 postcss-calc@7 postcss-modules@1.4
node tests/fixtures/compile-legacy-reference.cjs /private/tmp/react-toolbox-legacy-css
```

Consumers need none of these legacy compiler packages. The archived originals
and their compiler are retained only to reproduce the independent test baseline;
maintained component presentation uses Tailwind classes in the TypeScript source.
