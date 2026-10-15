'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { pinnedClasses, clippedClasses } from './styles';
import { cn } from '../foundations/styles/cn';
import Drawer, { type DrawerProps } from '../drawer';
import type { LayoutTheme, LayoutBreakpoint } from './types';
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
  clipped,
  permanentAt: _permanentAt,
  pinned = false,
  theme: legacyTheme,
  classNames,
  ...other
}: NavDrawerProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  return (
    <Drawer
      {...other}
      active={active || pinned}
      className={cn(
        pinned && cn(pinnedClasses, theme?.pinned),
        clipped && cn(clippedClasses, theme?.clipped),
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
