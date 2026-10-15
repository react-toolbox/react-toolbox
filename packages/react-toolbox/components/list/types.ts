/** Optional class overrides for the component's rendered parts. */
export type ListTheme = Partial<
  Record<
    | 'checkbox'
    | 'checkboxItem'
    | 'disabled'
    | 'divider'
    | 'inset'
    | 'item'
    | 'itemAction'
    | 'itemContentRoot'
    | 'itemText'
    | 'large'
    | 'left'
    | 'list'
    | 'listItem'
    | 'primary'
    | 'right'
    | 'ripple'
    | 'selectable'
    | 'subheader',
    string
  >
>;
