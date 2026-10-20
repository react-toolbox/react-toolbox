'use client';
import './tokens.css';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../foundations/styles/cn';
export interface MenuDividerProps extends HTMLAttributes<HTMLHRElement> {
  ref?: Ref<HTMLHRElement>;
}
export function MenuDivider({ className, ...attributes }: MenuDividerProps) {
  return (
    <hr
      {...attributes}
      data-react-toolbox="menu-divider"
      className={cn(
        'rt-menu-menuDivider',
        'bg-(--rt-color-divider) [border:0] block h-px m-[var(--menu-divider-height)_0] [outline:0] p-0 w-full',
        className,
      )}
    />
  );
}
export default MenuDivider;
