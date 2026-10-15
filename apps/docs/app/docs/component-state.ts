import type { ComponentSlug } from './catalog';

/** Behavior guidance is reviewed alongside the generated, source-derived API contract. */
export const componentState: Record<ComponentSlug, string[]> = {
  'app-bar': [
    'AppBar has no form value. Your application owns navigation and actions through onLeftIconClick and onRightIconClick.',
    'scrollHide manages its own visibility from window scrolling. fixed controls positioning, not a controlled open state.',
  ],
  autocomplete: [
    'Selection is controlled: pass value and update it in onChange. Set multiple={false} for a string; multiple selection accepts an array of strings or a record of selected labels. The exported union types describe each callback signature.',
    'The query is independent of selection. Omit query to let the component manage typed text, or supply query and onQueryChange to control it. There is no defaultValue selection API.',
  ],
  avatar: [
    'Avatar renders the supplied image, icon, title, or children. It has no controlled or uncontrolled selection state.',
  ],
  button: [
    'Button and IconButton do not store application state. Handle onClick and pass disabled or other presentation props from your state.',
    'BrowseButton uses the browser’s file input. Read the selected files from the input event in onChange; file selection cannot be assigned with a value prop. inputRef gives access to the native input when you need to clear it.',
  ],
  card: [
    'Card and its content components are presentational. Compose buttons or other controls inside CardActions to manage application state.',
  ],
  checkbox: [
    'Checkbox is controlled: pass checked and update it with the boolean received by onChange. checked defaults to false. Do not use defaultChecked as a substitute for checked; the component renders its checked prop.',
    'The change callback receives the next boolean first and the input click event second. Its ref exposes focus(), blur(), and inputElement.',
  ],
  chip: [
    'Chips do not remove themselves. Handle onDeleteClick by removing the chip’s item from your application state; deletable only exposes the delete action.',
    'Use disabled to prevent actions and deleteLabel to give the delete button a useful accessible name.',
  ],
  'date-picker': [
    'The selected date is controlled: pass a Date as value and update it in onChange. There is no defaultValue API. The dialog keeps a draft selection until confirmation; autoOk confirms a day selection immediately.',
    'The input manages opening and closing internally. Changes to active synchronize its open state; onDismiss reports dismissal. DatePickerDialog can be used directly when your application owns the whole dialog lifecycle.',
  ],
  dialog: [
    'Dialog visibility is controlled by active. Set it to false in your dismissal or action handlers. Escape and overlay callbacks report interaction; they do not change your state for you.',
    'delay is the exit lifecycle delay, not an automatic dismissal timeout. Keep it aligned with the exit motion when customizing animation.',
  ],
  drawer: [
    'Drawer visibility is controlled by active. Close it from onOverlayClick or onEscKeyDown by updating your own state. withOverlay and insideTree change how it is presented.',
    'delay preserves the surface while its exit animation completes; it does not automatically close an open drawer.',
  ],
  dropdown: [
    'Dropdown selection is controlled by value and onChange. The component manages the popup and keyboard highlight internally. There is no defaultValue API.',
    'When allowBlank is false, the first enabled source item is displayed if value does not match an item. Keep your application value synchronized explicitly; this fallback does not emit a selection change.',
  ],
  'font-icon': [
    'FontIcon renders its value or children. It has no application state. Supply an accessible label when the icon communicates meaning without visible text.',
  ],
  input: [
    'Input supports both models. Pass value and onChange for a controlled field. Omit value and use defaultValue for an uncontrolled field; changing defaultValue later does not replace the current user input.',
    'onChange receives the text value first and the native React change event second. Keep a field controlled or uncontrolled throughout its lifetime. The same behavior applies when multiline renders a textarea.',
  ],
  layout: [
    'Layout and Panel structure the page. Your application owns NavDrawer and Sidebar active and pinned props; permanentAt applies the selected responsive breakpoint automatically.',
    'Panel uses document scrolling by default (bodyScroll). Set bodyScroll to false only when the panel needs its own scroll container.',
  ],
  list: [
    'List and ListItem do not store a selected item. Use your own selection state and item handlers. selectable enables interaction feedback; ripple enables pointer ink feedback.',
    'ListCheckbox is controlled through checked and onChange. Update the checked prop with the callback’s next boolean.',
  ],
  menu: [
    'Menu visibility and selected value are controlled through active and selected. Update selected from onSelect; use onHide to close a controlled popup. Selection and visibility are separate.',
    'IconMenu manages trigger opening and dismissal internally and synchronizes changes to active. Its selected value remains controlled. The ref exposes open(), close(), and node for imperative integration.',
  ],
  overlay: [
    'Overlay visibility is controlled through active. Close it from your own click or Escape handler. lockScroll controls background scrolling while active.',
    'Use Dialog or Drawer for a complete modal surface with its own keyboard and focus handling. Overlay is the lower-level backdrop building block.',
  ],
  'progress-bar': [
    'ProgressBar never advances a value itself. Use mode="determinate" with value, min, and max for measured progress. buffer describes buffered progress for the linear indicator.',
    'The default indeterminate mode communicates ongoing work without a known amount. Give the indicator an accessible name in either mode.',
  ],
  radio: [
    'RadioGroup is controlled: pass value and update it from onChange. Each RadioButton supplies its own value; the group computes checked state and shares the name and disabled state.',
    'A standalone RadioButton uses checked and onChange directly. There is no uncontrolled group selection API.',
  ],
  ripple: [
    'useRipple owns short-lived pointer feedback internally. Spread its event handlers onto your interactive element and render its ripple output inside that element. The hook does not perform an application action or manage selection.',
    'rippleFactory(options)(Component) and Ripple(options)(Component) are optional decorators. Define the enhanced component outside render. Enhanced components accept RippleProps in addition to their original props.',
  ],
  slider: [
    'Slider is controlled: pass value and update it in onChange. The thumb cannot retain a new value if the parent does not update value. There is no defaultValue API.',
    'onDragStart and onDragStop describe pointer interaction, while onChange also reports keyboard and editable-input changes. Keep min, max, step, and value consistent with your domain.',
  ],
  snackbar: [
    'Snackbar visibility is controlled by active. onTimeout asks your application to dismiss it after timeout milliseconds; update active in that handler. A timeout of 0 disables automatic timeout reporting.',
    'Handle the action through onClick. delay keeps the snackbar mounted for its exit transition and is separate from timeout.',
  ],
  switch: [
    'Switch is controlled: pass checked and update it with the boolean received by onChange. checked defaults to false; defaultChecked does not replace the controlled checked prop.',
    'The callback receives the next boolean and the input click event. The ref exposes focus(), blur(), and inputElement.',
  ],
  table: [
    'Table derives selection from each TableRow selected prop. Handle onRowSelect by updating those row props; it receives row indices, so preserve your own stable item identifiers when sorting or filtering data.',
    'selectable adds selection controls; multiSelectable enables multiple selected rows. Set selectable={false} for a table with no selection interaction.',
  ],
  tabs: [
    'Tabs is controlled through index and onChange. Update index when the callback reports a new tab. There is no defaultIndex API.',
    'The default hideMode="unmounted" unmounts inactive tab contents. Use hideMode="display" to preserve child component state while hiding inactive panels.',
  ],
  'time-picker': [
    'TimePicker has a controlled Date value. Update it in onChange; there is no defaultValue API. The dialog edits a draft time until confirmation.',
    'The input manages its own opening and dismissal. Changes to active synchronize that state, and onDismiss reports dismissal. format selects the 12-hour or 24-hour clock presentation.',
  ],
  tooltip: [
    'useTooltip manages visibility from hover, focus, and touch interactions. Pass tooltip content and spread triggerProps onto the trigger, then render its tooltip output. There is no controlled open prop.',
    'Tooltip(Component) and tooltipFactory(options)(Component) create enhanced components; define them outside render. Their tooltip props override factory defaults. Keep essential information visible elsewhere, since tooltips are supplemental.',
  ],
};
