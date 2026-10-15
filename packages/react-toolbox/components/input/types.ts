/** Optional class overrides for the component's rendered parts. */
export type InputTheme = Partial<
  Record<
    | 'bar'
    | 'counter'
    | 'disabled'
    | 'error'
    | 'errored'
    | 'filled'
    | 'fixed'
    | 'hidden'
    | 'hint'
    | 'icon'
    | 'input'
    | 'inputElement'
    | 'label'
    | 'required'
    | 'withIcon',
    string
  >
>;
