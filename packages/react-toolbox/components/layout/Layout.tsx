'use client';
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  type ComponentPropsWithRef,
  type ReactElement,
} from 'react';
import classnames from 'classnames';
import AppBar, { type AppBarProps } from '../app_bar';
import { mergeTheme } from '../theming';
import breakpoints from '../utils/breakpoints';
import NavDrawer, { type NavDrawerProps } from './NavDrawer';
import Sidebar, { type SidebarProps } from './Sidebar';
import defaultTheme from './theme';
import type { LayoutTheme } from './types';
export interface LayoutProps extends ComponentPropsWithRef<'div'> {
  theme?: LayoutTheme;
}
export function Layout({ children, className, theme: suppliedTheme, ...other }: LayoutProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
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
    (child): child is ReactElement<AppBarProps> =>
      isValidElement<AppBarProps>(child) && child.type === AppBar,
  );
  const navDrawer = elements.find(
    (child): child is ReactElement<NavDrawerProps> =>
      isValidElement<NavDrawerProps>(child) && child.type === NavDrawer,
  );
  const sidebar = elements.find(
    (child): child is ReactElement<SidebarProps> =>
      isValidElement<SidebarProps>(child) && child.type === Sidebar,
  );
  const unknown = elements.filter(
    (child) =>
      !isValidElement(child) ||
      (child.type !== AppBar && child.type !== NavDrawer && child.type !== Sidebar),
  );
  const pinned = (drawer: ReactElement<NavDrawerProps | SidebarProps> | undefined) =>
    Boolean(
      drawer &&
      (drawer.props.pinned ||
        (drawer.props.permanentAt && width > breakpoints[drawer.props.permanentAt])),
    );
  const navDrawerPinned = pinned(navDrawer);
  const sidebarPinned = pinned(sidebar);
  const sidebarWidth = sidebar?.props.width;
  return (
    <div
      {...other}
      className={classnames(
        theme.layout,
        sidebarWidth && theme[`sidebarWidth${sidebarWidth}`],
        {
          [theme.navDrawerPinned]: navDrawerPinned,
          [theme.navDrawerClipped]: navDrawer?.props.clipped,
          [theme.sidebarPinned]: sidebarPinned,
          [theme.sidebarClipped]: sidebar?.props.clipped,
          [theme.appbarFixed]: appBar?.props.fixed,
        },
        className,
      )}
    >
      {navDrawer && cloneElement(navDrawer, { pinned: navDrawerPinned })}
      {appBar &&
        cloneElement(appBar, {
          theme: {
            ...appBar.props.theme,
            appBar: classnames(theme.appbarAppBar, appBar.props.theme?.appBar),
            fixed: classnames(theme.appbarFixed, appBar.props.theme?.fixed),
            inner: classnames(theme.appbarInner, appBar.props.theme?.inner),
            leftIcon: classnames(theme.appbarLeftIcon, appBar.props.theme?.leftIcon),
          },
        })}
      {unknown}
      {sidebar && cloneElement(sidebar, { pinned: sidebarPinned })}
    </div>
  );
}
export default Layout;
