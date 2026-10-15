'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { MenuTheme } from './types';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../foundations/styles/cn';
export type MenuDividerTheme = MenuTheme;
export interface MenuDividerProps extends HTMLAttributes<HTMLHRElement> {
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: MenuDividerTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: MenuDividerTheme;
  ref?: Ref<HTMLHRElement>;
}
export function MenuDivider({ theme: legacyTheme, classNames, className, ...attributes }: MenuDividerProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  return (
    <hr
      {...attributes}
      data-react-toolbox="menu-divider"
      className={cn(
        'rt-menu-menuDivider',
        'bg-(--rt-color-divider) [border:0] block h-px m-[var(--menu-divider-height)_0] [outline:0] p-0 w-full',
        theme?.menuDivider,
        className,
      )}
    />
  );
}
export default MenuDivider;

/** Style slots for the component. */
export type MenuDividerClassNames = MenuDividerTheme;
