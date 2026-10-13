import type defaultTheme from './theme';
export type LayoutTheme = Partial<typeof defaultTheme>;
export type LayoutBreakpoint = 'sm' | 'smTablet' | 'md' | 'lg' | 'lgTablet' | 'xl' | 'xxl' | 'xxxl';
export type SidebarWidth =
  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 25 | 33 | 50 | 66 | 75 | 100;
