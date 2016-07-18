import __ReactToolbox from "../index.d.ts";

export interface TimePickerTheme {
  active?: string;
  am?: string;
  amFormat?: string;
  ampm?: string;
  button?: string;
  clock?: string;
  clockWrapper?: string;
  dialog?: string;
  face?: string;
  hand?: string;
  header?: string;
  hours?: string;
  hoursDisplay?: string;
  input?: string;
  knob?: string;
  minutes?: string;
  minutesDisplay?: string;
  number?: string;
  placeholder?: string;
  pm?: string;
  pmFormat?: string;
  separator?: string;
  small?: string;
}

interface TimePickerProps {
  error?: string;
  inputClassName?: string;
  format?: "24hr" | "ampm";
  label?: string;
  onChange?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: TimePickerTheme;
  value?: Date;
}

export class TimePicker extends __React.Component<TimePickerProps, {}> { }

export default TimePicker;
