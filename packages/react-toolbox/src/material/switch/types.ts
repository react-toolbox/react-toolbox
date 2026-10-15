/** Optional class overrides for the component's rendered parts. */
export type SwitchTheme = Partial<
  Record<
    'disabled' | 'field' | 'input' | 'off' | 'on' | 'ripple' | 'switch-off' | 'switch-on' | 'text' | 'thumb',
    string
  >
>;

/** Style slots for the component. */
export type SwitchClassNames = SwitchTheme;
