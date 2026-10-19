import Link from 'next/link';

const supportingImports: Record<string, string> = Object.fromEntries(
  ['card', 'dialog', 'drawer', 'overlay', 'snackbar', 'sheet'].map((slug) => [
    slug,
    "import { Button } from '@/components/ui/material/button';\n",
  ]),
);
supportingImports.list = "import { FontIcon } from '@/components/ui/material/font-icon';\n";
supportingImports.overlay += "import { useEffect } from 'react';\nimport { createPortal } from 'react-dom';\n";

// These examples compose families that are not already registry dependencies.
export const exampleDependencies: Partial<Record<ComponentSlug, readonly string[]>> = {
  card: ['button'],
  dialog: ['button', 'input'],
  sheet: ['button'],
  'time-picker': ['dropdown', 'button'],
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
    slug: 'accordion',
    title: 'Accordion',
    description: 'Material 1 expansion panels for related details and lightweight editing.',
    icon: 'expand_more',
    code: example(
      'accordion',
      'AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel',
      '<AccordionRoot defaultValue={["details"]} className="w-full max-w-lg">\n  <AccordionItem value="details">\n    <AccordionHeader><AccordionTrigger>Project details</AccordionTrigger></AccordionHeader>\n    <AccordionPanel>Keep your notes and project details together.</AccordionPanel>\n  </AccordionItem>\n  <AccordionItem value="sharing">\n    <AccordionHeader><AccordionTrigger>Sharing</AccordionTrigger></AccordionHeader>\n    <AccordionPanel>Only invited people can see this project.</AccordionPanel>\n  </AccordionItem>\n  <AccordionItem value="archive" disabled>\n    <AccordionHeader><AccordionTrigger>Archive (unavailable)</AccordionTrigger></AccordionHeader>\n    <AccordionPanel>This project cannot be archived yet.</AccordionPanel>\n  </AccordionItem>\n</AccordionRoot>',
    ),
    note: (
      <>
        Use <code>value</code> and <code>onValueChange</code> to control the expanded values, or{' '}
        <code>defaultValue</code> for initial expansion. Both use arrays, even with a single panel. Add{' '}
        <code>multiple</code> to allow several open panels. Tab moves between triggers; Enter or Space toggles them.
        Headers default to <code>h3</code>; use <code>{'render={<h2 />}'}</code> for a different heading level. Put
        interactive controls inside the panel, not inside the trigger. Use <code>keepMounted</code> on a panel to
        preserve local form state while closed.
      </>
    ),
  },
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
        Name icon buttons with <code>leftIconLabel</code> and <code>rightIconLabel</code>. Use <code>fixed</code> to
        keep the bar at the top of the viewport, or <code>scrollHide</code> to hide it as the window scrolls down.
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
        Use <code>{'multiple={false}'}</code> for a single string; multiple selection accepts a string array or a record
        of selected labels. Supply <code>textValue</code> when an option label contains custom content. Use{' '}
        <code>suggestionMatch="disabled"</code> for server-filtered results.
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
        While an <code>image</code> loads or fails, the avatar shows <code>children</code>, an <code>icon</code>, or the
        first initial of <code>title</code>. Use <code>fallbackDelay</code> to avoid flashing the fallback on fast
        loads, and add an accessible label when the avatar conveys identity.
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
      '<div className="flex flex-wrap items-center gap-4">\n  <Button primary raised label="Save"\n    onClick={() => setSaved(true)} />\n  <Button label="Reset" onClick={() => setSaved(false)} />\n  <Button accent raised label="Accent" />\n  <Button accent label="Flat accent" />\n  <Button disabled label="Disabled" />\n  <span role="status">{saved ? "Saved" : "Ready"}</span>\n</div>',
      'const [saved, setSaved] = useState(false);',
    ),
    note: (
      <>
        Give <code>IconButton</code> and other icon-only buttons an <code>aria-label</code>. Use <code>asChild</code>{' '}
        with a single ref-forwarding router link to apply button styles and behavior without nesting interactive
        elements. <code>BrowseButton</code> opens a native file picker.
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
      'Card, CardMedia, CardTitle, CardText, CardActions',
      '<Card className="w-full max-w-sm">\n  <CardMedia\n    aspectRatio="wide"\n    image="https://images.unsplash.com/photo-1440771671530-f83767b73b53?fit=crop&w=960&h=540&fm=webp&q=80"\n    alt="Turquoise lake surrounded by pine forests and mountains in Alberta, Canada."\n  />\n  <CardTitle heading="h3" title="A moment of quiet" subtitle="Alberta, Canada" />\n  <CardText>Turquoise water, pine forests, and a little room to breathe.</CardText>\n  <CardActions>\n    <Button primary label="View photo"\n      href="https://unsplash.com/photos/green-lake-between-trees-with-mountain-background-EBcIEEqpgfI"\n      target="_blank" rel="noreferrer" />\n  </CardActions>\n</Card>',
    ),
    note: (
      <>
        Card parts include Material keyline spacing; avoid adding a second layer of padding around them. Give meaningful{' '}
        <code>CardMedia</code> backgrounds <code>alt</code> text, or pass an image with its own <code>alt</code>. Use{' '}
        <code>aspectRatio="wide"</code> for 16:9 media. Photo by{' '}
        <a
          href="https://unsplash.com/photos/green-lake-between-trees-with-mountain-background-EBcIEEqpgfI"
          className="text-toolbox-primary underline underline-offset-2"
          target="_blank"
          rel="noreferrer"
        >
          Andrew Maranta on Unsplash
        </a>
        .
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
        Use <code>indeterminate</code> for a partially selected collection. Provide a visible <code>label</code> or an{' '}
        <code>aria-label</code> for an otherwise unlabeled control.
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
        Use <code>deletable</code> for removable selections and <code>deleteLabel</code> to name the delete action.
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
        Values are <code>Date</code> objects, bounded by <code>minDate</code> and <code>maxDate</code>. In the calendar,
        arrow keys move by day or week, Home/End move within the week, and PageUp/PageDown move by month (hold Shift for
        years).
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
        Supply a <code>title</code> to name the dialog. Focus moves into the dialog when it opens and returns to the
        trigger when it closes; customize this with <code>onOpenAutoFocus</code> and <code>onCloseAutoFocus</code>.
      </>
    ),
  },
  {
    slug: 'divider',
    title: 'Divider',
    description: 'A thin rule that separates sections or groups related content.',
    icon: 'horizontal_rule',
    code: example(
      'divider',
      'Divider',
      '<div className="grid w-full max-w-sm gap-4">\n  <p>Project details</p>\n  <Divider />\n  <div className="flex items-center gap-4">\n    <span>Private</span>\n    <Divider orientation="vertical" decorative />\n    <span>Updated today</span>\n  </div>\n</div>',
    ),
    note: (
      <>
        A divider is a semantic separator by default. Use <code>decorative</code> when spacing or nearby headings
        already communicate the grouping. Vertical dividers stretch in a flex row; give them an explicit height outside
        flex layouts. Use <code>className</code> or <code>style</code> for spacing and inset rules.
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
        Use <code>type="right"</code> to enter from the right. Compose a drawer with responsive Tailwind layout for
        application navigation.
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
        Options use <code>value</code> and <code>label</code>; adapt other data with <code>valueKey</code> and{' '}
        <code>labelKey</code>. For custom <code>template</code> content, supply plain text with <code>textValue</code>{' '}
        or <code>textKey</code> so typeahead can match it.
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
        Mark decorative icons <code>aria-hidden</code> and give meaningful icons an accessible label. The Material Icons
        font is bundled locally.
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
        Use <code>multiline</code> for a text area and <code>error</code> for validation feedback. Setting{' '}
        <code>maxLength</code> also displays a character counter.
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
        For actions or navigation, pass a native button or router link to <code>itemContent</code> to preserve keyboard
        access. Use <code>ListCheckbox</code> for rows with an independent selection control.
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
        <code>IconMenu</code> handles keyboard navigation and accepts a custom <code>trigger</code>. Use{' '}
        <code>MenuCheckboxItem</code> for independent selections, or <code>MenuRadioGroup</code> with{' '}
        <code>MenuRadioItem</code> for a single choice.
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
      '<>\n  <Button primary raised label="Show overlay" onClick={() => setActive(true)} />\n  {container && createPortal(\n    <Overlay active={active} className="z-(--z-index-higher)"\n      onClick={() => setActive(false)}\n      onEscKeyDown={() => setActive(false)} />,\n    container,\n  )}\n</>',
      'const [active, setActive] = useState(false);\n  const [container, setContainer] = useState<HTMLElement | null>(null);\n\n  useEffect(() => setContainer(document.body), []);',
    ),
    note: (
      <>
        <code>Overlay</code> supplies a backdrop and scroll lock. Portal a full-screen backdrop to the document body and
        set its stacking level above your application’s chrome, as shown in the example. Use{' '}
        <Link href="/docs/components/dialog" className="text-toolbox-primary underline underline-offset-2">
          Dialog
        </Link>{' '}
        or{' '}
        <Link href="/docs/components/drawer" className="text-toolbox-primary underline underline-offset-2">
          Drawer
        </Link>{' '}
        for modal content with focus management.
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
        Use <code>mode="determinate"</code> for measured progress; the default <code>indeterminate</code> mode shows
        ongoing work with an unknown amount. Give the indicator an <code>aria-label</code> describing the operation.
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
        Give each <code>RadioButton</code> a distinct <code>value</code> and visible <code>label</code>, and name the
        group with <code>aria-label</code> or <code>aria-labelledby</code>.
      </>
    ),
  },
  {
    slug: 'ripple',
    title: 'Ripple',
    description: 'Touch feedback that grows from the point of interaction.',
    icon: 'touch_app',
    code: "'use client';\n\nimport { useRipple } from '@/components/ui/material/ripple';\n\nexport default function Example() {\n  const { ripple, ...events } = useRipple();\n  return (\n    <button {...events} className=\"relative overflow-hidden rounded-toolbox bg-toolbox-primary/10 px-8 py-6 text-toolbox-primary\">\n      Click anywhere\n      {ripple}\n    </button>\n  );\n}",
    note: (
      <>
        Render the ink returned by <code>useRipple</code> inside the host and attach its event handlers. The host needs{' '}
        <code>relative</code> positioning and <code>overflow-hidden</code>.{' '}
        <Link href="/docs/components/button" className="text-toolbox-primary underline underline-offset-2">
          Buttons
        </Link>{' '}
        already include ripple feedback.
      </>
    ),
  },
  {
    slug: 'sheet',
    title: 'Sheet',
    description: 'A gesture-driven sheet with snap points and accessible modal behavior.',
    icon: 'vertical_align_top',
    code: "'use client';\n\nimport { useId, useState } from 'react';\nimport { Button } from '@/components/ui/material/button';\nimport {\n  SheetRoot,\n  SheetTrigger,\n  SheetPortal,\n  SheetOverlay,\n  SheetContent,\n  SheetTitle,\n  SheetDescription,\n  SheetClose,\n  SheetHandle,\n} from '@/components/ui/material/sheet';\n\nexport default function Example() {\n  const contentId = useId();\n  const [snapPoint, setSnapPoint] = useState<number | string | null>(0.5);\n  const expanded = snapPoint === 0.9;\n  return (\n    <SheetRoot snapPoints={[0.5, 0.9]} fadeFromIndex={0} activeSnapPoint={snapPoint} setActiveSnapPoint={setSnapPoint}>\n      <SheetTrigger asChild>\n        <Button primary raised>\n          Open visit notes\n        </Button>\n      </SheetTrigger>\n      <SheetPortal>\n        <SheetOverlay />\n        <SheetContent id={contentId}>\n          <SheetHandle />\n          <div className=\"mx-auto min-h-0 w-full max-w-xl overflow-y-auto p-6\">\n            <SheetTitle>Visit notes</SheetTitle>\n            <SheetDescription>\n              Drag the handle or use the resize button to switch between two sheet sizes.\n            </SheetDescription>\n            <p className=\"my-6 text-toolbox-body\">Bring a notebook, a camera, and the latest survey map.</p>\n            <Button\n              primary\n              aria-controls={contentId}\n              aria-expanded={expanded}\n              onClick={() => setSnapPoint(expanded ? 0.5 : 0.9)}\n            >\n              {expanded ? 'Reduce notes' : 'Expand notes'}\n            </Button>\n            <SheetClose asChild>\n              <Button primary>Done</Button>\n            </SheetClose>\n          </div>\n        </SheetContent>\n      </SheetPortal>\n    </SheetRoot>\n  );\n}",
    note: (
      <>
        Use Sheet for dragging and snap points. Use Drawer for a fixed navigation surface. Gesture behavior comes from
        Vaul and is installed only with this family. Keep long content in an inner <code>min-h-0 overflow-y-auto</code>{' '}
        region so it can scroll while the surrounding sheet handles dragging.
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
        Use <code>pinned</code> to display the value and <code>snaps</code> to snap to step positions. Provide an
        accessible name with <code>aria-label</code> or <code>aria-labelledby</code>.
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
        Keep the <code>label</code> brief and use <code>action</code> for an optional follow-up such as Undo.
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
        Use a short <code>label</code> that names the setting, such as “Do not disturb,” and apply changes immediately.
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
      '<Table>\n  <TableHead>\n    <TableCell>Project</TableCell><TableCell>Status</TableCell>\n  </TableHead>\n  <TableRow>\n    <TableCell>Weekend notes</TableCell><TableCell>Active</TableCell>\n  </TableRow>\n  <TableRow>\n    <TableCell>A new idea</TableCell><TableCell>Draft</TableCell>\n  </TableRow>\n</Table>',
    ),
    note: (
      <>
        Put <code>TableHead</code> and <code>TableRow</code> directly inside <code>Table</code>. Selection is off by
        default. Enable it with <code>selectionMode</code> and give each selectable row a stable string{' '}
        <code>value</code>.
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
      '<Tabs value={tab} onValueChange={setTab}>\n  <Tab value="overview" label="Overview"><p className="py-6">The big picture.</p></Tab>\n  <Tab value="details" label="Details"><p className="py-6">A closer look.</p></Tab>\n  <Tab value="unavailable" label="Unavailable" disabled />\n</Tabs>',
      'const [tab, setTab] = useState("overview");',
    ),
    note: (
      <>
        Each <code>Tab</code> provides a stable string <code>value</code>, its <code>label</code>, and panel content.
        Arrow keys move between enabled tabs.
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
        Values are <code>Date</code> objects. Use <code>format="24hr"</code> for a 24-hour clock or{' '}
        <code>format="ampm"</code> for a 12-hour clock.
      </>
    ),
  },
  {
    slug: 'tooltip',
    title: 'Tooltip',
    description: 'A short explanation that appears on hover or focus.',
    icon: 'info_outline',
    code: "'use client';\n\nimport { Button } from '@/components/ui/material/button';\nimport { TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent } from '@/components/ui/material/tooltip';\n\nexport default function Example() {\n  return (\n    <TooltipRoot delayDuration={0}>\n      <TooltipTrigger asChild>\n        <Button primary raised label=\"Save idea\" />\n      </TooltipTrigger>\n      <TooltipPortal>\n        <TooltipContent>Keep this idea for later</TooltipContent>\n      </TooltipPortal>\n    </TooltipRoot>\n  );\n}",
    note: (
      <>
        Compose <code>TooltipRoot</code>, <code>TooltipTrigger</code>, and <code>TooltipContent</code>, or use{' '}
        <code>useTooltip</code>. Keep essential information visible and give the trigger an accessible label independent
        of its tooltip.
      </>
    ),
  },
] as const;

export type ComponentSlug = (typeof components)[number]['slug'];
