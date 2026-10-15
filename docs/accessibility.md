# Accessibility

React Toolbox preserves Material 1's default styling while exposing native HTML
semantics, keyboard interaction, and an alternative for reduced motion. Styling
fidelity does not establish WCAG conformance. An application still needs suitable
labels, content, color combinations, and testing with assistive technology.
Reduced motion follows [W3C technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html);
named standalone icons use an image role as required by [ARIA in HTML](https://www.w3.org/TR/aria-in-html/).

## Supported behavior

- Label text is associated with form controls. Icon-only buttons and progress
  indicators accept an accessible name through `aria-label` or `aria-labelledby`.
- Standalone icons with `alt`, `aria-label`, or `aria-labelledby` expose an image
  role. Decorative icons can use `aria-hidden`; explicit caller roles are retained.
- Menus support arrow keys, Home, End, typeahead, and Escape. Dropdowns expose
  combobox/listbox state and preserve focus when a selection is made.
- Modal dialogs and temporary drawers contain keyboard focus, hide background
  content from the accessibility tree, and restore focus on dismissal. Nested
  modals expose only the top surface. Tabs use Radix roving focus for arrows,
  Home/End, disabled items, and RTL direction.
- Tooltips appear on keyboard focus, associate their description with the trigger,
  and dismiss on Escape. Hovering the tooltip keeps it visible; it tracks scroll
  and resize and stays within the viewport. Snackbars use a polite live region.
- Checkbox, radio, switch, and text input support native defaults and form reset.
  Radio groups compose through wrappers and fragments. Checkbox exposes native
  indeterminate state. Dropdown supports `name`, `form`, `required`, and native
  form validation through an associated select; invalid submission focuses the
  visible combobox and displays the browser's localized validation message.
- Tables preserve captions, name selection controls, announce mixed selection,
  and expose sorting through keyboard-operable header buttons and `aria-sort`.
  Date calendars support arrows, Home/End, PageUp/PageDown, and Shift+PageUp/Down
  for years, with month-end clamping. Sliders support ten-step page navigation.
- `prefers-reduced-motion: reduce` removes decorative ink and shortens Material
  transitions. Dialog, drawer, snackbar, and tooltip lifecycles finish without
  relying on a transition event. The preference can change while the page is open.
- Indeterminate progress indicators remain visible and named but stop rotating,
  sweeping, and cycling colors under reduced motion. They do not announce a
  fabricated completion percentage; determinate progress retains its actual value.

Keep meaningful labels on interactive icons. Use a distinct, descriptive name for
each progress indicator. Do not remove focus indication in `classNames` overrides.
Test text/background contrast again after changing design tokens; the original
palette and every possible consumer customization are not a conformance guarantee.

## Approved accessibility corrections

On 15 October 2026, the defaults were explicitly approved for correction where
the original M1 appearance failed current accessibility requirements:

- The inactive date-header year and 12-hour AM/PM labels use 75% white opacity
  instead of 60% on the unchanged Indigo 500 header. Their text contrast rises
  from 3.57:1 to 4.67:1. Other large inactive picker text retains its original ink.
- Clock numerals use the existing Material Grey 700 (`#616161`) instead of Grey
  600 (`#757575`) on the unchanged Grey 200 face (`#eeeeee`), raising contrast from
  3.97:1 to 5.33:1. Selected numerals keep their original contrast color.
- The year and AM/PM pointer targets extend into adjacent header space to reach
  24px height. Compensating margins retain the visible text and header layout.
- Inline documentation links retain an underline so they can be identified
  without distinguishing indigo from surrounding gray text.

These changes follow [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
and [minimum target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
The exact declaration changes are recorded in
`packages/react-toolbox/tests/accessibility-style-corrections.json`, separately
from the immutable original fixtures and the historical M1 correction ledger.
The same explicit changes are applied to the independent reference renderer;
unlisted style changes still fail verification.

The new tokens are `--datepicker-year-inactive-opacity`,
`--timepicker-period-inactive-opacity`, and `--clock-number-color`. Custom themes
must recheck contrast against their own surfaces.

## Automated checks

`pnpm test` covers motion preference changes, cleanup during pending exits, ripple
cleanup, tooltip dismissal, and existing control/focus behavior.

`pnpm test:browser` includes axe checks for WCAG 2 A/AA, 2.1 A/AA, and 2.2 AA rules
on representative controls, open menus and dialogs, every public component's
documentation page, and the landing and getting-started pages.
Keyboard journeys verify selection, modal focus containment/restoration, and
reduced-motion behavior. Run the same suite with `TOOLBOX_BROWSER=webkit` to check
Safari's engine. Existing visual and interaction suites guard the original M1
behavior with no reduced-motion preference.

Axe detects only some accessibility issues. A passing scan is not a WCAG audit or
a replacement for the manual checks below.

## Manual release checks — not yet completed

Record the browser, OS, assistive-technology versions, date, and result in release
notes. These checks have not been performed for this release candidate.

- With VoiceOver + Safari and NVDA + Chrome/Firefox, traverse the documentation,
  navigation, API tables, and code samples in reading and interaction modes.
- Confirm input labels, errors, required state, checkbox/switch state, combobox
  options, slider values, tab selection, and progress values are announced clearly.
- Open and dismiss every modal, nested menu, date picker, and time picker. Confirm
  the name is announced, background content is unavailable, and focus returns to
  the initiating control. Check nested overlays as well as standalone examples.
- Confirm snackbar updates and tooltips are understandable without duplicated
  announcements or unexpectedly moving focus.
- Complete the same journeys using only the keyboard. Check visible focus, logical
  order, Escape, and that custom consumer content does not create a focus trap.
- Check 200% text resizing, 400% zoom/reflow, narrow screens, forced colors, and
  OS reduced-motion settings. Inspect text, icons, disabled states, and focus
  indicators for contrast in the actual application theme.


## Consumer workflow additions

Buttons and custom menu triggers use Radix Slot to preserve native link/button semantics, refs and child event cancellation without nested interactive controls. Give custom triggers an accessible name. Menu checkbox/radio items expose their selection state and remain open for repeated choices; Escape returns focus to the trigger, including after a pointer click in Safari. Cascading submenus are not yet provided.

Autocomplete submits selected IDs, including multi-values, rather than its search query. Its hidden native select supports required validation and reset; invalid submission focuses the visible field. Rich options need textValue for matching and single-value text. Group labels and disabled states are exposed to assistive technology; loading and empty messages are announced through a separate live status outside the listbox. Slider supports native submission/reset and RTL interaction. RadioGroup forwards required and external form association to its native radios.

Manual tabs separate focus from activation: arrows move between enabled tabs, while Enter or Space activates a panel. Dialog/Drawer focus callbacks are cancelable; consumers that prevent the default must place focus on an appropriate connected element. Additional automated evidence lives in feature-parity.test.tsx and browser/feature-parity.spec.js; the manual assistive-technology checks above still apply.
