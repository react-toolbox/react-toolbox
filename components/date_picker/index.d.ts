import __ReactToolbox from "../index.d.ts";

export interface DatePickerTheme {
  active?: string;
  button?: string;
  calendar?: string;
  calendarWrapper?: string;
  date?: string;
  day?: string;
  days?: string;
  dialog?: string;
  disabled?: string;
  header?: string;
  input?: string;
  month?: string;
  monthsDisplay?: string;
  next?: string;
  prev?: string;
  title?: string;
  week?: string;
  year?: string;
  years?: string;
  yearsDisplay?: string;
}

interface DatePickerProps extends __ReactToolbox.Props {
  autoOk?: boolean;
  error?: string;
  icon?: __React.ReactNode | string;
  inputClassName?: string;
  inputFormat?: Function;
  label?: string;
  maxDate?: Date;
  minDate?: Date;
  name?: string;
  onChange?: __React.MouseEventHandler;
  onEscKeyDown?: __React.KeyboardEventHandler;
  onOverlayClick?: __React.MouseEventHandler;
  /**
   * Classnames object defining the component style.
   */
  theme?: DatePickerTheme;
  value?: Date | string;
}

export class DatePicker extends __React.Component<DatePickerProps, {}> { }

export default DatePicker;
