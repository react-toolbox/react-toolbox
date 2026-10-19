# Component animation performance audit

Audited on 19 October 2026 across every component family in `src/material`, the
shared motion foundations, examples, and documentation animations. Most overlays
already animate transforms and opacity. Controls still contain
animations that recalculate geometry on each frame.

The first iteration converts input underline growth and default tab indicators
to transforms while preserving timing, endpoints, RTL, scrolling, and reduced
motion. Customized tab indicators keep their existing dimension-based transitions
so borders, explicit dimensions, and consumer transforms retain their meaning.
The second iteration reuses the static slider snap-marker subtree during value
updates, avoiding repeated generation and reconciliation of dense marker grids.
The third iteration aligns interaction timings with M1 guidance and makes exit
cleanup follow actual motion. The former Layout family has since been removed;
application shells now compose Tailwind layout with AppBar and Drawer.

Transforms and opacity can avoid repeated layout and paint; actual compositing
and dropped frames still need browser measurements. Adding permanent
`will-change` everywhere is not a substitute for that measurement.
See the [browser animation performance guide](https://web.dev/articles/animations-guide).

## Component inventory

| Family | Motion and remaining cost |
| --- | --- |
| Accordion | Indicator rotation; panel height changes immediately. Base UI measures dimensions at lifecycle boundaries. |
| App bar | Transform-based scroll hiding; passive scroll listener. |
| Autocomplete | Popup scale/opacity and chevron transform; placement measured on opening. |
| Avatar | No independent animation. |
| Button | Background, text color, and shadow transitions repaint; shared ripple. |
| Card | No independent animation. |
| Checkbox | Checkmark keyframes animate width, height, left, and top; background color repaints. |
| Chip | No independent animation. |
| Date picker | Month slides use transform/opacity. Year-header font-size animates layout. Year-list centering reads geometry and writes scroll position after each commit while shown. |
| Dialog | Transform/opacity; default exit cleanup follows actual motion, with explicit lifetime overrides retained. |
| Divider | No independent animation. |
| Drawer | Transform/opacity. Convenience drawers retain `will-change: transform` and `preserve-3d`, including permanent drawers. |
| Dropdown | Popup scale/opacity and chevron transform; placement work on opening. |
| Font icon | No independent animation. |
| Input | Underlines now scale. Floating labels still animate top/font-size/color. Hints fade; icon color repaints. Multiline autoresizing reads scroll height after changing height. |
| List | Row background transitions repaint. Embedded controls inherit their own motion. |
| Menu | Popup scale/opacity; inline menus disable popup animation. Shared ripple. |
| Overlay | Opacity; scroll-lock changes occur at activation boundaries. |
| Progress bar | Linear progress uses transforms. Circular progress rotates and animates SVG dash geometry, with optional stroke-color cycling that repaints. |
| Radio | Dot scale plus shared ripple. |
| Ripple | Transform expansion and opacity exit. Starting or restarting ink deliberately forces layout once and performs a second React commit. |
| Sheet | Directional entry/exit keyframes; standard-curve snap/reset transitions; transitions remain disabled during dragging. Vaul retains internal 500 ms lifecycle delays; see the limitation below. |
| Slider | Thumb sizing, border, and track-margin transitions affect layout/paint. Radix caches gesture bounds but moves thumbs/ranges using edge properties. Snap markers now reuse their subtree until the range, step, visibility, or marker classes change. |
| Snackbar | Translation; label measurements use ResizeObserver. |
| Switch | Logical inset animation still recalculates layout. Preserve CSS-inherited direction and percentage tokens in any replacement. |
| Table | Row background transitions repaint; sort icons rotate. |
| Tabs | Default indicators now translate/scale. Explicitly customized indicators retain dimension interpolation. Selection/resize still require bounded geometry measurements. |
| Time picker | Clock faces use transform/opacity. Hand movement measures the live face for each mouse/touch move before updating React. |
| Tooltip | Scale/opacity; already explicitly handles a reduced-motion preference change during exit. |
| Theme and portal foundations | No independent animation loop. |
| Docs and examples | GitHub-link color transitions repaint. Example timers represent asynchronous actions, not frame loops. |

## Remaining work in priority order

1. **Switch travel and typography.** [Switch thumb](../packages/react-toolbox/src/material/switch/Thumb.tsx),
   [input labels](../packages/react-toolbox/src/material/input/Input.tsx), and the
   [date-picker year header](../packages/react-toolbox/src/material/date-picker/DatePickerDialog.tsx)
   animate layout. A simple switch `translateX` substitution breaks percentage
   tokens because percentages resolve against a different box; an HTML `dir`
   selector also misses CSS-only direction. Typography changes require checking
   custom font-size tokens, wrapping, and baselines before adopting scaling.
2. **Checkbox and slider geometry.** The [checkbox keyframes](../packages/react-toolbox/src/material/foundations/styles/animations.css)
   draw a constant-width stroke by changing its geometry. Scaling the whole shape
   changes stroke thickness during the animation. [Slider](../packages/react-toolbox/src/material/slider/Slider.tsx)
   changes thumb size and track spacing; retain its hit area, range behavior,
   orientation, RTL, and current Material 1 geometry. Dense snap-marker
   reconciliation is addressed by the second iteration, measured below.
3. **Repeated JavaScript layout work.** Profile [clock dragging](../packages/react-toolbox/src/material/time-picker/ClockHand.tsx)
   before coalescing pointer samples. Live measurements are needed during zoom,
   resize, and scrolling, and any queued final position must be applied before
   completion. Any restriction of [calendar year centering](../packages/react-toolbox/src/material/date-picker/Calendar.tsx)
   must also account for year bounds, font metrics, and custom styling; selection
   and display dependencies alone are insufficient. Preserve [ripple](../packages/react-toolbox/src/material/ripple/useRipple.tsx)
   immediate expansion, early release, restart, and completion callbacks if its
   intentional startup layout flush is replaced.
4. **Paint and layer costs.** Circular SVG dash/color motion is covered by exact
   [interpolation tests](../packages/react-toolbox/tests/browser/progress-motion.spec.js).
   Replacing it with a simple rotating arc changes the specified appearance.
   Measure paint and layer allocation before redesigning button shadows or
   removing drawer promotion hints.

## M1 timing policy

The original [M1 duration guidance](https://m1.material.io/motion/duration-easing.html)
recommends 150–200 ms desktop motion, typical 300 ms mobile state changes, and
225/195 ms mobile entrances/exits. These are contextual guidelines; the
[menu specification](https://m1.material.io/components/menus.html) does not prescribe
one exact duration. The library now applies the following defaults:

| Role | Desktop/default | Coarse primary pointer | Easing |
| --- | ---: | ---: | --- |
| General state change | 200 ms | 300 ms | Standard: `cubic-bezier(0.4, 0, 0.2, 1)` |
| Independent surface entrance | 200 ms | 225 ms | Deceleration: `cubic-bezier(0, 0, 0.2, 1)` |
| Independent surface exit | 150 ms | 195 ms | Acceleration: `cubic-bezier(0.4, 0, 1, 1)` |
| Tooltip entrance/exit | 150 ms | 150 ms | Deceleration/acceleration |

`(pointer: coarse)` is the project's device approximation, not an M1 rule or a
claim to detect every tablet. Theme overrides can express a different policy.
The [tooltip specification](https://m1.material.io/components/tooltips.html) explicitly
sets 150 ms entry/exit and 1.5 seconds of persistence after touch release; those
values are retained. Brief checkbox/slider feedback and repeating loading/ripple
cycles keep their separate durations.

Menus, dropdowns, autocomplete, dialogs, temporary drawers, and snackbars use the
entrance/exit roles. Persistent drawers share the layout's state-change duration
and standard curve. Inputs, tabs, switches, list/table feedback, and picker view
transitions use the shared state-change duration where applicable. App bars use
that duration with sharp easing when hiding and deceleration when returning,
following M1's [temporary offscreen movement guidance](https://m1.material.io/motion/movement.html).
Calendar movement and slider pin/track effects now use the M1 standard curve.
The date-picker year heading now gives opacity an explicit transition duration;
its previous shorthand unintentionally made that fade instantaneous.

`--animation-duration` remains the general duration and scales the directional
defaults: entrance/exit factors are 1/0.75 on desktop and 0.75/0.65 for a coarse
pointer. `--animation-duration-enter` and `--animation-duration-exit` provide
exact directional overrides. Existing `--menu-expand-duration`,
`--menu-fade-duration`, and `--tooltip-animation-duration` remain available.
Default `--animation-delay` is now zero; explicit entrance-delay overrides remain.
Portal surfaces rebind derived tokens for both theme-provider and inline style
overrides, including stateful autocomplete styles.

Convenience Dialog, Drawer, and Snackbar follow their own finite animations and
transitions before unmounting, including replacement animations. They no longer
retain invisible surfaces for an independent default 500 ms timer. An explicit
`delay` prop still sets a literal exit lifetime. Calendar and clock views also
wait for actual CSS transitions rather than hard-coded 350/500 ms lifetimes.

Browser tests reproduced retained closed Menu, Dropdown, compound Dialog,
compound Drawer, and Sheet content when reduced motion was enabled mid-exit. Reduced-motion
styles now shorten those keyframes to 0.01 ms while preserving their names, so
Radix receives completion and releases content and modal locks. Calendar and clock
transitions are disabled under reduced motion so an in-flight transition is also
cancelled and its outgoing view can be removed.

## Remaining lifecycle limitations

- Vaul 1.1.2 does not expose an animation-duration setting. Sheet visuals use the
  directional policy, but its `onAnimationEnd`, post-open drag guard, snap reset,
  nested cleanup, and optional background scaling still use internal 500 ms
  timing. Fully synchronizing these requires dependency work; changing CSS alone
  cannot establish complete M1 lifecycle alignment for sheets.
- [Shared presence](../packages/react-toolbox/src/material/foundations/motion/usePresence.ts)
  separates entrance states with a 20 ms timer. A busy main thread can prevent a
  paint between the commits, potentially skipping the entrance transition.
  A frame-based handshake needs interruption and exit-lifetime tests.

## Measured layout work

The same production fixtures ran against Git revision `d9eb99b6` and the first iteration,
using local headless Chromium 156.0.8078.4. Counts below cover each full 500 ms
interaction, across five samples; they are document layout passes rather than
per-element counts. This comparison predates the third iteration's timing changes.

| Fixture | Controls | Layout passes before | Layout passes after |
| --- | ---: | ---: | ---: |
| Input underline without a label | 1 | 13–14 | 0 |
| Default convenience tab indicators | 40 | 21–22 | 0 |
| Default compound indicators with unequal tab widths | 40 | 21 | 0 |
| Input with a floating label | 1 | 22–23 | 21–22 |
| Switch travel | 40 | 17 | 17 |
| Checkbox activation | 40 | 10 | 10 |
| Checkbox deactivation | 40 | 1 | 1 |

All three optimized cases recorded zero layout duration in every sample. Style
recalculation remained; these counters do not establish compositor-only execution.
The 95th-percentile requestAnimationFrame intervals were 16.7–16.8 ms in both
runs, so this comparison establishes reduced layout work, not an FPS increase.

## Measured dense-slider updates

The second comparison used the same original revision and Chromium version with
one production slider containing 1,001 markers. Five samples each applied 50
controlled value changes, one per animation frame. Timing surrounds the
synchronous React update and commit; initial mounting is excluded.

| Measurement | Before | After |
| --- | ---: | ---: |
| Median synchronous update, range across samples | 1.8–2.6 ms | 0.3–0.6 ms |
| 95th-percentile synchronous update, range across samples | 2.7–3.4 ms | 0.7–0.9 ms |
| Total synchronous update time across 250 changes | 572.1 ms | 116.0 ms |
| Layout passes per 50 changes | 50 | 50 |

Total synchronous update work fell by approximately 80% in this local comparison.
The first sample includes leaving the minimum-value ring state; the remaining
four samples alone show approximately 79% less synchronous update work. Layout
still occurs as Radix positions the thumb and range. Both runs retained
16.7–16.8 ms 95th-percentile rAF intervals; this demonstrates more main-thread
headroom, not a measured FPS increase or GPU improvement.

## Validation

Library lint, Tailwind lint, TypeScript, and 46 relevant unit tests passed. Eleven
motion browser cases passed in both Chromium and WebKit, covering underline
endpoints, unequal tabs, horizontal/vertical orientation, RTL, scrolling, custom
thickness, custom dimensions/borders/transform origins, and disabled/reduced
motion. Nine existing Chromium control/focus cases also passed. The complete
documentation E2E suite was not run; these tests use local component fixtures.

For the slider iteration, library lint, Tailwind lint, TypeScript, and 35 slider,
progress, and native-form unit tests passed. New coverage checks marker updates
after range, step, visibility, and each style-slot change, plus dense-grid bounds.
Three browser cases passed in both Chromium and WebKit: dense-grid dragging with
LTR and RTL endpoint checks, and existing Material slider sizing, focus, and
disabled-state coverage. Independent review found no behavior regressions or
missing memo dependencies.

For the timing iteration, the complete library unit suite passed: 351 tests in
48 files. Library lint, Tailwind lint, TypeScript, the production build, and all
consumer footprint budgets passed. After the final reduced-motion and callback
style adjustments, the six affected unit suites passed again (79 tests).
In both Chromium and WebKit, 21 timing cases verify actual computed durations,
curves, and completed lifecycles; 34 existing control-motion, overlay, layout,
and picker-layout cases passed; eight Sheet cases and two Drawer edge cases
passed; ten picker-motion cases verify duration overrides, completion, reversal,
and reduced motion. Timing coverage includes desktop/coarse pointers, scoped and inline
overrides, replacement animations, rapid reopening, explicit exit lifetimes,
initial/live reduced motion, focus restoration, and released modal locks.

## Reproducing the measurements

Run the production React fixtures without a docs server or concurrent test/build
workloads:

```sh
pnpm --filter react-toolbox exec node scripts/profile-animations.mjs /tmp/animation-profile.json

# Profile only the dense-slider case.
pnpm --filter react-toolbox exec node scripts/profile-animations.mjs /tmp/slider-profile.json slider-snaps
```

The script collects Chromium CDP layout/style counters and requestAnimationFrame
intervals over five samples per case. Inputs use one focused field; tabs,
switches, and checkboxes use forty simultaneous controls for 500 ms per sample.
Checkbox activation and deactivation are reported separately. The slider case
uses one dense slider and 50 synchronous controlled updates per sample. Each
family gets a fresh document. The optional first argument saves the same JSON
printed to stdout; subsequent arguments select cases.

RequestAnimationFrame cadence in headless Chromium does not establish presented
frame rate, GPU cost, or 120/144 Hz behavior. Device-level acceptance should include
representative dense screens, scrolling and dragging, CPU load, and browser frame
and paint traces on the intended hardware.
