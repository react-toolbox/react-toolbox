'use client';
import type { ComponentPropsWithRef } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
import type { LayoutTheme } from './types';
export interface PanelProps extends ComponentPropsWithRef<'div'> {
  bodyScroll?: boolean;
  theme?: LayoutTheme;
}
export function Panel({
  bodyScroll = true,
  children,
  className = '',
  theme: suppliedTheme,
  ...other
}: PanelProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <div
      {...other}
      data-react-toolbox="panel"
      className={classnames(theme.panel, { [theme.bodyScroll]: bodyScroll }, className)}
    >
      {children}
    </div>
  );
}
export default Panel;
