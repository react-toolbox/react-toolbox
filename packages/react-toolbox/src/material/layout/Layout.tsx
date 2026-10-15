'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  type ComponentPropsWithRef,
  type ReactElement,
} from 'react';
import { cn } from '../foundations/styles/cn';
import AppBar, { type AppBarProps } from '../app-bar';
import breakpoints from './breakpoints';
import NavDrawer, { type NavDrawerProps } from './NavDrawer';
import Sidebar, { type SidebarProps } from './Sidebar';
import type { LayoutTheme } from './types';
export interface LayoutProps extends ComponentPropsWithRef<'div'> {
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: LayoutTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: LayoutTheme;
}
export function Layout({ children, className, theme: legacyTheme, classNames, ...other }: LayoutProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  // Keep initial client markup identical to server markup, then measure after hydration.
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const resize = () => setWidth(window.innerWidth || document.documentElement.offsetWidth);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  const elements = Children.toArray(children);
  const appBar = elements.find(
    (child): child is ReactElement<AppBarProps> => isValidElement<AppBarProps>(child) && child.type === AppBar,
  );
  const navDrawer = elements.find(
    (child): child is ReactElement<NavDrawerProps> => isValidElement<NavDrawerProps>(child) && child.type === NavDrawer,
  );
  const sidebar = elements.find(
    (child): child is ReactElement<SidebarProps> => isValidElement<SidebarProps>(child) && child.type === Sidebar,
  );
  const unknown = elements.filter(
    (child) => !isValidElement(child) || (child.type !== AppBar && child.type !== NavDrawer && child.type !== Sidebar),
  );
  const pinned = (drawer: ReactElement<NavDrawerProps | SidebarProps> | undefined) =>
    Boolean(
      drawer && (drawer.props.pinned || (drawer.props.permanentAt && width > breakpoints[drawer.props.permanentAt])),
    );
  const navDrawerPinned = pinned(navDrawer);
  const sidebarPinned = pinned(sidebar);
  const sidebarWidth = sidebar?.props.width;
  return (
    <div
      {...other}
      className={cn(
        'rt-layout-layout',
        'items-stretch flex flex-1 flex-col justify-between min-h-screen min-w-full relative',
        materialRoot,
        materialDescendants,
        theme?.layout,
        sidebarWidth && cn(`rt-layout-sidebarWidth${sidebarWidth}`, theme?.[`sidebarWidth${sidebarWidth}`]),
        navDrawerPinned && cn('rt-layout-navDrawerPinned', theme?.navDrawerPinned),
        navDrawer?.props.clipped && cn('rt-layout-navDrawerClipped', theme?.navDrawerClipped),
        sidebarPinned && cn('rt-layout-sidebarPinned', theme?.sidebarPinned),
        sidebar?.props.clipped && cn('rt-layout-sidebarClipped', theme?.sidebarClipped),
        appBar?.props.fixed && cn('rt-layout-appbarFixed', theme?.appbarFixed),
        className,
      )}
    >
      {navDrawer && cloneElement(navDrawer, { pinned: navDrawerPinned })}
      {appBar &&
        cloneElement(appBar, {
          theme: {
            ...appBar.props.theme,
            appBar: cn(
              'rt-layout-appbarAppBar',
              '[.rt-layout-navDrawerPinned:not(.rt-layout-navDrawerClipped)_&]:pl-[calc(var(--drawer-mobile-width)_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)]:[.rt-layout-navDrawerPinned:not(.rt-layout-navDrawerClipped)_&]:pl-[calc(var(--drawer-desktop-width)_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--drawer-mobile-width)_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)]:[.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--drawer-desktop-width)_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[.rt-layout-appbarFixed&]:z-(--z-index-high)',
              '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth1.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_1_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth2.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_2_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth3.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_3_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth4.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_4_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth5.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_5_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth6.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_6_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth7.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_7_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth8.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_8_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth9.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_9_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth10.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_10_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth11.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_11_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_840px)]:[.rt-layout-sidebarWidth12.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_12_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth1.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-mobile)_*_1_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth1.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_1_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth2.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-mobile)_*_2_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth2.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_2_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth3.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-mobile)_*_3_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth3.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_3_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth4.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-mobile)_*_4_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth4.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_4_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth5.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-mobile)_*_5_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth5.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_5_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth6.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-mobile)_*_6_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth6.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_6_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth7.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-mobile)_*_7_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth7.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_7_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth8.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-mobile)_*_8_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth8.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_8_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[.rt-layout-sidebarWidth9.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-mobile)_*_9_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[.rt-layout-sidebarWidth9.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_9_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth1.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_1_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth2.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_2_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth3.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_3_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth4.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_4_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth5.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_5_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth6.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_6_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth7.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_7_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth8.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_8_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth9.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_9_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth10.rt-layout-sidebarPinned:not(.rt-layout-sidebarClipped)_&]:pr-[calc(var(--standard-increment-desktop)_*_10_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth25:not(.rt-layout-sidebarClipped)_&]:pr-[calc(calc(25_*_1%)_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth33:not(.rt-layout-sidebarClipped)_&]:pr-[calc(calc(33_*_1%)_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth50:not(.rt-layout-sidebarClipped)_&]:pr-[calc(calc(50_*_1%)_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth66:not(.rt-layout-sidebarClipped)_&]:pr-[calc(calc(66_*_1%)_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth75:not(.rt-layout-sidebarClipped)_&]:pr-[calc(calc(75_*_1%)_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              '[@media_screen_and_(min-width:_720px)]:[.rt-layout-sidebarWidth100:not(.rt-layout-sidebarClipped)_&]:pr-[calc(calc(100_*_1%)_+_var(--appbar-current-h-padding,_var(--appbar-h-padding)))]',
              theme?.appbarAppBar,
              appBar.props.theme?.appBar,
            ),
            fixed: cn('rt-layout-appbarFixed', theme?.appbarFixed, appBar.props.theme?.fixed),
            inner: cn(
              'rt-layout-appbarInner',
              '[transition:var(--layout-side-transition)]',
              theme?.appbarInner,
              appBar.props.theme?.inner,
            ),
            leftIcon: cn(
              'rt-layout-appbarLeftIcon',
              '[.rt-layout-navDrawerPinned_&]:hidden',
              '[.rt-layout-sidebarPinned_&]:hidden',
              theme?.appbarLeftIcon,
              appBar.props.theme?.leftIcon,
            ),
          },
        })}
      {unknown}
      {sidebar && cloneElement(sidebar, { pinned: sidebarPinned })}
    </div>
  );
}
export default Layout;
