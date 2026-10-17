'use client';
import '../drawer/tokens.css';

import { pinnedClasses, clippedClasses, sidebarWidthClasses } from './styles';
import type { CSSProperties } from 'react';
import { useLayoutDrawer } from './useLayoutDrawer';
import { cn } from '../foundations/styles/cn';
import Drawer, { type DrawerProps } from '../drawer';
import type { LayoutClassNames, LayoutBreakpoint, SidebarWidth } from './types';
export interface SidebarProps extends Omit<DrawerProps, 'classNames'> {
  clipped?: boolean;
  permanentAt?: LayoutBreakpoint;
  pinned?: boolean;
  /** Classes for the component's rendered parts. */
  classNames?: LayoutClassNames;
  width?: SidebarWidth;
}
export function Sidebar({
  active,
  className = '',
  clipped = false,
  permanentAt,
  pinned: suppliedPinned = false,
  classNames,
  width,
  style,
  type: _type,
  ...other
}: SidebarProps) {
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
        pinned && cn(pinnedClasses, classNames?.pinned),
        clipped && cn(clippedClasses, classNames?.clipped),
        'rtl:[.rt-drawer-right&]:right-auto rtl:[.rt-drawer-right&]:left-0 rtl:[.rt-drawer-right&]:border-l-0 rtl:[.rt-drawer-right&]:[border-right:1px_solid_var(--drawer-border-color)] rtl:[.rt-drawer-right&:not(.rt-drawer-active)]:transform-[translateX(-100%)]',
        className,
      )}
      insideTree
      classNames={{
        drawer: cn(
          'rt-layout-sidebarDrawer',
          'z-(--z-index-high)',
          sidebarWidthClasses,
          '[.rt-layout-sidebarDrawer&]:w-(--layout-sidebar-width)',
          classNames?.sidebarDrawer,
        ),
        wrapper: cn(
          'rt-layout-sidebarWrapper',
          '[.rt-layout-sidebarClipped_&]:relative [.rt-layout-sidebarClipped_&]:z-(--z-index-normal)',
          classNames?.sidebarWrapper,
        ),
      }}
      withOverlay={!pinned}
    />
  );
}
export default Sidebar;
