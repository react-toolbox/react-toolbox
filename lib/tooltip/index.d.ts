export interface TooltipTheme {
  /**
   * Added to the tooltip element.
   */
  tooltip?: string;
  /**
   * Added to the root when the tooltip is active.
   */
  tooltipActive?: string;
  /**
   * Wrapper for the root element used to position the tooltip.
   */
  tooltipWrapper?: string;
}

interface TooltipProps {
  /**
   * Callback called when the mouse enters the Component.
   */
  onMouseEnter?: __React.MouseEventHandler;
  /**
   * Callback called when the mouse leaves the Component.
   */
  onMouseLeave?: __React.MouseEventHandler;
  /**
   * Classnames object defining the component style.
   */
  theme?: TooltipTheme;
  /**
   * The text string to use for the tooltip.
   */
  tooltip?: string;
  /**
   * Amount of time in miliseconds spent before the tooltip is visible.
   */
  tooltipDelay?: number;
  /**
   * If true, the Tooltip hides after a click in the host component.
   * @default true
   */
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
