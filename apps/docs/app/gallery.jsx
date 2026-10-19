'use client';

import { useState } from 'react';
import {
  AppBar,
  Autocomplete,
  Avatar,
  BrowseButton,
  Button,
  Card,
  CardActions,
  CardMedia,
  CardText,
  CardTitle,
  Checkbox,
  Chip,
  DatePicker,
  Dialog,
  Drawer,
  Dropdown,
  FontIcon,
  IconButton,
  IconMenu,
  Input,
  List,
  ListCheckbox,
  ListDivider,
  ListItem,
  ListItemActions,
  ListItemContent,
  ListItemLayout,
  ListItemText,
  ListSubHeader,
  Menu,
  MenuDivider,
  MenuItem,
  ProgressBar,
  RadioButton,
  RadioGroup,
  useRipple,
  Slider,
  Snackbar,
  Switch,
  Tab,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TimePicker,
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
} from 'react-toolbox';

const sections = [
  ['buttons', 'Buttons & ripples'],
  ['inputs', 'Text & suggestions'],
  ['selection', 'Selection controls'],
  ['identity', 'Avatars & chips'],
  ['cards', 'Cards & lists'],
  ['navigation', 'Navigation & menus'],
  ['pickers', 'Date & time'],
  ['feedback', 'Dialogs & feedback'],
  ['progress', 'Progress & sliders'],
  ['tables', 'Data tables'],
];

const countries = ['Spain', 'France', 'Japan', 'United Kingdom', 'United States'];
const destinations = [
  { value: 'madrid', label: 'Madrid' },
  { value: 'tokyo', label: 'Tokyo' },
  { value: 'lisbon', label: 'Lisbon' },
  { value: 'copenhagen', label: 'Copenhagen', disabled: true },
];
const desserts = [
  { name: 'Frozen yogurt', calories: 159, fat: 6.0, carbs: 24 },
  { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37 },
  { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24 },
  { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67 },
];

function Section({ id, description, children }) {
  const index = sections.findIndex(section => section[0] === id);
  return (
    <section className="gallery-section" id={id} aria-labelledby={`${id}-heading`}>
      <div className="gallery-section-heading">
        <div className="flex items-center gap-4">
          <span className="gallery-section-number">{String(index + 1).padStart(2, '0')}</span>
          <h2 className="gallery-section-title" id={`${id}-heading`}>{sections[index][1]}</h2>
        </div>
        <p className="gallery-section-description">{description}</p>
      </div>
      <div className="gallery-section-body">{children}</div>
    </section>
  );
}

function DemoGroup({ label, children }) {
  return (
    <div className="gallery-demo-group">
      <h3 className="gallery-demo-label">{label}</h3>
      {children}
    </div>
  );
}

