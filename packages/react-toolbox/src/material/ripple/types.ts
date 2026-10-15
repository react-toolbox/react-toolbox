/** Optional class overrides for the component's rendered parts. */
export type RippleTheme = Partial<Record<'ripple' | 'rippleActive' | 'rippleRestarting' | 'rippleWrapper', string>>;

/** Style slots for the component. */
export type RippleClassNames = RippleTheme;
