'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { ListTheme } from './types';
import { Children, cloneElement, isValidElement, type ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
import ListItem, { type ListItemProps } from './ListItem';
export interface ListProps extends ComponentPropsWithRef<'ul'> {
  ripple?: boolean;
  selectable?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: ListTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: ListTheme;
}
export function List({
  children,
  className = '',
  ripple = false,
  selectable = false,
  theme: legacyTheme,
  classNames,
  ...other
}: ListProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  return (
    <ul
      {...other}
      data-react-toolbox="list"
      className={cn(
        'rt-list-list',
        'inline-block [list-style:none] m-0 p-[var(--list-vertical-padding)_0] relative text-left whitespace-nowrap w-full',
        materialRoot,
        materialDescendants,
        theme?.list,
        className,
      )}
    >
      {Children.map(children, (item) =>
        isValidElement<ListItemProps>(item) && item.type === ListItem
          ? cloneElement(item, {
              selectable: item.props.selectable ?? selectable,
              ripple: item.props.ripple ?? ripple,
            })
          : item,
      )}
    </ul>
  );
}
export default List;