function ButtonExamples({ notify }) {
  const { ripple, ...rippleEvents } = useRipple();
  const [fileName, setFileName] = useState('');
  const [rippleCount, setRippleCount] = useState(0);

  return (
    <Section id="buttons" description="Flat, raised, floating, and icon buttons. Press and hold to see the original ink ripple.">
      <DemoGroup label="Raised & flat">
        <div className="flex flex-wrap items-center gap-4">
          <Button label="Primary" raised primary onClick={() => notify('Primary action selected')} />
          <Button label="Accent" raised accent onClick={() => notify('Accent action selected')} />
          <Button label="Neutral" raised onClick={() => notify('Neutral action selected')} />
          <Button label="Disabled" raised disabled />
          <Button label="Flat primary" primary onClick={() => notify('Flat action selected')} />
          <Button label="Flat accent" accent onClick={() => notify('Flat accent selected')} />
        </div>
      </DemoGroup>
      <DemoGroup label="Floating & icons">
        <div className="flex flex-wrap items-center gap-5">
          <Button icon="add" floating primary aria-label="Create item" onClick={() => notify('Item created')} />
          <Button icon="edit" floating accent aria-label="Edit item" onClick={() => notify('Edit action selected')} />
          <Button icon="add" floating mini primary aria-label="Create small item" onClick={() => notify('Small item created')} />
          <Button icon="add" floating disabled aria-label="Disabled floating action" />
          <IconButton icon="favorite" accent aria-label="Favorite" onClick={() => notify('Added to favorites')} />
          <IconButton icon="bookmark" primary aria-label="Bookmark" onClick={() => notify('Bookmark saved')} />
          <IconButton icon="delete" disabled aria-label="Disabled delete" />
          <TooltipRoot delayDuration={250}>
            <TooltipTrigger asChild><Button label="Hover for tooltip" /></TooltipTrigger>
            <TooltipPortal><TooltipContent>Original Material Design tooltip</TooltipContent></TooltipPortal>
          </TooltipRoot>
        </div>
      </DemoGroup>
      <DemoGroup label="Browse button & standalone ripple">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <BrowseButton icon="folder_open" label="Choose a file" raised onChange={event => setFileName(event.target.files[0]?.name || '')} />
            <p className="gallery-state" aria-live="polite">{fileName || 'Files stay on your device.'}</p>
          </div>
          <div>
            <button {...rippleEvents} className="gallery-ripple-surface" onClick={() => setRippleCount(count => count + 1)}>
              Touch the surface
              {ripple}
            </button>
            <p className="gallery-state" aria-live="polite">Surface interactions: {rippleCount}</p>
          </div>
        </div>
      </DemoGroup>
    </Section>
  );
}

function InputExamples() {
  const [name, setName] = useState('Javier');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('Details make the design.');
  const [city, setCity] = useState('madrid');
  const [country, setCountry] = useState('Spain');
  const [tags, setTags] = useState(['Design']);

  return (
    <Section id="inputs" description="Floating labels, validation, autocomplete, and dropdowns with the familiar value-first callbacks.">
      <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        <Input label="Your name" aria-label="Your name" value={name} onChange={setName} required />
        <Input type="email" label="Email address" aria-label="Email address" icon="email" value={email} onChange={setEmail} />
        <Input label="Validation example" aria-label="Validation example" value="invalid@example" error="Please enter a valid email address" onChange={() => {}} />
        <Input label="Disabled field" aria-label="Disabled field" value="Read only example" disabled />
        <div className="sm:col-span-2">
          <Input label="Notes" aria-label="Notes" value={notes} onChange={setNotes} multiline rows={2} maxLength={120} />
        </div>
        <Dropdown label="Destination" aria-label="Destination" source={destinations} value={city} onChange={setCity} />
        <Autocomplete label="Country" aria-label="Country" source={countries} value={country} onChange={setCountry} multiple={false} showSuggestionsWhenValueIsSet />
        <div className="sm:col-span-2">
          <Autocomplete label="Interests" aria-label="Interests" source={['Design', 'Animation', 'React', 'Typography', 'Accessibility']} value={tags} onChange={setTags} />
        </div>
      </div>
      <p className="gallery-state" aria-live="polite">Destination: {destinations.find(item => item.value === city)?.label} · Country: {country}</p>
    </Section>
  );
}

function SelectionExamples() {
  const [checked, setChecked] = useState(true);
  const [updates, setUpdates] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(false);
  const [density, setDensity] = useState('comfortable');

  return (
    <Section id="selection" description="The original check, thumb, and radio animations, including disabled and selected states.">
      <div className="grid gap-8 sm:grid-cols-3">
        <div>
          <h3 className="gallery-demo-label">Checkboxes</h3>
          <Checkbox label="Keep me signed in" checked={checked} onChange={setChecked} />
          <Checkbox label="Product updates" checked={updates} onChange={setUpdates} />
          <Checkbox label="Disabled checked" checked disabled />
          <Checkbox label="Disabled unchecked" checked={false} disabled />
        </div>
        <div>
          <h3 className="gallery-demo-label">Switches</h3>
          <Switch label="Notifications" checked={notifications} onChange={setNotifications} />
          <Switch label="Sound" checked={sound} onChange={setSound} />
          <Switch label="Disabled switch" checked disabled />
        </div>
        <div>
          <h3 className="gallery-demo-label">Radio buttons</h3>
          <RadioGroup name="density" value={density} onChange={setDensity}>
            <RadioButton label="Comfortable" value="comfortable" />
            <RadioButton label="Compact" value="compact" />
            <RadioButton label="Unavailable" value="unavailable" disabled />
          </RadioGroup>
        </div>
      </div>
      <p className="gallery-state" aria-live="polite">Density: {density} · Notifications {notifications ? 'on' : 'off'}</p>
    </Section>
  );
}

