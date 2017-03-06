import * as React from "react";
import ReactToolbox from "../index";
import { RadioTheme } from './base';

export interface RadioButtonTheme {
  /**
   * Added to the root of the Radio in case it's disabled.
   */
  disabled?: string;
  /**
   * Used as the root class of the component.
   */
  field?: string;
  /**
   * Used for the input element.
   */
  input?: string;
  /**
   * Used to style the text label element.
   */
  text?: string;
}

export interface RadioButtonProps extends ReactToolbox.Props {
  /**
   * If true, the input element will be selected by default. Transferred from the parent.
   * @default false
   */
  checked?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the item will be displayed as disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Label for the radio button.
   */
  label?: React.ReactNode;
  /**
   * Name for the input element.
   */
  name?: string;
  /**
   * Callback function that will be invoked when the input is blurred.
   */
  onBlur?: Function;
  /**
   * Callback function that will be invoked when the value changes.
   */
  onChange?: Function;
  /**
   * Callback function that will be invoked when the input is focused.
   */
  onFocus?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: RadioButtonTheme & RadioTheme;
  /**
   * Value for the radio button.
   */
  value?: any;
}

export class RadioButton extends React.Component<RadioButtonProps, {}> { }
