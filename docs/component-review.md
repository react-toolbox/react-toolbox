# Component readiness review

16 October 2026 · initial audit at `1a486e60` · 27 existing public families reviewed, Sheet added as the 28th, shared foundations and two retired families assessed.

React Toolbox retains its identity as editable Material 1 components with modern React contracts. The authorized implementation keeps the existing public catalog and documents Overlay as a low-level foundation. Link and Navigation were retired from the public registry during this pass; their private compatibility exports were subsequently removed after the gallery switched to native navigation and List links. The implementation corrects the audited behavior and theme inconsistencies, adds the approved capabilities, and makes font loading an explicit distribution choice.

The main architectural finding was independent behavior and presentation in convenience components and compound parts. Mixed modal stacks fought over focus, and themes could make compound content unreadable. The implementation shares modal ownership and family tokens while preserving public convenience contracts. Native elements and domain-specific calendars/clocks remain appropriate foundations.

The findings below preserve the original audit and baseline measurements. The authorized implementation is summarized separately here. Verification counts and comparison results describe the recorded 16 October revision, not the current suite. The completed migration's CSS/React 16 references, correction ledgers, and comparison tooling were subsequently retired and remain available in Git history. Three independent component reviews were combined with foundation inspection, consumer-size measurements, and targeted reproductions. Reviewers used the available model; this was not a review across different model families.

## Implementation outcome

The authorized pass addresses the concrete findings across all 27 existing families and adds Sheet as the 28th. Native controls and structural components remain native; Radix owns shared modal behavior, compound menus/selects/tabs/tooltips, and the new range slider; Base UI remains the combobox foundation. Vaul provides the optional gesture sheet over the same Radix dialog dependency.

- **Behavior and structure:** shared modal ownership across convenience and compound APIs; native picker validation/reset/clearing; corrected keyboard selection, focus and snackbar timing; eligible table bulk selection; wrapper-safe List/Layout; semantic Chip actions, table headers, card headings, avatar image ownership, and native file-input props.
- **Material geometry:** 48px selection-control activation areas with original glyphs and table density; mouse/touch tooltip offsets; explicit comfortable/desktop/compact menu density; logical RTL layout; optional landscape pickers. The migration recorded the intended declaration changes in a correction ledger, now retained in Git history alongside the prior ledgers.
- **Optional capabilities:** Radix multi-thumb/range/vertical sliders; single/multiple/range and multi-month calendars with ISO week numbers and unavailable-day predicates; bounded/stepped local times including overnight windows; clear actions and translated picker labels; gesture sheets with snap points and nested stacks.
- **Customization:** compound parts use the same family color and field tokens as their convenience counterparts. The optional semantic bridge covers light and dark surfaces, selection controls, calendar/clock surfaces, chips and tabs. `--calendar-background` separates the calendar surface from the selected-day foreground.
- **Distribution:** component token CSS follows actual module imports; shared styles no longer carry every family's defaults. Roboto delivery is 400/500 by default; fonts and icons are one removable stylesheet for SVG/host-font consumers. Clock helpers no longer import calendar locale tables. The maintained footprint checks measure actual installed consumers.
- **Examples:** `/docs/theming` contains the editable Field Notes distribution (original, brand, night); `/docs/recipes` demonstrates async/destructive actions, avatar groups/status, native forms, filtering/sorting/paging/selection, and promise-aware snackbar queueing. The picker, slider and sheet pages include runnable compositions.

These are additive capabilities and targeted corrections, not a promise of every application policy offered by every shadcn derivative. Large-data virtualization, remote fetching, recurrence rules and time-zone conversion remain application concerns; the supplied scheduling example explicitly stores a local time window and a selected time zone. No calendar-domain behavior was moved into a generic primitive.

Compatibility also preserves existing `style` targets: Checkbox applies it to the visual Check, while RadioButton and Switch apply it to their native input. Use root `className`, named `classNames` slots or family tokens for visual customization across those controls. Silently moving these styles would change existing consumer behavior.

## Implementation verification — historical results

