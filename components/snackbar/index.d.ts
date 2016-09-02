import * as React from "react";
import ReactToolbox from "../index";

export interface SnackbarTheme {
  /**
   * Added to the root element in case it's accept type.
   */
  accept?: string;
  /**
   * Added to the root element when its active.
   */
  active?: string;
  /**
   * Used for the button inside the component.
   */
  button?: string;
  /**
   * Added to the root element in case it's cancel type.
   */
  cancel?: string;
  /**
   * Used for the icon element.
   */
  icon?: string;
  /**
   * Used for the label element.
   */
  label?: string;
  /**
   * Used as the className for the root element of the component.
   */
  snackbar?: string;
  /**
   * Added to the root element in case it's warning type.
   */
  warning?: string;
}

interface SnackbarProps extends ReactToolbox.Props {
  /**
   * Label for the action component inside the Snackbar.
   */
  action?: string;
  /**
   * If true, the snackbar will be active.
   * @default true
   */
  active?: boolean;
  /**
   * String key for an icon or Element which will be displayed in left side of the snackbar.
   */
  icon?: React.ReactNode | string;
  /**
   * Text to display in the content. Required.
   */
  label: string;
  /**
   * Callback function when finish the set timeout.
   */
  onTimeout?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: SnackbarTheme;
  /**
   * Amount of time in milliseconds after the Snackbar will be automatically hidden.
   */
  timeout?: number;
  /**
   * Indicates the action type. Can be accept, warning or cancel
   */
  type?: "accept" | "cancel" | "warning";
}

export class Snackbar extends React.Component<SnackbarProps, {}> { }

export default Snackbar;
