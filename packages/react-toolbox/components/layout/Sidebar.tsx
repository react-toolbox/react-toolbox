'use client';
import { pinnedClasses, clippedClasses } from './styles';
import { cn } from '../utils/cn';
import Drawer, { type DrawerProps } from '../drawer';
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
  theme,
  width: _width,
  type: _type,
  ...other
}: SidebarProps) {
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
          'z-[var(--z-index-high)]',
          '[.rt-layout-sidebarWidth1_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth1_&]:w-[calc(var(--standard-increment-desktop)_*_1)]',
          '[.rt-layout-sidebarWidth2_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth2_&]:w-[calc(var(--standard-increment-desktop)_*_2)]',
          '[.rt-layout-sidebarWidth3_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth3_&]:w-[calc(var(--standard-increment-desktop)_*_3)]',
          '[.rt-layout-sidebarWidth4_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth4_&]:w-[calc(var(--standard-increment-desktop)_*_4)]',
          '[.rt-layout-sidebarWidth5_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth5_&]:w-[calc(var(--standard-increment-desktop)_*_5)]',
          '[.rt-layout-sidebarWidth6_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth6_&]:w-[calc(var(--standard-increment-desktop)_*_6)]',
          '[.rt-layout-sidebarWidth7_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth7_&]:w-[calc(var(--standard-increment-desktop)_*_7)]',
          '[.rt-layout-sidebarWidth8_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth8_&]:w-[calc(var(--standard-increment-desktop)_*_8)]',
          '[.rt-layout-sidebarWidth9_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth9_&]:w-[calc(var(--standard-increment-desktop)_*_9)]',
          '[.rt-layout-sidebarWidth10_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth10_&]:w-[calc(var(--standard-increment-desktop)_*_10)]',
          '[.rt-layout-sidebarWidth11_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth11_&]:w-[calc(var(--standard-increment-desktop)_*_11)]',
          '[.rt-layout-sidebarWidth12_&]:w-full',
          '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth12_&]:w-[calc(var(--standard-increment-desktop)_*_12)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth1_&]:w-[calc(var(--standard-increment-mobile)_*_1)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth1_&]:w-[calc(var(--standard-increment-desktop)_*_1)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth2_&]:w-[calc(var(--standard-increment-mobile)_*_2)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth2_&]:w-[calc(var(--standard-increment-desktop)_*_2)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth3_&]:w-[calc(var(--standard-increment-mobile)_*_3)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth3_&]:w-[calc(var(--standard-increment-desktop)_*_3)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth4_&]:w-[calc(var(--standard-increment-mobile)_*_4)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth4_&]:w-[calc(var(--standard-increment-desktop)_*_4)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth5_&]:w-[calc(var(--standard-increment-mobile)_*_5)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth5_&]:w-[calc(var(--standard-increment-desktop)_*_5)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth6_&]:w-[calc(var(--standard-increment-mobile)_*_6)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth6_&]:w-[calc(var(--standard-increment-desktop)_*_6)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth7_&]:w-[calc(var(--standard-increment-mobile)_*_7)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth7_&]:w-[calc(var(--standard-increment-desktop)_*_7)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth8_&]:w-[calc(var(--standard-increment-mobile)_*_8)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth8_&]:w-[calc(var(--standard-increment-desktop)_*_8)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth9_&]:w-[calc(var(--standard-increment-mobile)_*_9)]',
          '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth9_&]:w-[calc(var(--standard-increment-desktop)_*_9)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth1_&]:w-[calc(var(--standard-increment-desktop)_*_1)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth2_&]:w-[calc(var(--standard-increment-desktop)_*_2)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth3_&]:w-[calc(var(--standard-increment-desktop)_*_3)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth4_&]:w-[calc(var(--standard-increment-desktop)_*_4)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth5_&]:w-[calc(var(--standard-increment-desktop)_*_5)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth6_&]:w-[calc(var(--standard-increment-desktop)_*_6)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth7_&]:w-[calc(var(--standard-increment-desktop)_*_7)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth8_&]:w-[calc(var(--standard-increment-desktop)_*_8)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth9_&]:w-[calc(var(--standard-increment-desktop)_*_9)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth10_&]:w-[calc(var(--standard-increment-desktop)_*_10)]',
          '[.rt-layout-sidebarWidth25_&]:w-full',
          '[.rt-layout-sidebarWidth33_&]:w-full',
          '[.rt-layout-sidebarWidth50_&]:w-full',
          '[.rt-layout-sidebarWidth66_&]:w-full',
          '[.rt-layout-sidebarWidth75_&]:w-full',
          '[.rt-layout-sidebarWidth100_&]:w-full',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth25_&]:w-[calc(25_*_1%)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth33_&]:w-[calc(33_*_1%)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth50_&]:w-[calc(50_*_1%)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth66_&]:w-[calc(66_*_1%)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth75_&]:w-[calc(75_*_1%)]',
          '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth100_&]:w-[calc(100_*_1%)]',
          theme?.sidebarDrawer,
        ),
        wrapper: cn(
          'rt-layout-sidebarWrapper',
          '[.rt-layout-sidebarClipped_&]:relative [.rt-layout-sidebarClipped_&]:z-[var(--z-index-normal)]',
          theme?.sidebarWrapper,
        ),
      }}
      withOverlay={!pinned}
    />
  );
}
export default Sidebar;
