import * as React from 'react';
import {
  Button,
  BrowseButton,
  IconButton,
  Input,
  ThemeProvider,
  Tooltip,
  Ripple,
  Card,
  CardTitle,
  CardText,
  CardActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  DatePicker,
  TimePicker,
  Checkbox,
  Autocomplete,
  Dropdown,
  Slider,
  IconMenu,
  Menu,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  Tabs,
  Tab,
  type ButtonProps,
  type ButtonClassNames,
  type DatePickerClassNames,
  type ThemeVariables,
  type InputHandle,
} from '../../src';

const variables: ThemeVariables = { '--rt-color-primary': '#3f51b5' };
const props: ButtonProps = { primary: true, raised: true, label: 'Save', children: 'Child' };
const buttonSlots: ButtonClassNames = { button: 'rounded-none', icon: 'text-xl' };
const pickerSlots: DatePickerClassNames = { inputElement: 'font-medium' };
const Tip = Tooltip(Button);
const RippleButton = Ripple({ centered: false })(Button);

export const example = (
  <ThemeProvider variables={variables}>
    <Button {...props} classNames={buttonSlots} />
    <BrowseButton label="Upload" />
    <IconButton icon="add" />
    <Input
      aria-label="Name"
      ref={(input: InputHandle | null) => {
        input?.focus();
      }}
    />
    <Tip tooltip="Save" label="Save" classNames={{ button: 'rounded-none', tooltip: 'z-50' }} />
    <RippleButton label="Ripple" />
    <Card>
      <CardTitle title="Example" />
      <CardText>Body</CardText>
      <CardActions>
        <Button label="Read" />
      </CardActions>
    </Card>
    <Checkbox checked label="Selected" />
    <Tabs index={0}>
      <Tab label="First">Content</Tab>
    </Tabs>
    <Table>
      <TableHead>
        <TableCell>Title</TableCell>
      </TableHead>
      <TableRow>
        <TableCell>Value</TableCell>
      </TableRow>
    </Table>
    <DatePicker value={new Date()} classNames={pickerSlots} />
    <TimePicker value={new Date()} />
  </ThemeProvider>
);

// @ts-expect-error The provider scopes CSS variables; it no longer injects named component themes.
const obsoleteProvider = <ThemeProvider theme={{ RTButton: { button: 'custom' } }} />;
// @ts-expect-error Components accept classNames for slot overrides.
const obsoleteSlots = <Button theme={{ button: 'custom' }} />;
// @ts-expect-error Menu visibility is controlled through open.
const obsoleteMenuState = <Menu active />;
// @ts-expect-error IconMenu visibility is controlled through open.
const obsoleteIconMenuState = <IconMenu active />;
// @ts-expect-error DatePicker visibility is controlled through open.
const obsoleteDatePickerState = <DatePicker active />;
// @ts-expect-error TimePicker visibility is controlled through open.
const obsoleteTimePickerState = <TimePicker active />;
// @ts-expect-error Native event handlers receive an event, not a numeric value.
const wrongButtonHandler = <Button onClick={(value: number) => value} />;
// @ts-expect-error Value-first input callbacks receive strings.
const wrongInputHandler = <Input onChange={(value: number) => value} />;
// @ts-expect-error Style slots are typed and reject arbitrary part names.
const wrongSlot = <Button classNames={{ nonexistentPart: 'p-4' }} />;

export const workflowExamples = (
  <>
    <Button asChild ref={React.createRef<HTMLAnchorElement>()}>
      <a href="/home">Home</a>
    </Button>
    <Tip asChild tooltip="View profile">
      <a href="/profile" ref={React.createRef<HTMLAnchorElement>()}>
        Profile
      </a>
    </Tip>
    <IconMenu
      trigger={
        <Tip asChild tooltip="Display options">
          <button type="button">Options</button>
        </Tip>
      }
    >
      <MenuCheckboxItem caption="Toolbar" defaultChecked />
    </IconMenu>
    <IconButton asChild aria-label="Home">
      <a href="/home">Home</a>
    </IconButton>
    <Autocomplete
      multiple={false}
      defaultValue="ada"
      source={[{ value: 'ada', label: <b>Ada</b>, textValue: 'Ada', group: 'Team' }]}
      onChange={(value: string) => value}
    />
    <Autocomplete
      defaultValue={['ada']}
      onChange={(value: string[]) => value}
      name="people"
      clearable
      loading
      emptyMessage="No matches"
    />
    <Autocomplete defaultValue={{ ada: 'Ada' }} onChange={(value: Record<string, React.ReactNode>) => value} />
    <Dropdown
      open={false}
      onOpenChange={(open: boolean) => open}
      source={[{ key: 1, text: 'One', category: 'Numbers' }]}
      valueKey="key"
      labelKey="text"
      groupKey="category"
    />
    <Slider defaultValue={20} name="volume" form="settings" onValueCommit={(value: number) => value} />
    <IconMenu trigger={<Button label="Preferences" />} open={false} onOpenChange={(open: boolean) => open}>
      <MenuCheckboxItem caption="Toolbar" defaultChecked onCheckedChange={(checked: boolean) => checked} />
      <MenuRadioGroup defaultValue="small" onValueChange={(value: string) => value}>
        <MenuRadioItem value="small" caption="Small" />
      </MenuRadioGroup>
    </IconMenu>
    <Tabs defaultIndex={0} activationMode="manual" loop={false}>
      <Tab label="First">Content</Tab>
    </Tabs>
    <DatePicker defaultValue={new Date()} open={false} onOpenChange={(open: boolean) => open} />
    <TimePicker defaultValue={new Date()} />
  </>
);
