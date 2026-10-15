/** Optional class overrides for the component's rendered parts. */
export type ProgressBarTheme = Partial<
  Record<
    | 'buffer'
    | 'circle'
    | 'circular'
    | 'indeterminate'
    | 'linear'
    | 'multicolor'
    | 'path'
    | 'value'
    | 'linear-indeterminate-bar'
    | 'circular-indeterminate-bar-rotate'
    | 'circular-indeterminate-bar-dash'
    | 'colors',
    string
  >
>;

/** Style slots for the component. */
export type ProgressBarClassNames = ProgressBarTheme;
