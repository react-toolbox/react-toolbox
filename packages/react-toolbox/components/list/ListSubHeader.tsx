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
        'text-[color:var(--rt-color-text-secondary)] text-[length:var(--list-subheader-font-size)] [font-weight:var(--list-subheader-font-weight)] leading-[var(--list-subheader-height)] m-[calc(-1_*_var(--list-vertical-padding))_0_0] pl-[var(--list-horizontal-padding)]',
        theme?.subheader,
        className,
      )}
    >
      {caption}
    </h5>
  );
}
export default ListSubHeader;
