'use client';
import './tokens.css';

import { useContext, type ComponentPropsWithRef } from 'react';
import { TableCellContext } from './selection';
import { cn } from '../foundations/styles/cn';
import FontIcon from '../font-icon';
export interface TableCellProps extends ComponentPropsWithRef<'th'> {
  numeric?: boolean;
  sorted?: 'asc' | 'desc';
  tagName?: 'td' | 'th';
}
export function TableCell({
  children,
  className = '',
  numeric = false,
  onClick,
  sorted,
  tagName,
  ...other
}: TableCellProps) {
  const inheritedTag = useContext(TableCellContext);
  const Tag = tagName ?? inheritedTag;
  const content = (
    <>
      {' '}
      {sorted && (
        <FontIcon
          className={cn(
            'rt-table-sortIcon',
            'inline-block text-[calc(1.6*var(--unit))] me-[3px] [transition:transform_var(--animation-duration)_var(--animation-curve-default)] align-sub',
            '[.rt-table-headCell.rt-table-sorted:hover_&]:text-(--table-header-sorted-icon-hover-color)',
            sorted === 'asc' && cn('rt-table-asc', '[.rt-table-sortIcon&]:transform-[rotate(180deg)]'),
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
        Tag === 'th' &&
          cn(
            'rt-table-headCell',
            'text-(--table-header-color) text-(length:--table-header-font-size) [font-weight:500] h-(--table-row-height) leading-[calc(2.4*var(--unit))] pb-[8px] text-ellipsis align-bottom p-[12px_var(--table-column-padding)] text-start',
            '[&:first-of-type]:ps-[24px]',
            '[&:last-of-type]:pe-[24px]',
          ),
        Tag === 'td' &&
          cn(
            'rt-table-rowCell',
            '[border-bottom:var(--table-dividers)] [border-top:var(--table-dividers)] h-(--table-row-height) pt-(--table-cell-top) align-middle p-[12px_var(--table-column-padding)] text-start',
            '[&:first-of-type]:ps-[24px]',
            '[&:last-of-type]:pe-[24px]',
          ),
        sorted &&
          cn(
            'rt-table-sorted',
            '[.rt-table-headCell&]:text-(--table-header-sorted-color) [.rt-table-headCell&]:cursor-pointer',
          ),
        numeric && cn('rt-table-numeric', '[.rt-table-rowCell&]:text-end', '[.rt-table-headCell&]:text-end'),
        className,
      )}
      onClick={onClick}
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
