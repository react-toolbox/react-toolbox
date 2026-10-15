/** Optional class overrides for the component's rendered parts. */
export type MenuTheme = Partial<
  Record<
    | 'active'
    | 'bottomLeft'
    | 'bottomRight'
    | 'caption'
    | 'disabled'
    | 'icon'
    | 'iconMenu'
    | 'menu'
    | 'menuDivider'
    | 'menuInner'
    | 'menuItem'
    | 'outline'
    | 'ripple'
    | 'rippled'
    | 'selected'
    | 'shortcut'
    | 'static'
    | 'topLeft'
    | 'topRight',
    string
  >
>;
