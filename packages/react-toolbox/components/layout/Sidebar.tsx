'use client';
import classnames from 'classnames';
import Drawer, { type DrawerProps } from '../drawer';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
import type { LayoutTheme, LayoutBreakpoint, SidebarWidth } from './types';
export interface SidebarProps extends Omit<DrawerProps, 'theme'> {
  clipped?: boolean;
  permanentAt?: LayoutBreakpoint;
  pinned?: boolean;
  theme?: LayoutTheme;
  width?: SidebarWidth;
}
export function Sidebar({
  active,
  className = '',
  clipped,
  permanentAt: _permanentAt,
  pinned = false,
  theme: suppliedTheme,
  width: _width,
  type: _type,
  ...other
}: SidebarProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <Drawer
      {...other}
      type="right"
      active={active || pinned}
      className={classnames({ [theme.pinned]: pinned, [theme.clipped]: clipped }, className)}
      insideTree
      theme={{ drawer: theme.sidebarDrawer, wrapper: theme.sidebarWrapper }}
      withOverlay={!pinned}
    />
  );
}
export default Sidebar;
