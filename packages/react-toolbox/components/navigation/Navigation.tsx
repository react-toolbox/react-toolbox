'use client';
import { materialRoot, materialDescendants } from '../utils/styles';
import type { NavigationTheme } from './types';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../utils/cn';
import Button, { type ButtonProps } from '../button';
import Link, { type LinkProps } from '../link';
export interface NavigationProps extends ComponentPropsWithRef<'nav'> {
  actions?: ButtonProps[];
  routes?: LinkProps[];
  theme?: NavigationTheme & { button?: string; link?: string };
  type?: 'horizontal' | 'vertical';
}
export function Navigation({
  actions = [],
  children,
  className = '',
  routes = [],
  theme,
  type = 'horizontal',
  ...other
}: NavigationProps) {
  return (
    <nav
      data-react-toolbox="navigation"
      className={cn(
        type === 'horizontal'
          ? cn(
              'rt-navigation-horizontal',
              "[&>[data-react-toolbox='button']]:inline-block [&>[data-react-toolbox='button']]:m-[0_calc(var(--navigation-space)_/_2)]",
              "[&>[data-react-toolbox='link']]:inline-block [&>[data-react-toolbox='link']]:m-[0_calc(var(--navigation-space)_/_2)] [&>[data-react-toolbox='link']]:text-[color:var(--navigation-color)]",
              'p-[calc(var(--navigation-space)_/_2)]',
              materialRoot,
              materialDescendants,
              theme?.horizontal,
            )
          : type === 'vertical'
            ? cn(
                'rt-navigation-vertical',
                "[&>[data-react-toolbox='button']]:block [&>[data-react-toolbox='button']]:m-[calc(var(--navigation-space)_/_2)]",
                "[&>[data-react-toolbox='link']]:block [&>[data-react-toolbox='link']]:m-[calc(var(--navigation-space)_/_2)] [&>[data-react-toolbox='link']]:text-[color:var(--navigation-color)]",
                'p-[calc(var(--navigation-space)_/_2)]',
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
