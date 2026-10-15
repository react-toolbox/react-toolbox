'use client';

import type { HTMLAttributes, Ref } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import defaults from './theme';
export type MenuDividerTheme = Partial<typeof defaults>;
export interface MenuDividerProps extends HTMLAttributes<HTMLHRElement> {
  theme?: MenuDividerTheme;
  ref?: Ref<HTMLHRElement>;
}
export function MenuDivider({ theme: overrides, className, ...attributes }: MenuDividerProps) {
  const theme = mergeTheme(defaults, overrides);
  return (
    <hr
      {...attributes}
      data-react-toolbox="menu-divider"
      className={classnames(theme.menuDivider, className)}
    />
  );
}
export default MenuDivider;
