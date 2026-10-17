/** Optional class overrides for the component's rendered parts. */
export type ProgressBarClassNames = Partial<
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