function IdentityExamples() {
  const [chipVisible, setChipVisible] = useState(true);
  return (
    <Section id="identity" description="Initials, local artwork, icon avatars, and removable chips.">
      <DemoGroup label="Avatars & font icons">
        <div className="flex flex-wrap items-center gap-5">
          <Avatar title="Javier" />
          <Avatar icon="person" />
          <Avatar image="/avatar.svg" alt="Abstract mountain avatar" />
          <Avatar><FontIcon value="favorite" /></Avatar>
          <FontIcon value="star" alt="Star" />
          <FontIcon value="palette" alt="Palette" />
          <FontIcon value="flight" alt="Flight" />
        </div>
      </DemoGroup>
      <DemoGroup label="Chips">
        <div className="flex flex-wrap items-center gap-3">
          <Chip>Material Design</Chip>
          <Chip><Avatar title="R" /><span>React Toolbox</span></Chip>
          <Chip><Avatar icon="folder" /><span>Components</span></Chip>
          {chipVisible ? (
            <Chip deletable onDeleteClick={() => setChipVisible(false)}>Remove this chip</Chip>
          ) : (
            <Button label="Restore chip" primary onClick={() => setChipVisible(true)} />
          )}
        </div>
      </DemoGroup>
    </Section>
  );
}

function CardExamples({ notify }) {
  const [listChecked, setListChecked] = useState(true);
  return (
    <Section id="cards" description="Composable surfaces, typography, list rows, dividers, and contextual actions.">
      <div className="grid items-start gap-8 md:grid-cols-2">
        <Card raised>
          <CardMedia aspectRatio="wide" color="#3f51b5">
            <div className="gallery-card-art" role="img" aria-label="Geometric shapes in the original indigo and pink palette" />
          </CardMedia>
          <CardTitle title="A study in material" subtitle="Light, surface, and movement" avatar="/avatar.svg" />
          <CardText>Small details make familiar things feel right. The same elevation, typography, and colors, ready for a new generation.</CardText>
          <CardActions>
            <Button label="Explore" primary onClick={() => notify('Ready to explore')} />
            <Button label="Save" onClick={() => notify('Card saved')} />
            <IconButton icon="favorite_border" aria-label="Like this card" onClick={() => notify('Card liked')} />
          </CardActions>
        </Card>
        <div>
          <List selectable ripple>
            <ListSubHeader caption="Your collection" />
            <ListItem caption="Material studies" legend="12 carefully considered details" leftIcon="palette" rightIcon="chevron_right" onClick={() => notify('Material studies selected')} />
            <ListItem caption="Saved inspiration" legend="For the next great idea" leftIcon="bookmark_border" rightIcon="chevron_right" onClick={() => notify('Saved inspiration selected')} />
            <ListDivider />
            <ListCheckbox caption="Keep collection offline" legend="Available whenever inspiration strikes" checked={listChecked} onChange={setListChecked} />
            <ListItem disabled caption="Shared collections" legend="Coming in a future chapter" leftIcon="people_outline" />
          </List>
          <List>
            <ListItem leftIcon="description" rightIcon="check">
              <ListItemContent>
                <ListItemText primary>Composed content</ListItemText>
                <ListItemText>Using the original list primitives</ListItemText>
              </ListItemContent>
            </ListItem>
          </List>
          <ListItemLayout caption="A standalone row" legend="ListItemLayout and ListItemActions" leftIcon="layers" leftActions={[]} rightActions={[
            <ListItemActions type="right" key="actions"><FontIcon value="done" /></ListItemActions>,
          ]} />
        </div>
      </div>
    </Section>
  );
}

