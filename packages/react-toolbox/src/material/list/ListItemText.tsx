'use client';
import './tokens.css';

import type { ListClassNames } from './types';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
export interface ListItemTextProps extends ComponentPropsWithRef<'span'> {
  primary?: boolean;
  /** Classes for the component's rendered parts. */
  classNames?: ListClassNames;
}
export function ListItemText({ className, primary = false, children, classNames, ...other }: ListItemTextProps) {
  return (
    <span
      data-react-toolbox="list-item-text"
      className={cn(
        'rt-list-itemText',
        'block',
        '[&:not(.rt-list-primary)]:text-(--rt-color-text-secondary) [&:not(.rt-list-primary)]:text-(length:--font-size-small) [&:not(.rt-list-primary)]:pt-(--list-item-legend-margin-top) [&:not(.rt-list-primary)]:whitespace-normal',
        classNames?.itemText,
        primary &&
          cn(
            'rt-list-primary',
            '[.rt-list-itemText&]:text-(--rt-color-text) [.rt-list-itemText&]:text-(length:--font-size-normal)',
            classNames?.primary,
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
