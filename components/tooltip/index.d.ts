import { Props } from "../index.d.ts";

export interface TooltipTheme {
  tooltip?: string;
  tooltipActive?: string;
  tooltipWrapper?: string;
}

interface TooltipProps {
  onMouseEnter?: __React.MouseEventHandler;
  onMouseLeave?: __React.MouseEventHandler;
  /**
   * Classnames object defining the component style.
   */
  theme?: TooltipTheme;
  tooltip?: string;
  tooltipDelay?: number;
  tooltipHideOnClick?: boolean;
}

declare class TooltipComponent<P, S> extends __React.Component<P, S> {
  props: P & TooltipProps;
}

interface TooltippedComponentClass<P> extends TooltipProps {
  new (props?: P, context?: any): TooltipComponent<P, any>;
}

export function Tooltip<P>(componentClass: __React.ComponentClass<P>): TooltippedComponentClass<P>;

export default Tooltip;
