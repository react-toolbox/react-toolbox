/** Optional class overrides for the component's rendered parts. */
export type TabsTheme = Partial<
  Record<
    | 'disableAnimation'
    | 'active'
    | 'arrow'
    | 'arrowContainer'
    | 'disabled'
    | 'fixed'
    | 'hidden'
    | 'icon'
    | 'inverse'
    | 'label'
    | 'navigation'
    | 'navigationContainer'
    | 'pointer'
    | 'rippleWrapper'
    | 'tab'
    | 'tabs'
    | 'withIcon'
    | 'withText',
    string
  >
>;

/** Style slots for the component. */
export type TabsClassNames = TabsTheme;
