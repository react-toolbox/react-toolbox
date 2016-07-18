import __ReactToolbox from "../index.d.ts";

interface RadioGroupProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  disabled?: boolean;
  name?: string;
  onChange?: Function;
  value?: number;
}

export class RadioGroup extends __React.Component<RadioGroupProps, {}> { }

export interface RadioButtonTheme {
  radio?: string;
  radioChecked?: string;
  ripple?: string;
  disabled?: string;
  field?: string;
  input?: string;
  text?: string;
}

interface RadioButtonProps extends __ReactToolbox.Props {
  checked?: boolean;
  disabled?: boolean;
  label?: __React.ReactNode | string;
  name?: string;
  onBlur?: __React.FocusEventHandler;
  onChange?: __React.FormEventHandler;
  onFocus?: __React.FocusEventHandler;
  /**
   * Classnames object defining the component style.
   */
  theme?: RadioButtonTheme;
  value?: any;
}

export class RadioButton extends __React.Component<RadioButtonProps, {}> { }
