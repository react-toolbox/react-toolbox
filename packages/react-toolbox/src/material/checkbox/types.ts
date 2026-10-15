/** Optional class overrides for the component's rendered parts. */
export type CheckboxTheme = Partial<
  Record<'checkmark-expand' | 'check' | 'checked' | 'disabled' | 'field' | 'input' | 'ripple' | 'text', string>
>;

/** Style slots for the component. */
export type CheckboxClassNames = CheckboxTheme;