- Package lint, Tailwind lint, TypeScript, **248 unit/integration tests**, exact style ledgers, registry closure compilation and release checks passed. The documentation production build, lint and TypeScript checks passed.
- Full browser suites passed: **204 Chromium and 204 WebKit tests**. Coverage included every public family at 320px and desktop widths, automated accessibility, native forms, mixed modal stacks, RTL, reduced motion, landscape pickers, gesture and keyboard sheet controls, scoped light/dark portals, and exact historical rendering comparisons. The final Slider fixture-order correction also passed its four focused cases across both engines and six repeated Chromium probes.
- Consumer budgets passed. Button CSS measured **10.82 KiB gzip**, compared with **15.52 KiB** in the initial audit (about 30% less); its imported token declarations fell from **51,148 to 5,477 bytes**. The SVG/host-font consumer emitted no font-face declarations. See [measurement method and maintained budgets](footprint.md).
- Clean shadcn CLI installations into Next.js and Vite consumers were verified during this pass, including all 28 families and the three editable examples, exact source delivery, strict types, SSR/hydration, source-update preservation and coexistence with an official shadcn Button.
- Historical CSS and React 16 reference fixtures were unchanged during this verification. Intentional declaration changes had explicit correction-ledger entries; native Chip/List markup used historical-render adapters. Comparisons passed without pixel tolerances or screenshot masks. These comparisons are past migration evidence; current tests assert supported behavior, Material geometry, themes, and accessibility directly.
- Manual screen-reader announcements, physical mobile touch/virtual-keyboard behavior, forced colors and zoom checks remain release work, as listed in [accessibility guidance](accessibility.md). Automated checks do not establish universal theme or WCAG conformance.

## Original audit findings

Implementation paths in this document are relative to `packages/react-toolbox/src/material/`. Priorities indicate implementation order, not a claim that every supported use is broken. The new reproductions exercise combinations missing from the existing passing suites.

### Competing modal focus ownership

**P1.** The custom modal stack in `overlay/useModalFocus.ts:64–74` redirects focus outside its current dialog without knowing that a descendant opened a Radix portal. Radix maintains a separate focus stack.

Chromium reproductions confirmed three failures:

- Open `DialogRoot` / `DialogContent` inside an active convenience `Dialog`: focus alternates between the inner input and outer dialog, with repeated `Maximum call stack size exceeded` errors. A diagnostic cap on focus calls was needed to inspect the loop safely.
- Open a compound DropdownMenu inside that convenience dialog: focus returns to the outer dialog after Radix has hidden it from the accessibility tree.
- Open a convenience dialog inside a compound dialog: focus returns to the hidden outer opener. DatePicker and TimePicker use the convenience dialog internally, so ordinary picker forms cross this boundary.

Use one modal ownership system. The preferred direction is to adapt the convenience Dialog and modal Drawer behavior to the existing Radix foundation, preserving their contracts. Verify `active`, actions, external opener restoration, focus callbacks, portal containers, exit retention, picker styling, and Drawer `insideTree` / nonmodal behavior explicitly. Do not solve this with a growing list of exceptions in two focus traps.

Regression coverage must include both nesting directions, pickers and compound selection popups inside dialogs, topmost Escape, accessibility isolation, scroll locking, and restoration after each close. Existing compound nesting tests cover Radix surfaces; separate tests cover custom modal nesting, but neither covers mixed stacks.

### Different theme contracts for the same family

**P1 when it makes content unreadable; otherwise P2.** `foundations/styles/composition.ts:2–7` hardcodes a white surface and generic option geometry. Compound Dialog, Drawer, Menu, Dropdown, Autocomplete, Tabs, and Tooltip consume fewer family tokens than their convenience counterparts.

The variables reach the portal correctly; the rendered parts do not consistently use them. Chromium with current compiled CSS produced:

| Theme input | Convenience Dialog | Compound Dialog |
| --- | --- | --- |
| `--dialog-color-white: #ffeecc` | Cream background | White background |
| shadcn bridge with `--popover: #222222`, `--popover-foreground: #ffffff`, `--foreground: #eeeeee` | Dark background, white text | White background, near-white text |

Evidence: `dialog/parts.tsx:49–50,62,82,92`, `drawer/parts.tsx:50–52`, `menu/parts.tsx:46,61`, `dropdown/parts.tsx:37–65`, `autocomplete/parts.tsx:78–90`, `tabs/parts.tsx:21,49,116–127`, `tooltip/parts.tsx:172–179`, and `foundations/styles/shadcn.css`. Dimensions, typography, border, radius, and layer values also diverge. For example, changing the existing input font-size token does not change the compound field's literal 16px text.

Give both APIs the same family tokens where they represent the same visual role. Preserve primitive-specific positioning variables. Extend semantic theme tests to actual compound surfaces; the current CSS dependency checks and convenience-only bridge tests cannot detect this mismatch.

### Form and keyboard behavior

