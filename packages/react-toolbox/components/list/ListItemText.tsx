'use client';
import type { ListTheme } from './types';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../utils/cn';
export interface ListItemTextProps extends ComponentPropsWithRef<'span'> {
  primary?: boolean;
  theme?: ListTheme;
}
export function ListItemText({ className, primary = false, children, theme, ...other }: ListItemTextProps) {
  return (
    <span
      data-react-toolbox="list-item-text"
      className={cn(
        'rt-list-itemText',
        'block',
        '[&:not(.rt-list-primary)]:text-[color:var(--rt-color-text-secondary)] [&:not(.rt-list-primary)]:text-[length:var(--font-size-small)] [&:not(.rt-list-primary)]:pt-[var(--list-item-legend-margin-top)] [&:not(.rt-list-primary)]:whitespace-normal',
        theme?.itemText,
        primary &&
          cn(
            'rt-list-primary',
            '[.rt-list-itemText&]:text-[color:var(--rt-color-text)] [.rt-list-itemText&]:text-[length:var(--font-size-normal)]',
            theme?.primary,
          ),
        className,
      )}
      {...other}
    >
      {children}
    </span>
  );
}
export default ListItemText;