function NavigationExamples({ notify }) {
  const [tab, setTab] = useState('overview');
  const [fixedTab, setFixedTab] = useState('recent');
  const [menuSelection, setMenuSelection] = useState('download');
  return (
    <Section id="navigation" description="App bars, animated tab indicators, links, and menus.">
      <DemoGroup label="App bar">
        <AppBar title="My collection" leftIcon="menu" rightIcon="search" onLeftIconClick={() => notify('Navigation selected')} onRightIconClick={() => notify('Search selected')} />
      </DemoGroup>
      <DemoGroup label="Tabs">
        <Tabs value={tab} onValueChange={setTab}>
          <Tab value="overview" label="Overview" icon="dashboard"><p className="gallery-state">Everything in its right place.</p></Tab>
          <Tab value="details" label="Details" icon="description"><p className="gallery-state">The details tab is now selected.</p></Tab>
          <Tab value="disabled" label="Disabled" disabled><p>Unavailable content.</p></Tab>
        </Tabs>
        <div className="mt-6">
          <Tabs fixed inverse value={fixedTab} onValueChange={setFixedTab}>
            <Tab value="recent" label="Recent"><p className="gallery-state">Recent items</p></Tab>
            <Tab value="favorites" label="Favorites"><p className="gallery-state">Favorite items</p></Tab>
            <Tab value="archived" label="Archived"><p className="gallery-state">Archived items</p></Tab>
          </Tabs>
        </div>
      </DemoGroup>
      <DemoGroup label="Menus & links">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <Menu selected={menuSelection} onSelect={setMenuSelection}>
              <MenuItem value="download" caption="Download" icon="file_download" shortcut="⌘D" />
              <MenuItem value="share" caption="Share" icon="share" />
              <MenuDivider />
              <MenuItem value="archive" caption="Archive" icon="archive" />
              <MenuItem caption="Unavailable" icon="lock" disabled />
            </Menu>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <span>Open the icon menu</span>
              <div data-testid="icon-menu">
                <IconMenu icon="more_vert" position="topRight" onSelect={value => notify(`${value} selected`)}>
                  <MenuItem value="Edit" caption="Edit item" icon="edit" />
                  <MenuItem value="Duplicate" caption="Duplicate item" icon="content_copy" />
                  <MenuDivider />
                  <MenuItem value="Delete" caption="Delete item" icon="delete" />
                </IconMenu>
              </div>
            </div>
            <nav aria-label="Gallery shortcuts">
              <List selectable ripple>
                <ListItem to="#buttons" caption="Back to buttons" leftIcon="arrow_upward" />
                <ListItem to="#pickers" caption="Explore date & time" leftIcon="event" />
              </List>
            </nav>
          </div>
        </div>
        <p className="gallery-state" aria-live="polite">Menu selection: {menuSelection}</p>
      </DemoGroup>
    </Section>
  );
}

function PickerExamples() {
  // Fixed local dates keep the initial server and browser output deterministic.
  const [date, setDate] = useState(() => new Date(2026, 9, 13));
  const [localizedDate, setLocalizedDate] = useState(() => new Date(2026, 9, 20));
  const [time, setTime] = useState(() => new Date(2026, 9, 13, 14, 30));
  const [time24, setTime24] = useState(() => new Date(2026, 9, 13, 9, 15));
  return (
    <Section id="pickers" description="The original calendar transitions and clock face, including locale and 12/24-hour formats.">
      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        <DatePicker label="Travel date" aria-label="Travel date" value={date} onChange={setDate} sundayFirstDayOfWeek />
        <DatePicker label="Fecha de regreso" aria-label="Fecha de regreso" locale="es" value={localizedDate} onChange={setLocalizedDate} />
        <TimePicker label="Departure time" aria-label="Departure time" format="ampm" value={time} onChange={setTime} />
        <TimePicker label="Arrival time (24 hour)" aria-label="Arrival time (24 hour)" format="24hr" value={time24} onChange={setTime24} />
      </div>
    </Section>
  );
}

