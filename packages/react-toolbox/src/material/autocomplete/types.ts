/** Optional class overrides for the component's rendered parts. */
export type AutocompleteTheme = Partial<
  Record<
    'active' | 'autocomplete' | 'focus' | 'input' | 'suggestion' | 'suggestions' | 'up' | 'value' | 'values',
    string
  >
>;

/** Style slots for the component. */
export type AutocompleteClassNames = AutocompleteTheme;
