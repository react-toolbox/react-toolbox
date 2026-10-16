# Consumer footprint

Run `pnpm --filter react-toolbox test:footprint` to measure the maintained consumers and enforce their budgets. The package `check` command includes this check. For a machine-readable report, run `node scripts/measure-footprint.mjs --check --json /tmp/toolbox-footprint.json` from `packages/react-toolbox`.

The script copies each consumer's exact registry dependency closure into a temporary directory. It bundles selected public exports with production esbuild, keeping React and React DOM external. It then compiles the CSS imports that actually contribute to the emitted bundle, including family token imports reached through internal components. The host uses Tailwind with `source(none)`; Toolbox's installed source registration supplies its utility classes. Compiling `setup.css` alone would miss family tokens after the split.

CSS includes Preflight, shared foundations, imported family declarations, installed-source utilities, and font-face declarations. Font binaries are excluded; browsers fetch only the font faces and subsets they use. JavaScript and CSS are compressed separately with Node's default gzip level. The report also includes source bytes, registry items, CSS entry points, and token files, so an unexpected dependency can be traced.

## Measured consumers

Measured on 2026-10-16 with esbuild 0.28.2 and Tailwind 4.3.3. Values are KiB (1,024 bytes); budgets allow roughly 10–15% growth before requiring review.

| Consumer | JS gzip | CSS gzip | Token CSS raw | JS / CSS gzip budget |
| --- | ---: | ---: | ---: | ---: |
| Button | 14.36 | 10.82 | 5.35 | 16 / 12 |
| SVG IconButton, host fonts | 14.35 | 8.74 | 5.35 | 16 / 10 |
| Input | 12.10 | 10.40 | 4.69 | 14 / 12 |
| Compound Dropdown and Autocomplete | 84.52 | 13.82 | 10.59 | 96 / 16 |
| Mixed settings | 55.81 | 24.24 | 30.04 | 64 / 28 |

Button and Input retain their named convenience exports. The SVG consumer renders an IconButton with an inline SVG and removes the `fonts.css` import from its copied `setup.css`, as a host-font application would; it must emit zero font-face rules. Compound selection retains the roots, fields, portals, popups, lists, and options needed for both selection controls. Mixed settings retains Button, Input, Checkbox, Switch, the four compound Slider parts, DatePicker, and TimePicker. Shared dependencies are bundled once within each consumer. The compound case includes both Radix Select and Base UI Combobox behavior, so its JavaScript cost should not be inferred from the convenience APIs.

The regular setup emits 23 font-face rules: nine subsets for each of Roboto 400 and 500, plus five Material Icons variants. Editing the installed `foundations/styles/fonts.css` is the supported place to reduce those declarations or replace the supplied fonts. The SVG case demonstrates removing all automatic fonts; it does not claim that rendering an SVG automatically removes font imports.

## Comparison with the initial audit

The [initial component review](component-review.md) measured Button at 15.52 KiB gzip CSS with all family token declarations and four Roboto weights. The current consumer emits 10.82 KiB, about 30% less. Loaded raw token CSS falls from 51,148 to 5,477 bytes, about 89% less. Button JavaScript is effectively unchanged: 14.33 → 14.36 KiB gzip.

This compares the complete audited and current implementations, including correctness changes and font selection, rather than isolating the token split as the only variable. The original setup imported all tokens; the current measurement follows actual component CSS imports. The other maintained scenarios did not have equivalent initial measurements and should not be compared with whole-family numbers or sums of separately compressed bundles.

The budget file, `packages/react-toolbox/scripts/footprint-budgets.json`, preserves the original Button measurements. Do not automatically raise budgets when a check fails. Inspect the report's dependency and token paths, explain intentional new costs, and review any revised ceiling alongside the change.
