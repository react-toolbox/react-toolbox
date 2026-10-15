'use client';

import { useState } from 'react';
import {
  AppBar,
  Autocomplete,
  Avatar,
  Button,
  Card,
  CardTitle,
  CardText,
  Checkbox,
  Chip,
  DatePicker,
  Dialog,
  Drawer,
  Dropdown,
  FontIcon,
  Input,
  Layout,
  Panel,
  List,
  ListItem,
  IconMenu,
  MenuItem,
  MenuDivider,
  Overlay,
  ProgressBar,
  RadioGroup,
  RadioButton,
  Ripple,
  Slider,
  Snackbar,
  Switch,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  TimePicker,
  Tooltip,
} from 'react-toolbox';
import type { ComponentSlug } from './catalog';

const RippleButton = Ripple({ passthrough: false })('button');
const HintButton = Tooltip(Button);

export default function ComponentDemo({ slug }: { slug: ComponentSlug }) {
  const [text, setText] = useState('');
  const [selected, setSelected] = useState('madrid');
  const [checked, setChecked] = useState(true);
  const [active, setActive] = useState(false);
  const [saved, setSaved] = useState(false);
  const [value, setValue] = useState(40);
  const [index, setIndex] = useState(0);
  const [date, setDate] = useState(new Date(2026, 9, 13, 9, 30));
  switch (slug) {
    case 'app-bar':
      return (
        <div className="w-full">
          <AppBar title="My collection" leftIcon="menu" onLeftIconClick={() => setText('Navigation opened')} />
          <p role="status" className="mt-4 text-center text-sm text-toolbox-text-secondary">
            {text || 'Try the navigation icon.'}
          </p>
        </div>
      );
    case 'autocomplete':
      return (
        <div className="w-full max-w-xs">
          <Autocomplete
            label="Country"
            multiple={false}
            source={['Spain', 'France', 'Japan']}
            value={text}
            onChange={setText}
          />
        </div>
      );
    case 'avatar':
      return (
        <div className="flex items-center gap-4">
          <Avatar title="Javi" aria-label="Javi Velasco" />
          <Avatar icon="person" aria-label="Guest" />
        </div>
      );
    case 'button':
      return (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button primary raised label="Save" onClick={() => setActive(true)} />
          <Button label="Reset" onClick={() => setActive(false)} />
          <span role="status" className="text-sm text-toolbox-text-secondary">
            {active ? 'Saved' : 'Ready'}
          </span>
        </div>
      );
    case 'card':
      return (
        <Card className="w-full max-w-sm">
          <CardTitle title="Room for an idea" subtitle="Start with something small." />
          <CardText>A little space for your next project.</CardText>
        </Card>
      );
    case 'checkbox':
      return (
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-4 text-sm font-medium">Notification channels</legend>
          <Checkbox label="Email" checked={checked} onChange={setChecked} />
          <Checkbox label="Push notifications" checked={active} onChange={setActive} />
        </fieldset>
      );
    case 'chip':
      return (
        <div className="flex flex-wrap gap-2">
          <Chip>Material Design</Chip>
          {checked && (
            <Chip deletable onDeleteClick={() => setChecked(false)}>
              TypeScript
            </Chip>
          )}
        </div>
      );
    case 'date-picker':
      return (
        <div className="w-full max-w-xs">
          <DatePicker label="Start date" value={date} onChange={setDate} />
        </div>
      );
    case 'dialog':
      return (
        <>
          <Button primary raised label="Open dialog" onClick={() => setActive(true)} />
          <span role="status" className="ml-4 text-sm text-toolbox-text-secondary">
            {saved ? 'Saved' : 'Draft'}
          </span>
          <Dialog
            active={active}
            title="Save this idea?"
            onEscKeyDown={() => setActive(false)}
            onOverlayClick={() => setActive(false)}
            actions={[
              { label: 'Cancel', onClick: () => setActive(false) },
              {
                label: 'Save',
                primary: true,
                onClick: () => {
                  setSaved(true);
                  setActive(false);
                },
              },
            ]}
          >
            You can return to it whenever you are ready.
          </Dialog>
        </>
      );
    case 'drawer':
      return (
        <>
          <Button primary raised label="Open drawer" onClick={() => setActive(true)} />
          <Drawer
            active={active}
            aria-label="Your collection"
            onEscKeyDown={() => setActive(false)}
            onOverlayClick={() => setActive(false)}
          >
            <div className="space-y-6 p-6">
              <h2 className="m-0 text-xl font-medium">Your collection</h2>
              <Button primary label="Close" onClick={() => setActive(false)} />
            </div>
          </Drawer>
        </>
      );
    case 'dropdown':
      return (
        <div className="w-full max-w-xs">
          <Dropdown
            label="Destination"
            value={selected}
            onChange={(value) => setSelected(String(value))}
            source={[
              { value: 'madrid', label: 'Madrid' },
              { value: 'tokyo', label: 'Tokyo' },
              { value: 'lisbon', label: 'Lisbon' },
            ]}
          />
        </div>
      );
    case 'font-icon':
      return (
        <div className="flex gap-6 text-toolbox-primary">
          <FontIcon value="favorite" aria-label="Favorite" />
          <FontIcon value="star" aria-label="Star" />
          <FontIcon value="home" aria-label="Home" />
        </div>
      );
    case 'input':
      return (
        <div className="w-full max-w-xs">
          <Input label="Project name" value={text} onChange={setText} hint="Something worth making" />
        </div>
      );
    case 'layout':
      return (
        <Layout className="min-h-48 w-full">
          <Panel>
            <div className="p-6">
              <h2 className="text-xl">Your workspace</h2>
              <p className="mt-2">A place for everything.</p>
            </div>
          </Panel>
        </Layout>
      );
    case 'list':
      return (
        <div className="w-full max-w-sm">
          <List selectable ripple aria-label="Folders">
            {['Inbox', 'Favorites'].map((folder) => (
              <ListItem
                key={folder}
                theme={{ item: 'p-0' }}
                itemContent={
                  <button
                    type="button"
                    onClick={() => setText(folder)}
                    className="flex min-h-12 w-full items-center border-0 bg-transparent px-4 text-left font-[inherit] text-base text-toolbox-text focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-toolbox-primary"
                  >
                    <FontIcon
                      value={folder === 'Inbox' ? 'inbox' : 'favorite_border'}
                      aria-hidden
                      className="mr-8 text-toolbox-text-secondary"
                    />
                    {folder}
                  </button>
                }
              />
            ))}
          </List>
          <p
            role="status"
            className="m-0 border-t border-toolbox-divider px-4 pt-4 text-sm text-toolbox-text-secondary"
          >
            Selected: {text || 'Inbox'}
          </p>
        </div>
      );
    case 'menu':
      return (
        <div className="flex w-48 max-w-full items-center justify-between gap-6">
          <span role="status" className="text-sm text-toolbox-text-secondary">
            {text || 'More actions'}
          </span>
          <IconMenu
            icon="more_vert"
            position="topRight"
            aria-label="More actions"
            onSelect={(value) => setText(String(value))}
          >
            <MenuItem value="download" caption="Download" icon="file_download" />
            <MenuItem value="share" caption="Share" icon="share" />
            <MenuDivider />
            <MenuItem caption="Unavailable" disabled />
          </IconMenu>
        </div>
      );
    case 'overlay':
      return (
        <>
          <Button primary raised label="Show overlay" onClick={() => setActive(true)} />
          <Overlay active={active} onClick={() => setActive(false)} onEscKeyDown={() => setActive(false)} />
        </>
      );
    case 'progress-bar':
      return (
        <div className="flex w-full max-w-sm flex-col items-center gap-8">
          <ProgressBar type="circular" mode="indeterminate" aria-label="Loading" />
          <ProgressBar mode="determinate" value={65} aria-label="Upload progress" />
        </div>
      );
    case 'radio':
      return (
        <RadioGroup
          name="delivery"
          value={text || 'daily'}
          onChange={(value) => setText(value ?? 'daily')}
          aria-label="Delivery frequency"
        >
          <RadioButton label="Daily" value="daily" />
          <RadioButton label="Weekly" value="weekly" />
        </RadioGroup>
      );
    case 'ripple':
      return (
        <RippleButton
          type="button"
          className="relative overflow-hidden rounded-toolbox border-0 bg-toolbox-primary/10 px-8 py-6 font-[inherit] text-toolbox-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-toolbox-primary"
        >
          Click anywhere
        </RippleButton>
      );
    case 'slider':
      return (
        <div className="w-full max-w-sm">
          <p id="volume-label" className="text-sm text-toolbox-text-secondary">
            Volume: {value}
          </p>
          <Slider aria-labelledby="volume-label" min={0} max={100} step={5} value={value} onChange={setValue} />
        </div>
      );
    case 'snackbar':
      return (
        <>
          <Button
            primary
            raised
            label="Save changes"
            onClick={() => {
              setSaved(true);
              setActive(true);
            }}
          />
          <span role="status" className="ml-4 text-sm text-toolbox-text-secondary">
            {saved ? 'Saved' : 'Unsaved'}
          </span>
          <Snackbar
            active={active}
            label="Your changes are saved."
            action="Undo"
            timeout={4000}
            onClick={() => {
              setSaved(false);
              setActive(false);
            }}
            onTimeout={() => setActive(false)}
          />
        </>
      );
    case 'switch':
      return <Switch label="Do not disturb" checked={checked} onChange={setChecked} />;
    case 'table':
      return (
        <div className="w-full overflow-x-auto">
          <Table selectable={false}>
            <TableHead>
              <TableCell>Project</TableCell>
              <TableCell>Status</TableCell>
            </TableHead>
            <TableRow>
              <TableCell>Weekend notes</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>A new idea</TableCell>
              <TableCell>Draft</TableCell>
            </TableRow>
          </Table>
        </div>
      );
    case 'tabs':
      return (
        <div className="w-full">
          <Tabs index={index} onChange={setIndex}>
            <Tab label="Overview">
              <p className="py-6">The big picture.</p>
            </Tab>
            <Tab label="Details">
              <p className="py-6">A closer look.</p>
            </Tab>
            <Tab label="Unavailable" disabled />
          </Tabs>
        </div>
      );
    case 'time-picker':
      return (
        <div className="w-full max-w-xs">
          <TimePicker label="Reminder" format="24hr" value={date} onChange={setDate} />
        </div>
      );
    case 'tooltip':
      return <HintButton primary raised label="Save idea" tooltip="Keep this idea for later" />;
  }
}
