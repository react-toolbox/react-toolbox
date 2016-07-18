import __ReactToolbox from "../index.d.ts";

export interface CheckboxTheme {
  check?: string;
  checked?: string;
  disabled?: string;
  field?: string;
  input?: string;
  ripple?: string;
}

interface CheckboxProps extends __ReactToolbox.Props {
  checked?: boolean;
  disabled?: boolean;
  label?: __React.ReactNode | string;
  name?: string;
  onChange?: __React.MouseEventHandler;
  /**
   * Classnames object defining the component style.
   */
  theme?: CheckboxTheme;
}

export class Checkbox extends __React.Component<CheckboxProps, {}> { }

export default Checkbox;
