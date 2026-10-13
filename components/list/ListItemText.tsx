'use client';
import type { ComponentPropsWithRef } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
export interface ListItemTextProps extends ComponentPropsWithRef<'span'> {
  primary?: boolean;
  theme?: Partial<typeof defaultTheme>;
}
export function ListItemText({
  className,
  primary = false,
  children,
  theme: suppliedTheme,
  ...other
}: ListItemTextProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <span
      data-react-toolbox="list-item-text"
      className={classnames(theme.itemText, { [theme.primary]: primary }, className)}
      {...other}
    >
      {children}
    </span>
  );
}
export default ListItemText;
