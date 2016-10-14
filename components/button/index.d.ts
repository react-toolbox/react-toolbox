import * as React from "react";
import ReactToolbox from "../index";

export interface ButtonTheme {
  /**
   * Used for the root in case button is accent.
   */
  accent?: string;
  /**
   * Used for the root element in any button.
   */
  button?: string;
  /**
   * Used when the button is flat for the root element.
   */
  flat?: string;
  /**
   * Used when the button is floating for the root element.
   */
  floating?: string;
  /**
   * For the icon inside a button.
   */
  icon?: string;
  /**
   * Used when colors are inverted.
   */
  inverse?: string;
  /**
   * Used for mini floating buttons.
   */
  mini?: string;
  /**
   * Used for neutral colored buttons.
   */
  neutral?: string;
  /**
   * Used for primary buttons when button is primary.
   */
  primary?: string;
  /**
   * Used when the button is raised for root element.
   */
  raised?: string;
  /**
   * Used for the ripple element.
   */
  rippleWrapper?: string;
  /**
   * Used for toggle buttons in the root element.
   */
  toggle?: string;
}

interface ButtonProps extends ReactToolbox.Props {
  /**
   * Indicates if the button should have accent color.
   * @default false
   */
  accent?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, component will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the button will have a flat look.
   * @default false
   */
  flat?: boolean;
  /**
   * If true, the button will have a floating look.
   * @default false
   */
  floating?: boolean;
  /**
   * Creates a link for the button.
   */
  href?: string;
  /**
   * Value of the icon (See Font Icon Component).
   */
  icon?: React.ReactNode | string;
  /**
   * If true, the neutral colors are inverted. Useful to put a button over a dark background.
   */
  inverse?: boolean;
  /**
   * The text string to use for the name of the button.
   */
  label?: string;
  /**
   * To be used with floating button. If true, the button will be smaller.
   * @default false
   */
  mini?: boolean;
  /**
   * Set it to false if you don't want the neutral styles to be included.
   * @default true
   */
  neutral?: boolean;
  /**
   * Indicates if the button should have primary color.
   * @default false
   */
  primary?: boolean;
  /**
   * If true, the button will have a raised look.
   * @default false
   */
  raised?: boolean;
  /**
   * If true, component will have a ripple effect on click.
   * @default true
   */
  ripple?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: ButtonTheme;
}

export class Button extends React.Component<ButtonProps, {}> { }

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

interface IconButtonProps extends ReactToolbox.Props {
  /**
   * Indicates if the button should have accent color.
   * @default false
   */
  accent?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, component will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Creates a link for the button.
   */
  href?: string;
  /**
   * Value of the icon (See Font Icon Component).
   */
  icon?: React.ReactNode | string;
  /**
   * If true, the neutral colors are inverted. Useful to put a button over a dark background.
   */
  inverse?: boolean;
  /**
   * Set it to false if you don't want the neutral styles to be included.
   * @default true
   */
  neutral?: boolean;
  /**
   * Indicates if the button should have primary color.
   * @default false
   */
  primary?: boolean;
  /**
   * If true, component will have a ripple effect on click.
   * @default true
   */
  ripple?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: IconButtonTheme;
}

export class IconButton extends React.Component<IconButtonProps, {}> { }

export interface BrowseButtonTheme {
  /**
   * Used for the root in case button is accent.
   */
  accent?: string;
  /**
   * Used for the root element in any button.
   */
  button?: string;
  /**
   * Used when the button is flat for the root element.
   */
  flat?: string;
  /**
   * Used when the button is floating for the root element.
   */
  floating?: string;
  /**
   * For the icon inside a button.
   */
  icon?: string;
  /**
   * Used when colors are inverted.
   */
  inverse?: string;
  /**
   * Used for mini floating buttons.
   */
  mini?: string;
  /**
   * Used for neutral colored buttons.
   */
  neutral?: string;
  /**
   * Used for primary buttons when button is primary.
   */
  primary?: string;
  /**
   * Used when the button is raised for root element.
   */
  raised?: string;
  /**
   * Used for the ripple element.
   */
  rippleWrapper?: string;
  /**
   * Used for toggle buttons in the root element.
   */
  toggle?: string;
}

interface BrowseButtonProps extends ReactToolbox.Props {
  /**
   * Indicates if the button should have accent color.
   * @default false
   */
  accent?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, component will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the button will have a flat look.
   * @default false
   */
  flat?: boolean;
  /**
   * If true, the button will have a floating look.
   * @default false
   */
  floating?: boolean;
  /**
   * Creates a link for the button.
   */
  href?: string;
  /**
   * Value of the icon (See Font Icon Component).
   */
  icon?: React.ReactNode | string;
  /**
   * If true, the neutral colors are inverted. Useful to put a button over a dark background.
   */
  inverse?: boolean;
  /**
   * The text string to use for the name of the button.
   */
  label?: string;
  /**
   * To be used with floating button. If true, the button will be smaller.
   * @default false
   */
  mini?: boolean;
  /**
   * Set it to false if you don't want the neutral styles to be included.
   * @default true
   */
  neutral?: boolean;
  /**
   * Indicates if the button should have primary color.
   * @default false
   */
  primary?: boolean;
  /**
   * If true, the button will have a raised look.
   * @default false
   */
  raised?: boolean;
  /**
   * If true, component will have a ripple effect on click.
   * @default true
   */
  ripple?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: BrowseButtonTheme;
}

export class BrowseButton extends React.Component<BrowseButtonProps, {}> { }
