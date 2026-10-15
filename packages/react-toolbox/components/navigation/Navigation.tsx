'use client';
import type { ComponentPropsWithRef } from 'react';
import classnames from 'classnames';
import Button, { type ButtonProps } from '../button';
import Link, { type LinkProps } from '../link';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
export interface NavigationProps extends ComponentPropsWithRef<'nav'> {
  actions?: ButtonProps[];
  routes?: LinkProps[];
  theme?: Partial<typeof defaultTheme> & { button?: string; link?: string };
  type?: 'horizontal' | 'vertical';
}
export function Navigation({
  actions = [],
  children,
  className = '',
  routes = [],
  theme: suppliedTheme,
  type = 'horizontal',
  ...other
}: NavigationProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <nav data-react-toolbox="navigation" className={classnames(theme[type], className)} {...other}>
      {routes.map((route, index) => (
        <Link className={suppliedTheme?.link} key={index} {...route} />
      ))}
      {actions.map((action, index) => (
        <Button className={suppliedTheme?.button} key={index} {...action} />
      ))}
      {children}
    </nav>
  );
}
export default Navigation;
