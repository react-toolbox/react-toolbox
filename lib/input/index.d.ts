import __ReactToolbox from "../index.d.ts";

export interface InputTheme {
  /**
   * Used for the bar under the input.
   */
  bar?: string;
  /**
   * Used for the counter element.
   */
  counter?: string;
  /**
   * Added to the root class when input is disabled.
   */
  disabled?: string;
  /**
   * Used for the text error.
   */
  error?: string;
  /**
   * Added to the root class when input is errored.
   */
  errored?: string;
  /**
   * Used when the input is hidden.
   */
  hidden?: string;
  /**
   * Used for the hint text.
   */
  hint?: string;
  /**
   * Used for the icon in case the input has icon.
   */
  icon?: string;
  /**
   * Used as root class for the component.
   */
  input?: string;
  /**
   * Used for the HTML input element.
   */
  inputElement?: string;
  /**
   * Used in case the input is required.
   */
  required?: string;
  /**
   * Added to the root class if the input has icon.
   */
  withIcon?: string;
}

interface InputProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  /**
   * If true, component will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Give an error node to display under the field.
   */
  error?: string;
  /**
   * Indicates if the label is floating in the input field or not.
   * @default true
   */
  floating?: boolean;
  /**
   * The text string to use for hint text element.
   */
  hint?: string;
  /**
   * Name of an icon to use as a label for the input.
   */
  icon?: __React.ReactNode | string;
  /**
   * The text string to use for the floating label element.
   */
  label?: string;
  /**
   * Specifies the maximum number of characters allowed in the component
   */
  maxLength?: number;
  /**
   * If true, a textarea element will be rendered. The textarea also grows and shrinks according to the number of lines.
   * @default false
   */
  multiLine?: boolean;
  /**
   * Name for the input field.
   */
  name?: string;
  /**
   * Callback function that is fired when component is blurred.
   */
  onBlur?: __React.FocusEventHandler;
  /**
   * Callback function that is fired when the component's value changes
   */
  onChange?: __React.FormEventHandler;
  /**
   * Callback function that is fired when component is focused.
   */
  onFocus?: __React.FocusEventHandler;
  /**
   * Callback function that is fired when a key is pressed.
   */
  onKeyPress?: __React.MouseEventHandler;
  /**
   * If true, the html input has a required attribute.
   * @default false
   */
  required?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: InputTheme;
  /**
   * Type of the input element. It can be a valid HTML5 input type
   */
  type?: string;
  /**
   * Current value of the input element.
   */
  value?: any;
}

export class Input extends __React.Component<InputProps, {}> { }

export default Input;
