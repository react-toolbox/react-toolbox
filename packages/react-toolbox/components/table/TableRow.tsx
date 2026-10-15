'use client';
import { checkboxCellClasses } from './styles';
import type { TableTheme } from './types';
import { Children, cloneElement, isValidElement, type ComponentPropsWithRef } from 'react';
import { cn } from '../utils/cn';
import Checkbox from '../checkbox';
import TableCell, { type TableCellProps } from './TableCell';
export interface TableRowProps extends Omit<ComponentPropsWithRef<'tr'>, 'onSelect'> {
  idx?: number;
  onSelect?: (index: number, selected: boolean) => void;
  selectable?: boolean;
  selected?: boolean;
  theme?: TableTheme;
}
export function TableRow({
  children,
  className,
  idx = 0,
  onSelect,
  selectable,
  selected,
  theme,
  ...other
}: TableRowProps) {
  return (
    <tr
      {...other}
      className={cn(
        'rt-table-row',
        'text-[color:var(--table-row-color)] h-[var(--table-row-height)] [transition-duration:0.28s] [transition-property:background-color] [transition-timing-function:var(--animation-curve-default)]',
        '[&:hover]:bg-[var(--table-hover-color)]',
        theme?.row,
        selectable &&
          selected &&
          cn(
            'rt-table-selected',
            '[.rt-table-row&]:bg-[var(--table-selection-color)]',
            '[.rt-table-row&:hover]:bg-[var(--table-hover-color)]',
            theme?.selected,
          ),
        className,
      )}
    >
      {selectable && (
        <TableCell className={cn(checkboxCellClasses, theme?.checkboxCell)}>
          <Checkbox checked={selected} onChange={(value) => onSelect?.(idx, value)} />
        </TableCell>
      )}
      {Children.map(children, (child, column) =>
        isValidElement<TableCellProps>(child) ? cloneElement(child, { column, tagName: 'td' }) : child,
      )}
    </tr>
  );
}
export default TableRow;
