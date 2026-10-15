'use client';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../utils/cn';
import type { LayoutTheme } from './types';
export interface PanelProps extends ComponentPropsWithRef<'div'> {
  bodyScroll?: boolean;
  theme?: LayoutTheme;
}
export function Panel({ bodyScroll = true, children, className = '', theme, ...other }: PanelProps) {
  return (
    <div
      {...other}
      data-react-toolbox="panel"
      className={cn(
        'rt-layout-panel',
        '[transition:var(--layout-side-transition)] left-0 absolute right-0 top-0',
        '[&:not(.rt-layout-bodyScroll)]:h-screen [&:not(.rt-layout-bodyScroll)]:max-h-screen [&:not(.rt-layout-bodyScroll)]:overflow-y-scroll',
        '[.rt-layout-navDrawerPinned_&]:left-(--drawer-mobile-width)',
        '[@media_screen_and_(min-width:_600px)]:[.rt-layout-navDrawerPinned_&]:left-(--drawer-desktop-width)',
        '[.rt-layout-sidebarPinned_&]:right-(--drawer-mobile-width)',
        '[@media_screen_and_(min-width:_600px)]:[.rt-layout-sidebarPinned_&]:right-(--drawer-desktop-width)',
        '[.rt-layout-appbarFixed_&]:h-[calc(100vh-var(--appbar-height))] [.rt-layout-appbarFixed_&]:max-h-[calc(100vh-var(--appbar-height))] [.rt-layout-appbarFixed_&]:top-(--appbar-height)',
        '[.rt-layout-appbarFixed_&:not(.rt-layout-bodyScroll)]:overflow-y-scroll',
        '[@media_screen_and_(max-width:_599.98px)_and_(orientation:_portrait)]:[.rt-layout-appbarFixed_&]:h-[calc(100vh-var(--appbar-height-m-portrait))] [@media_screen_and_(max-width:_599.98px)_and_(orientation:_portrait)]:[.rt-layout-appbarFixed_&]:max-h-[calc(100vh-var(--appbar-height-m-portrait))] [@media_screen_and_(max-width:_599.98px)_and_(orientation:_portrait)]:[.rt-layout-appbarFixed_&]:top-(--appbar-height-m-portrait)',
        '[@media_screen_and_(max-height:_599.98px)_and_(orientation:_landscape)]:[.rt-layout-appbarFixed_&]:h-[calc(100vh-var(--appbar-height-m-landscape))] [@media_screen_and_(max-height:_599.98px)_and_(orientation:_landscape)]:[.rt-layout-appbarFixed_&]:max-h-[calc(100vh-var(--appbar-height-m-landscape))] [@media_screen_and_(max-height:_599.98px)_and_(orientation:_landscape)]:[.rt-layout-appbarFixed_&]:top-(--appbar-height-m-landscape)',
        '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth1.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)_*_1)]',
        '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth2.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*2)]',
        '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth3.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*3)]',
        '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth4.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*4)]',
        '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth5.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*5)]',
        '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth6.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*6)]',
        '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth7.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*7)]',
        '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth8.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*8)]',
        '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth9.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*9)]',
        '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth10.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*10)]',
        '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth11.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*11)]',
        '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth12.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*12)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth1.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-mobile)_*_1)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth1.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)_*_1)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth2.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-mobile)*2)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth2.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*2)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth3.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-mobile)*3)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth3.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*3)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth4.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-mobile)*4)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth4.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*4)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth5.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-mobile)*5)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth5.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*5)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth6.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-mobile)*6)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth6.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*6)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth7.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-mobile)*7)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth7.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*7)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth8.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-mobile)*8)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth8.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*8)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth9.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-mobile)*9)]',
        '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth9.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*9)]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth1.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)_*_1)]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth2.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*2)]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth3.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*3)]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth4.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*4)]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth5.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*5)]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth6.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*6)]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth7.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*7)]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth8.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*8)]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth9.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*9)]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth10.rt-layout-sidebarPinned_&]:right-[calc(var(--standard-increment-desktop)*10)]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth25_&]:right-[25%]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth33_&]:right-[33%]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth50_&]:right-[50%]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth66_&]:right-[66%]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth75_&]:right-[75%]',
        '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth100_&]:right-full',
        theme?.panel,
        bodyScroll && cn('rt-layout-bodyScroll', theme?.bodyScroll),
        className,
      )}
    >
      {children}
    </div>
  );
}
export default Panel;
