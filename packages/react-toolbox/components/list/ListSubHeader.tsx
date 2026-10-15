'use client';
import type { ListTheme } from './types';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '../utils/cn';
export interface ListSubHeaderProps extends ComponentPropsWithRef<'h5'> {
  caption?: ReactNode;
  theme?: ListTheme;
}
export function ListSubHeader({ caption, className = '', theme, ...other }: ListSubHeaderProps) {
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
