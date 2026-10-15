'use client';
import classnames from 'classnames';
import Drawer, { type DrawerProps } from '../drawer';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
import type { LayoutTheme, LayoutBreakpoint } from './types';
export interface NavDrawerProps extends Omit<DrawerProps, 'theme'> {
  clipped?: boolean;
  permanentAt?: LayoutBreakpoint;
  pinned?: boolean;
  theme?: LayoutTheme;
}
export function NavDrawer({
  active,
  className = '',
  clipped,
  permanentAt: _permanentAt,
  pinned = false,
  theme: suppliedTheme,
  ...other
}: NavDrawerProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <Drawer
      {...other}
      active={active || pinned}
      className={classnames({ [theme.pinned]: pinned, [theme.clipped]: clipped }, className)}
      insideTree
      theme={{ drawer: theme.navDrawerDrawer, wrapper: theme.navDrawerWrapper }}
      withOverlay={!pinned}
    />
  );
}
export default NavDrawer;
