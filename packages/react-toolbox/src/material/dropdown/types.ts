/** Optional class overrides for the component's rendered parts. */
export type DropdownClassNames = Partial<
  Record<
    | 'active'
    | 'disabled'
    | 'dropdown'
    | 'error'
    | 'errored'
    | 'field'
    | 'label'
    | 'required'
    | 'selected'
    | 'templateValue'
    | 'up'
    | 'value'
    | 'values',
    string
  >
>;
