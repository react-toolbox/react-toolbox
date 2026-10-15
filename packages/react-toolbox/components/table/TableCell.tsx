'use client';
import type { TableTheme } from './types';
import type { ComponentPropsWithRef, MouseEvent } from 'react';
import { cn } from '../utils/cn';
import FontIcon from '../font_icon';
export interface TableCellProps extends Omit<ComponentPropsWithRef<'th'>, 'onClick'> {
  column?: number;
  numeric?: boolean;
  onClick?: (event: MouseEvent<HTMLTableCellElement>, column?: number, row?: number) => void;
  row?: number;
  sorted?: 'asc' | 'desc';
  tagName?: 'td' | 'th';
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
  tagName: Tag = 'td',
  theme,
  ...other
}: TableCellProps) {
  return (
    <Tag
      {...other}
      className={cn(
        theme?.tableCell,
        Tag === 'th' &&
          cn(
            'rt-table-headCell',
            'text-[color:var(--table-header-color)] text-[length:var(--table-header-font-size)] [font-weight:500] h-[var(--table-row-height)] leading-[calc(2.4_*_var(--unit))] pb-[8px] text-ellipsis align-bottom p-[12px_var(--table-column-padding)] text-left',
            '[&:first-of-type]:pl-[24px]',
            '[&:last-of-type]:pr-[24px]',
            theme?.headCell,
          ),
        Tag === 'td' &&
          cn(
            'rt-table-rowCell',
            '[border-bottom:var(--table-dividers)] [border-top:var(--table-dividers)] h-[var(--table-row-height)] pt-[var(--table-cell-top)] align-middle p-[12px_var(--table-column-padding)] text-left',
            '[&:first-of-type]:pl-[24px]',
            '[&:last-of-type]:pr-[24px]',
            theme?.rowCell,
          ),
        sorted &&
          cn(
            'rt-table-sorted',
            '[.rt-table-headCell&]:text-[color:var(--table-header-sorted-color)] [.rt-table-headCell&]:cursor-pointer',
            theme?.sorted,
          ),
        numeric &&
          cn('rt-table-numeric', '[.rt-table-rowCell&]:text-right', '[.rt-table-headCell&]:text-right', theme?.numeric),
        className,
      )}
      onClick={(event) => onClick?.(event, column, row)}
    >
      {sorted && (
        <FontIcon
          className={cn(
            'rt-table-sortIcon',
            'inline-block text-[length:calc(1.6_*_var(--unit))] mr-[3px] [transition:0.28s_transform_var(--animation-curve-default)] [vertical-align:sub]',
            '[.rt-table-headCell.rt-table-sorted:hover_&]:text-[color:var(--table-header-sorted-icon-hover-color)]',
            theme?.sortIcon,
            sorted === 'asc' && cn('rt-table-asc', '[.rt-table-sortIcon&]:[transform:rotate(180deg)]', theme?.asc),
          )}
          value="arrow_downward"
        />
      )}
      {children}
    </Tag>
  );
}
export default TableCell;
