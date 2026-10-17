'use client';
import './tokens.css';

import { checkboxCellClasses } from './styles';
import type { TableClassNames } from './types';
import {
  useContext,
  useEffect,
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import { cn } from '../foundations/styles/cn';
import Checkbox from '../checkbox';
import { TableSelectionContext, TableCellContext } from './selection';
import TableCell, { type TableCellProps } from './TableCell';
export interface TableRowProps extends Omit<ComponentPropsWithRef<'tr'>, 'onSelect'> {
  /** Stable identity for selection inside TableRoot. */
  value?: string;
  selectionDisabled?: boolean;
  idx?: number;
  onSelect?: (index: number, selected: boolean) => void;
  selectable?: boolean;
  selected?: boolean;
  selectLabel?: string;
  /** Classes for the component's rendered parts. */
  classNames?: TableClassNames;
}
export function TableRow({
  children,
  className,
  idx = 0,
  value,
  selectionDisabled = false,
  onSelect,
  selectable: suppliedSelectable,
  selected: suppliedSelected,
  selectLabel,
  classNames,
  ...other
}: TableRowProps) {
  const cellTag = useContext(TableCellContext);
  const selection = useContext(TableSelectionContext);
  const register = selection?.register;
  useEffect(
    () => (value === undefined ? undefined : register?.(value, selectionDisabled || suppliedSelectable === false)),
    [value, selectionDisabled, suppliedSelectable, register],
  );
  const selectable = suppliedSelectable ?? (selection && value !== undefined ? selection.mode !== 'none' : undefined);
  const selected = suppliedSelected ?? (value !== undefined ? selection?.selected.includes(value) : undefined);
  let column = 0;
  const cells = (children: ReactNode): ReactNode =>
    Children.map(children, (child) => {
      if (!isValidElement<TableCellProps>(child)) return child;
      if (child.type === Fragment) return cloneElement(child, {}, cells(child.props.children));
      const currentColumn = column++;
      return child.type === TableCell
        ? cloneElement(child, { column: currentColumn, tagName: child.props.tagName ?? cellTag })
        : child;
    });
  return (
    <tr
      {...other}
      aria-selected={other['aria-selected'] ?? (selectable ? selected : undefined)}
      className={cn(
        'rt-table-row',
        'text-(--table-row-color) h-(--table-row-height) duration-[0.28s] [transition-property:background-color] [transition-timing-function:var(--animation-curve-default)]',
        '[&:hover]:bg-(--table-hover-color)',
        classNames?.row,
        selectable &&
          selected &&
          cn(
            'rt-table-selected',
            '[.rt-table-row&]:bg-(--table-selection-color)',
            '[.rt-table-row&:hover]:bg-(--table-hover-color)',
            classNames?.selected,
          ),
        className,
      )}
    >
      {selectable && (
        <TableCell className={cn(checkboxCellClasses, classNames?.checkboxCell)}>
          <Checkbox
            aria-label={selectLabel ?? `Select row ${value ?? idx + 1}`}
            checked={selected}
            disabled={selectionDisabled}
            onChange={(checked) => {
              onSelect?.(idx, checked);
              if (value !== undefined) selection?.select(value, checked);
            }}
          />
        </TableCell>
      )}
      {cells(children)}
    </tr>
  );
}
export default TableRow;
