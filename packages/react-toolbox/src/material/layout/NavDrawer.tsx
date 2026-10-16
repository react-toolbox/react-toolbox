'use client';
import '../drawer/tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { pinnedClasses, clippedClasses } from './styles';
import { cn } from '../foundations/styles/cn';
import Drawer, { type DrawerProps } from '../drawer';
import type { LayoutTheme, LayoutBreakpoint } from './types';
import { useLayoutDrawer } from './useLayoutDrawer';
export interface NavDrawerProps extends Omit<DrawerProps, 'theme' | 'classNames'> {
  clipped?: boolean;
  permanentAt?: LayoutBreakpoint;
  pinned?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: LayoutTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: LayoutTheme;
}
export function NavDrawer({
  active,
  className = '',
  clipped = false,
  permanentAt,
  pinned: suppliedPinned = false,
  theme: legacyTheme,
  classNames,
  ...other
}: NavDrawerProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const pinned = useLayoutDrawer('navigation', { pinned: suppliedPinned, clipped, permanentAt });
  return (
    <Drawer
      {...other}
      active={active || pinned}
      className={cn(
        pinned && cn(pinnedClasses, theme?.pinned),
        clipped && cn(clippedClasses, theme?.clipped),
        other.type === undefined &&
          'rtl:[.rt-drawer-left&]:left-auto rtl:[.rt-drawer-left&]:right-0 rtl:[.rt-drawer-left&]:border-r-0 rtl:[.rt-drawer-left&]:[border-left:1px_solid_var(--drawer-border-color)] rtl:[.rt-drawer-left&:not(.rt-drawer-active)]:transform-[translateX(100%)]',
        className,
      )}
      insideTree
      theme={{
        drawer: cn('rt-layout-navDrawerDrawer', 'z-(--z-index-high)', theme?.navDrawerDrawer),
        wrapper: cn(
          'rt-layout-navDrawerWrapper',
          '[.rt-layout-navDrawerClipped_&]:relative [.rt-layout-navDrawerClipped_&]:z-(--z-index-normal)',
          theme?.navDrawerWrapper,
        ),
      }}
      withOverlay={!pinned}
    />
  );
}
export default NavDrawer;