function FeedbackExamples({ notify }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [dialogType, setDialogType] = useState('normal');
  const closeDialog = () => setDialogOpen(false);
  return (
    <Section id="feedback" description="Dialog and drawer transitions, overlay dismissal, escape handling, and snackbar feedback.">
      <div className="mb-6 max-w-[260px]">
        <Dropdown label="Dialog size" aria-label="Dialog size" value={dialogType} onChange={setDialogType} source={[
          { value: 'small', label: 'Small' },
          { value: 'normal', label: 'Normal' },
          { value: 'large', label: 'Large' },
          { value: 'fullscreen', label: 'Fullscreen' },
        ]} />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button label="Open dialog" raised primary onClick={() => setDialogOpen(true)} />
        <Button label="Open drawer" raised onClick={() => setDrawerOpen(true)} />
        <Button label="Right drawer" onClick={() => setRightDrawerOpen(true)} />
        <Button label="Show snackbar" accent onClick={() => notify('Your changes have been saved.')} />
      </div>
      <Dialog active={dialogOpen} title="Keep this moment?" type={dialogType} onOverlayClick={closeDialog} onEscKeyDown={closeDialog} actions={[
        { label: 'Cancel', primary: true, onClick: closeDialog },
        { label: 'Save moment', primary: true, onClick: () => { closeDialog(); notify('Moment saved to your collection.'); } },
      ]}>
        <p>Save this to your collection. You can return to it whenever you need a little inspiration.</p>
      </Dialog>
      <Drawer active={drawerOpen} onOverlayClick={() => setDrawerOpen(false)} onEscKeyDown={() => setDrawerOpen(false)}>
        <div className="gallery-drawer-content">
          <h2>Your workspace</h2>
          <p>A familiar drawer, with the same distance, easing, and elevation.</p>
          <Button label="Close drawer" primary onClick={() => setDrawerOpen(false)} />
        </div>
        <List selectable ripple>
          <ListItem caption="Collection" leftIcon="collections_bookmark" onClick={() => { setDrawerOpen(false); notify('Collection selected'); }} />
          <ListItem caption="Favorites" leftIcon="favorite_border" onClick={() => { setDrawerOpen(false); notify('Favorites selected'); }} />
        </List>
      </Drawer>
      <Drawer active={rightDrawerOpen} type="right" onOverlayClick={() => setRightDrawerOpen(false)} onEscKeyDown={() => setRightDrawerOpen(false)}>
        <div className="gallery-drawer-content">
          <h2>A little more detail</h2>
          <p>The drawer also works from the right edge.</p>
          <Button label="Close right drawer" primary onClick={() => setRightDrawerOpen(false)} />
        </div>
      </Drawer>
    </Section>
  );
}

function ProgressExamples() {
  const [progress, setProgress] = useState(40);
  const [volume, setVolume] = useState(6);
  return (
    <Section id="progress" description="Determinate, buffered, and indeterminate progress; continuous and stepped sliders.">
      <DemoGroup label="Linear progress">
        <div className="grid gap-7">
          <ProgressBar mode="determinate" value={progress} buffer={Math.min(100, progress + 20)} />
          <ProgressBar mode="indeterminate" />
          <ProgressBar mode="determinate" value={65} multicolor />
        </div>
      </DemoGroup>
      <DemoGroup label="Circular progress">
        <div className="flex items-center gap-8">
          <ProgressBar type="circular" mode="indeterminate" />
          <ProgressBar type="circular" mode="determinate" value={progress} />
          <ProgressBar type="circular" mode="indeterminate" multicolor />
        </div>
      </DemoGroup>
      <DemoGroup label="Sliders">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="gallery-state">Progress: {progress}%</p>
            <Slider value={progress} onChange={setProgress} min={0} max={100} step={1} editable />
          </div>
          <div>
            <p className="gallery-state">Pinned & stepped: {volume}</p>
            <Slider value={volume} onChange={setVolume} min={0} max={10} step={2} pinned snaps editable />
          </div>
          <div className="sm:col-span-2">
            <p className="gallery-state">Disabled</p>
            <Slider value={40} disabled />
          </div>
        </div>
      </DemoGroup>
    </Section>
  );
}

