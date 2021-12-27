import * as React from "react";
import ReactToolbox from "../index";
import { ButtonBaseProps } from './base';

export interface IconButtonTheme {
  /**
   * Used for the root in case button is accent.
   */
  accent?: string;
  /**
   * Used for the root element in any button.
   */
  button?: string;
  /**
   * For the icon inside a button.
   */
  icon?: string;
  /**
   * Used when colors are inverted.
   */
  inverse?: string;
  /**
   * Used for neutral colored buttons.
   */
  neutral?: string;
  /**
   * Used for primary buttons when button is primary.
   */
  primary?: string;
  /**
   * Used for the ripple element.
   */
  rippleWrapper?: string;
  /**
   * Used for toggle buttons in the root element.
   */
  toggle?: string;
}

export interface IconButtonProps extends ButtonBaseProps {
  /**
   * Creates a link for the button.
   */
  href?: string;
  /**
   * Classnames object defining the component style.
   */
  theme?: IconButtonTheme;
}

export class IconButton extends React.Component<IconButtonProps, {}> { }

export default IconButton
