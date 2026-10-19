import type { ComponentSlug } from './catalog';

type MaterialGuideline = { title: string; path: string; guidance: readonly string[] };

// Usage guidance complements the component API; these links target the original
// Material specification, independently of later Material 2 and 3 revisions.
export const materialGuidelines: Record<ComponentSlug, MaterialGuideline> = {
  accordion: {
    title: 'Expansion panels',
    path: 'components/expansion-panels.html',
    guidance: [
      'Group lightweight editing tasks or related details into panels. Keep a concise summary visible when collapsed.',
      'Use 48px collapsed and 64px expanded header heights, with 24px horizontal padding and 16px separation around expanded panels. Put form controls and secondary actions inside the panel.',
    ],
  },
  divider: {
    title: 'Dividers',
    path: 'components/dividers.html',
    guidance: [
      'Use a 1px rule to separate content groups when spacing alone does not make their relationship clear.',
      'Prefer spacing and headings over redundant rules. Mark a purely visual divider as decorative.',
    ],
  },
  sheet: {
    title: 'Bottom sheets',
    path: 'components/bottom-sheets.html',
    guidance: [
      'Use a sheet for contextual content or actions while retaining the underlying task.',
      'Give the sheet a title and a visible dismissal action. Dragging supplements keyboard and button interaction.',
      'The default modal sheet uses a white surface, a 20% black backdrop, and a regular 16px title. Theme overrides can adapt these colors.',
    ],
  },
  'app-bar': {
    title: 'Structure',
    path: 'layout/structure.html',
    guidance: [
      'Place navigation at the leading edge, the screen title next, and relevant actions at the trailing edge. Move less frequent actions into an overflow menu.',
      'Use the responsive toolbar height: 56px on portrait phones, 48px on landscape phones, and 64px on larger screens. Keep icon actions within 48px touch targets.',
    ],
  },
  autocomplete: {
    title: 'Text fields',
    path: 'components/text-fields.html',
    guidance: [
      'Keep a visible field label after a value is entered. Suggestions help complete that field; they should remain relevant to the current input.',
      'Offer keyboard access to suggestions and communicate validation with helpful text, not color alone.',
    ],
  },
  avatar: {
    title: 'Lists',
    path: 'components/lists.html',
    guidance: [
      'Use a consistent leading image to identify people or related content. The standard list avatar is 40px; align row text to the same keyline across the list.',
      'An avatar is presentational. If it opens a profile or menu, put it inside an accessible control with a 48px interaction area.',
    ],
  },
  button: {
    title: 'Buttons',
    path: 'components/buttons.html',
    guidance: [
      'Use flat buttons in dialogs and toolbars. A raised button adds emphasis where the surrounding layout needs a more prominent action.',
      'The standard text button has a 36px visible height, an 88px minimum width, and a 48px touch target. Use concise action labels and retain the built-in press feedback.',
      'Reserve a floating action button for the screen’s primary action; give its icon an accessible name.',
    ],
  },
  card: {
    title: 'Cards',
    path: 'components/cards.html',
    guidance: [
      'Group content about one subject. Use a consistent width across a collection while allowing cards to grow with their content.',
      'Make the main destination clear and limit competing secondary actions. A whole-card link needs visible focus and press feedback; avoid nesting buttons inside that link.',
    ],
  },
  checkbox: {
    title: 'Selection controls',
    path: 'components/selection-controls.html',
    guidance: [
      'Use checkboxes for independent choices in a set. A single setting that takes effect immediately is usually better represented by a switch.',
      'Keep a clear label beside each option and make the label part of its interaction area.',
    ],
  },
  chip: {
    title: 'Chips',
    path: 'components/chips.html',
    guidance: [
      'Represent a compact entity, attribute, or selected value. Keep chip text short; use a card or list row for richer content.',
      'Chips are 32px high. When deletion is available, make the delete action distinguishable and keyboard accessible.',
    ],
  },
  'date-picker': {
    title: 'Pickers',
    path: 'components/pickers.html',
    guidance: [
      'Use a calendar when the relationship between days helps someone choose a date. Distinguish today from the selected day.',
      'Keep selection provisional until confirmation, with clear Cancel and OK actions. Disable unavailable dates consistently.',
    ],
  },
  dialog: {
    title: 'Dialogs',
    path: 'components/dialogs.html',
    guidance: [
      'Interrupt the current task only when a focused decision is needed. Use a clear title, concise content, and at most two related actions.',
      'In a left-to-right dialog, place the dismissive action before the affirmative action. Name the outcome, such as Save, rather than using an ambiguous response.',
      'Keep keyboard focus inside the open dialog and return it to the trigger on dismissal.',
    ],
  },
  drawer: {
    title: 'Navigation drawer',
    path: 'patterns/navigation-drawer.html',
    guidance: [
      'Use a temporary drawer over content on small screens and a persistent navigation surface when desktop space permits.',
      'Navigation rows and subheaders are 48px high with 14px medium labels. Use 8px spacing around groups and dividers, and identify the current destination.',
    ],
  },
  dropdown: {
    title: 'Text fields',
    path: 'components/text-fields.html',
    guidance: [
      'Use a labeled dropdown to choose one value from a defined set. Keep the selected value visible when the options close.',
      'Keep options concise. If a choice needs lengthy explanation or a separate confirmation, consider a selection dialog instead.',
    ],
  },
  'font-icon': {
    title: 'Icons',
    path: 'style/icons.html',
    guidance: [
      'Use the 24px system icon grid and consistent optical alignment. A glyph’s visible size is separate from its control’s 48px interaction area.',
      'On light surfaces, standard active icons use 54% black and inactive icons use 38%. Brand color can indicate an emphasized action or state.',
    ],
  },
  input: {
    title: 'Text fields',
    path: 'components/text-fields.html',
    guidance: [
      'Labels identify a field throughout entry; a placeholder alone is insufficient. Keep helper text concise and describe how to resolve an error.',
      'Align related fields to common keylines. Multiline text uses the same type family as other fields, while its content area grows vertically.',
    ],
  },
  list: {
    title: 'Lists',
    path: 'components/lists.html',
    guidance: [
      'Keep row content consistent and align icons, avatars, and text to common keylines. Use secondary text only when it helps distinguish items.',
      'The primary action occupies the row. Put separate secondary actions in their own controls, and provide focus and ripple feedback for interactive rows.',
      'Navigation rows use 14px medium labels; ordinary content lists use their own body-text metrics. Avoid treating every informational row as an action.',
    ],
  },
  menu: {
    title: 'Menus',
    path: 'components/menus.html',
    guidance: [
      'Menus present brief contextual choices near their trigger. Use a navigation drawer or other persistent navigation pattern for top-level destinations.',
      'Use short, single-line labels and dismiss the menu after a single selection. If choices need wrapping or extensive explanation, use a dialog.',
    ],
  },
  overlay: {
    title: 'Dialogs',
    path: 'components/dialogs.html',
    guidance: [
      'A backdrop establishes separation between a modal surface and the underlying screen. It accompanies a dialog or temporary drawer rather than being a standalone task.',
      'Prefer Dialog or Drawer for complete modal interactions. A custom composition must provide an accessible name, focus containment, and a clear dismissal path.',
    ],
  },
  'progress-bar': {
    title: 'Progress and activity',
    path: 'components/progress-activity.html',
    guidance: [
      'Use a determinate indicator when the amount of work is known, and an indeterminate indicator when it is unknown. The examples show separate operations.',
      'Use one indicator per operation. Keep determinate progress moving forward and label the operation so its meaning does not depend on motion alone.',
    ],
  },
  radio: {
    title: 'Selection controls',
    path: 'components/selection-controls.html',
    guidance: [
      'Use a radio group for one choice among mutually exclusive options. Show alternatives together when comparing them helps the decision.',
      'Label both the group and its options. Use a dropdown when the available space or number of choices makes an inline group impractical.',
    ],
  },
  ripple: {
    title: 'Material motion',
    path: 'motion/material-motion.html',
    guidance: [
      'Use ink feedback to connect a press to the surface receiving it. Keep the effect contained by that surface’s shape.',
      'Ripple is visual feedback, not an interaction by itself. Attach it to an accessible button or link and retain visible keyboard focus.',
    ],
  },
  slider: {
    title: 'Sliders',
    path: 'components/sliders.html',
    guidance: [
      'Continuous sliders work well for subjective adjustments such as volume. Use a discrete slider with stops and a value label when choosing among fixed values.',
      'Keep the thumb’s larger interaction area even though its visible circle is smaller. Provide a meaningful label and keyboard adjustment.',
    ],
  },
  snackbar: {
    title: 'Snackbars and toasts',
    path: 'components/snackbars-toasts.html',
    guidance: [
      'Show brief, non-blocking feedback at the bottom of the screen, one snackbar at a time. Let it disappear after an appropriate interval.',
      'Offer zero or one useful action, such as Undo. Do not add Dismiss or Cancel actions, icons, or a second action; Undo must actually reverse the change.',
      'Keep essential actions available elsewhere after the message expires.',
    ],
  },
  switch: {
    title: 'Selection controls',
    path: 'components/selection-controls.html',
    guidance: [
      'Use a switch for a single setting with an immediate on/off effect. Describe the setting itself in its label.',
      'Use checkboxes for independent selections in a set and radios for mutually exclusive choices.',
    ],
  },
  table: {
    title: 'Data tables',
    path: 'components/data-tables.html',
    guidance: [
      'Use tables for comparable values organized into consistent columns. Left-align descriptive text and right-align numeric headers and values.',
      'Keep row selection distinct from sorting or other actions. On narrow screens, contain horizontal scrolling inside the table instead of widening the page.',
    ],
  },
  tabs: {
    title: 'Tabs',
    path: 'components/tabs.html',
    guidance: [
      'Group related peer views. Use short, centered labels and an indicator to identify the selected view; tabs should not submit actions.',
      'Keep labels concise and centered. M1 text-only tabs are 48px high, with minimum widths of 72px on small screens and 160px on larger screens.',
      'The fixed option deliberately shares all available width, overriding the default width bounds. Prefer short, single-line labels; automatic two-line label sizing is not provided.',
    ],
  },
  'time-picker': {
    title: 'Pickers',
    path: 'components/pickers.html',
    guidance: [
      'Use the clock face for selecting a specific time, with separate hour and minute steps and an explicit confirmation.',
      'Choose the 12-hour or 24-hour format to suit the user’s preferences. The application supplies that preference; the component does not infer it automatically.',
    ],
  },
  tooltip: {
    title: 'Tooltips',
    path: 'components/tooltips.html',
    guidance: [
      'Use short, plain text to clarify an interactive control on hover, focus, or touch long-press. Tooltips do not contain links or other controls.',
      'Give the trigger its own accessible name. A tooltip supplements that name and should not carry instructions essential to completing the task.',
    ],
  },
};
