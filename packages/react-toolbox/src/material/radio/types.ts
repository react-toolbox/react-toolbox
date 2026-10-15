/** Optional class overrides for the component's rendered parts. */
export type RadioTheme = Partial<
  Record<'disabled' | 'field' | 'input' | 'radio' | 'radioChecked' | 'ripple' | 'text', string>
>;

/** Style slots for the component. */
export type RadioClassNames = RadioTheme;
