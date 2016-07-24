import __ReactToolbox from "../index.d.ts";

interface RadioGroupProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
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
  value?: number;
}

export class RadioGroup extends __React.Component<RadioGroupProps, {}> { }

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

interface RadioButtonProps extends __ReactToolbox.Props {
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
  label?: __React.ReactNode | string;
  /**
   * Name for the input element.
   */
  name?: string;
  /**
   * Callback function that will be invoked when the input is blurred.
   */
  onBlur?: __React.FocusEventHandler;
  /**
   * Callback function that will be invoked when the value changes.
   */
  onChange?: __React.FormEventHandler;
  /**
   * Callback function that will be invoked when the input is focused.
   */
  onFocus?: __React.FocusEventHandler;
  /**
   * Classnames object defining the component style.
   */
  theme?: RadioButtonTheme;
  /**
   * Value for the radio button.
   */
  value?: any;
}

export class RadioButton extends __React.Component<RadioButtonProps, {}> { }
