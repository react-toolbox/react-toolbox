'use client';
import '../drawer/tokens.css';

import { pinnedClasses, clippedClasses } from './styles';
import { cn } from '../foundations/styles/cn';
import Drawer, { type DrawerProps } from '../drawer';
import type { LayoutClassNames, LayoutBreakpoint } from './types';
import { useLayoutDrawer } from './useLayoutDrawer';
export interface NavDrawerProps extends Omit<DrawerProps, 'classNames'> {
  clipped?: boolean;
  permanentAt?: LayoutBreakpoint;
  pinned?: boolean;
  /** Classes for the component's rendered parts. */
  classNames?: LayoutClassNames;
}
export function NavDrawer({
  active,
  className = '',
  clipped = false,
  permanentAt,
  pinned: suppliedPinned = false,
  classNames,
  ...other
}: NavDrawerProps) {
  const pinned = useLayoutDrawer('navigation', { pinned: suppliedPinned, clipped, permanentAt });
  return (
    <Drawer
      {...other}
      active={active || pinned}
      className={cn(
        pinned && cn(pinnedClasses, classNames?.pinned),
        clipped && cn(clippedClasses, classNames?.clipped),
        other.type === undefined &&
          'rtl:[.rt-drawer-left&]:left-auto rtl:[.rt-drawer-left&]:right-0 rtl:[.rt-drawer-left&]:border-r-0 rtl:[.rt-drawer-left&]:[border-left:1px_solid_var(--drawer-border-color)] rtl:[.rt-drawer-left&:not(.rt-drawer-active)]:transform-[translateX(100%)]',
        className,
      )}
      insideTree
      classNames={{
        drawer: cn('rt-layout-navDrawerDrawer', 'z-(--z-index-high)', classNames?.navDrawerDrawer),
        wrapper: cn(
          'rt-layout-navDrawerWrapper',
          '[.rt-layout-navDrawerClipped_&]:relative [.rt-layout-navDrawerClipped_&]:z-(--z-index-normal)',
          classNames?.navDrawerWrapper,
        ),
      }}
      withOverlay={!pinned}
    />
  );
}
export default NavDrawer;
