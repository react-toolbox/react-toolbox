'use client';
import type { ListTheme } from './types';
import { Children, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cn } from '../utils/cn';
import ListItemText from './ListItemText';
export interface ListItemContentProps extends ComponentPropsWithRef<'span'> {
  caption?: ReactNode;
  legend?: ReactNode;
  theme?: ListTheme & { auto?: string; normal?: string };
  type?: 'auto' | 'normal' | 'large';
}
export function ListItemContent({ children, caption, legend, theme, type, className, ...other }: ListItemContentProps) {
  const lines = Children.count(children) + (caption ? 1 : 0) + (legend ? 1 : 0);
  const contentType = type ?? (lines === 0 ? 'auto' : lines === 1 ? 'normal' : 'large');
  const contentClass = contentType === 'large' ? cn('rt-list-large', theme?.large) : theme?.[contentType];
  return (
    <span
      {...other}
      className={cn(
        'rt-list-itemContentRoot',
        'block grow-[1] min-w-0',
        '[&.rt-list-large]:flex [&.rt-list-large]:flex-col [&.rt-list-large]:min-h-[var(--list-item-min-height-legend)] [&.rt-list-large]:justify-center',
        "[&[data-line-count='3']]:justify-start [&[data-line-count='3']]:min-h-[var(--list-item-three-line-height,_calc(8.8_*_var(--unit)))] [&[data-line-count='3']]:pt-[calc(1.6_*_var(--unit))] [&[data-line-count='3']]:pb-[calc(1.6_*_var(--unit))]",
        theme?.itemContentRoot,
        contentClass,
        className,
      )}
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
