'use client';
import './tokens.css';

import { checkboxCellClasses } from './styles';
import { useContext, useEffect, type ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
import Checkbox, { type CheckboxProps } from '../checkbox';
import { TableSelectionContext } from './selection';
import TableCell from './TableCell';
export interface TableRowProps extends ComponentPropsWithRef<'tr'> {
  /** Stable identity for selection inside Table or TableRoot; omit for structural rows. */
  value?: string;
  selectionDisabled?: boolean;
  /** Cancel the event to prevent a row selection change. */
  onSelectionChange?: CheckboxProps['onChange'];
  selectLabel?: string;
}
export function TableRow({
  children,
  className,
  value,
  selectionDisabled = false,
  onSelectionChange,
  selectLabel,
  ...other
}: TableRowProps) {
  const selection = useContext(TableSelectionContext);
  const register = selection?.register;
  useEffect(
    () => (value === undefined ? undefined : register?.(value, selectionDisabled)),
    [value, selectionDisabled, register],
  );
  const selectable = Boolean(selection && selection.mode !== 'none' && value !== undefined);
  const selected = value !== undefined && (selection?.selected.includes(value) ?? false);
  return (
    <tr
      {...other}
      aria-selected={other['aria-selected'] ?? (selectable ? selected : undefined)}
      className={cn(
        'rt-table-row',
        'text-(--table-row-color) h-(--table-row-height) duration-(--animation-duration) [transition-property:background-color] [transition-timing-function:var(--animation-curve-default)]',
        '[&:hover]:bg-(--table-hover-color)',
        selectable &&
          selected &&
          cn(
            'rt-table-selected',
            '[.rt-table-row&]:bg-(--table-selection-color)',
            '[.rt-table-row&:hover]:bg-(--table-hover-color)',
          ),
        className,
      )}
    >
      {selectable && (
        <TableCell className={checkboxCellClasses}>
          <Checkbox
            aria-label={selectLabel ?? `Select row ${value}`}
            checked={selected}
            disabled={selectionDisabled}
            onChange={(checked, event) => {
              onSelectionChange?.(checked, event);
              if (!event.defaultPrevented && value !== undefined) selection?.select(value, checked);
            }}
          />
        </TableCell>
      )}
      {children}
    </tr>
  );
}
export default TableRow;
