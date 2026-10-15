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
        'bg-(--rt-color-divider) [border:0] h-(--list-divider-height) m-[calc(-1*var(--list-divider-height))_0_0]',
        '[.rt-list-list+&]:mt-[calc(-1_*_var(--list-vertical-padding))]',
        '[.rt-list-listItem~&]:mb-(--list-vertical-padding) [.rt-list-listItem~&]:mt-(--list-vertical-padding)',
        theme?.divider,
        inset &&
          cn(
            'rt-list-inset',
            '[.rt-list-divider&]:ml-(--list-content-left-spacing) [.rt-list-divider&]:mr-(--list-horizontal-padding)',
            theme?.inset,
          ),
        className,
      )}
    />
  );
}
export default ListDivider;
