'use client';
import { materialRoot, materialDescendants } from '../utils/styles';
import type { TableTheme } from './types';
import { Children, cloneElement, isValidElement, type ComponentPropsWithRef, type ReactElement } from 'react';
import { cn } from '../utils/cn';
import TableHead, { type TableHeadProps } from './TableHead';
import TableRow, { type TableRowProps } from './TableRow';
export interface TableProps extends ComponentPropsWithRef<'table'> {
  multiSelectable?: boolean;
  onRowSelect?: (selectedIndices: number[]) => void;
  selectable?: boolean;
  theme?: TableTheme;
}
export function Table({
  children,
  className = '',
  multiSelectable = false,
  onRowSelect,
  selectable = true,
  theme,
  ...other
}: TableProps) {
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
