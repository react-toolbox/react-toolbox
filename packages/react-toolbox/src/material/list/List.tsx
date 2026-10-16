'use client';
import './tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { ListTheme } from './types';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
import { ListContext } from './context';
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
    <ListContext value={{ ripple, selectable }}>
      <ul
        {...other}
        data-react-toolbox="list"
        className={cn(
          'rt-list-list',
          'inline-block [list-style:none] m-0 p-[var(--list-vertical-padding)_0] relative text-start whitespace-nowrap w-full',
          materialRoot,
          materialDescendants,
          theme?.list,
          className,
        )}
      >
        {children}
      </ul>
    </ListContext>
  );
}
export default List;
