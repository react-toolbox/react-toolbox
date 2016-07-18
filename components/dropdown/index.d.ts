import __ReactToolbox from "../index.d.ts";

export interface DropdownTheme {
  active?: string;
  disabled?: string;
  dropdown?: string;
  error?: string;
  errored?: string;
  field?: string;
  label?: string;
  selected?: string;
  templateValue?: string;
  up?: string;
  value?: string;
  values?: string;
}

interface DropdownProps extends __ReactToolbox.Props {
  allowBlank?: boolean;
  auto?: boolean;
  disabled?: boolean;
  error?: string;
  label?: string;
  name?: string;
  onBlur?: __React.FocusEventHandler;
  onChange?: __React.FormEventHandler;
  onFocus?: __React.FocusEventHandler;
  source: any[];
  template?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: DropdownTheme;
  value?: string | number;
}

export class Dropdown extends __React.Component<DropdownProps, {}> { }

export default Dropdown;
