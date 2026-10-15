'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { TableTheme } from './types';
import { Children, cloneElement, isValidElement, type ComponentPropsWithRef, type ReactElement } from 'react';
import { cn } from '../foundations/styles/cn';
import TableHead, { type TableHeadProps } from './TableHead';
import TableRow, { type TableRowProps } from './TableRow';
export interface TableProps extends ComponentPropsWithRef<'table'> {
  multiSelectable?: boolean;
  onRowSelect?: (selectedIndices: number[]) => void;
  selectable?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: TableTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: TableTheme;
}
export function Table({
  children,
  className = '',
  multiSelectable = false,
  onRowSelect,
  selectable = true,
  theme: legacyTheme,
  classNames,
  ...other
}: TableProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const elements = Children.toArray(children);
  const rows = elements.filter(
    (child): child is ReactElement<TableRowProps> => isValidElement<TableRowProps>(child) && child.type === TableRow,
  );
  const heads = elements.filter(
    (child): child is ReactElement<TableHeadProps> => isValidElement<TableHeadProps>(child) && child.type === TableHead,
  );
  const selectedIndices = rows.flatMap((row, index) => (row.props.selected ? [index] : []));
  function selectRow(index: number) {
    onRowSelect?.(
      multiSelectable
        ? selectedIndices.includes(index)
          ? selectedIndices.filter((selected) => selected !== index)
          : [...selectedIndices, index]
        : [index],
    );
  }
  return (
    <table
      {...other}
      className={cn(
        'rt-table-table',
        'bg-(--rt-color-white) border-collapse text-(length:--table-font-size) w-full',
        materialRoot,
        materialDescendants,
        theme?.table,
        className,
      )}
    >
      <thead className={cn('rt-table-head', 'pb-[calc(0.3*var(--unit))] whitespace-nowrap', theme?.head)}>
        {heads.map((head) =>
          cloneElement(head, {
            selected: selectedIndices.length === rows.length,
            multiSelectable,
            selectable,
            onSelect: (value) => onRowSelect?.(value ? rows.map((_, index) => index) : []),
          }),
        )}
      </thead>
      <tbody>{rows.map((row, idx) => cloneElement(row, { idx, onSelect: selectRow, selectable }))}</tbody>
    </table>
  );
}
export default Table;
