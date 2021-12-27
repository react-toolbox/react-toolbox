export interface RadioTheme {
  /**
   * Used to for the radio element.
   */
  radio?: string;
  /**
   * Used for the radio element when it's checked.
   */
  radioChecked?: string;
  /**
   * To provide styles for the ripple.
   */
  ripple?: string;
}

export interface RadioProps {
  /**
   * If true, the input element will be selected by default. Transferred from the parent.
   * @default false
   */
  checked?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Callback invoked on mouse down.
   */
  onMouseDown?: Function;
  /**
   * Additional properties passed to Radio container.
   */
  [key: string]: any;
}
