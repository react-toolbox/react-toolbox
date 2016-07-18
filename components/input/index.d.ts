import __ReactToolbox from "../index.d.ts";

export interface InputTheme {
  bar?: string;
  counter?: string;
  disabled?: string;
  error?: string;
  errored?: string;
  hidden?: string;
  hint?: string;
  icon?: string;
  input?: string;
  inputElement?: string;
  required?: string;
  withIcon?: string;
}

interface InputProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  disabled?: boolean;
  error?: string;
  floating?: boolean;
  hint?: string;
  icon?: __React.ReactNode | string;
  label?: string;
  maxLength?: number;
  multiLine?: boolean;
  name?: string;
  onBlur?: __React.FocusEventHandler;
  onChange?: __React.FormEventHandler;
  onFocus?: __React.FocusEventHandler;
  onKeyPress?: __React.MouseEventHandler;
  required?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: InputTheme;
  type?: string;
  value?: any;
}

export class Input extends __React.Component<InputProps, {}> { }

export default Input;
