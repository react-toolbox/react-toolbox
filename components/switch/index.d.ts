import __ReactToolbox from "../index.d.ts";

export interface SwitchTheme {
  disabled?: string;
  field?: string;
  input?: string;
  off?: string;
  on?: string;
  ripple?: string;
  text?: string;
  thumb?: string;
}

interface SwitchProps extends __ReactToolbox.Props {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  name?: string;
  onBlur?: __React.FocusEventHandler;
  onChange?: __React.FormEventHandler;
  onFocus?: __React.FocusEventHandler;
  /**
   * Classnames object defining the component style.
   */
  theme?: SwitchTheme;
}

export class Switch extends __React.Component<SwitchProps, {}> { }

export default Switch;
