'use client';
import './tokens.css';

import type { MenuClassNames } from './types';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../foundations/styles/cn';
export type MenuDividerClassNames = MenuClassNames;
export interface MenuDividerProps extends HTMLAttributes<HTMLHRElement> {
  /** Classes for the component's rendered parts. */
  classNames?: MenuDividerClassNames;
  ref?: Ref<HTMLHRElement>;
}
export function MenuDivider({ classNames, className, ...attributes }: MenuDividerProps) {
  return (
    <hr
      {...attributes}
      data-react-toolbox="menu-divider"
      className={cn(
        'rt-menu-menuDivider',
        'bg-(--rt-color-divider) [border:0] block h-px m-[var(--menu-divider-height)_0] [outline:0] p-0 w-full',
        classNames?.menuDivider,
        className,
      )}
    />
  );
}
export default MenuDivider;
