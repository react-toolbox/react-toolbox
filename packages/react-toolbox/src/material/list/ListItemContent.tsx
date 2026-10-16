'use client';
import './tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { ListTheme } from './types';
import { Children, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cn } from '../foundations/styles/cn';
import ListItemText from './ListItemText';
export interface ListItemContentProps extends ComponentPropsWithRef<'span'> {
  caption?: ReactNode;
  legend?: ReactNode;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: ListTheme & { auto?: string; normal?: string };
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: ListTheme & { auto?: string; normal?: string };
  type?: 'auto' | 'normal' | 'large';
}
export function ListItemContent({
  children,
  caption,
  legend,
  theme: legacyTheme,
  classNames,
  type,
  className,
  ...other
}: ListItemContentProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const lines = Children.count(children) + (caption ? 1 : 0) + (legend ? 1 : 0);
  const contentType = type ?? (lines === 0 ? 'auto' : lines === 1 ? 'normal' : 'large');
  const contentClass = contentType === 'large' ? cn('rt-list-large', theme?.large) : theme?.[contentType];
  return (
    <span
      {...other}
      className={cn(
        'rt-list-itemContentRoot',
        'block grow min-w-0',
        '[&.rt-list-large]:flex [&.rt-list-large]:flex-col [&.rt-list-large]:min-h-(--list-item-min-height-legend) [&.rt-list-large]:justify-center',
        "[&[data-line-count='3']]:justify-start [&[data-line-count='3']]:min-h-[var(--list-item-three-line-height,_calc(8.8_*_var(--unit)))] [&[data-line-count='3']]:pt-[calc(1.6*var(--unit))] [&[data-line-count='3']]:pb-[calc(1.6*var(--unit))]",
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
