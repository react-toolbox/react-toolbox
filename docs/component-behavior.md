# Shared component behavior

Convenience components and compound parts now use the same interaction primitives.
The convenience APIs expose domain values, component classes and native form
integration. They do not maintain separate keyboard, focus,
dismissal or dragging implementations.

| Family | Shared interaction primitive |
| --- | --- |
| Dialog and temporary Drawer | Radix Dialog |
| Menu and IconMenu | Radix Dropdown Menu |
| Dropdown | Radix Select |
| Autocomplete | Base UI Combobox |
| Slider | Radix Slider |
| Tabs | Radix Tabs |
| Tooltip parts and hook | Radix Tooltip, including the shared touch policy |

A permanent Drawer remains an ordinary, nonmodal aside. Domain adapters still
handle things the primitives do not know: selection IDs, Material presentation,
custom refs and form serialization. Removed APIs and their replacements are
listed in the [3.0 migration guide](source-registry.md#migrating-to-30).

## Updating an existing installation

Commit your local changes before reinstalling registry items. Review their source
diffs and the following interaction changes rather than expecting the former
custom engines' exact event timing or internal DOM structure.

### Native controls

- Checkbox, RadioButton and Switch apply both `className` and `style` to their root
  label. Native form attributes and event handlers stay on the underlying input.
- Input delegates multiline length limits to native `maxLength` and truncates
  overlong change values. Keyboard events remain available to consumers and
  enclosing forms, including when the field is full.

### Dialog and Drawer

- Opening focuses the first eligible control, or the content when none exists.
  Closing restores focus asynchronously, after the visible exit finishes.
- A closing modal continues to hide the background and lock scrolling while its
  retained exit content is visible. Nested surfaces use the same ownership model.
- Use `onOpenAutoFocus` for custom initial focus, especially in nested modals.
  Cancel the default and focus a connected element through a ref. React child
  `autoFocus` can run before the parent focus trap has paused; do not rely on it
  to choose initial focus inside a nested modal.
- `onCloseAutoFocus` remains cancelable. Nonmodal compound surfaces do not steal
  focus back from an outside control that dismissed them. Permanent drawers do
  not trap Tab or consume Escape.

### Dropdown

- Focusing the field, including after failed validation, does not open it.
  Open with click, Enter, Space or an arrow key. Open options receive focus;
  Escape closes the popup and restores the trigger.
- The open popup follows Radix Select's modal keyboard behavior. Tab does not
  move through the background while it is open. Closed-trigger typeahead selects
  immediately; reselecting the current value does not emit a new value change.
- Options are portaled. Query them by role rather than assuming they are children
  of the field wrapper. Typeahead focus updates may be asynchronous.
- Mouse opening occurs on pointer-down, before click. Cancel `onPointerDown` or
  `onKeyDown` when preventing activation; `onClick` cannot undo earlier activation.
- Named native controls still submit domain values, distinguish empty options
  from placeholders, and participate in required validation and form reset.
  Primitive-internal IDs are not exposed as native form change events.

### Autocomplete

- Focus remains in the input. Base UI manages highlighting and navigation,
  including returning to the input and encountering disabled options without
  selecting them. Enter without a highlighted option can submit the enclosing
  form; it does not silently choose the first result.
- `allowCreate` exposes an explicit creation option. Backspace on an empty query
  can remove the preceding selection in multiple mode. Escape dismisses without
  clearing the submitted selection.
- Closed result lists unmount. Empty lists stay closed unless there is a loading
  or empty-state message to announce. Tab closes the popup and moves normally.
- Search text is not a submitted selection ID. Remote source updates preserve
  selected IDs and an in-progress query.

### Slider and Tabs

- Slider dragging uses Pointer Events. Callers' pointer cancellation is respected
  on the rail as well as the thumb. Native submission and accessible values use
  the domain range, including a fractional minimum, not internal offsets.
- Slider step rounding follows Radix. For `min=0`, `max=10`, `step=3`, End resolves
  to 9; an increment beyond that can clamp to 10. Use a range divisible by the
  step when every endpoint must lie on the same grid. Page and Shift+Arrow keys
  use the primitive's larger increments.
- Tabs use Radix automatic or manual activation, disabled-item handling and RTL
  navigation. Automatic focus can select a tab. Pointer selection happens on
  mouse-down: cancel `onMouseDown` or `onKeyDown`, not the later click callback.
  Selection uses string `value`/`defaultValue` and `onValueChange`. Every Tab and
  explicit TabContent has a matching value, so reordering does not change selection
  or pair a trigger with a different panel. Panel retention modes remain available.

### Menu and Tooltip

- Keyboard opening enters the menu's items. Pointer opening can focus the menu
  content first. Arrow keys, Home/End and typeahead are primitive-owned.
- Inline menus remain visible without trapping Tab or stealing focus on hover.
  Standalone MenuItem retains activation and its ref; put it inside Menu for
  menu navigation. Use DropdownMenuItem inside compound DropdownMenuContent.
- IconMenu retains click cancellation, ripple feedback and custom trigger refs.
  Popup placement follows its anchor and available viewport space, not the old
  measured clip rectangle.
- Tooltip parts and `useTooltip` share hover, focus, Escape, collision,
  reduced-motion and long-press behavior with the compound parts. Touch uses
  Pointer Events: a 500ms hold opens the tooltip, with a 1500ms release window.
  Custom triggers must forward the returned event props, and the hook's returned
  tooltip element must remain rendered even while the visible tooltip is closed.

## Validation limits

Unit, browser and fresh-consumer checks exercise these contracts. They do not
replace the [manual assistive-technology release checks](accessibility.md#manual-release-checks--not-yet-completed).
Base UI's open, untrapped autocomplete temporarily hides outside content from the
accessibility tree. Its open composite is scanned with all applicable axe rules;
keyboard tests verify Tab closes it before outside focus, and whole-page scans
run before opening and after closing. This is not a claim of full-page axe
conformance during that transient open state or a completed screen-reader audit.
