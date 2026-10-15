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

// Public declarations must reject the obsolete injection API and wrong value types.
// @ts-expect-error The provider scopes CSS variables; it no longer injects named component themes.
const obsoleteProvider = <ThemeProvider theme={{ RTButton: { button: 'custom' } }} />;
// @ts-expect-error Native event handlers receive an event, not a numeric value.
const wrongButtonHandler = <Button onClick={(value: number) => value} />;
// @ts-expect-error Value-first input callbacks receive strings.
const wrongInputHandler = <Input onChange={(value: number) => value} />;
// @ts-expect-error Style slots are typed and reject arbitrary part names.
const wrongSlot = <Button classNames={{ nonexistentPart: 'p-4' }} />;
