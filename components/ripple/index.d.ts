import __ReactToolbox from "../index.d.ts";

export interface RippleTheme {
  ripple?: string;
  rippleActive?: string;
  rippleRestarting?: string;
  riplleWrapper?: string;
}

interface RippleProps {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  disabled?: boolean;
  onRippleEnded?: Function;
  spread?: number;
  /**
   * Classnames object defining the component style.
   */
  theme?: RippleTheme;
}

export class Ripple extends __React.Component<RippleProps, {}> { }

export default Ripple;
