'use client';
import './tokens.css';

import { useContext, type ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
import { ListContext } from './context';
export interface ListDividerProps extends ComponentPropsWithRef<'hr'> {
  inset?: boolean;
}
export function ListDivider({ inset = false, className, ...other }: ListDividerProps) {
  const list = useContext(ListContext);
  const divider = (
    <hr
      {...other}
      className={cn(
        'rt-list-divider',
        'bg-(--rt-color-divider) [border:0] h-(--list-divider-height) m-[calc(-1*var(--list-divider-height))_0_0]',
        '[.rt-list-list+&]:mt-[calc(-1_*_var(--list-vertical-padding))]',
        '[.rt-list-listItem~&]:mb-(--list-vertical-padding) [.rt-list-listItem~&]:mt-(--list-vertical-padding)',
        '[.rt-list-listItem~li>&]:mb-(--list-vertical-padding) [.rt-list-listItem~li>&]:mt-(--list-vertical-padding)',

        inset &&
          cn(
            'rt-list-inset',
            '[.rt-list-divider&]:ms-(--list-content-left-spacing) [.rt-list-divider&]:me-(--list-horizontal-padding)',
          ),
        className,
      )}
    />
  );
  return list ? (
    <li role="presentation" className="contents">
      {divider}
    </li>
  ) : (
    divider
  );
}
export default ListDivider;
