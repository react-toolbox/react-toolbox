'use client';
import { materialRoot, materialDescendants } from '../utils/styles';
import type { ListTheme } from './types';
import { Children, cloneElement, isValidElement, type ComponentPropsWithRef } from 'react';
import { cn } from '../utils/cn';
import ListItem, { type ListItemProps } from './ListItem';
export interface ListProps extends ComponentPropsWithRef<'ul'> {
  ripple?: boolean;
  selectable?: boolean;
  theme?: ListTheme;
}
export function List({ children, className = '', ripple = false, selectable = false, theme, ...other }: ListProps) {
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
