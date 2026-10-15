'use client';
import type { ListTheme } from './types';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../utils/cn';
export interface ListDividerProps extends ComponentPropsWithRef<'hr'> {
  inset?: boolean;
  theme?: ListTheme;
}
export function ListDivider({ inset = false, className, theme, ...other }: ListDividerProps) {
  return (
    <hr
      {...other}
      className={cn(
        'rt-list-divider',
        'bg-[var(--rt-color-divider)] [border:0] h-[var(--list-divider-height)] m-[calc(-1_*_var(--list-divider-height))_0_0]',
        '[.rt-list-list+&]:mt-[calc(-1_*_var(--list-vertical-padding))]',
        '[.rt-list-listItem~&]:mb-[var(--list-vertical-padding)] [.rt-list-listItem~&]:mt-[var(--list-vertical-padding)]',
        theme?.divider,
        inset &&
          cn(
            'rt-list-inset',
            '[.rt-list-divider&]:ml-[var(--list-content-left-spacing)] [.rt-list-divider&]:mr-[var(--list-horizontal-padding)]',
            theme?.inset,
          ),
        className,
      )}
    />
  );
}
export default ListDivider;
