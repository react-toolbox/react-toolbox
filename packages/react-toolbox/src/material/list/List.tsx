'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
import { ListContext } from './context';
export interface ListProps extends ComponentPropsWithRef<'ul'> {
  ripple?: boolean;
  selectable?: boolean;
}
export function List({ children, className = '', ripple = false, selectable = false, ...other }: ListProps) {
  return (
    <ListContext value={{ ripple, selectable }}>
      <ul
        {...other}
        data-react-toolbox="list"
        className={cn(
          'rt-list-list',
          'inline-block [list-style:none] m-0 p-[var(--list-vertical-padding)_0] relative text-start whitespace-nowrap w-full',
          materialRoot,
          materialDescendants,

          className,
        )}
      >
        {children}
      </ul>
    </ListContext>
  );
}
export default List;
