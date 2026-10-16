const supportingImports: Record<string, string> = Object.fromEntries(
  ['dialog', 'drawer', 'overlay', 'snackbar'].map((slug) => [
    slug,
    "import { Button } from '@/components/ui/material/button';\n",
  ]),
);
supportingImports.list = "import { FontIcon } from '@/components/ui/material/font-icon';\n";

// These examples compose families that are not already registry dependencies.
export const exampleDependencies: Partial<Record<ComponentSlug, readonly string[]>> = {
  dialog: ['button', 'input'],
  drawer: ['button', 'dialog', 'input'],
  tabs: ['input'],
  menu: ['button'],
  dropdown: ['button'],
  autocomplete: ['button'],
  table: ['button'],
  overlay: ['button'],
  tooltip: ['button'],
};

function example(slug: string, imports: string, body: string, state = '') {
  return `'use client';\n\n${state ? "import { useState } from 'react';\n" : ''}import { ${imports} } from '@/components/ui/material/${slug}';\n${supportingImports[slug] ?? ''}\nexport default function Example() {\n${state ? `  ${state}\n\n` : ''}  return (\n${body
    .split('\n')
    .map((line) => `    ${line}`)
    .join('\n')}\n  );\n}`;
}

export const components = [
  {
    slug: 'app-bar',
    title: 'App bar',
    description: 'A home for the title, navigation, and actions of a screen.',
    icon: 'web_asset',
    code: example(
      'app-bar',
      'AppBar',
      '<div>\n  <AppBar title="My collection" leftIcon="menu" leftIconLabel="Open navigation"\n    onLeftIconClick={() => setMessage("Navigation opened")} />\n  <p role="status">{message || "Try the navigation icon."}</p>\n</div>',
      'const [message, setMessage] = useState("");',
    ),
    note: (
      <>
        Use <code>leftIcon</code> and <code>rightIcon</code> with their click handlers for navigation and actions. Name
        these buttons with <code>leftIconLabel</code> and <code>rightIconLabel</code>. Set <code>fixed</code> when the
        bar should stay at the top of the viewport.
      </>
    ),
  },
  {
    slug: 'autocomplete',
    title: 'Autocomplete',
    description: 'Suggestions that help people find and select a value.',
    icon: 'manage_search',
    code: example(
      'autocomplete',
      'Autocomplete',
      '<Autocomplete label="Country" multiple={false}\n  source={["Spain", "France", "Japan"]}\n  value={country} onChange={setCountry} />',
      'const [country, setCountry] = useState("");',
    ),
    note: (
      <>
        Use <code>{'multiple={false}'}</code> for a single string value. Multiple selection uses an array of strings and
        displays selected values as chips. Use <code>defaultValue</code> and <code>name</code> for native forms.
        Structured options accept <code>value</code>, <code>label</code>, <code>textValue</code>, <code>disabled</code>,
        and <code>group</code>. Control search text with <code>query</code>/<code>onQueryChange</code>; use{' '}
        <code>suggestionMatch="disabled"</code> for server-filtered results, <code>loading</code>/
        <code>loadingMessage</code> and <code>emptyMessage</code> for status, and <code>clearable</code> for clearing
        selection.
      </>
    ),
  },
  {
    slug: 'avatar',
    title: 'Avatar',
    description: 'An image, an icon, or initials to represent a person.',
    icon: 'account_circle',
    code: example(
      'avatar',
      'Avatar',
      '// Add your photo to public/images/javi-and-cora.jpg.\n<div className="flex items-center gap-4">\n  <Avatar image="/images/javi-and-cora.jpg"\n    alt="Javi and Cora" title="Javi and Cora">JC</Avatar>\n  <Avatar title="Javi" aria-label="Javi Velasco" />\n  <Avatar icon="person" aria-label="Guest" />\n</div>',
    ),
    note: (
      <>
        Use <code>image</code> for a picture, <code>icon</code> for a Material Icon, or <code>children</code> for
        initials. A <code>title</code> displays its first initial. Radix handles image loading and shows children, an
        icon, or initials while the image loads or fails. Add an accessible label when the avatar conveys identity.{' '}
        <code>fallbackDelay</code> avoids flashing initials on fast loads; <code>imageProps</code> accepts image
        attributes, and <code>onLoadingStatusChange</code> reports loading or failure.
      </>
    ),
  },
  {
    slug: 'button',
    title: 'Button',
    description: 'Flat, raised, and floating actions with the original Material ripple.',
    icon: 'smart_button',
    code: example(
      'button',
      'Button',
      '<div className="flex flex-wrap items-center gap-4">\n  <Button primary raised label="Save"\n    onClick={() => setSaved(true)} />\n  <Button label="Reset" onClick={() => setSaved(false)} />\n  <span role="status">{saved ? "Saved" : "Ready"}</span>\n</div>',
      'const [saved, setSaved] = useState(false);',
    ),
    note: (
      <>
        Use <code>raised</code> for a primary action, <code>floating</code> for an icon action, and{' '}
        <code>disabled</code> when unavailable. This family also exports <code>IconButton</code> and{' '}
        <code>BrowseButton</code>. Give icon-only buttons an <code>aria-label</code>. <code>asChild</code> composes
        styles, refs, and events onto a router <code>Link</code> or another single ref-forwarding child without nesting
        interactive elements.
      </>
    ),
  },
  {
    slug: 'card',
    title: 'Card',
    description: 'Related content and actions, gathered on a single surface.',
    icon: 'crop_landscape',
    code: example(
      'card',
      'Card, CardTitle, CardText',
      '<Card className="w-full max-w-sm">\n  <CardTitle title="Room for an idea"\n    subtitle="Start with something small." />\n  <CardText>A little space for your next project.</CardText>\n</Card>',
    ),
    note: (
      <>
        Compose <code>CardTitle</code>, <code>CardMedia</code>, <code>CardText</code>, and <code>CardActions</code>{' '}
        inside <code>Card</code>. These parts include Material keyline spacing; avoid adding a second layer of padding
        around them. Give meaningful <code>CardMedia</code> backgrounds <code>alt</code> text, or pass an image element
        with its own <code>alt</code>.
      </>
    ),
  },
  {
    slug: 'checkbox',
    title: 'Checkbox',
    description: 'Select one or more independent options.',
    icon: 'check_box',
    code: example(
      'checkbox',
      'Checkbox',
      '<fieldset className="m-0 border-0 p-0">\n  <legend className="mb-4 text-sm font-medium">Notification channels</legend>\n  <Checkbox label="Email" checked={email} onChange={setEmail} />\n  <Checkbox label="Push notifications" checked={push} onChange={setPush} />\n</fieldset>',
      'const [email, setEmail] = useState(true);\n  const [push, setPush] = useState(false);',
    ),
    note: (
      <>
        Use <code>checked</code> and <code>onChange</code> for controlled state, or <code>defaultChecked</code> with{' '}
        <code>name</code> for native forms and reset. Set <code>indeterminate</code> for a partially selected
        collection. Use a visible <code>label</code>, or supply an <code>aria-label</code> for an otherwise unlabeled
        control.
      </>
    ),
  },
  {
    slug: 'chip',
    title: 'Chip',
    description: 'Compact labels for people, selections, and small pieces of information.',
    icon: 'label',
    code: example(
      'chip',
      'Chip',
      '<div className="flex flex-wrap gap-2">\n  <Chip>Material Design</Chip>\n  {visible && <Chip deletable onDeleteClick={() => setVisible(false)}>\n    TypeScript\n  </Chip>}\n</div>',
      'const [visible, setVisible] = useState(true);',
    ),
    note: (
      <>
        Set <code>deletable</code> and handle <code>onDeleteClick</code> to remove a selection. The parent owns the
        collection and decides what happens after removal.
      </>
    ),
  },
  {
    slug: 'date-picker',
    title: 'Date picker',
    description: 'Choose a date from a familiar Material calendar.',
    icon: 'event',
    code: example(
      'date-picker',
      'DatePicker',
      '<DatePicker label="Start date"\n  value={date} onChange={setDate} />',
      'const [date, setDate] = useState(new Date(2026, 9, 13));',
    ),
    note: (
      <>
        Values are JavaScript <code>Date</code> objects. Use <code>minDate</code> and <code>maxDate</code> to limit the
        range. In the calendar, arrows move by day/week, Home/End move within the week, and PageUp/PageDown move by
        month (hold Shift for years). The registry includes the input, dialog, and supporting components.
      </>
    ),
  },
  {
    slug: 'dialog',
    title: 'Dialog',
    description: 'A focused surface for decisions that need your attention.',
    icon: 'web',
    code: example(
      'dialog',
      'Dialog',
      '<>\n  <Button primary raised label="Open dialog" onClick={() => setActive(true)} />\n  <span role="status">{saved ? "Saved" : "Draft"}</span>\n  <Dialog active={active} title="Save this idea?"\n    onEscKeyDown={() => setActive(false)}\n    onOverlayClick={() => setActive(false)}\n    actions={[\n      { label: "Cancel", onClick: () => setActive(false) },\n      { label: "Save", primary: true, onClick: () => {\n        setSaved(true);\n        setActive(false);\n      } },\n    ]}>\n    You can return to it whenever you are ready.\n  </Dialog>\n</>',
      'const [active, setActive] = useState(false);\n  const [saved, setSaved] = useState(false);',
    ),
    note: (
      <>
        Control visibility with <code>active</code>. Supply a <code>title</code> and handle dismissal using{' '}
        <code>onEscKeyDown</code> and <code>onOverlayClick</code>. <code>Dialog</code> manages focus and restores it to
        the trigger. <code>onOpenAutoFocus</code> and <code>onCloseAutoFocus</code> can prevent the default and focus a
        specific element. <code>portalContainer</code> changes the portal destination.
      </>
    ),
  },
  {
    slug: 'drawer',
    title: 'Drawer',
    description: 'A sliding surface for navigation or supporting content.',
    icon: 'menu_open',
    code: example(
      'drawer',
      'Drawer',
      '<>\n  <Button primary raised label="Open drawer" onClick={() => setActive(true)} />\n  <Drawer active={active} aria-label="Your collection"\n    onEscKeyDown={() => setActive(false)}\n    onOverlayClick={() => setActive(false)}>\n    <div className="space-y-6 p-6">\n      <h2 className="m-0 text-xl font-medium">Your collection</h2>\n      <Button primary label="Close" onClick={() => setActive(false)} />\n    </div>\n  </Drawer>\n</>',
      'const [active, setActive] = useState(false);',
    ),
    note: (
      <>
        Use <code>type="right"</code> for a drawer entering from the right. For responsive navigation that can pin
        beside content, use <code>NavDrawer</code> from the Layout family. <code>onOpenAutoFocus</code>/
        <code>onCloseAutoFocus</code> customize focus for temporary drawers; <code>portalContainer</code> changes their
        destination.
      </>
    ),
  },
  {
    slug: 'dropdown',
    title: 'Dropdown',
    description: 'Pick a single value from a list of options.',
    icon: 'arrow_drop_down_circle',
    code: example(
      'dropdown',
      'Dropdown',
      '<Dropdown label="Destination" value={value}\n  onChange={value => setValue(String(value))}\n  source={[\n    { value: "madrid", label: "Madrid" },\n    { value: "tokyo", label: "Tokyo" },\n    { value: "lisbon", label: "Lisbon" },\n  ]} />',
      'const [value, setValue] = useState("madrid");',
    ),
    note: (
      <>
        Options use <code>value</code> and <code>label</code> by default. Use <code>defaultValue</code> for an
        uncontrolled field; <code>name</code>, <code>form</code>, <code>required</code>, submission, and reset work with
        native forms. Supply <code>valueKey</code> and <code>labelKey</code> for a different data shape, or{' '}
        <code>template</code> for custom option content. <code>group</code>/<code>groupKey</code> adds labeled groups;{' '}
        <code>textValue</code>/<code>textKey</code> supplies plain text for custom content and typeahead.{' '}
        <code>open</code>/<code>onOpenChange</code> controls popup visibility.
      </>
    ),
  },
  {
    slug: 'font-icon',
    title: 'Font icon',
    description: 'The original Material Icons, bundled with your components.',
    icon: 'insert_emoticon',
    code: example(
      'font-icon',
      'FontIcon',
      '<div className="flex gap-6 text-toolbox-primary">\n  <FontIcon value="favorite" aria-label="Favorite" />\n  <FontIcon value="star" aria-label="Star" />\n  <FontIcon value="home" aria-label="Home" />\n</div>',
    ),
    note: (
      <>
        Pass a Material Icon name as <code>value</code>. Mark decorative icons <code>aria-hidden</code>, and give
        meaningful icons an accessible label. The registry includes the local icon font.
      </>
    ),
  },
  {
    slug: 'input',
    title: 'Input',
    description: 'Text fields with floating labels, helper text, and validation.',
    icon: 'text_fields',
    code: example(
      'input',
      'Input',
      '<Input label="Project name" value={name}\n  onChange={setName} hint="Something worth making" />',
      'const [name, setName] = useState("");',
    ),
    note: (
      <>
        <code>onChange</code> receives the value before the event. Use <code>multiline</code> for a text area,{' '}
        <code>error</code> for validation feedback, and <code>maxLength</code> for a character counter.{' '}
        <code>defaultValue</code> supports native form reset, including externally associated forms.
      </>
    ),
  },
  {
    slug: 'layout',
    title: 'Layout',
    description: 'The structure for app bars, navigation drawers, and content panels.',
    icon: 'dashboard',
    code: example(
      'layout',
      'Layout, Panel',
      '<Layout className="min-h-48 w-full">\n  <Panel>\n    <div className="p-6">\n      <h2 className="text-xl">Your workspace</h2>\n      <p className="mt-2">A place for everything.</p>\n    </div>\n  </Panel>\n</Layout>',
    ),
    note: (
      <>
        Compose <code>Layout</code> with <code>Panel</code>, <code>NavDrawer</code>, and <code>Sidebar</code>. Use{' '}
        <code>pinned</code> on a navigation drawer to make room for it in the layout instead of placing it over content.
      </>
    ),
  },
  {
    slug: 'list',
    title: 'List',
    description: 'Rows of related content with icons, captions, and secondary text.',
    icon: 'view_list',
    code: example(
      'list',
      'List, ListItem',
      '<div>\n  <List selectable ripple aria-label="Folders">\n    {["Inbox", "Favorites"].map(folder => (\n      <ListItem key={folder} className="[--list-horizontal-padding:0px]" itemContent={\n        <button type="button" onClick={() => setSelected(folder)}\n          className="flex min-h-12 w-full items-center border-0 bg-transparent px-4 text-left font-[inherit] text-base text-toolbox-text focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-toolbox-primary">\n          <FontIcon value={folder === "Inbox" ? "inbox" : "favorite_border"}\n            aria-hidden className="mr-8 text-toolbox-text-secondary" />\n          {folder}\n        </button>\n      } />\n    ))}\n  </List>\n  <p role="status">Selected: {selected}</p>\n</div>',
      'const [selected, setSelected] = useState("Inbox");',
    ),
    note: (
      <>
        Use <code>caption</code>, <code>legend</code>, and icons for content rows. For actions or navigation,{' '}
        <code>itemContent</code> accepts a native button or router link, preserving keyboard access. <code>List</code>{' '}
        supplies <code>selectable</code> and <code>ripple</code> to its rows; subheaders, dividers, and{' '}
        <code>ListCheckbox</code> are also included.
      </>
    ),
  },
  {
    slug: 'menu',
    title: 'Menu',
    description: 'Contextual actions anchored to an icon button.',
    icon: 'more_vert',
    code: example(
      'menu',
      'IconMenu, MenuItem, MenuDivider',
      '<div className="flex w-48 max-w-full items-center justify-between gap-6">\n  <span role="status">{selected || "More actions"}</span>\n  <IconMenu icon="more_vert" position="topRight"\n  aria-label="More actions" onSelect={value => setSelected(String(value))}>\n  <MenuItem value="download" caption="Download" icon="file_download" />\n  <MenuItem value="share" caption="Share" icon="share" />\n  <MenuDivider />\n  <MenuItem caption="Unavailable" disabled />\n</IconMenu>\n</div>',
      'const [selected, setSelected] = useState("");',
    ),
    note: (
      <>
        <code>IconMenu</code> handles opening, keyboard navigation, and dismissal. Use <code>onSelect</code> to respond
        to an item value. Use <code>trigger</code> for a custom button or link. <code>MenuCheckboxItem</code> and{' '}
        <code>MenuRadioGroup</code>/<code>MenuRadioItem</code> provide selection menus that stay open. Wrappers and
        fragments preserve menu behavior; <code>onClick</code> can prevent selection and dismissal.
      </>
    ),
  },
  {
    slug: 'overlay',
    title: 'Overlay',
    description: 'A dimmed backdrop for content that needs focus.',
    icon: 'layers',
    code: example(
      'overlay',
      'Overlay',
      '<>\n  <Button primary raised label="Show overlay" onClick={() => setActive(true)} />\n  <Overlay active={active}\n    onClick={() => setActive(false)}\n    onEscKeyDown={() => setActive(false)} />\n</>',
      'const [active, setActive] = useState(false);',
    ),
    note: (
      <>
        Click the backdrop or press Escape to close this example. Use <code>Dialog</code> or <code>Drawer</code> for
        modal content that also needs focus management; <code>Overlay</code> supplies the backdrop and scroll lock.
      </>
    ),
  },
  {
    slug: 'progress-bar',
    title: 'Progress bar',
    description: 'Linear and circular indicators with precise Material motion.',
    icon: 'timelapse',
    code: example(
      'progress-bar',
      'ProgressBar',
      '<div className="flex w-full flex-col items-center gap-8">\n  <ProgressBar type="circular" mode="indeterminate"\n    aria-label="Loading" />\n  <ProgressBar mode="determinate" value={65}\n    aria-label="Upload progress" />\n</div>',
    ),
    note: (
      <>
        Use <code>determinate</code> when progress is known, and <code>indeterminate</code> when the duration is
        unknown. <code>min</code> and <code>max</code> define the range. Supply an <code>aria-label</code> describing
        the operation.
      </>
    ),
  },
  {
    slug: 'radio',
    title: 'Radio',
    description: 'Choose exactly one option from a related set.',
    icon: 'radio_button_checked',
    code: example(
      'radio',
      'RadioGroup, RadioButton',
      '<RadioGroup name="delivery" value={value}\n  onChange={value => setValue(value ?? "daily")}\n  aria-label="Delivery frequency">\n  <RadioButton label="Daily" value="daily" />\n  <RadioButton label="Weekly" value="weekly" />\n</RadioGroup>',
      'const [value, setValue] = useState("daily");',
    ),
    note: (
      <>
        Give each <code>RadioButton</code> a distinct <code>value</code> and visible <code>label</code>.{' '}
        <code>RadioGroup</code> keeps a single selected value and shares the input <code>name</code> across the group.
      </>
    ),
  },
  {
    slug: 'ripple',
    title: 'Ripple',
    description: 'Touch feedback that grows from the point of interaction.',
    icon: 'touch_app',
    code: `'use client';\n\nimport { Ripple } from '@/components/ui/material/ripple';\n\nconst RippleButton = Ripple({ passthrough: false })('button');\n\nexport default function Example() {\n  return (\n    <RippleButton className="relative overflow-hidden rounded-toolbox bg-toolbox-primary/10 px-8 py-6 text-toolbox-primary">\n      Click anywhere\n    </RippleButton>\n  );\n}`,
    note: (
      <>
        The host needs <code>relative</code> positioning and <code>overflow-hidden</code>. Buttons and several other
        Toolbox controls already include ripple feedback; no extra wrapper is needed for them.
      </>
    ),
  },
  {
    slug: 'slider',
    title: 'Slider',
    description: 'Adjust a value along a continuous or stepped range.',
    icon: 'tune',
    code: example(
      'slider',
      'Slider',
      '<div className="w-full">\n  <p id="volume-label">Volume: {value}</p>\n  <Slider aria-labelledby="volume-label"\n    min={0} max={100} step={5}\n    value={value} onChange={setValue} />\n</div>',
      'const [value, setValue] = useState(40);',
    ),
    note: (
      <>
        Use <code>pinned</code> for a discrete value label and <code>snaps</code> to snap to step positions. Keep{' '}
        <code>value</code> in state and provide an accessible label.
      </>
    ),
  },
  {
    slug: 'snackbar',
    title: 'Snackbar',
    description: 'Brief feedback about an action, with an optional next step.',
    icon: 'announcement',
    code: example(
      'snackbar',
      'Snackbar',
      '<>\n  <Button primary raised label="Save changes" onClick={() => {\n    setSaved(true);\n    setActive(true);\n  }} />\n  <span role="status">{saved ? "Saved" : "Unsaved"}</span>\n  <Snackbar active={active} label="Your changes are saved."\n    action="Undo" timeout={4000}\n    onClick={() => { setSaved(false); setActive(false); }}\n    onTimeout={() => setActive(false)} />\n</>',
      'const [active, setActive] = useState(false);\n  const [saved, setSaved] = useState(false);',
    ),
    note: (
      <>
        The parent controls <code>active</code>. Handle <code>onTimeout</code> to close after the requested duration and{' '}
        <code>onClick</code> for the action button.
      </>
    ),
  },
  {
    slug: 'switch',
    title: 'Switch',
    description: 'Turn a setting on or off, with an immediate effect.',
    icon: 'toggle_on',
    code: example(
      'switch',
      'Switch',
      '<Switch label="Do not disturb"\n  checked={checked} onChange={setChecked} />',
      'const [checked, setChecked] = useState(true);',
    ),
    note: (
      <>
        Use <code>checked</code> and <code>onChange</code> for controlled state, or <code>defaultChecked</code> with{' '}
        <code>name</code> for native forms and reset. Set <code>indeterminate</code> for a partially selected
        collection. Use a short <code>label</code> that describes the setting rather than the action.
      </>
    ),
  },
  {
    slug: 'table',
    title: 'Table',
    description: 'Structured data with consistent alignment and optional selection.',
    icon: 'table_chart',
    code: example(
      'table',
      'Table, TableHead, TableRow, TableCell',
      '<Table selectable={false}>\n  <TableHead>\n    <TableCell>Project</TableCell><TableCell>Status</TableCell>\n  </TableHead>\n  <TableRow>\n    <TableCell>Weekend notes</TableCell><TableCell>Active</TableCell>\n  </TableRow>\n  <TableRow>\n    <TableCell>A new idea</TableCell><TableCell>Draft</TableCell>\n  </TableRow>\n</Table>',
    ),
    note: (
      <>
        Put <code>TableHead</code> and <code>TableRow</code> directly inside <code>Table</code>. Use{' '}
        <code>selectable</code> and <code>onRowSelect</code> for selection, and keep <code>selected</code> on each row
        in sync with your state.
      </>
    ),
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    description: 'Move between related views without leaving the page.',
    icon: 'tab',
    code: example(
      'tabs',
      'Tabs, Tab',
      '<Tabs index={index} onChange={setIndex}>\n  <Tab label="Overview"><p className="py-6">The big picture.</p></Tab>\n  <Tab label="Details"><p className="py-6">A closer look.</p></Tab>\n  <Tab label="Unavailable" disabled />\n</Tabs>',
      'const [index, setIndex] = useState(0);',
    ),
    note: (
      <>
        Control the selected tab with <code>index</code> and <code>onChange</code>. Each <code>Tab</code> supplies its{' '}
        <code>label</code> and panel content. Arrow keys move between enabled tabs.
      </>
    ),
  },
  {
    slug: 'time-picker',
    title: 'Time picker',
    description: 'Choose a time using the original radial clock face.',
    icon: 'schedule',
    code: example(
      'time-picker',
      'TimePicker',
      '<TimePicker label="Reminder" format="24hr"\n  value={time} onChange={setTime} />',
      'const [time, setTime] = useState(new Date(2026, 9, 13, 9, 30));',
    ),
    note: (
      <>
        Values are <code>Date</code> objects. Choose <code>format="24hr"</code> or <code>format="ampm"</code> to match
        your application.
      </>
    ),
  },
  {
    slug: 'tooltip',
    title: 'Tooltip',
    description: 'A short explanation that appears on hover or focus.',
    icon: 'info_outline',
    code: "'use client';\n\nimport { Button } from '@/components/ui/material/button';\nimport { Tooltip } from '@/components/ui/material/tooltip';\n\nconst HintButton = Tooltip(Button);\n\nexport default function Example() {\n  return (\n    <HintButton primary raised label=\"Save idea\"\n      tooltip=\"Keep this idea for later\" />\n  );\n}",
    note: (
      <>
        Wrap a trigger with <code>Tooltip</code>, or use the exported <code>useTooltip</code> hook. Tooltips supplement
        an accessible label; they should not be the only way to name a control.
      </>
    ),
  },
] as const;

export type ComponentSlug = (typeof components)[number]['slug'];
