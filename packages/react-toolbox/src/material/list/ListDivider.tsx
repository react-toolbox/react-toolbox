'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { ListTheme } from './types';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
export interface ListDividerProps extends ComponentPropsWithRef<'hr'> {
  inset?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: ListTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: ListTheme;
}
export function ListDivider({ inset = false, className, theme: legacyTheme, classNames, ...other }: ListDividerProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
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
