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
`node scripts/verify-styles.mjs` resolves their original defaults and checks the
result against the independently compiled reference plus the individually
reviewed corrections in `../m1-style-corrections.json`. That separate record
contains old/new values, M1 sources, rationale, and insertion anchors. Browser
tests apply those corrections to the archived CSS; they never substitute the
current stylesheet as their expected result. Circular motion tests still use
the untouched original reference.

To reproduce the reference, install the following **only in a temporary
directory**, then run `scripts/compile-legacy-reference.cjs` with that directory
as its first argument. They are not application or library dependencies.

```sh
npm install --prefix /private/tmp/react-toolbox-legacy-css --no-save --ignore-scripts postcss@7 postcss-import@12 postcss-mixins@6 postcss-each@0.10 postcss-apply@0.11 postcss-preset-env@6.2 postcss-calc@7 postcss-modules@1.4
node scripts/compile-legacy-reference.cjs /private/tmp/react-toolbox-legacy-css
```

The historical conversion is reproducible with
`node scripts/migrate-styles.mjs --output=/private/tmp/react-toolbox-historical-css`.
It makes ordinary CSS and stable JavaScript slot maps in a scratch directory;
it cannot overwrite maintained M1 corrections. Consumers need none of the
legacy compiler packages.
