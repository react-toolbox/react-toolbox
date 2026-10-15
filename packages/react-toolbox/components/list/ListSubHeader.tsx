'use client';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
export interface ListSubHeaderProps extends ComponentPropsWithRef<'h5'> {
  caption?: ReactNode;
  theme?: Partial<typeof defaultTheme>;
}
export function ListSubHeader({
  caption,
  className = '',
  theme: suppliedTheme,
  ...other
}: ListSubHeaderProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <h5 {...other} className={classnames(theme.subheader, className)}>
      {caption}
    </h5>
  );
}
export default ListSubHeader;
