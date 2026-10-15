import type { ComponentSlug } from './catalog';

/** Behavior guidance is reviewed alongside the generated, source-derived API contract. */
export const componentState: Record<ComponentSlug, string[]> = {
  'app-bar': [
    'AppBar has no form value. Your application owns navigation and actions through onLeftIconClick and onRightIconClick.',
    'scrollHide manages its own visibility from window scrolling. fixed controls positioning, not a controlled open state.',
  ],
  autocomplete: [
    'AutocompleteRoot supports value/defaultValue/onValueChange for selection and inputValue/onInputValueChange for search. It accepts object values, custom equality, multiple selection, externally filtered items, and controlled open state. AutocompleteLabel labels the search input; supply htmlFor when overriding the input id.',
    'Pass value and onChange for controlled selection, or defaultValue for an uncontrolled field. Set multiple={false} for a string; multiple selection accepts an array of strings or a record of selected labels. The exported union types describe each callback signature.',
    'The query is independent of selection. Omit query to let the component manage typed text, or supply query and onQueryChange to control it. Use name and form for native submission of selected IDs; reset restores defaultValue. open and onOpenChange optionally control the suggestion popup.',
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
    'Pass checked and onChange for controlled state, or defaultChecked for an uncontrolled native checkbox. Both models support form submission; reset restores the uncontrolled default. indeterminate announces a partial selection.',
    'The change callback receives the next boolean first and the input click event second. Its ref exposes focus(), blur(), and inputElement.',
  ],
  chip: [
    'Chips do not remove themselves. Handle onDeleteClick by removing the chip’s item from your application state; deletable only exposes the delete action.',
    'Use disabled to prevent actions and deleteLabel to give the delete button a useful accessible name.',
  ],
  'date-picker': [
    'Pass a Date as value and update it in onChange, or use defaultValue for uncontrolled selection and form reset. The dialog keeps a draft selection until confirmation; autoOk confirms a day selection immediately.',
    'The input manages opening and closing internally, optionally initialized by defaultOpen. Use open and onOpenChange for strict controlled visibility. Changes to the legacy active prop synchronize internal visibility; onDismiss reports dismissal. DatePickerDialog can be used directly when your application owns the whole dialog lifecycle.',
  ],
  dialog: [
    'DialogRoot supports open/onOpenChange or defaultOpen. Its Trigger and Close parts handle opening and dismissal automatically. Content accepts Radix focus, Escape, and outside-interaction callbacks; preventing an event cancels the default behavior. Portal accepts a container, and Title/Description provide automatic accessible relationships.',
    'Dialog visibility is controlled by active. Set it to false in your dismissal or action handlers. Escape and overlay callbacks report interaction; they do not change your state for you.',
    'delay is the exit lifecycle delay, not an automatic dismissal timeout. Keep it aligned with the exit motion when customizing animation.',
  ],
  drawer: [
    'DrawerRoot supports open/onOpenChange or defaultOpen. Choose left or right on DrawerContent. Trigger, Close, Title, Description, and Portal compose independently; nested dialogs share Radix focus and dismissal handling.',
    'Drawer visibility is controlled by active. Close it from onOverlayClick or onEscKeyDown by updating your own state. withOverlay and insideTree change how it is presented.',
    'delay preserves the surface while its exit animation completes; it does not automatically close an open drawer.',
  ],
  dropdown: [
    'DropdownRoot supports value/defaultValue/onValueChange and open/defaultOpen/onOpenChange. Compound option values are strings; use name for form submission. DropdownContent forwards Radix positioning, collision, and focus options. DropdownSelection displays the selected option text.',
    'Use value and onChange for controlled selection, or defaultValue for an uncontrolled field. name, form, and required support native submission, validation, and reset. Use open and onOpenChange for controlled popup visibility, or defaultOpen to initialize it.',
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
    'DropdownMenuRoot is the primitive-backed composition API. It supports open/defaultOpen/onOpenChange, portaled submenus, collision handling, and slotted triggers/items. CheckboxItem uses checked/onCheckedChange; RadioGroup uses value/onValueChange. Prevent onSelect to keep an item’s menu open.',
    'Menu and IconMenu support open/onOpenChange for controlled visibility, or defaultOpen for internal visibility. Legacy active synchronizes changes into internal state. Update selected from onSelect for the original single-selection API.',
    'IconMenu accepts a custom trigger element. MenuCheckboxItem supports checked/defaultChecked/onCheckedChange. MenuRadioGroup supports value/defaultValue/onValueChange. These selection items stay open by default; closeOnSelect overrides that behavior. Prevent the item click event to cancel selection and dismissal.',
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
    'RadioGroup supports value/onChange or defaultValue for native uncontrolled selection. Each RadioButton supplies its own value; the group shares its name and disabled state through wrappers and fragments.',
    'A standalone RadioButton supports checked/onChange or defaultChecked. Native radios provide keyboard navigation, form submission and reset.',
  ],
  ripple: [
    'useRipple owns short-lived pointer feedback internally. Spread its event handlers onto your interactive element and render its ripple output inside that element. The hook does not perform an application action or manage selection.',
    'rippleFactory(options)(Component) and Ripple(options)(Component) are optional decorators. Define the enhanced component outside render. Enhanced components accept RippleProps in addition to their original props.',
  ],
  slider: [
    'Pass value and onChange for controlled values, or defaultValue for an uncontrolled slider. name and form submit the numeric value; form reset restores the default. Controlled values remain authoritative.',
    'onChange reports live changes; onValueCommit reports a completed drag, keyboard change, or edited value. Use it for expensive updates. onDragStart/onDragStop report pointer interaction. RTL reverses horizontal keys and track movement. Keep min, max, step, and value consistent with your domain.',
  ],
  snackbar: [
    'Snackbar visibility is controlled by active. onTimeout asks your application to dismiss it after timeout milliseconds; update active in that handler. A timeout of 0 disables automatic timeout reporting.',
    'Handle the action through onClick. delay keeps the snackbar mounted for its exit transition and is separate from timeout.',
  ],
  switch: [
    'Pass checked/onChange for controlled state or defaultChecked for an uncontrolled native switch. name, form, submission, and reset work as for a native checkbox.',
    'The callback receives the next boolean and the input click event. The ref exposes focus(), blur(), and inputElement.',
  ],
  table: [
    'TableRoot uses selectionMode and selected/defaultSelected/onSelectionChange with stable string row values. TableRow reads this context through custom wrappers. Select-all affects mounted, enabled rows and preserves selections outside the current view. TableHeader supplies header-cell semantics through custom components.',
    'Table derives selection from each TableRow selected prop. Handle onRowSelect by updating those row props; it receives row indices, so preserve your own stable item identifiers when sorting or filtering data.',
    'selectable adds selection controls; multiSelectable enables multiple selected rows. Set selectable={false} for a table with no selection interaction.',
  ],
  tabs: [
    'TabsRoot uses stable string value/defaultValue/onValueChange. Compose List, Trigger, and Content through any wrapper; each Trigger and Content shares a value. activationMode controls keyboard selection; List controls loop, and Content forceMount preserves inactive panels. Optional TabsIndicator follows the rendered active trigger.',
    'Use index/onChange for controlled selection, or defaultIndex for internal selection. activationMode="manual" moves keyboard focus without loading a new panel until Enter or Space; the default automatic mode activates as focus moves. Set loop={false} to stop at the ends.',
    'The default hideMode="unmounted" unmounts inactive tab contents. Use hideMode="display" to preserve child component state while hiding inactive panels.',
  ],
  'time-picker': [
    'Use value/onChange for a controlled Date or defaultValue for internal selection and native form reset. The dialog edits a draft time until confirmation.',
    'Use open/onOpenChange for strict controlled visibility, or defaultOpen for internal visibility. Changes to legacy active synchronize internal state; onDismiss reports dismissal. format selects the 12-hour or 24-hour clock presentation.',
  ],
  tooltip: [
    'TooltipRoot supports open/defaultOpen/onOpenChange. TooltipProvider shares delayDuration and skipDelayDuration across roots. Trigger and Content accept Radix composition props; touchDelay and touchDuration control the M1 long-press hint. Keep tooltip content supplemental.',
    'useTooltip manages visibility from hover, focus, and touch interactions. Pass tooltip content and spread triggerProps onto the trigger, then render its tooltip output. The hook itself has no controlled open prop; use TooltipRoot when you need one.',
    'Tooltip(Component) and tooltipFactory(options)(Component) create enhanced components; define them outside render. Their tooltip props override factory defaults. Keep essential information visible elsewhere, since tooltips are supplemental.',
  ],
};
