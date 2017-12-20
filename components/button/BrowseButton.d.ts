import * as React from "react";
import ReactToolbox from "../index";
import { ButtonBaseProps, ButtonTheme } from './base';

export interface BrowseButtonTheme extends ButtonTheme { }

export interface BrowseButtonProps extends ButtonBaseProps {
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
   * Classnames object defining the component style.
   */
  theme?: BrowseButtonTheme;
  
  onChange?: Function;
}

export class BrowseButton extends React.Component<BrowseButtonProps, {}> { }
