import * as React from "react";
import ReactToolbox from "../index";

export interface SwitchTheme {
  /**
   * Used for the root element if the component is disabled.
   */
  disabled?: string;
  /**
   * Used for the root element if the component is not disabled.
   */
  field?: string;
  /**
   * Used for the input element.
   */
  input?: string;
  /**
   * Used for a wrapper around the thumb if checked is false.
   */
  off?: string;
  /**
   * Used for a wrapper around the thumb if checked is true.
   */
  on?: string;
  /**
   * Used for the ripple inside the switch.
   */
  ripple?: string;
  /**
   * Used for the text label element.
   */
  text?: string;
  /**
   * Used for the thumb element.
   */
  thumb?: string;
}

interface SwitchProps extends ReactToolbox.Props {
  /**
   * If true, the switch will be enabled.
   * @default false
   */
  checked?: boolean;
  /**
   * If true, component will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The text string to use for the floating label element.
   */
  label?: string;
  /**
   * The text string used as name of the input.
   */
  name?: string;
  /**
   * Callback function that is fired when when the switch is blurred.
   */
  onBlur?: Function;
  /**
   * Callback function that is fired when the component's value changes.
   */
  onChange?: Function;
  /**
   * Callback function that is fired when the switch is focused.
   */
  onFocus?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: SwitchTheme;
}

export class Switch extends React.Component<SwitchProps, {}> { }

export default Switch;
