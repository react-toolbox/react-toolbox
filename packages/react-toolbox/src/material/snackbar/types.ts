/** Optional class overrides for the component's rendered parts. */
export type SnackbarTheme = Partial<
  Record<'accept' | 'active' | 'button' | 'cancel' | 'label' | 'snackbar' | 'warning', string>
>;

/** Style slots for the component. */
export type SnackbarClassNames = SnackbarTheme;
