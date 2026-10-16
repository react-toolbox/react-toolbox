import type { ReactNode } from 'react';
import type { ComponentSlug } from './catalog';

/** Behavior guidance complements the examples and source-derived API contract. */
export const componentState: Partial<Record<ComponentSlug, ReactNode>> = {
  sheet: (
    <ul>
      <li>
        <code>SheetRoot</code> accepts Vaul’s <code>open</code>/<code>onOpenChange</code>, <code>direction</code>,{' '}
        <code>snapPoints</code>, <code>activeSnapPoint</code>/<code>setActiveSnapPoint</code>, and{' '}
        <code>dismissible</code> options.
      </li>
      <li>
        Use <code>SheetHandle</code> for drag and keyboard resizing; always provide a visible close action.{' '}
        <code>SheetNestedRoot</code> coordinates sheets opened from another sheet.
      </li>
      <li>
        The parts forward primitive refs, events, and styling props.{' '}
        <a href="https://vaul.emilkowal.ski/api" className="text-toolbox-primary underline">
          Full primitive API
        </a>
        .
      </li>
    </ul>
  ),
  autocomplete: (
    <ul>
      <li>
        Control selection with <code>value</code>/<code>onChange</code>, or use <code>defaultValue</code> for internal
        state and form reset. <code>name</code> and <code>form</code> submit the selected IDs.
      </li>
      <li>
        Search text is independent: <code>query</code>/<code>onQueryChange</code> controls it. The popup manages its own
        visibility unless you supply <code>open</code>/<code>onOpenChange</code>.
      </li>
      <li>
        When overriding <code>AutocompleteInput</code>'s <code>id</code>, set the matching <code>htmlFor</code> on{' '}
        <code>AutocompleteLabel</code>.
      </li>
    </ul>
  ),
  button: (
    <p>
      <code>BrowseButton</code> reports files through <code>onChange</code>'s input event. File selection cannot be set
      with <code>value</code>; use <code>inputRef</code> to clear the native input.
    </p>
  ),
  checkbox: (
    <p>
      Use <code>checked</code>/<code>onChange</code> for controlled state, or <code>defaultChecked</code> for native
      form state and reset. <code>onChange</code> receives the next boolean, then the input click event.
    </p>
  ),
  chip: (
    <p>
      Remove the item from your collection in <code>onDeleteClick</code>. <code>deletable</code> exposes the action; the
      chip does not remove itself.
    </p>
  ),
  'date-picker': (
    <ul>
      <li>
        Use <code>value</code>/<code>onChange</code>, or <code>defaultValue</code> for internal state and form reset.
        The dialog edits a draft until confirmation; <code>autoOk</code> confirms a day selection immediately.
      </li>
      <li>
        Visibility is internal by default. Use <code>defaultOpen</code> to initialize it or <code>open</code>/
        <code>onOpenChange</code> to control it. Changes to legacy <code>active</code> synchronize internal state;{' '}
        <code>onDismiss</code> reports dismissal.
      </li>
    </ul>
  ),
  dialog: (
    <ul>
      <li>
        With <code>Dialog</code>, set <code>active</code> to false in your action, <code>onEscKeyDown</code>, or{' '}
        <code>onOverlayClick</code> handler. These callbacks do not close it automatically.
      </li>
      <li>
        <code>delay</code> keeps the surface mounted for its exit animation. It is not a dismissal timeout.
      </li>
    </ul>
  ),
  drawer: (
    <p>
      Close <code>Drawer</code> by setting <code>active</code> to false in <code>onOverlayClick</code> or{' '}
      <code>onEscKeyDown</code>. <code>delay</code> preserves the exit animation; it does not close an open drawer.
    </p>
  ),
  dropdown: (
    <ul>
      <li>
        Use <code>value</code>/<code>onChange</code>, or <code>defaultValue</code> for internal state and form reset.{' '}
        <code>name</code>, <code>form</code>, and <code>required</code> support native forms. Visibility accepts{' '}
        <code>open</code>/<code>onOpenChange</code> or <code>defaultOpen</code>.
      </li>
      <li>
        With <code>{'allowBlank={false}'}</code>, an unmatched value displays the first enabled option. This fallback
        does not call <code>onChange</code> or update your value.
      </li>
    </ul>
  ),
  input: (
    <ul>
      <li>
        Use <code>value</code>/<code>onChange</code> for controlled input, or <code>defaultValue</code> for native form
        state and reset. Changing the default does not replace edited text. Keep the same state model throughout the
        field's lifetime.
      </li>
      <li>
        <code>onChange</code> receives the text value, then the React change event, including with{' '}
        <code>multiline</code>.
      </li>
    </ul>
  ),
  list: (
    <p>
      <code>selectable</code> adds interaction feedback; your application owns selection. For <code>ListCheckbox</code>,
      update <code>checked</code> from <code>onChange</code>'s next boolean.
    </p>
  ),
  menu: (
    <ul>
      <li>
        <code>Menu</code> and <code>IconMenu</code> use <code>open</code>/<code>onOpenChange</code> or{' '}
        <code>defaultOpen</code>. Changes to legacy <code>active</code> synchronize internal visibility. Update{' '}
        <code>selected</code> from <code>onSelect</code> for single selection.
      </li>
      <li>
        <code>MenuCheckboxItem</code> and <code>MenuRadioItem</code> stay open unless <code>closeOnSelect</code> is
        true. Prevent the item click event to cancel selection and dismissal. In the composition API, prevent{' '}
        <code>onSelect</code> to keep an item open.
      </li>
    </ul>
  ),
  overlay: (
    <p>
      Set <code>active</code> to false in your click or Escape handler to dismiss the overlay. Use{' '}
      <code>lockScroll</code> to control background scrolling while it is active.
    </p>
  ),
  radio: (
    <p>
      <code>RadioGroup</code> accepts <code>value</code>/<code>onChange</code> or <code>defaultValue</code>. A
      standalone <code>RadioButton</code> accepts <code>checked</code>/<code>onChange</code> or{' '}
      <code>defaultChecked</code>. Both support native form submission and reset.
    </p>
  ),
  slider: (
    <ul>
      <li>
        Use <code>value</code>/<code>onChange</code>, or <code>defaultValue</code> for internal state and form reset.{' '}
        <code>name</code> and <code>form</code> submit the numeric value.
      </li>
      <li>
        <code>onChange</code> reports live values. Use <code>onValueCommit</code> for expensive work after a drag,
        keyboard change, or edited value is committed. <code>onDragStart</code>/<code>onDragStop</code> only report
        pointer interaction.
      </li>
    </ul>
  ),
  snackbar: (
    <p>
      Set <code>active</code> to false in <code>onTimeout</code> to dismiss the snackbar. The default{' '}
      <code>{'timeout={0}'}</code> disables that callback. <code>delay</code> controls the exit transition separately;{' '}
      <code>onClick</code> handles the action.
    </p>
  ),
  switch: (
    <p>
      Use <code>checked</code>/<code>onChange</code> for controlled state, or <code>defaultChecked</code> for native
      form state and reset. <code>onChange</code> receives the next boolean, then the input click event.
    </p>
  ),
  table: (
    <ul>
      <li>
        <code>TableRoot</code> uses stable row values with <code>selected</code>/<code>onSelectionChange</code> or{' '}
        <code>defaultSelected</code>. Select-all affects mounted, enabled rows and preserves selections outside the
        current view.
      </li>
      <li>
        <code>Table</code>'s <code>onRowSelect</code> returns row indices. Update each <code>TableRow</code>'s{' '}
        <code>selected</code> prop and map indices to your stable item IDs when sorting or filtering.
      </li>
    </ul>
  ),
  tabs: (
    <ul>
      <li>
        <code>Tabs</code> accepts <code>index</code>/<code>onChange</code> or <code>defaultIndex</code>. Keyboard focus
        activates tabs by default; <code>activationMode="manual"</code> waits for Enter or Space.
      </li>
      <li>
        Inactive content unmounts by default. Use <code>hideMode="display"</code> to preserve child state, or{' '}
        <code>forceMount</code> on <code>TabsContent</code> in the composition API.
      </li>
    </ul>
  ),
  'time-picker': (
    <ul>
      <li>
        Use <code>value</code>/<code>onChange</code>, or <code>defaultValue</code> for internal state and form reset.
        The dialog edits a draft time until confirmation.
      </li>
      <li>
        Visibility is internal by default. Use <code>defaultOpen</code> to initialize it or <code>open</code>/
        <code>onOpenChange</code> to control it. Changes to legacy <code>active</code> synchronize internal state;{' '}
        <code>onDismiss</code> reports dismissal.
      </li>
    </ul>
  ),
  tooltip: (
    <p>
      <code>useTooltip</code> manages hover, focus, and touch visibility internally. For controlled visibility, use{' '}
      <code>TooltipRoot</code> with <code>open</code>/<code>onOpenChange</code>.
    </p>
  ),
};
