/** Optional class overrides for the component's rendered parts. */
export type TableTheme = Partial<
  Record<
    | 'asc'
    | 'checkboxCell'
    | 'head'
    | 'headCell'
    | 'numeric'
    | 'row'
    | 'rowCell'
    | 'selected'
    | 'sortIcon'
    | 'sorted'
    | 'table',
    string
  >
>;

/** Style slots for the component. */
export type TableClassNames = TableTheme;
