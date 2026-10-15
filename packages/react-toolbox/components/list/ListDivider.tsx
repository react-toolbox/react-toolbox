'use client';
import type { ComponentPropsWithRef } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
export interface ListDividerProps extends ComponentPropsWithRef<'hr'> {
  inset?: boolean;
  theme?: Partial<typeof defaultTheme>;
}
export function ListDivider({
  inset = false,
  className,
  theme: suppliedTheme,
  ...other
}: ListDividerProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <hr {...other} className={classnames(theme.divider, { [theme.inset]: inset }, className)} />
  );
}
export default ListDivider;
