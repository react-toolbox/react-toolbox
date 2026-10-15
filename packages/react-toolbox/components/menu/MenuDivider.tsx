'use client';
import type { MenuTheme } from './types';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../utils/cn';
export type MenuDividerTheme = MenuTheme;
export interface MenuDividerProps extends HTMLAttributes<HTMLHRElement> {
  theme?: MenuDividerTheme;
  ref?: Ref<HTMLHRElement>;
}
export function MenuDivider({ theme, className, ...attributes }: MenuDividerProps) {
  return (
    <hr
      {...attributes}
      data-react-toolbox="menu-divider"
      className={cn(
        'rt-menu-menuDivider',
        'bg-[var(--rt-color-divider)] [border:0] block h-[1px] m-[var(--menu-divider-height)_0] [outline:0] p-0 w-full',
        theme?.menuDivider,
        className,
      )}
    />
  );
}
export default MenuDivider;
