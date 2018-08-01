import * as React from "react";

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

export interface TooltipProps {
  /**
   * Additional class added to composed component.
   */
  className?: string;
  /**
   * Callback to be invoked when Component is clicked.
   */
  onClick?: Function;
  /**
   * Callback called when the mouse enters the Component.
   */
  onMouseEnter?: Function;
  /**
   * Callback called when the mouse leaves the Component.
   */
  onMouseLeave?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: TooltipTheme;
  /**
   * The text (or node) used for the tooltip.
   */
  tooltip?: React.ReactNode;
  /**
   * Amount of time in miliseconds spent before the tooltip is visible.
   * @default 0
   */
  tooltipDelay?: number;
  /**
   * If true, the Tooltip hides after a click in the host component.
   * @default true
   */
  tooltipHideOnClick?: boolean;
  /**
   * Tooltip position.
   * @default "vertical"
   */
  tooltipPosition?: "bottom" | "top" | "left" | "right" | "horizontal" | "vertical";
  /**
   * Determines the tooltip should be toggled when clicked. This is useful for mobile where there is no mouse enter.
   * @default false
   */
  tooltipShowOnClick?: boolean;
  /**
   * Additional attributes passed to composed component.
   */
  [key: string]: any;
}

declare class TooltipComponent<P, S> extends React.Component<P, S> {
  props: P & TooltipProps;
}

declare interface TooltippedComponentClass<P> extends TooltipProps {
  new (props?: P, context?: any): TooltipComponent<P, any>;
}

declare interface TooltipOptions {
  className?: string;
  delay?: number;
  hideOnClick?: boolean;
  passthrough?: boolean;
  showOnClick?: boolean;
  position?: 'bottom' | 'horizontal' | 'left' | 'right' | 'top' | 'vertical'
}

declare type tooltipHOC<P> = (componentClass: React.ComponentClass<P>) => TooltippedComponentClass<P>

export function tooltipFactory<P>(options?: TooltipOptions): tooltipHOC<P>;

export default function Tooltip<P>(component: React.ReactType): TooltippedComponentClass<P>;
