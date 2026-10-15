'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { checkboxCellClasses } from './styles';
import type { TableTheme } from './types';
import { Children, cloneElement, isValidElement, type ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
import Checkbox from '../checkbox';
import TableCell, { type TableCellProps } from './TableCell';
export interface TableRowProps extends Omit<ComponentPropsWithRef<'tr'>, 'onSelect'> {
  idx?: number;
  onSelect?: (index: number, selected: boolean) => void;
  selectable?: boolean;
  selected?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: TableTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: TableTheme;
}
export function TableRow({
  children,
  className,
  idx = 0,
  onSelect,
  selectable,
  selected,
  theme: legacyTheme,
  classNames,
  ...other
}: TableRowProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  return (
    <tr
      {...other}
      className={cn(
        'rt-table-row',
        'text-(--table-row-color) h-(--table-row-height) duration-[0.28s] [transition-property:background-color] [transition-timing-function:var(--animation-curve-default)]',
        '[&:hover]:bg-(--table-hover-color)',
        theme?.row,
        selectable &&
          selected &&
          cn(
            'rt-table-selected',
            '[.rt-table-row&]:bg-(--table-selection-color)',
            '[.rt-table-row&:hover]:bg-(--table-hover-color)',
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