| Priority | Reproduction and consequence | Source | Required correction |
| --- | --- | --- | --- |
| P2 | An empty `required` DatePicker or TimePicker reports a valid form. | `date-picker/DatePicker.tsx:115–160`; `time-picker/TimePicker.tsx:102–147` | Both force `readOnly` text inputs, which do not participate in constraint validation. Provide a validatable form bridge, focus the visible field on invalid submission, and cover empty/valid/disabled/reset/external-form cases. |
| P2 | Focus either checked or unchecked Switch with the keyboard: no visible focus indicator appears. | `switch/Thumb.tsx:59–60`; `switch/Switch.tsx:107,113` | Focus selectors use nonexistent `.rt-switch-switch-on/off`; rendered classes are `.rt-switch-on/off`. The hidden native input is 0×0, so it supplies no visible fallback. Correct selectors and test computed focus styles. |
| P2 | Dropdown with Alpha/Beta: focus, Escape, type `b`, Enter selects Alpha. | `dropdown/Dropdown.tsx:192–198,248–260` | Opening resets the typeahead result to the selected/first item. Preserve the intended opening index; test a focused but closed dropdown. |
| P2 | Calendar selected on Oct 15: click Next month, move keyboard focus back to the calendar root, ArrowRight emits Oct 16 through onChange instead of navigating November. | `date-picker/Calendar.tsx:66–69,145–194`; `CalendarDay.tsx:83` | Track keyboard focus relative to the visible month while preserving existing draft/onChange and confirmation semantics. In DatePicker this changes the dialog draft, not the externally committed value. A current-month day needs a reachable keyboard entry point. Navigation-button arrows are intentionally excluded; this reproduction uses actual root focus. |
| P2 | Convenience Table select-all includes a disabled row and a row with `selectable={false}`. | `table/Table.tsx:76–85`; `TableRow.tsx:87–96` | Derive header state and bulk selection from eligible rows. TableRoot already skips disabled rows; preserve its stable-value behavior. |

Single Autocomplete has a separate **contract decision**: with selected Alpha, type `Be`, then blur; the visible text remains `Be` while the form submits Alpha's ID. Query is explicitly separate state, and no documented restore-on-blur promise was found. Choose whether an uncontrolled abandoned query restores the committed label or clears selection. Preserve explicitly controlled queries and remote-result updates. The selection-sync effect uses focus but omits it from its dependencies (`autocomplete/Autocomplete.tsx:234–240,427–430`); changing that mechanically would decide behavior without documenting it.

### Layout and content composition

| Priority | Finding | Evidence and correction |
| --- | --- | --- |
| P2 | Inactive or temporary percentage-width Sidebar still reserves page space. | `layout/Layout.tsx:65,126–131` and `Panel.tsx:79–84` apply percentage offsets without the pinned condition used by numeric widths. At ≥720px, width 50 reserves half the panel even with `active={false}`. Source and rendered class checks confirm the mismatch; add computed-layout coverage for inactive, temporary-open, and pinned states. |
| P2 | Avatar custom image nodes retain the automatic fallback; `cover` omits custom image nodes entirely. | `avatar/Avatar.tsx:74–81,83–120`: only Radix.Image updates loading state. A custom `<img>` plus title renders the image and initials together. Delegate custom-image loading through an explicit composition contract or treat custom nodes as caller-managed content. Keep URL fallback behavior. |
| P2 | List's `onClick` path is mouse-only, and plain text children disappear. | `list/ListItem.tsx:60–65,83–120` discards non-element children and handles clicks on an unfocusable `li`. Both natural uses are supported by the public types; clickable rows occur in shipped examples. Provide a native primary-action composition path with separate secondary actions, and preserve ordinary content. |
| P2 | A clickable, deletable Chip announces its primary action as a group. | `chip/Chip.tsx:71–110` gives the focusable root `role="group"` while Enter/Space invokes its primary action. Use separate native primary/remove actions inside a noninteractive group; avoid nesting buttons. |
| P2 | Unrelated parent rerenders can prevent Snackbar timeout indefinitely. | `snackbar/Snackbar.tsx:116–121` restarts for ReactNode identity changes. A 200ms snackbar containing `<span>Saved</span>` never timed out during one second of 50ms parent updates; an identical string-label control did. Define message identity independently of recreated JSX, while retaining restart for replacement messages. |
| P2 | Built-in decorative icons can enter accessible names as ligature text. | `list/ListItemLayout.tsx:45–50` renders unnamed FontIcon values; `font-icon/FontIcon.tsx:11–19` exposes their text. Make decorative call sites explicit, including BrowseButton's icon. Preserve meaningful icon labels. |
| P3 | List helpers produce invalid customary list structure. | `List` renders `ul`, while direct `ListSubHeader` and `ListDivider` render `h5` and `hr`. Fix the examples/grouping contract or provide list-aware wrappers; standalone headings/separators remain legitimate. |

