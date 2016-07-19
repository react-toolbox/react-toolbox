import __ReactToolbox from "../index.d.ts";

export interface DropdownTheme {
  /**
   * Added to the root element when the dropdown is active.
   */
  active?: string;
  /**
   * Added to the root element when it's disabled.
   */
  disabled?: string;
  /**
   * Root element class.
   */
  dropdown?: string;
  /**
   * Used for the error element.
   */
  error?: string;
  /**
   * Added to the inner wrapper if it's errored.
   */
  errored?: string;
  /**
   * Used for the inner wrapper of the component.
   */
  field?: string;
  /**
   * Used for the the label element.
   */
  label?: string;
  /**
   * Used to highlight the selected value.
   */
  selected?: string;
  /**
   * Used as a wrapper for the given template value.
   */
  templateValue?: string;
  /**
   * Added to the root element when it's opening up.
   */
  up?: string;
  /**
   * Used for each value in the dropdown component.
   */
  value?: string;
  /**
   * Used for the list of values.
   */
  values?: string;
}

interface DropdownProps extends __ReactToolbox.Props {
  /**
   * If true the dropdown will preselect the first item if the supplied value matches none of the options' values.
   * @default true
   */
  allowBlank?: boolean;
  /**
   * If true, the dropdown will open up or down depending on the position in the screen.
   * @default true
   */
  auto?: boolean;
  /**
   * Set the component as disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Give an error string to display under the field.
   */
  error?: string;
  /**
   * The text string to use for the floating label element.
   */
  label?: string;
  /**
   * Name for the input field.
   */
  name?: string;
  /**
   * Callback function that is fired when the component is blurred.
   */
  onBlur?: __React.FocusEventHandler;
  /**
   * Callback function that is fired when the component's value changes.
   */
  onChange?: __React.FormEventHandler;
  /**
   * Callback function that is fired when the component is focused.
   */
  onFocus?: __React.FocusEventHandler;
  /**
   * Array of data objects with the data to represent in the dropdown.
   */
  source: any[];
  /**
   * Callback function that returns a JSX template to represent the element.
   */
  template?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: DropdownTheme;
  /**
   * Default value using JSON data.
   */
  value?: string | number;
}

export class Dropdown extends __React.Component<DropdownProps, {}> { }

export default Dropdown;
