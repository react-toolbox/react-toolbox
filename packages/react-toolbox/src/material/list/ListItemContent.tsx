'use client';
import './tokens.css';

import type { ListClassNames } from './types';
import { Children, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cn } from '../foundations/styles/cn';
import ListItemText from './ListItemText';
export interface ListItemContentProps extends ComponentPropsWithRef<'span'> {
  caption?: ReactNode;
  legend?: ReactNode;
  /** Classes for the component's rendered parts. */
  classNames?: ListClassNames & { auto?: string; normal?: string };
  type?: 'auto' | 'normal' | 'large';
}
export function ListItemContent({
  children,
  caption,
  legend,
  classNames,
  type,
  className,
  ...other
}: ListItemContentProps) {
  const lines = Children.count(children) + (caption ? 1 : 0) + (legend ? 1 : 0);
  const contentType = type ?? (lines === 0 ? 'auto' : lines === 1 ? 'normal' : 'large');
  const contentClass = contentType === 'large' ? cn('rt-list-large', classNames?.large) : classNames?.[contentType];
  return (
    <span
      {...other}
      className={cn(
        'rt-list-itemContentRoot',
        'block grow min-w-0',
        '[&.rt-list-large]:flex [&.rt-list-large]:flex-col [&.rt-list-large]:min-h-(--list-item-min-height-legend) [&.rt-list-large]:justify-center',
        "[&[data-line-count='3']]:justify-start [&[data-line-count='3']]:min-h-[var(--list-item-three-line-height,_calc(8.8_*_var(--unit)))] [&[data-line-count='3']]:pt-[calc(1.6*var(--unit))] [&[data-line-count='3']]:pb-[calc(1.6*var(--unit))]",
        classNames?.itemContentRoot,
        contentClass,
        className,
      )}
      data-line-count={!type && lines >= 3 ? 3 : undefined}
    >
      {caption && (
        <ListItemText classNames={classNames} primary>
          {caption}
        </ListItemText>
      )}
      {legend && <ListItemText classNames={classNames}>{legend}</ListItemText>}
      {children}
    </span>
  );
}
export default ListItemContent;
