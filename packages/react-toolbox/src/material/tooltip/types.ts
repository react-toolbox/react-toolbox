/** Optional class overrides for the component's rendered parts. */
export type TooltipTheme = Partial<
  Record<'tooltip' | 'tooltipActive' | 'tooltipInner' | 'tooltipLeft' | 'tooltipRight' | 'tooltipTop', string>
>;

/** Style slots for the component. */
export type TooltipClassNames = TooltipTheme;