function TableExamples() {
  const [selected, setSelected] = useState(['Eclair']);
  const [direction, setDirection] = useState('asc');
  const sorted = [...desserts].sort((a, b) => direction === 'asc' ? a.calories - b.calories : b.calories - a.calories);
  return (
    <Section id="tables" description="Selectable rows, numeric alignment, and sortable headers.">
      <div className="overflow-x-auto">
        <Table selectionMode="multiple" selected={selected} onSelectionChange={setSelected}>
          <TableHead>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell numeric sorted={direction} onClick={() => setDirection(value => value === 'asc' ? 'desc' : 'asc')}>Calories</TableCell>
            <TableCell numeric>Fat (g)</TableCell>
            <TableCell numeric>Carbs (g)</TableCell>
          </TableHead>
          {sorted.map(dessert => (
            <TableRow key={dessert.name} value={dessert.name}>
              <TableCell>{dessert.name}</TableCell>
              <TableCell numeric>{dessert.calories}</TableCell>
              <TableCell numeric>{dessert.fat.toFixed(1)}</TableCell>
              <TableCell numeric>{dessert.carbs}</TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
      <p className="gallery-state" aria-live="polite">{selected.length} row{selected.length === 1 ? '' : 's'} selected · Calories sorted {direction === 'asc' ? 'ascending' : 'descending'}</p>
    </Section>
  );
}

export default function Gallery() {
  const [snackbar, setSnackbar] = useState({ active: false, label: '' });
  const notify = label => setSnackbar({ active: true, label });
  const dismissSnackbar = () => setSnackbar(value => ({ ...value, active: false }));

  return (
    <div className="gallery-shell">
      <header className="gallery-masthead">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-6 py-5 sm:px-10">
          <a className="gallery-wordmark flex items-center gap-3" href="/">
            <span className="gallery-logo" aria-hidden="true">rt</span>
            react toolbox
          </a>
          <div className="flex items-center gap-6">
            <a className="gallery-top-link hidden sm:inline" href="/theme-demo">Theming</a>
            <span className="gallery-version">THE ORIGINAL, RENEWED</span>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 pt-12 sm:px-10 lg:grid-cols-[190px_minmax(0,1fr)] lg:pt-16">
        <aside className="gallery-sidebar hidden lg:block" aria-label="Component sections">
          <p className="gallery-sidebar-title">The components</p>
          <nav>
            {sections.map(([id, label], index) => (
              <a href={`#${id}`} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a>
            ))}
          </nav>
          <div className="gallery-note mt-8">Original Material Design.<br />Modern React.<br />Every detail matters.</div>
        </aside>
        <main className="min-w-0">
          <div className="gallery-hero">
            <p className="gallery-eyebrow">A new chapter for a familiar classic</p>
            <h1 className="gallery-title">Good design is in the details.</h1>
            <p className="gallery-introduction">The components you remember. The colors, the movement, the feeling. Explore the original React Toolbox, running on modern React and Next.js.</p>
            <div className="mt-5 flex flex-wrap gap-2" aria-label="Example technologies">
              <span className="gallery-version">React 19</span>
              <span className="gallery-version">Next.js 16</span>
              <span className="gallery-version">Tailwind CSS 4</span>
            </div>
          </div>
          <ButtonExamples notify={notify} />
          <InputExamples />
          <SelectionExamples />
          <IdentityExamples />
          <CardExamples notify={notify} />
          <NavigationExamples notify={notify} />
          <PickerExamples />
          <FeedbackExamples notify={notify} />
          <ProgressExamples />
          <TableExamples />
          <footer className="gallery-footer">React Toolbox · Made with care, then and now.</footer>
        </main>
      </div>
      <Snackbar active={snackbar.active} label={snackbar.label} action="Dismiss" timeout={4000} onClick={dismissSnackbar} onTimeout={dismissSnackbar} />
    </div>
  );
}
