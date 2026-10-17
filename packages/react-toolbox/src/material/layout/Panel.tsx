'use client';
import '../app-bar/tokens.css';
import './tokens.css';

import type { ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
import type { LayoutClassNames } from './types';
export interface PanelProps extends ComponentPropsWithRef<'div'> {
  bodyScroll?: boolean;
  /** Classes for the component's rendered parts. */
  classNames?: LayoutClassNames;
}
export function Panel({ bodyScroll = true, children, className = '', classNames, ...other }: PanelProps) {
  return (
    <div
      {...other}
      data-react-toolbox="panel"
      className={cn(
        'rt-layout-panel',
        '[transition:var(--layout-side-transition)] inset-s-0 absolute inset-e-0 top-0',
        '[&:not(.rt-layout-bodyScroll)]:h-screen [&:not(.rt-layout-bodyScroll)]:max-h-screen [&:not(.rt-layout-bodyScroll)]:overflow-y-scroll',
        '[.rt-layout-navDrawerPinned_&]:inset-s-(--layout-nav-width)',
        '[.rt-layout-sidebarPinned_&]:inset-e-(--layout-sidebar-width)',
        '[.rt-layout-appbarFixed_&]:h-[calc(100vh-var(--appbar-height))] [.rt-layout-appbarFixed_&]:max-h-[calc(100vh-var(--appbar-height))] [.rt-layout-appbarFixed_&]:top-(--appbar-height)',
        '[.rt-layout-appbarFixed_&:not(.rt-layout-bodyScroll)]:overflow-y-scroll',
        '[@media_screen_and_(max-width:_599.98px)_and_(orientation:_portrait)]:[.rt-layout-appbarFixed_&]:h-[calc(100vh-var(--appbar-height-m-portrait))] [@media_screen_and_(max-width:_599.98px)_and_(orientation:_portrait)]:[.rt-layout-appbarFixed_&]:max-h-[calc(100vh-var(--appbar-height-m-portrait))] [@media_screen_and_(max-width:_599.98px)_and_(orientation:_portrait)]:[.rt-layout-appbarFixed_&]:top-(--appbar-height-m-portrait)',
        '[@media_screen_and_(max-height:_599.98px)_and_(orientation:_landscape)]:[.rt-layout-appbarFixed_&]:h-[calc(100vh-var(--appbar-height-m-landscape))] [@media_screen_and_(max-height:_599.98px)_and_(orientation:_landscape)]:[.rt-layout-appbarFixed_&]:max-h-[calc(100vh-var(--appbar-height-m-landscape))] [@media_screen_and_(max-height:_599.98px)_and_(orientation:_landscape)]:[.rt-layout-appbarFixed_&]:top-(--appbar-height-m-landscape)',
        classNames?.panel,
        bodyScroll && cn('rt-layout-bodyScroll', classNames?.bodyScroll),
        className,
      )}
    >
      {children}
    </div>
  );
}
export default Panel;
