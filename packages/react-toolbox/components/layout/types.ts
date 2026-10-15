/** Optional class overrides for the component's rendered parts. */
export type LayoutTheme = Partial<
  Record<
    | 'appbarAppBar'
    | 'appbarFixed'
    | 'appbarInner'
    | 'appbarLeftIcon'
    | 'bodyScroll'
    | 'clipped'
    | 'layout'
    | 'navDrawerClipped'
    | 'navDrawerDrawer'
    | 'navDrawerPinned'
    | 'navDrawerWrapper'
    | 'panel'
    | 'pinned'
    | 'sidebarClipped'
    | 'sidebarDrawer'
    | 'sidebarPinned'
    | 'sidebarWidth1'
    | 'sidebarWidth10'
    | 'sidebarWidth100'
    | 'sidebarWidth11'
    | 'sidebarWidth12'
    | 'sidebarWidth2'
    | 'sidebarWidth25'
    | 'sidebarWidth3'
    | 'sidebarWidth33'
    | 'sidebarWidth4'
    | 'sidebarWidth5'
    | 'sidebarWidth50'
    | 'sidebarWidth6'
    | 'sidebarWidth66'
    | 'sidebarWidth7'
    | 'sidebarWidth75'
    | 'sidebarWidth8'
    | 'sidebarWidth9'
    | 'sidebarWrapper',
    string
  >
>;
export type LayoutBreakpoint = 'sm' | 'smTablet' | 'md' | 'lg' | 'lgTablet' | 'xl' | 'xxl' | 'xxxl';
export type SidebarWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 25 | 33 | 50 | 66 | 75 | 100;
