'use client';
import './tokens.css';

import type { ListClassNames } from './types';
import { useContext, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cn } from '../foundations/styles/cn';
import { ListContext } from './context';
export interface ListSubHeaderProps extends ComponentPropsWithRef<'h5'> {
  caption?: ReactNode;
  /** Classes for the component's rendered parts. */
  classNames?: ListClassNames;
}
export function ListSubHeader({ caption, children, className = '', classNames, ...other }: ListSubHeaderProps) {
  const list = useContext(ListContext);
  const heading = (
    <h5
      {...other}
      className={cn(
        'rt-list-subheader',
        'text-(--rt-color-text-secondary) text-(length:--list-subheader-font-size) font-(--list-subheader-font-weight) leading-(--list-subheader-height) m-[calc(-1*var(--list-vertical-padding))_0_0] ps-(--list-horizontal-padding)',
        classNames?.subheader,
        className,
      )}
    >
      {caption ?? children}
    </h5>
  );
  return list ? (
    <li role="presentation" className="contents">
      {heading}
    </li>
  ) : (
    heading
  );
}
export default ListSubHeader;
