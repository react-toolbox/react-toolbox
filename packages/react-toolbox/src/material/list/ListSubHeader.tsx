'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { ListTheme } from './types';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '../foundations/styles/cn';
export interface ListSubHeaderProps extends ComponentPropsWithRef<'h5'> {
  caption?: ReactNode;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: ListTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: ListTheme;
}
export function ListSubHeader({
  caption,
  className = '',
  theme: legacyTheme,
  classNames,
  ...other
}: ListSubHeaderProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  return (
    <h5
      {...other}
      className={cn(
        'rt-list-subheader',
        'text-(--rt-color-text-secondary) text-(length:--list-subheader-font-size) font-(--list-subheader-font-weight) leading-(--list-subheader-height) m-[calc(-1*var(--list-vertical-padding))_0_0] pl-(--list-horizontal-padding)',
        theme?.subheader,
        className,
      )}
    >
      {caption}
    </h5>
  );
}
export default ListSubHeader;
