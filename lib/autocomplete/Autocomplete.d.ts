import * as React from "react";
import ReactToolbox from "../index";
import { InputProps, InputTheme } from "../input/Input";

export interface AutocompleteTheme {
  /**
   * Used for a suggestion when it's active.
   */
  active?: string;
  /**
   * Used for the root element.
   */
  autocomplete?: string;
  /**
   * Used when the input is focused.
   */
  focus?: string;
  /**
   * Used to style the Input component.
   */
  input?: string;
  /**
   * Used to style each suggestion.
   */
  suggestion?: string;
  /**
   * Used to style the suggestions container.
   */
  suggestions?: string;
  /**
   * Used for the suggestions when it's opening to the top.
   */
  up?: string;
  /**
   * Classname used for a single value.
   */
  value?: string;
  /**
   * Classname used for the values container.
   */
  values?: string;
}

export interface AutocompleteProps extends InputProps {
  /**
   * Determines if user can create a new option with the current typed value.
   * @default false
   */
  allowCreate?: boolean;
  /**
   * Determines the opening direction. It can be auto, up or down.
   * @default auto
   */
  direction?: "auto" | "up" | "down";
  /**
   * If true, component will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Sets the error string for the internal input element.
   * @default false
   */
  error?: React.ReactNode;
  /**
   * Whether component should keep focus after value change.
   * @default false
   */
  keepFocusOnChange?: boolean;
  /**
   * The text string to use for the floating label element.
   */
  label?: React.ReactNode;
  /**
   * If true, component can hold multiple values.
   * @default true
   */
  multiple?: boolean;
  /**
   * Callback function that is fired when component is blurred.
   */
  onBlur?: Function;
  /**
   * Callback function that is fired when the components's value changes.
   */
  onChange?: Function;
  /**
   * Callback function that is fired when component is focused.
   */
  onFocus?: Function;
  /**
   * Callback function that is fired when a key is pressed down.
   */
  onKeyDown?: Function;
  /**
   * Callback function that is fired when a key is lifted up.
   */
  onKeyUp?: Function;
  /**
   * Callback function that is fired when the components's query value changes.
   */
  onQueryChange?: Function;
  /**
   * Determines if the selected list is shown above or below input. It can be above or below.
   * @default above
   */
  selectedPosition?: "above" | "below" | "none";
  /**
   * Determines if the selected list is shown if the `value` keys don't exist in the source. Only works if passing the `value` prop as an Object.
   * @default false
   */
  showSelectedWhenNotInSource?: boolean;
  /**
   * If true, the list of suggestions will not be filtered when a value is selected.
   * @default false
   */
  showSuggestionsWhenValueIsSet?: boolean;
  /**
   * Object of key/values or array representing all items suggested.
   */
  source?: any;
  /**
   * Determines how suggestions are supplied.
   * @default start
   */
  suggestionMatch?: "disabled" | "start" | "anywhere" | "word";
  /**
   * Classnames object defining the component style.
   */
  theme?: AutocompleteTheme & InputTheme;
  /**
   * Value or array of values currently selected component.
   */
  value?: any;
  /**
   * Additional properties passed to inner Input component.
   */
  [key: string]: any;
}

export class Autocomplete extends React.Component<AutocompleteProps, {}> { }

export default Autocomplete;
