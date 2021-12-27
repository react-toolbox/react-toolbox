import * as React from "react";
import ReactToolbox from "../index";
import { ButtonProps } from "../button/index";

export interface DialogTheme {
  /**
   * Used for the root when the dialog is active.
   */
  active?: string;
  /**
   * Used to wrap the dialog body.
   */
  body?: string;
  /**
   * Used in buttons when the dialog implements actions.
   */
  button?: string;
  /**
   * Used for the root element.
   */
  dialog?: string;
  /**
   * Used for the navigation element when it implements actions.
   */
  navigation?: string;
  /**
   * Used for the title element of the dialog.
   */
  title?: string;
}

export interface DialogActionProps extends ButtonProps {
  /**
   * The text string to use for the name of the button.
   */
  label?: string;
  /**
   * Callback called when the component is clicked.
   */
  onClick?: Function;
}

export interface DialogProps extends ReactToolbox.Props {
  /**
   * A array of objects representing the buttons for the dialog navigation area. The properties will be transferred to the buttons.
   */
  actions?: DialogActionProps[];
  /**
   * If true, the dialog will be active.
   * @default false
   */
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Callback called when the ESC key is pressed with the overlay active.
   */
  onEscKeyDown?: Function;
  /**
   * Callback to be invoked when the dialog overlay is clicked.
   */
  onOverlayClick?: Function;
  /**
   * Callback called when the mouse button is pressed on the overlay.
   */
  onOverlayMouseDown?: Function;
  /**
   * Callback called when the mouse is moving over the overlay.
   */
  onOverlayMouseMove?: Function;
  /**
   * Callback called when the mouse button is released over the overlay.
   */
  onOverlayMouseUp?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: DialogTheme;
  /**
   * The text string to use as standar title of the dialog.
   */
  title?: string;
  /**
   * Used to determine the size of the dialog. It can be small, normal or large.
   * @default "normal"
   */
  type?: "small" | "normal" | "large" | string;
}

export class Dialog extends React.Component<DialogProps, {}> { }

export default Dialog;
