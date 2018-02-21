import * as React from "react";
import ReactToolbox from "../index";

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
   * Used when dropdown has required attribute.
   */
  required?: string;
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

export interface DropdownProps extends ReactToolbox.Props {
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
   * Used for setting the label from source
   */
  labelKey?: string;
  /**
   * Name for the input field.
   */
  name?: string;
  /**
   * Callback function that is fired when the component is blurred.
   */
  onBlur?: Function;
  /**
   * Callback function that is fired when the component's value changes.
   */
  onChange?: Function;
  /**
   * Callback function that is fired when the component is focused.
   */
  onFocus?: Function;
  /**
   * If true, the dropdown has a required attribute.
   * @default false
   */
  required?: boolean;
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
  /**
   * Used for setting the value from source
   */
  valueKey?: string;
}

export class Dropdown extends React.Component<DropdownProps, {}> { }

export default Dropdown;
