'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { pinnedClasses, clippedClasses } from './styles';
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
  clipped,
  permanentAt: _permanentAt,
  pinned = false,
  theme: legacyTheme,
  classNames,
  width: _width,
  type: _type,
  ...other
}: SidebarProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  return (
    <Drawer
      {...other}
      type="right"
      active={active || pinned}
      className={cn(
        pinned && cn(pinnedClasses, theme?.pinned),
        clipped && cn(clippedClasses, theme?.clipped),
        className,
      )}
      insideTree
      theme={{
        drawer: cn(
          'rt-layout-sidebarDrawer',
          'z-(--z-index-high)',
          '[.rt-layout-sidebarWidth1_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth1_&]:w-[calc(var(--standard-increment-desktop)_*_1)]',
          '[.rt-layout-sidebarWidth2_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth2_&]:w-[calc(var(--standard-increment-desktop)*2)]',
          '[.rt-layout-sidebarWidth3_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth3_&]:w-[calc(var(--standard-increment-desktop)*3)]',
          '[.rt-layout-sidebarWidth4_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth4_&]:w-[calc(var(--standard-increment-desktop)*4)]',
          '[.rt-layout-sidebarWidth5_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth5_&]:w-[calc(var(--standard-increment-desktop)*5)]',
          '[.rt-layout-sidebarWidth6_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth6_&]:w-[calc(var(--standard-increment-desktop)*6)]',
          '[.rt-layout-sidebarWidth7_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth7_&]:w-[calc(var(--standard-increment-desktop)*7)]',
          '[.rt-layout-sidebarWidth8_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth8_&]:w-[calc(var(--standard-increment-desktop)*8)]',
          '[.rt-layout-sidebarWidth9_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth9_&]:w-[calc(var(--standard-increment-desktop)*9)]',
          '[.rt-layout-sidebarWidth10_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth10_&]:w-[calc(var(--standard-increment-desktop)*10)]',
          '[.rt-layout-sidebarWidth11_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth11_&]:w-[calc(var(--standard-increment-desktop)*11)]',
          '[.rt-layout-sidebarWidth12_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth12_&]:w-[calc(var(--standard-increment-desktop)*12)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth1_&]:w-[calc(var(--standard-increment-mobile)_*_1)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth1_&]:w-[calc(var(--standard-increment-desktop)_*_1)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth2_&]:w-[calc(var(--standard-increment-mobile)*2)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth2_&]:w-[calc(var(--standard-increment-desktop)*2)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth3_&]:w-[calc(var(--standard-increment-mobile)*3)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth3_&]:w-[calc(var(--standard-increment-desktop)*3)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth4_&]:w-[calc(var(--standard-increment-mobile)*4)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth4_&]:w-[calc(var(--standard-increment-desktop)*4)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth5_&]:w-[calc(var(--standard-increment-mobile)*5)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth5_&]:w-[calc(var(--standard-increment-desktop)*5)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth6_&]:w-[calc(var(--standard-increment-mobile)*6)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth6_&]:w-[calc(var(--standard-increment-desktop)*6)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth7_&]:w-[calc(var(--standard-increment-mobile)*7)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth7_&]:w-[calc(var(--standard-increment-desktop)*7)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth8_&]:w-[calc(var(--standard-increment-mobile)*8)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth8_&]:w-[calc(var(--standard-increment-desktop)*8)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth9_&]:w-[calc(var(--standard-increment-mobile)*9)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth9_&]:w-[calc(var(--standard-increment-desktop)*9)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth1_&]:w-[calc(var(--standard-increment-desktop)_*_1)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth2_&]:w-[calc(var(--standard-increment-desktop)*2)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth3_&]:w-[calc(var(--standard-increment-desktop)*3)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth4_&]:w-[calc(var(--standard-increment-desktop)*4)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth5_&]:w-[calc(var(--standard-increment-desktop)*5)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth6_&]:w-[calc(var(--standard-increment-desktop)*6)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth7_&]:w-[calc(var(--standard-increment-desktop)*7)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth8_&]:w-[calc(var(--standard-increment-desktop)*8)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth9_&]:w-[calc(var(--standard-increment-desktop)*9)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth10_&]:w-[calc(var(--standard-increment-desktop)*10)]',
          '[.rt-layout-sidebarWidth25_&]:w-full',
          '[.rt-layout-sidebarWidth33_&]:w-full',
          '[.rt-layout-sidebarWidth50_&]:w-full',
          '[.rt-layout-sidebarWidth66_&]:w-full',
          '[.rt-layout-sidebarWidth75_&]:w-full',
          '[.rt-layout-sidebarWidth100_&]:w-full',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth25_&]:w-[25%]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth33_&]:w-[33%]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth50_&]:w-[50%]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth66_&]:w-[66%]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth75_&]:w-[75%]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth100_&]:w-full',
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
