import * as React from "react";
import ReactToolbox from "../index";

export interface ListCheckboxTheme {
  /**
   * Used as a wrapper class for the subheader element.
   */
  checkbox?: string;
  /**
   * Added to the checkbox element.
   */
  checkboxItem?: string;
  /**
   * Added to the inner content if its a disabled item.
   */
  disabled?: string;
  /**
   * Used for the inner content of a list item.
   */
  item?: string;
}

export interface ListCheckboxProps extends ReactToolbox.Props {
  /**
   * Main text of the item. Required.
   */
  caption?: string;
  /**
   * If true the checkbox appears checked by default.
   * @default false
   */
  checked?: boolean;
  /**
   * If true, the item is displayed as disabled and it's not clickable.
   * @default false
   */
  disabled?: boolean;
  /**
   * Secondary text to display under the caption.
   */
  legend?: string;
  /**
   * Name for the checkbox input item.
   */
  name?: string;
  /**
   * Callback called when the input element is blurred.
   */
  onBlur?: Function;
  /**
   * Callback called when the input element is changed.
   */
  onChange?: Function;
  /**
   * Callback called when the input element is focused.
   */
  onFocus?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: ListCheckboxTheme;
}

export class ListCheckbox extends React.Component<ListCheckboxProps, {}> { }
