import * as React from "react";
import ReactToolbox from "../index";
import { RippleProps } from '../ripple/index';
import { ButtonBaseProps, ButtonTheme } from './base';

export interface ButtonProps extends ButtonBaseProps, RippleProps {
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
   * The text string to use for the name of the button.
   */
  label?: string;
  /**
   * To be used with floating button. If true, the button will be smaller.
   * @default false
   */
  mini?: boolean;
  /**
   * If true, the button will have a raised look.
   * @default false
   */
  raised?: boolean;
  /**
   * Passed down to the root element
   */
  target?: string;
  /**
   * Classnames object defining the component style.
   */
  theme?: ButtonTheme;
}

export class Button extends React.Component<ButtonProps, {}> { }

export default Button;
