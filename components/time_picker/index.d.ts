import * as React from "react";
import ReactToolbox from "../index";

export interface TimePickerTheme {
  /**
   * Added to the number which is active in clock face.
   */
  active?: string;
  /**
   * AM label in dialog header when mode is AM/PM.
   */
  am?: string;
  /**
   * Added to the dialog when the selected format is AM.
   */
  amFormat?: string;
  /**
   * Wrapper for AM and PM labels in header when mode is AM/PM.
   */
  ampm?: string;
  /**
   * Used for buttons inside the dialog of the picker.
   */
  button?: string;
  /**
   * Clock root class element.
   */
  clock?: string;
  /**
   * Wrapper for the proper positioning of the clock.
   */
  clockWrapper?: string;
  /**
   * Used for the dialog component.
   */
  dialog?: string;
  /**
   * Used to style the clock face.
   */
  face?: string;
  /**
   * Used for the clock's hand.
   */
  hand?: string;
  /**
   * Dialog header wrapper class.
   */
  header?: string;
  /**
   * Used for hours in dialog header.
   */
  hours?: string;
  /**
   * Added to the dialog hours are displayed.
   */
  hoursDisplay?: string;
  /**
   * Used for Input element that opens the picker.
   */
  input?: string;
  /**
   * Used for the knob of the hand.
   */
  knob?: string;
  /**
   * Used for minutes in dialog header.
   */
  minutes?: string;
  /**
   * Added to the dialog minutes are displayed.
   */
  minutesDisplay?: string;
  /**
   * Each of the numbers in the clock's face.
   */
  number?: string;
  /**
   * Placeholder for the clock inside the dialog (inner wrapper).
   */
  placeholder?: string;
  /**
   * PM label in dialog header when mode is AM/PM.
   */
  pm?: string;
  /**
   * Added to the dialog when the selected format is PM.
   */
  pmFormat?: string;
  /**
   * Is the : separator between hours and minutes in dialog header.
   */
  separator?: string;
  /**
   * Added to the knob when no round number is selected.
   */
  small?: string;
}

interface TimePickerProps {
  /**
   * Provide error text which will be displayed under the field.
   */
  error?: string;
  /**
   * A key to identify an Icon from Material Design Icons or a custom Icon Element.
   */
  icon?: React.ReactNode | string;
  /**
   * This class will be applied to Input component of TimePicker.
   */
  inputClassName?: string;
  /**
   * Format to display the clock. It can be 24hr or ampm.
   * @default false
   */
  format?: "24hr" | "ampm";
  /**
   * The text string to use for the floating label element in the input component.
   */
  label?: string;
  /**
   * Callback called when the picker value is changed.
   */
  onChange?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: TimePickerTheme;
  /**
   * Datetime object with currrently selected time.
   */
  value?: Date;
}

export class TimePicker extends React.Component<TimePickerProps, {}> { }

export default TimePicker;
