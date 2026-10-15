'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { TableTheme } from './types';
import { useContext, type ComponentPropsWithRef, type MouseEvent } from 'react';
import { TableCellContext } from './selection';
import { cn } from '../foundations/styles/cn';
import FontIcon from '../font-icon';
export interface TableCellProps extends Omit<ComponentPropsWithRef<'th'>, 'onClick'> {
  column?: number;
  numeric?: boolean;
  onClick?: (event: MouseEvent<HTMLTableCellElement>, column?: number, row?: number) => void;
  row?: number;
  sorted?: 'asc' | 'desc';
  tagName?: 'td' | 'th';
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: TableTheme & { tableCell?: string };
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: TableTheme & { tableCell?: string };
}
export function TableCell({
  children,
  className = '',
  column,
  numeric = false,
  onClick,
  row,
  sorted,
  tagName,
  theme: legacyTheme,
  classNames,
  ...other
}: TableCellProps) {
  const inheritedTag = useContext(TableCellContext);
  const Tag = tagName ?? inheritedTag;
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const content = (
    <>
      {' '}
      {sorted && (
        <FontIcon
          className={cn(
            'rt-table-sortIcon',
            'inline-block text-[calc(1.6*var(--unit))] mr-[3px] [transition:0.28s_transform_var(--animation-curve-default)] align-sub',
            '[.rt-table-headCell.rt-table-sorted:hover_&]:text-(--table-header-sorted-icon-hover-color)',
            theme?.sortIcon,
            sorted === 'asc' && cn('rt-table-asc', '[.rt-table-sortIcon&]:transform-[rotate(180deg)]', theme?.asc),
          )}
          value="arrow_downward"
          aria-hidden
        />
      )}
      {children}
    </>
  );
  return (
    <Tag
      {...other}
      scope={other.scope ?? (Tag === 'th' ? 'col' : undefined)}
      aria-sort={
        other['aria-sort'] ?? (Tag === 'th' && sorted ? (sorted === 'asc' ? 'ascending' : 'descending') : undefined)
      }
      className={cn(
        theme?.tableCell,
        Tag === 'th' &&
          cn(
            'rt-table-headCell',
            'text-(--table-header-color) text-(length:--table-header-font-size) [font-weight:500] h-(--table-row-height) leading-[calc(2.4*var(--unit))] pb-[8px] text-ellipsis align-bottom p-[12px_var(--table-column-padding)] text-left',
            '[&:first-of-type]:pl-[24px]',
            '[&:last-of-type]:pr-[24px]',
            theme?.headCell,
          ),
        Tag === 'td' &&
          cn(
            'rt-table-rowCell',
            '[border-bottom:var(--table-dividers)] [border-top:var(--table-dividers)] h-(--table-row-height) pt-(--table-cell-top) align-middle p-[12px_var(--table-column-padding)] text-left',
            '[&:first-of-type]:pl-[24px]',
            '[&:last-of-type]:pr-[24px]',
            theme?.rowCell,
          ),
        sorted &&
          cn(
            'rt-table-sorted',
            '[.rt-table-headCell&]:text-(--table-header-sorted-color) [.rt-table-headCell&]:cursor-pointer',
            theme?.sorted,
          ),
        numeric &&
          cn('rt-table-numeric', '[.rt-table-rowCell&]:text-right', '[.rt-table-headCell&]:text-right', theme?.numeric),
        className,
      )}
      onClick={(event) => onClick?.(event, column, row)}
    >
      {Tag === 'th' && onClick ? (
        <button
          type="button"
          className="inline border-0 bg-transparent p-0 [font:inherit] text-inherit [text-align:inherit] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          {content}
        </button>
      ) : (
        content
      )}
    </Tag>
  );
}
export default TableCell;
