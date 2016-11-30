import * as React from "react";
import ReactToolbox from "../index";

export interface DatePickerTheme {
  /**
   * Used for the active day and year.
   */
  active?: string;
  /**
   * Used for the buttons in the dialog.
   */
  button?: string;
  /**
   * Used for the calendar root element.
   */
  calendar?: string;
  /**
   * Used as wrapper for the calendar component inside dialog.
   */
  calendarWrapper?: string;
  /**
   * Used for the date element inside header.
   */
  date?: string;
  /**
   * Used for the day element inside the calendar.
   */
  day?: string;
  /**
   * Used for the list of days inside a month.
   */
  days?: string;
  /**
   * Used for the dialog component.
   */
  dialog?: string;
  /**
   * Added to day element when day is disabled.
   */
  disabled?: string;
  /**
   * Used for the dialog header,.
   */
  header?: string;
  /**
   * Used for Input element that opens the picker.
   */
  input?: string;
  /**
   * Used for the month root element.
   */
  month?: string;
  /**
   * Added to the root dialog when months are displayed.
   */
  monthsDisplay?: string;
  /**
   * Used for the next month icon.
   */
  next?: string;
  /**
   * Used for the prev month icon.
   */
  prev?: string;
  /**
   * Used for the month title element.
   */
  title?: string;
  /**
   * Used for the weekdays wrapper.
   */
  week?: string;
  /**
   * Used for the year element inside header.
   */
  year?: string;
  /**
   * Used for the years list in years view.
   */
  years?: string;
  /**
   * Added to the root dialog when years are displayed.
   */
  yearsDisplay?: string;
}

interface DatePickerProps extends ReactToolbox.Props {
  /**
   * Automatically selects a date upon clicking on a day
   * @default false
   */
  autoOk?: boolean;
  /**
   * Give an error node to display under the field.
   */
  error?: string;
  /**
   * A key to identify an Icon from Material Design Icons or a custom Icon Element.
   */
  icon?: React.ReactNode | string;
  /**
   * This class will be applied to Input component of DatePicker.
   */
  inputClassName?: string;
  /**
   * Function to format the date displayed on the input.
   */
  inputFormat?: Function;
  /**
   * The text string to use for the floating label element in the input component.
   */
  label?: string;
  /**
   * Date object with the maximum selectable date.
   */
  maxDate?: Date;
  /**
   * Date object with the minimum selectable date.
   */
  minDate?: Date;
  /**
   * Name for the input field.
   */
  name?: string;
  /**
   * Callback called when the picker value is changed.
   */
  onChange?: Function;
  /**
   * Callback called when the ESC key is pressed with the overlay active.
   */
  onEscKeyDown?: Function;
  /**
   * Callback to be invoked when the dialog overlay is clicked.
   */
  onOverlayClick?: Function;
  /**
   * The input element will be readonly and look like disabled.
   */
  readonly?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: DatePickerTheme;
  /**
   * Date object with the currently selected date.
   */
  value?: Date | string;
}

export class DatePicker extends React.Component<DatePickerProps, {}> { }

export default DatePicker;
