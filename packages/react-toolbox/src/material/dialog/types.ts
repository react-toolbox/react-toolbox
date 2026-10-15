/** Optional class overrides for the component's rendered parts. */
export type DialogTheme = Partial<
  Record<
    | 'active'
    | 'body'
    | 'button'
    | 'dialog'
    | 'fullscreen'
    | 'large'
    | 'navigation'
    | 'normal'
    | 'small'
    | 'title'
    | 'wrapper',
    string
  >
>;

/** Style slots for the component. */
export type DialogClassNames = DialogTheme;
