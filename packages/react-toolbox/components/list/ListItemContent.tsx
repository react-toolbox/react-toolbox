'use client';
import { Children, type ComponentPropsWithRef, type ReactNode } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import ListItemText from './ListItemText';
import defaultTheme from './theme';
export interface ListItemContentProps extends ComponentPropsWithRef<'span'> {
  caption?: ReactNode;
  legend?: ReactNode;
  theme?: Partial<typeof defaultTheme> & { auto?: string; normal?: string };
  type?: 'auto' | 'normal' | 'large';
}
export function ListItemContent({
  children,
  caption,
  legend,
  theme: suppliedTheme,
  type,
  className,
  ...other
}: ListItemContentProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  const lines = Children.count(children) + (caption ? 1 : 0) + (legend ? 1 : 0);
  const contentType = type ?? (lines === 0 ? 'auto' : lines === 1 ? 'normal' : 'large');
  const contentClass = contentType === 'large' ? theme.large : suppliedTheme?.[contentType];
  return (
    <span
      {...other}
      className={classnames(theme.itemContentRoot, contentClass, className)}
      data-line-count={!type && lines >= 3 ? 3 : undefined}
    >
      {caption && (
        <ListItemText theme={theme} primary>
          {caption}
        </ListItemText>
      )}
      {legend && <ListItemText theme={theme}>{legend}</ListItemText>}
      {children}
    </span>
  );
}
export default ListItemContent;
