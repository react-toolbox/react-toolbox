import __ReactToolbox from "../index.d.ts";

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

interface RippleProps {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
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
}

export class Ripple extends __React.Component<RippleProps, {}> { }

export default Ripple;
