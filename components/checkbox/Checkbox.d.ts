import * as React from "react";
import ReactToolbox from "../index";

export interface CheckboxTheme {
  /**
   * Used as root in the check element.
   */
  check?: string;
  /**
   * Used for the check element when it's checked.
   */
  checked?: string;
  /**
   * Used when the component is disabled.
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
   * Used for the ripple component.
   */
  ripple?: string;
  /**
   * Used for the text label.
   */
  text?: string;
}

export interface CheckboxProps extends ReactToolbox.Props {
  /**
   * Value for the checkbox, can be true or false.
   * @default false
   */
  checked?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the checkbox shown as disabled and cannot be modified.
   * @default false
   */
  disabled?: boolean;
  /**
   * Text label to attach next to the checkbox element.
   */
  label?: React.ReactNode;
  /**
   * The name of the field to set in the input checkbox.
   */
  name?: string;
  /**
   * Callback called when the checkbox is blurred.
   */
  onBlur?: Function;
  /**
   * Callback called when the checkbox value is changed.
   */
  onChange?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: CheckboxTheme;
  /**
   * Additional properties passed to inner input element.
   */
  [key: string]: any;
}

export class Checkbox extends React.Component<CheckboxProps, {}> { }

export default Checkbox;
