'use client';

import { checkboxCellClasses } from './styles';
import { useContext, type ComponentPropsWithRef } from 'react';
import Checkbox, { type CheckboxProps } from '../checkbox';
import { TableSelectionContext, TableCellContext } from './selection';
import TableCell from './TableCell';
export interface TableHeadProps extends ComponentPropsWithRef<'tr'> {
  displaySelect?: boolean;
  /** Cancel the event to prevent a bulk selection change. */
  onSelectionChange?: CheckboxProps['onChange'];
  selectLabel?: string;
}
export function TableHead({
  children,
  displaySelect = true,
  onSelectionChange,
  selectLabel = 'Select all rows',
  ...other
}: TableHeadProps) {
  const selection = useContext(TableSelectionContext);
  const values = selection ? [...selection.rows].filter(([, disabled]) => !disabled).map(([key]) => key) : [];
  const count = values.filter((key) => selection?.selected.includes(key)).length;
  const selectable = Boolean(selection && selection.mode !== 'none');
  const multiple = selection?.mode === 'multiple';
  const selected = values.length > 0 && count === values.length;
  const indeterminate = count > 0 && count < values.length;
  return (
    <TableCellContext value="th">
      <tr {...other}>
        {selectable && (
          <TableCell className={checkboxCellClasses} tagName="th">
            {displaySelect && (
              <Checkbox
                aria-label={selectLabel}
                checked={selected}
                indeterminate={indeterminate}
                disabled={!multiple || values.length === 0}
                onChange={(checked, event) => {
                  onSelectionChange?.(checked, event);
                  if (!event.defaultPrevented) selection?.selectAll(checked);
                }}
              />
            )}
          </TableCell>
        )}
        {children}
      </tr>
    </TableCellContext>
  );
}
export default TableHead;
