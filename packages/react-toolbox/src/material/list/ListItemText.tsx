'use client';
import './tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { ListTheme } from './types';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
export interface ListItemTextProps extends ComponentPropsWithRef<'span'> {
  primary?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: ListTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: ListTheme;
}
export function ListItemText({
  className,
  primary = false,
  children,
  theme: legacyTheme,
  classNames,
  ...other
}: ListItemTextProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  return (
    <span
      data-react-toolbox="list-item-text"
      className={cn(
        'rt-list-itemText',
        'block',
        '[&:not(.rt-list-primary)]:text-(--rt-color-text-secondary) [&:not(.rt-list-primary)]:text-(length:--font-size-small) [&:not(.rt-list-primary)]:pt-(--list-item-legend-margin-top) [&:not(.rt-list-primary)]:whitespace-normal',
        theme?.itemText,
        primary &&
          cn(
            'rt-list-primary',
            '[.rt-list-itemText&]:text-(--rt-color-text) [.rt-list-itemText&]:text-(length:--font-size-normal)',
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
