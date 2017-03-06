import * as React from "react";
import ReactToolbox from "../index";

export interface RippleTheme {
  /**
   * Root classname for the ripple.
   */
  ripple?: string;
  /**
   * Applied when the ripple is active.
   */
  rippleActive?: string;
  /**
   * Applied when the ripple is restarting.
   */
  rippleRestarting?: string;
  /**
   * Wrapper class to fit to the parent element.
   */
  rippleWrapper?: string;
}

export interface RippleProps {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * True in case you want a centered ripple.
   * @default false
   */
  disabled?: boolean;
  /**
   * Function that will be called when the ripple animation ends.
   */
  onRippleEnded?: Function;
  /**
   * Factor to indicate how much should the ripple spread under the component.
   * @default 2
   */
  spread?: number;
  /**
   * Classnames object defining the component style.
   */
  theme?: RippleTheme;
  /**
   * Additional properties passed to rippled component.
   */
  [key: string]: any;
}

export interface RippledComponentFactory {
  <P, RippledComponent extends (React.ComponentClass<P> | React.SFC<P>)>(component: RippledComponent): RippledComponent;
}

export function rippleFactory(
  options: RippleProps
): RippledComponentFactory;

export { rippleFactory as Ripple };
export default rippleFactory;
