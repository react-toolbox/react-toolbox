import type { ComponentType, ReactNode } from 'react';
import { readCompositionSource, type CompositionSlug } from './composition-source';
import path from 'node:path';
import type { ComponentSlug } from './catalog';
import CodeBlock from './code-block';
import DialogComposition from './examples/dialog';
import DrawerComposition from './examples/drawer';
import TabsComposition from './examples/tabs';
import MenuComposition from './examples/menu';
import DropdownComposition from './examples/dropdown';
import AutocompleteComposition from './examples/autocomplete';
import TableComposition from './examples/table';
import TooltipComposition from './examples/tooltip';
import SliderComposition from './examples/slider';
import CalendarComposition from './examples/date-picker';
import SchedulingComposition from './examples/time-picker';
import SheetComposition from './examples/sheet';
import ButtonComposition from './examples/button';
import AvatarComposition from './examples/avatar';
import InputComposition from './examples/input';
import SnackbarComposition from './examples/snackbar';

const examples = {
  button: {
    Component: ButtonComposition,
    registryItem: 'example-recipes',
    note: (
      <>
        Pending actions expose their busy state and prevent repeated submission. The editable example reports success or
        failure and allows another attempt. Pass your application’s save callback to <code>onSave</code>.
      </>
    ),
  },
  avatar: {
    Component: AvatarComposition,
    registryItem: 'example-recipes',
    note: (
      <>
        Compose groups and presence indicators around Avatar. Overflow members retain accessible names, and presence is
        announced as text as well as displayed with color.
      </>
    ),
  },
  input: {
    Component: InputComposition,
    registryItem: 'example-recipes',
    note: (
      <>
        Persistent help, prefix and suffix content, password reveal, validation, and reset compose around Input. The
        editable form’s <code>onSubmitData</code> callback receives <code>FormData</code>; connect it to your
        application or form library.
      </>
    ),
  },
  snackbar: {
    Component: SnackbarComposition,
    registryItem: 'example-snackbar-queue',
    note: (
      <>
        Show one message at a time in arrival order. <code>useSnackbarQueue</code> can track a promise from pending to
        success or failure and returns its original result or error. Queueing remains application behavior in editable
        source.
      </>
    ),
  },
  slider: {
    Component: SliderComposition,
    note: (
      <>
        Compose multiple named thumbs with <code>minStepsBetweenThumbs</code>, or set{' '}
        <code>orientation="vertical"</code>. Values, keyboard direction, and form inputs are managed by Radix.
      </>
    ),
  },
  'date-picker': {
    Component: CalendarComposition,
    note: (
      <>
        <code>CalendarSelection</code> supports single, multiple and range values, multiple months, week numbers,
        unavailable-day predicates and clearing. Keyboard focus moves independently from selection.
      </>
    ),
  },
  'time-picker': {
    Component: SchedulingComposition,
    note: (
      <>
        Compose a local time window with minute steps and bounds. Keep the date and IANA time zone explicit in your
        application’s scheduling data.
      </>
    ),
  },
  sheet: {
    Component: SheetComposition,
    note: (
      <>
        Fractional snap points use the viewport height. The Expand notes and Reduce notes button provides a keyboard
        alternative to dragging the handle. Escape or the Done action dismisses the modal.
      </>
    ),
  },
  dialog: {
    Component: DialogComposition,
    registryItem: 'example-recipes',
    note: (
      <>
        Compose the form, body, and footer independently. <code>DialogRoot</code> coordinates focus and dismissal; close
        it after a successful save.
      </>
    ),
  },
  drawer: {
    Component: DrawerComposition,
    note: (
      <>
        Nest <code>DialogRoot</code> inside a drawer. Escape closes the topmost surface and restores focus to its
        trigger.
      </>
    ),
  },
  tabs: {
    Component: TabsComposition,
    note: (
      <>
        Stable values support custom trigger wrappers and reordered tabs. <code>activationMode="manual"</code> separates
        arrow-key focus from selection; <code>forceMount</code> preserves the draft.
      </>
    ),
  },
  menu: {
    Component: MenuComposition,
    note: (
      <>
        Compose submenus, checkbox items, and radio groups inside <code>DropdownMenuRoot</code>. Prevent{' '}
        <code>onSelect</code> to keep the menu open after selection.
      </>
    ),
  },
  dropdown: {
    Component: DropdownComposition,
    note: (
      <>
        Compose the trigger, selection, groups, and options. Set <code>name</code> on <code>DropdownRoot</code> to
        include its value in the native form.
      </>
    ),
  },
  autocomplete: {
    Component: AutocompleteComposition,
    note: (
      <>
        <code>AutocompleteRoot</code> supports object values and multiple selection with removable chips. Style parts
        with <code>className</code> or use <code>render</code> to substitute their elements.
      </>
    ),
  },
  table: {
    Component: TableComposition,
    registryItem: 'example-recipes',
    note: (
      <>
        Compose native sections and custom rows with <code>TableRoot</code>. Row <code>value</code> keeps selection
        stable through reordering and filtering; header semantics pass through wrappers.
      </>
    ),
  },
  tooltip: {
    Component: TooltipComposition,
    note: (
      <>
        <code>TooltipProvider</code> shares hover delays across triggers. Each <code>TooltipRoot</code> supports
        keyboard descriptions, collision handling, and touch long-press.
      </>
    ),
  },
} satisfies Record<CompositionSlug, { Component: ComponentType; note: ReactNode; registryItem?: string }>;
export function hasCompositionExample(slug: ComponentSlug): slug is keyof typeof examples {
  return slug in examples;
}
export default async function CompositionPreview({ slug }: { slug: keyof typeof examples }) {
  const example = examples[slug];
  const { Component, note } = example;
  const registryItem = 'registryItem' in example ? example.registryItem : undefined;
  const source = await readCompositionSource(slug, path.join(process.cwd(), 'app/docs/examples'));
  return (
    <div className="space-y-6">
      <p className="text-toolbox-body/6 text-toolbox-text">{note}</p>
      {registryItem && (
        <CodeBlock
          language="Terminal"
          label={`Install ${slug} composition`}
          code={`pnpm dlx shadcn@latest add https://react-toolbox.io/r/${registryItem}.json`}
        />
      )}
      <div
        data-composition-example={slug}
        className="rounded border border-toolbox-divider bg-white p-4 @min-[600px]/article:p-6"
      >
        <Component />
      </div>
      <details>
        <summary className="cursor-pointer py-3 text-toolbox-body font-medium text-toolbox-primary focus-visible:outline-2 focus-visible:outline-offset-2">
          Show composition code
        </summary>
        <CodeBlock label={`${slug} composition`} code={source} />
      </details>
    </div>
  );
}
