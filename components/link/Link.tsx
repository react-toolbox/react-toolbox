'use client';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import classnames from 'classnames';
import FontIcon from '../font_icon';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
export interface LinkProps extends ComponentPropsWithRef<'a'> {
  active?: boolean;
  count?: number;
  icon?: ReactNode;
  label?: string;
  theme?: Partial<typeof defaultTheme>;
}
export function Link({
  active = false,
  children,
  className = '',
  count,
  icon,
  label,
  theme: suppliedTheme,
  ...other
}: LinkProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <a
      data-react-toolbox="link"
      className={classnames(theme.link, { [theme.active]: active }, className)}
      {...other}
    >
      {icon ? <FontIcon className={theme.icon} value={icon} /> : null}
      {label ? <abbr>{label}</abbr> : null}
      {count ? <small>{count}</small> : null}
      {children}
    </a>
  );
}
export default Link;
