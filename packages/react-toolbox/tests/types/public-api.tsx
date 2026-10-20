import * as React from 'react';
import {
  Button,
  BrowseButton,
  IconButton,
  Input,
  ThemeProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  useRipple,
  useTooltip,
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
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  Tabs,
  Tab,
  TabContent,
  type ButtonProps,
  type ThemeVariables,
  type InputHandle,
} from '../../src';

const variables: ThemeVariables = { '--rt-color-primary': '#3f51b5' };
const props: ButtonProps = { primary: true, raised: true, label: 'Save', children: 'Child' };
function RippleButton() {
  const { ripple, ...events } = useRipple({ centered: false });
  return <button {...events}>Ripple{ripple}</button>;
}

function MenuWithTooltip() {
  const tooltip = useTooltip({ tooltip: 'Display options' });
  return (
    <>
      <IconMenu
        trigger={
          <button type="button" {...tooltip.triggerProps}>
            Options
          </button>
        }
      >
        <MenuCheckboxItem caption="Toolbar" defaultChecked />
      </IconMenu>
      {tooltip.tooltip}
    </>
  );
}

export const example = (
  <ThemeProvider variables={variables}>
    <Button {...props} className="rounded-none [&_.rt-button-icon]:text-xl" />
    <BrowseButton label="Upload" />
    <IconButton icon="add" />
    <Input
      aria-label="Name"
      ref={(input: InputHandle | null) => {
        input?.focus();
      }}
    />
    <TooltipRoot>
      <TooltipTrigger asChild>
        <Button label="Save" className="rounded-none" />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent className="z-50">Save</TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
    <RippleButton />
    <Card>
      <CardTitle title="Example" />
      <CardText>Body</CardText>
      <CardActions>
        <Button label="Read" />
      </CardActions>
    </Card>
    <Checkbox checked label="Selected" />
    <Tabs value="first">
      <Tab value="first" label="First">
        Content
      </Tab>
    </Tabs>
    <Table selectionMode="multiple" defaultSelected={['first']} onSelectionChange={(values: string[]) => values}>
      <TableHead>
        <TableCell>Title</TableCell>
      </TableHead>
      <TableRow
        value="first"
        onSelectionChange={(checked, event) => {
          if (!checked) event.preventDefault();
        }}
      >
        <TableCell>Value</TableCell>
      </TableRow>
    </Table>
    <DatePicker value={new Date()} inputClassName="[&_input]:font-medium" readOnly />
    <TimePicker value={new Date()} readOnly />
  </ThemeProvider>
);

// @ts-expect-error Native event handlers receive an event, not a numeric value.
const wrongButtonHandler = <Button onClick={(value: number) => value} />;
// @ts-expect-error Flat is the default appearance, not a configurable button prop.
const wrongFlatButton = <Button flat />;
// @ts-expect-error File buttons share the same explicit appearance contract.
const wrongFlatBrowseButton = <BrowseButton flat />;
// @ts-expect-error Value-first input callbacks receive strings.
const wrongInputHandler = <Input onChange={(value: number) => value} />;
// @ts-expect-error Pickers use the native React readOnly spelling.
const wrongReadonlyDatePicker = <DatePicker readonly />;
// @ts-expect-error Pickers use the native React readOnly spelling.
const wrongReadonlyTimePicker = <TimePicker readonly />;

export const workflowExamples = (
  <>
    <Button asChild ref={React.createRef<HTMLAnchorElement>()}>
      <a href="/home">Home</a>
    </Button>
    <TooltipRoot>
      <TooltipTrigger asChild>
        <a href="/profile" ref={React.createRef<HTMLAnchorElement>()}>
          Profile
        </a>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent>View profile</TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
    <MenuWithTooltip />
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
    <Tabs
      defaultValue="first"
      onValueChange={(value: string) => value}
      ref={React.createRef<HTMLDivElement>()}
      activationMode="manual"
      loop={false}
    >
      <Tab value="first" label="First" onClick={(event: React.MouseEvent<HTMLDivElement>) => event.preventDefault()} />
      <TabContent value="first">Content</TabContent>
    </Tabs>
    <DatePicker defaultValue={new Date()} open={false} onOpenChange={(open: boolean) => open} />
    <TimePicker defaultValue={new Date()} />
  </>
);