List and Layout also discover direct children by component identity. Wrappers and fragments can silently lose List defaults or Layout coordination (`list/List.tsx:40–45`, `layout/Layout.tsx:36–51`). This deserves a separate composition iteration, using context or explicit slots. Normalize actual contracts before cosmetic import-order or file-layout changes.

### Remaining Material 1 gaps

At the time of this audit, strict visual tests protected the corrected reference baseline. They did not prove every API, theme, or composition satisfied the specification.

- **Touch targets:** measured interactive heights are Checkbox 18px, Radio 20px, Switch 24px, and Slider 32px. M1 calls for 48×48dp touch targets independent of glyph size. Preserve visual geometry while extending activation areas; test adjacent-target overlap and wrapping labels. [M1 accessibility](https://m1.material.io/usability/accessibility.html)
- **Touch Tooltip:** compound content uses a 14px gap on touch as well as mouse. Chromium measured 14px; M1 specifies 24dp for touch. The convenience hook already distinguishes them. Retain caller offsets and align entrance/exit curves as well. [M1 tooltips](https://m1.material.io/components/tooltips.html)
- **Menu density and placement:** compound items always use 48px/16px mobile-style geometry. Desktop and dense metrics, simple-menu screen margins, and trigger overlap need an explicit M1 policy instead of inheriting generic popper defaults. [M1 menus](https://m1.material.io/components/menus.html)
- **Pickers:** current dialogs provide portrait arrangements, without the M1 landscape arrangement. Internal labels remain partly English despite date localization. The calendar year chooser is fixed to 1900–2099 while Date values are not equivalently restricted. [M1 pickers](https://m1.material.io/components/pickers.html)
- **Bidirectionality:** AppBar, Chip, List, Table, and Layout retain physical left/right rules. Scope a deliberate RTL pass; directional media/progress behavior should not be mirrored mechanically. [M1 bidirectionality](https://m1.material.io/usability/bidirectionality.html)

The migration required visual corrections to be recorded separately from its preserved reference. With that comparison apparatus retired, maintain direct regression checks for the intended Material measurements and behavior, and document the design evidence for visual changes.

## Decisions for every component family

All 27 public families still provide value. The table separates that value from optional feature expansion. The footprint section gives isolated measurements for every family. Shared theme defects above apply to each listed compound API.

### Forms and selection

| Family | Structure and primitive choice | Material 1 value and customization | Feature completeness and next action |
| --- | --- | --- | --- |
| Autocomplete | Keep Base UI Combobox parts. Eventually adapt the separate convenience engine while preserving ID/query/event contracts. Radix offers no direct equivalent combobox. | Underlined field, selected chips, rich suggestions; slots and compound parts are broad. Align input/surface tokens. | Object equality, multiple values, groups, creation, loading/empty state, remote query control, forms, portals, and positioning already cover substantial use. Resolve abandoned-query behavior. Virtualization needs a measured consumer recipe, not a speculative rewrite. |
| Dropdown | Keep Radix Select parts. The separate convenience implementation is a good adapter candidate. | M1 selection field and rich templates remain useful. Preserve numeric IDs and value-first callbacks. Use shared family tokens. | Groups, typeahead, form/reset/required, controlled opening, portals, and collision options exist. Fix closed typeahead. Multi-select belongs to Autocomplete. |
| Input | Keep native input/textarea. Shared reset and accessible descriptions are sensible. | Floating labels, underline, errors, counters, and multiline behavior are useful beyond a bare input. Root/slots/custom children cover styling. | Native contracts mostly complete. Show persistent helper text, prefix/suffix, password reveal, and form-library integration as recipes. The shared InputHTMLAttributes type omits textarea-specific attributes such as `wrap`; narrow that union deliberately when improving the contract. |
| Checkbox | Keep native checkbox plus mixed-state/ripple behavior. | M1 visuals and indeterminate mark are meaningful; slots cover each part. Fix the touch area. | Default/controlled, mixed state, forms/reset, required, cancellation, and refs already cover core parity. `style` targets the visual Check whereas Radio/Switch target hidden inputs; reconcile/document this inconsistency without another abstraction. |
| Radio | Keep native radio inputs and group context. | M1 circle/ripple/focus states with arbitrary wrappers; enlarge touch area. | Required/external forms, defaults/reset, disabled items and native keyboard grouping are adequate. Do not add custom orientation/loop behavior without a concrete use case. |
| Switch | Keep native checkbox with switch role and shared checked/reset foundation. | Useful settings control. Repair focus selectors and touch area; current slots are sufficient. | Native form, ref, disabled, default/controlled, and labeling support is adequate. No need for a second compound implementation. |
| Slider | Keep the scalar control for now. Use Radix Slider if range/vertical scope is accepted rather than extending a second interaction engine. | M1 discrete pin, marks, minimum ring, editable field and buffer distinguish it. Preserve visuals and extend hit area. | Scalar forms/reset/RTL/commit/keyboard cases are covered. Multiple thumbs, vertical orientation and minimum separation are meaningful optional gaps. A pin-value formatter could be useful; existing aria-valuetext handles accessible descriptions. |
| Date picker | Keep domain-specific M1 calendar; consolidate its modal shell. Radix has no calendar primitive. Evaluate a calendar engine only with expanded calendar scope. | A single-date confirmation dialog remains useful. Locale/constraints/formatters/slots exist. Add configurable year bounds and internal labels; consider landscape separately. | Fix required validation and visible-month keyboard navigation. Ranges, multiple months/dates, week numbers, predicate constraints, and clear action need explicit product choices. These are broader than the current M1 single-date contract. |
| Time picker | Keep analog dial and keyboard alternatives; share modal ownership. No matching Radix clock exists. | Distinctive 12/24-hour M1 selection. Slots/action labels are useful; internal labels and fixed hour/minute IDs need improvement. | Fix required validation. Minute steps, time constraints, zones, ranges and clear action are optional scheduling capabilities. Split time helpers from calendar locale data. |

These comparisons use [Radix Select](https://www.radix-ui.com/primitives/docs/components/select), [Base UI Combobox](https://base-ui.com/react/components/combobox), [shadcn Combobox](https://ui.shadcn.com/docs/components/base/combobox), [Radix Slider](https://www.radix-ui.com/primitives/docs/components/slider), and [shadcn Calendar](https://ui.shadcn.com/docs/components/radix/calendar). Shadcn supports different primitive families; choosing Radix everywhere is not a prerequisite for comparable composition.

### Overlays navigation and feedback

| Family | Structure and primitive choice | Material 1 value and customization | Feature completeness and next action |
| --- | --- | --- | --- |
| Dialog | Prefer existing Radix parts and converge convenience modal ownership onto them. | Core app form/confirmation surface. Parts and focus callbacks are flexible; align all surface/body/footer/title tokens. | Controlled/default, custom portals, asChild, forceMount, nonmodal behavior and independent footers exist. Fix mixed stacks first. An AlertDialog workflow is optional; changing role alone does not implement it. |
| Drawer | Existing Radix Dialog is appropriate for temporary side navigation. Preserve nonmodal/insideTree convenience behavior explicitly. | M1 left/right navigation with widths and elevation; expose one coherent surface/text/border contract. | Strong Sheet-style composition already. Gestures, snap points and bottom sheets are different scope; no justification for adding Vaul solely to match a name. |
| Menu | Prefer Radix DropdownMenu parts for anchored actions; adapt IconMenu later. Keep static Menu behavior distinct. | Actions, selection, nested menus, and M1 popup treatment remain useful. Family geometry and density need consistency. | Submenus, groups, labels, checkbox/radio, typeahead, cancellation, portals and collision handling already exist. Context-menu triggers are an optional separate capability. |
| Tabs | Keep Radix Tabs; convenience index API currently uses separate RovingFocus behavior. | Horizontal M1 views, scroll treatment and indicator are valuable. Share dimension/indicator tokens and show icon-plus-text composition. | Manual/automatic, RTL/orientation, stable values, disabled triggers, wrappers and persistent panels exist. Vertical tabs are an explicit extension; no urgent feature expansion needed. |
| Tooltip | Prefer Radix plus the existing M1 touch bridge for new composition. Migrate hook/decorator only with lifecycle parity. | Concise hover/focus/long-press explanations; fix touch spacing and align size/motion tokens. | Shared delays, controlled opening, portals, collisions, hover persistence and touch cancellation already exist. Rich interactive content belongs in a separate popover/hover-card workflow. |
| Overlay | Keep as a low-level scrim/foundation, with explicit ownership. | Visual scrim and scroll/escape behavior have value; it should not invent a dialog name or focus contract. Native props/slots suffice. | No direct shadcn family parity requirement. Unify modal consumers; do not give a decorative overlay another interaction engine. |
| Snackbar | Keep the lightweight, single-message component. Applications must sequence instances to ensure only one is visible. | M1 transient feedback, one action, mobile/desktop geometry and paused clock are useful. Fix ReactNode timer restarts. | Queue/promise helpers are optional wrappers. A sequential queue fits M1; stacking would depart from that guidance. Custom action/portal composition can follow a demonstrated need. |

References: [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog), [Dropdown Menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu), [Tabs](https://www.radix-ui.com/primitives/docs/components/tabs), [Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip), [shadcn Sheet](https://ui.shadcn.com/docs/components/radix/sheet), and [M1 snackbars](https://m1.material.io/components/snackbars-toasts.html).

### Content actions and structure

| Family | Structure and primitive choice | Material 1 value and customization | Feature completeness and next action |
| --- | --- | --- | --- |
| App bar | Keep native header/buttons; Radix Toolbar has a different keyboard contract. | Responsive 64/56/48px heights, title/actions and focus-aware scroll hiding are useful. ReactNode content and slots suffice. | Document that scrollHide observes window, not an arbitrary Panel scroller. Address RTL in the shared pass. No new core API is necessary. |
| Avatar | Retain Radix Avatar; repair custom image composition. | Circular imagery, initials, icons and cover rendering are useful. Loading callbacks, delay, imageProps and size token cover common customization. | Expose coherent image/fallback ownership for custom images. Groups/badges can be recipes. Root width alone does not resize all inner parts; document the avatar-size token. |
| Button | Keep native button/anchor/file input plus Radix Slot. Shared ButtonElement/styles are a useful abstraction. | Flat/raised/FAB/mini/IconButton, ripple and 48px activation treatment provide M1 value. | Button composition is strong. BrowseButton omits input `form`, `required`, `capture`, ID and validity handlers: expose a narrow native inputProps/part. Loading/destructive states can be recipes before new appearance variants. |
| Card | Keep lightweight native parts. | M1 elevation, content/media/actions, aspect ratios and keylines are valuable; native props/className are consistent. | CardTitle's fixed h5 and combined title/subtitle/avatar limit semantic composition. A chosen heading/explicit title part is useful; arbitrary ratios can use CSS. Pure content parts could remain server-usable in a later boundary pass. |
| Chip | Keep native structure with separate actions. A toggle primitive would fit a future pressed filter chip, not this entire family. | 32px entity/contact chip and removal behavior provide more value than a badge. | Fix primary-plus-delete semantics and exact-child avatar detection. Exposed label/remove parts may help; do not import M3 variants into the default M1 collection. |
| Font icon | Keep the optional native adapter; Radix adds no behavior. | Original Material glyphs and custom React nodes are useful. Clarify decorative versus named semantics. | Support direct SVG content without requiring icon-font delivery for applications using a few icons. Font loading is the main footprint decision. |
| Layout | Keep an opinionated M1 shell built with CSS/context. Radix does not replace shell layout. | Pinned/permanent/temporary navigation, clipping and Panel scrolling are useful. | Fix percentage offsets, then replace repeated width/breakpoint selectors with a shared resolved width. Make composition wrapper-safe. Icon collapse, keyboard shortcuts and shadcn Sidebar's application policies are optional. |
| List | Keep native lists and primary/secondary actions; a list is not automatically a menu/listbox. | Rich 48/72/88px rows, avatars, captions, checkbox rows and separators are valuable. | Highest composition cleanup priority: preserve text, expose native actions and wrapper-safe defaults. ListItemAction(s) lack className/ref/native props; ListCheckbox hides underlying Checkbox form/default/mixed-state capabilities. Prefer narrow native props over parallel convenience contracts. |
| Progress bar | Keep semantic DOM/SVG; Radix Progress would reduce little behavior. | Linear/circular, buffered/indeterminate, multicolor and reduced-motion states provide useful M1 differentiation. | Task names and aria-valuetext remain caller-owned. Data-state attributes are optional. No table of new visual variants is needed. |
| Ripple | Keep the hook and compatibility decorator; there is no equivalent Radix primitive. | Pointer-origin ink, clipping, release/cancellation and reduced motion are core M1 behavior. | Existing center/spread/multiple/slot controls are adequate. Consumers supply keyboard feedback; do not promise keyboard ink from a hook with no keyboard handlers. No speculative event-system rewrite. |
| Table | Keep native table plus context. Recommend TableRoot's stable row identity; retain the convenience index contract during migration. | M1 row/header dimensions, numeric alignment, sorting and selection presentation are useful. | Fix convenience select-all. Filtering/sorting/pagination/virtualization belong in optional TanStack recipes, not a default grid dependency. Show a labeled keyboard-accessible scroll wrapper. |

References: [Radix Avatar](https://www.radix-ui.com/primitives/docs/components/avatar), [shadcn Button](https://ui.shadcn.com/docs/components/radix/button), [Item](https://ui.shadcn.com/docs/components/radix/item), [Sidebar](https://ui.shadcn.com/docs/components/radix/sidebar), [Data Table](https://ui.shadcn.com/docs/components/radix/data-table), and M1 [buttons](https://m1.material.io/components/buttons.html), [cards](https://m1.material.io/components/cards.html), [lists](https://m1.material.io/components/lists.html), [chips](https://m1.material.io/components/chips.html), [tables](https://m1.material.io/components/data-tables.html), [progress](https://m1.material.io/components/progress-activity.html).

**Retired families:** Link and Navigation have been removed from the private workspace as well as the public registry. Native/router links, Button asChild, AppBar, Drawer and List cover their useful composition. The gallery uses native navigation and List links. A future Radix NavigationMenu would solve a different interaction problem.

## Shared implementation conventions

The useful existing convention is a named family entry, narrow native or primitive props, refs to the actual consumer-facing element, root className, shared `cn`, and explicit family tokens. Keep styles beside their implementation. A separate types file is useful for shared contracts; simple part props can stay beside the component. Neither file count nor identical formatting is a reason to add abstractions.

Use context for genuine parent/child coordination, preserving wrappers and stable domain values. Keep native form semantics at the input boundary and domain decisions inside their owning component. Compound parts should inherit primitive contracts rather than maintain an incomplete parallel prop list. Preserve convenience callbacks and value identities during adapters. Expose native props on rendered public parts before inventing new style-slot maps, and update explanatory comments to JSDoc when touching the relevant code.

## Footprint measurements

Measurements use the installed dependencies at the reviewed revision. JavaScript was bundled with esbuild 0.28.2 as production, minified browser ESM targeting ES2022, with React/ReactDOM external and CSS excluded. Every named export in each family entry was retained. These are isolated-family measurements, not incremental application costs; shared dependencies are deduplicated in a real bundle and these numbers must not be summed.

Copied source includes each registry item's full dependency closure, CSS, types and license, excluding node_modules. It measures editing/install surface, not download or runtime cost. Sizes use KiB (1024 bytes).

| Family | Installed files | Copied source KiB | JS gzip KiB |
| --- | ---: | ---: | ---: |
| App bar | 37 | 135.0 | 15.1 |
| Autocomplete | 41 | 160.0 | 71.2 |
| Avatar | 25 | 101.9 | 13.4 |
| Button | 34 | 128.7 | 14.9 |
| Card | 32 | 114.5 | 14.8 |
| Checkbox | 31 | 119.2 | 12.5 |
| Chip | 28 | 107.6 | 14.2 |
| Date picker | 62 | 218.5 | 31.4 |
| Dialog | 45 | 151.4 | 29.8 |
| Drawer | 33 | 117.3 | 26.3 |
| Dropdown | 35 | 140.4 | 46.7 |
| Font icon | 22 | 96.7 | 9.6 |
| Input | 28 | 112.6 | 12.1 |
| Layout | 56 | 194.8 | 20.4 |
| List | 49 | 146.3 | 18.4 |
| Menu | 48 | 172.3 | 49.1 |
| Overlay | 24 | 103.9 | 10.0 |
| Progress bar | 23 | 103.7 | 10.6 |
| Radio | 33 | 119.9 | 12.5 |
| Ripple | 25 | 107.8 | 11.0 |
| Slider | 34 | 141.6 | 16.1 |
| Snackbar | 40 | 140.7 | 16.1 |
| Switch | 31 | 120.0 | 12.5 |
| Table | 42 | 140.9 | 15.2 |
| Tabs | 34 | 134.5 | 24.1 |
| Time picker | 64 | 220.1 | 31.3 |
| Tooltip | 29 | 125.1 | 32.8 |

Selected exports demonstrate tree-shaking: Button alone is 14.3 KiB gzip, convenience Dialog 17.5 KiB, convenience Autocomplete 19.9 KiB, and convenience Dropdown 15.0 KiB. Adding Radix/Base UI can improve maintenance and interaction completeness without reducing an isolated bundle. The architecture recommendation is based on correctness, not an assumed byte saving.

An isolated Button registry closure, compiled with Tailwind 4.3.3 using Preflight, source setup, registry theme tokens, explicit source scanning and production optimization, emits **123.4 KiB raw / 15.5 KiB gzip CSS**. FontIcon alone emits **109.5 / 13.4 KiB**. These include font-face declarations but exclude font binaries. They are consumer compilations, not the all-family private `dist/styles.css`.

Every family installs the shared foundation, whose setup imports four Roboto weights and Material Icons (`foundations/styles/setup.css:3–7`; `scripts/build-registry.mjs:179–181`). Each measured stylesheet includes 41 font-face declarations. The local Material Icons WOFF2 is **125.3 KiB**; Roboto Latin 400 and 500 are **21.4 and 21.7 KiB**. Browsers fetch fonts according to actual usage/subsets, so these are individual asset sizes, not a claim that all declared fonts download on every page.

The highest-value size work is:

1. Separate optional icon-font and typography delivery from essential component styling while preserving a documented automatic M1 setup. Measure a real SVG-only consumer and a full M1 consumer before choosing defaults.
2. Reduce shared CSS that every isolated family receives. Colors, variables and component tokens alone occupy 67,067 raw source bytes; `tokens.css` contains every family's defaults and recalculation selectors. Derive family token closures from maintained definitions rather than hand-maintaining duplicate CSS. Keep cross-family theme propagation covered.
3. Split time helpers from the default calendar object. Exporting only `formatTime` currently retains date locale tables and bundles to 4.0 KiB gzip. Measure the final picker saving; it will not equal that whole helper bundle.
4. Consolidate duplicate engines where behavior supports it. This primarily reduces maintenance and copied source; separately measure final runtime impact.
5. Keep class merging shared. FontIcon's 9.6 KiB standalone JS illustrates the fixed class-composition cost. Do not replace tailwind-merge with an incorrect ad hoc merger for a small isolated saving.

Before declaring a size target, add repeatable budgets for minimal Button, IconButton with SVG, single Input, compound selection, and a representative mixed settings page. Measure JavaScript, CSS and actual loaded fonts separately. No arbitrary universal per-component budget is justified by these first measurements.

## Theming and a themed distribution proposal

The current direction makes sense: global CSS variables for shared visual choices, ThemeProvider only for scoped values that must travel through portals, className on composed parts, and editable source for structural changes. The provider's variable transport and nested recalculation are useful. Keep legacy `theme` / `classNames` slot maps compatible without making them the preferred design-system API.

Make the contract coherent before introducing a new theme abstraction:

- Separate semantic roles (surface, text, primary/contrast, accent/contrast, divider/error) from family dimensions and internal implementation variables. Preserve existing names while documenting a small recommended set.
- Both convenience and compound APIs must consume the same relevant family roles. A generic white surface is insufficient for dialog, menu, field, and drawer semantics.
- Preserve caller-owned host tokens. The optional shadcn bridge should map compatible semantics explicitly; shadcn's accent represents interactive surfaces, which does not always mean M1's vivid accent color. [Shadcn theming](https://ui.shadcn.com/docs/theming)
- Document that scoped host values must be supplied through ThemeProvider to follow a portal; an ancestor class alone cannot travel to document.body.
- Show typography, dimensions, focus, error, disabled and overlay states, not just primary button colors. Radius/density departures should be identified as branding choices while the default remains M1.

The existing `/theme-demo` only changes three legacy color aliases and demonstrates buttons, an input and a date picker (`apps/docs/app/theme-demo/page.jsx:6–10`). It is useful as a portal demonstration, but not a complete themed distribution or proof of compound compatibility.

### Proposed Field Notes example

Create one editable registry example called **Field Notes**, a project/settings screen using a teal and deep-orange palette, M1 typography, geometry, elevation and motion. Start from these global colors or the equivalent scoped ThemeVariables:

```css
:root {
  --rt-color-primary: #00695c;
  --rt-color-primary-dark: #004d40;
  --rt-color-primary-contrast: #ffffff;
  --rt-color-accent: #bf360c;
  --rt-color-accent-dark: #870000;
  --rt-color-accent-contrast: #ffffff;
  --rt-color-text: rgb(0 0 0 / 87%);
  --rt-color-text-secondary: rgb(0 0 0 / 54%);
  --rt-color-divider: rgb(0 0 0 / 12%);
}
```

These are starter colors, not a verified complete preset. Complete and test all surfaces and states after unifying token consumption. Use a theme file and composition recipe that depend on the maintained component items; avoid cloning the whole implementation into a second distribution. Shadcn's [registry item format](https://ui.shadcn.com/docs/registry/registry-item-json) supports composing an example from registry dependencies.

The example should include an app bar/navigation, project cards, a sortable selectable table, a settings form with all native controls, a menu, a drawer, date/time pickers inside a dialog, tooltip icon actions, progress and a queued single snackbar. Put base M1 and Field Notes side by side, with a separate dark semantic-bridge variant to exercise surface/foreground pairs. Include both convenience and compound forms of representative components during validation.

Acceptance requires palette isolation, portal inheritance, keyboard/focus behavior across APIs, required forms, responsive layout, readable states, reduced motion, and measured CSS/font/JS output. This is a concrete follow-up example to build after the correctness work, not a completed demo in this audit.
