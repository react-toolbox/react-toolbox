'use client';
import '../app-bar/tokens.css';
import '../drawer/tokens.css';
import './tokens.css';
import { useCallback, useLayoutEffect, useState, type ComponentPropsWithRef, type CSSProperties } from 'react';
import { cn } from '../foundations/styles/cn';
import { mergeStyleSlots } from '../foundations/styles/slots';
import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import { LayoutContext, type LayoutDrawerState } from '../foundations/layout/LayoutContext';
import type { LayoutTheme, SidebarWidth } from './types';
import { sidebarWidthClasses } from './styles';

export interface LayoutProps extends ComponentPropsWithRef<'div'> {
  classNames?: LayoutTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: LayoutTheme;
}

/** Participants register through context, including application wrappers and fragments. */
export function Layout({ children, className, style, theme: legacyTheme, classNames, ...other }: LayoutProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [appBars, setAppBars] = useState<ReadonlyMap<string, boolean>>(new Map());
  const [navDrawers, setNavDrawers] = useState<ReadonlyMap<string, LayoutDrawerState>>(new Map());
  const [sidebars, setSidebars] = useState<ReadonlyMap<string, LayoutDrawerState>>(new Map());
  useLayoutEffect(() => {
    const resize = () => setViewportWidth(window.innerWidth || document.documentElement.offsetWidth);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  const registerAppBar = useCallback((id: string, fixed: boolean) => {
    setAppBars((current) => new Map(current).set(id, fixed));
    return () =>
      setAppBars((current) => {
        const next = new Map(current);
        next.delete(id);
        return next;
      });
  }, []);
  const registerNavDrawer = useCallback((id: string, drawer: LayoutDrawerState) => {
    setNavDrawers((current) => new Map(current).set(id, drawer));
    return () =>
      setNavDrawers((current) => {
        const next = new Map(current);
        next.delete(id);
        return next;
      });
  }, []);
  const registerSidebar = useCallback((id: string, drawer: LayoutDrawerState) => {
    setSidebars((current) => new Map(current).set(id, drawer));
    return () =>
      setSidebars((current) => {
        const next = new Map(current);
        next.delete(id);
        return next;
      });
  }, []);
  const navDrawer = navDrawers.values().next().value;
  const sidebar = sidebars.values().next().value;
  const width = sidebar?.width as SidebarWidth | undefined;
  const appBarFixed = [...appBars.values()].some(Boolean);
  return (
    <LayoutContext
      value={{
        viewportWidth,
        registerAppBar,
        registerNavDrawer,
        registerSidebar,
        appBarClasses: {
          appBar: cn(
            'rt-layout-appbarAppBar',
            '[.rt-layout-navDrawerPinned:not(.rt-layout-navDrawerClipped)_&]:ps-[calc(var(--layout-nav-width)+var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
            '[.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pe-[calc(var(--layout-sidebar-width)+var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
            '[.rt-layout-appbarFixed&]:z-(--z-index-high)',
            theme?.appbarAppBar,
          ),
          fixed: cn('rt-layout-appbarFixed', theme?.appbarFixed),
          inner: cn('rt-layout-appbarInner', '[transition:var(--layout-side-transition)]', theme?.appbarInner),
          leftIcon: cn(
            'rt-layout-appbarLeftIcon',
            '[.rt-layout-navDrawerPinned_&]:hidden [.rt-layout-sidebarPinned_&]:hidden',
            theme?.appbarLeftIcon,
          ),
        },
      }}
    >
      <div
        {...other}
        data-layout-sidebar-width={width}
        style={
          {
            '--layout-sidebar-units': width && width < 25 ? width : undefined,
            '--layout-sidebar-percent': width && width >= 25 ? `${width}%` : undefined,
            ...style,
          } as CSSProperties
        }
        className={cn(
          'rt-layout-layout',
          'items-stretch flex flex-1 flex-col justify-between min-h-screen min-w-full relative',
          materialRoot,
          materialDescendants,
          '[--layout-nav-size:var(--drawer-mobile-width)] [@media_screen_and_(min-width:_600px)]:[--layout-nav-size:var(--drawer-desktop-width)] [--layout-nav-width:min(var(--layout-nav-size),calc(100vw-var(--standard-increment-mobile)))]',
          sidebarWidthClasses,
          theme?.layout,
          width && cn(`rt-layout-sidebarWidth${width}`, theme?.[`sidebarWidth${width}`]),
          navDrawer?.pinned && cn('rt-layout-navDrawerPinned', theme?.navDrawerPinned),
          navDrawer?.clipped && cn('rt-layout-navDrawerClipped', theme?.navDrawerClipped),
          sidebar?.pinned && cn('rt-layout-sidebarPinned', theme?.sidebarPinned),
          sidebar?.clipped && cn('rt-layout-sidebarClipped', theme?.sidebarClipped),
          appBarFixed && cn('rt-layout-appbarFixed', theme?.appbarFixed),
          className,
        )}
      >
        {children}
      </div>
    </LayoutContext>
  );
}
export default Layout;
