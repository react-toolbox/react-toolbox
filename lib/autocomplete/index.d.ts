import * as React from "react";
import ReactToolbox from "../index";

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
   * Used for the label.
   */
  label?: string;
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

interface AutocompleteProps extends ReactToolbox.Props {
  /**
   * Determines the opening direction. It can be auto, up or down.
   * @default auto
   */
  direction?: "auto" | "up" | "down";
  /**
   * If true, component will be disabled.
   */
  disabled?: boolean;
  /**
   * Sets the error string for the internal input element.
   * @default false
   */
  error?: string;
  /**
   * The text string to use for the floating label element.
   */
  label?: string;
  /**
   * If true, component can hold multiple values.
   */
  multiple?: boolean;
  /**
   * Callback function that is fired when the components's value changes.
   * @default auto
   */
  onChange?: Function;
  /**
   * Determines if the selected list is shown above or below input. It can be above or below.
   * @default above
   */
  selectedPosition?: "above" | "below";
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
  suggestionMatch?: "start" | "anywhere" | "word";
  /**
   * Classnames object defining the component style.
   */
  theme?: AutocompleteTheme;
  /**
   * Value or array of values currently selected component.
   */
  value?: any;
}

export class Autocomplete extends React.Component<AutocompleteProps, {}> { }

export default Autocomplete;
