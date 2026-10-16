'use client';
import '../drawer/tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { pinnedClasses, clippedClasses, sidebarWidthClasses } from './styles';
import type { CSSProperties } from 'react';
import { useLayoutDrawer } from './useLayoutDrawer';
import { cn } from '../foundations/styles/cn';
import Drawer, { type DrawerProps } from '../drawer';
import type { LayoutTheme, LayoutBreakpoint, SidebarWidth } from './types';
export interface SidebarProps extends Omit<DrawerProps, 'theme' | 'classNames'> {
  clipped?: boolean;
  permanentAt?: LayoutBreakpoint;
  pinned?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: LayoutTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: LayoutTheme;
  width?: SidebarWidth;
}
export function Sidebar({
  active,
  className = '',
  clipped = false,
  permanentAt,
  pinned: suppliedPinned = false,
  theme: legacyTheme,
  classNames,
  width,
  style,
  type: _type,
  ...other
}: SidebarProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const pinned = useLayoutDrawer('sidebar', { pinned: suppliedPinned, clipped, permanentAt, width });
  return (
    <Drawer
      {...other}
      type="right"
      data-layout-sidebar-width={width}
      style={
        {
          '--layout-sidebar-units': width && width < 25 ? width : undefined,
          '--layout-sidebar-percent': width && width >= 25 ? `${width}%` : undefined,
          ...style,
        } as CSSProperties
      }
      active={active || pinned}
      className={cn(
        pinned && cn(pinnedClasses, theme?.pinned),
        clipped && cn(clippedClasses, theme?.clipped),
        'rtl:[.rt-drawer-right&]:right-auto rtl:[.rt-drawer-right&]:left-0 rtl:[.rt-drawer-right&]:border-l-0 rtl:[.rt-drawer-right&]:[border-right:1px_solid_var(--drawer-border-color)] rtl:[.rt-drawer-right&:not(.rt-drawer-active)]:transform-[translateX(-100%)]',
        className,
      )}
      insideTree
      theme={{
        drawer: cn(
          'rt-layout-sidebarDrawer',
          'z-(--z-index-high)',
          sidebarWidthClasses,
          '[.rt-layout-sidebarDrawer&]:w-(--layout-sidebar-width)',
          theme?.sidebarDrawer,
        ),
        wrapper: cn(
          'rt-layout-sidebarWrapper',
          '[.rt-layout-sidebarClipped_&]:relative [.rt-layout-sidebarClipped_&]:z-(--z-index-normal)',
          theme?.sidebarWrapper,
        ),
      }}
      withOverlay={!pinned}
    />
  );
}
export default Sidebar;
