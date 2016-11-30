import * as React from "react";
import ReactToolbox from "../index";

interface RadioGroupProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the group will be displayed as disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Name for the input element group.
   */
  name?: string;
  /**
   * Callback function that will be invoked when the value changes.
   */
  onChange?: Function;
  /**
   * Default value selected in the radio group.
   */
  value?: any;
}

export class RadioGroup extends React.Component<RadioGroupProps, {}> { }

export interface RadioButtonTheme {
  /**
   * Used to for the radio element.
   */
  radio?: string;
  /**
   * Used for the radio element when it's checked.
   */
  radioChecked?: string;
  /**
   * To provide styles for the ripple.
   */
  ripple?: string;
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

interface RadioButtonProps extends ReactToolbox.Props {
  /**
   * If true, the input element will be selected by default. Transferred from the parent.
   * @default false
   */
  checked?: boolean;
  /**
   * If true, the item will be displayed as disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Label for the radio button.
   */
  label?: React.ReactNode | string;
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
  theme?: RadioButtonTheme;
  /**
   * Value for the radio button.
   */
  value?: any;
}

export class RadioButton extends React.Component<RadioButtonProps, {}> { }
