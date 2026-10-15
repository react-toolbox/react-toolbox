'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { NavigationTheme } from './types';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
import Button, { type ButtonProps } from '../button';
import Link, { type LinkProps } from '../link';
export interface NavigationProps extends ComponentPropsWithRef<'nav'> {
  actions?: ButtonProps[];
  routes?: LinkProps[];
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: NavigationTheme & { button?: string; link?: string };
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: NavigationTheme & { button?: string; link?: string };
  type?: 'horizontal' | 'vertical';
}
export function Navigation({
  actions = [],
  children,
  className = '',
  routes = [],
  theme: legacyTheme,
  classNames,
  type = 'horizontal',
  ...other
}: NavigationProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  return (
    <nav
      data-react-toolbox="navigation"
      className={cn(
        type === 'horizontal'
          ? cn(
              'rt-navigation-horizontal',
              "[&>[data-react-toolbox='button']]:inline-block [&>[data-react-toolbox='button']]:m-[0_calc(var(--navigation-space)/2)]",
              "[&>[data-react-toolbox='link']]:inline-block [&>[data-react-toolbox='link']]:m-[0_calc(var(--navigation-space)/2)] [&>[data-react-toolbox='link']]:text-(--navigation-color)",
              'p-[calc(var(--navigation-space)/2)]',
              materialRoot,
              materialDescendants,
              theme?.horizontal,
            )
          : type === 'vertical'
            ? cn(
                'rt-navigation-vertical',
                "[&>[data-react-toolbox='button']]:block [&>[data-react-toolbox='button']]:m-[calc(var(--navigation-space)/2)]",
                "[&>[data-react-toolbox='link']]:block [&>[data-react-toolbox='link']]:m-[calc(var(--navigation-space)/2)] [&>[data-react-toolbox='link']]:text-(--navigation-color)",
                'p-[calc(var(--navigation-space)/2)]',
                materialRoot,
                materialDescendants,
                theme?.vertical,
              )
            : undefined,
        className,
      )}
      {...other}
    >
      {routes.map((route, index) => (
        <Link className={theme?.link} key={index} {...route} />
      ))}
      {actions.map((action, index) => (
        <Button className={theme?.button} key={index} {...action} />
      ))}
      {children}
    </nav>
  );
}
export default Navigation;
