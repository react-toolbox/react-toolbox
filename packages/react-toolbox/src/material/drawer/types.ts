/** Optional class overrides for the component's rendered parts. */
export type DrawerTheme = Partial<Record<'active' | 'drawer' | 'left' | 'right' | 'wrapper', string>>;

/** Style slots for the component. */
export type DrawerClassNames = DrawerTheme;
