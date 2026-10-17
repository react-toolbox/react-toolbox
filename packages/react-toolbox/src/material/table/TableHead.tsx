'use client';

import { checkboxCellClasses } from './styles';
import { cn } from '../foundations/styles/cn';
import type { TableClassNames } from './types';
import {
  useContext,
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import Checkbox, { type CheckboxProps } from '../checkbox';
import { TableSelectionContext, TableCellContext } from './selection';
import TableCell, { type TableCellProps } from './TableCell';
export interface TableHeadProps extends Omit<ComponentPropsWithRef<'tr'>, 'onSelect'> {
  displaySelect?: boolean;
  multiSelectable?: boolean;
  onSelect?: CheckboxProps['onChange'];
  selectable?: boolean;
  selected?: boolean;
  indeterminate?: boolean;
  selectLabel?: string;
  /** Classes for the component's rendered parts. */
  classNames?: TableClassNames;
}
export function TableHead({
  children,
  displaySelect = true,
  multiSelectable: suppliedMulti,
  onSelect,
  selectable: suppliedSelectable,
  selected: suppliedSelected,
  indeterminate: suppliedIndeterminate,
  selectLabel = 'Select all rows',
  classNames,
  ...other
}: TableHeadProps) {
  const selection = useContext(TableSelectionContext);
  const values = selection ? [...selection.rows].filter(([, disabled]) => !disabled).map(([key]) => key) : [];
  const count = values.filter((key) => selection?.selected.includes(key)).length;
  const selectable = suppliedSelectable ?? (selection ? selection.mode !== 'none' : undefined);
  const multiSelectable = suppliedMulti ?? selection?.mode === 'multiple';
  const selected = suppliedSelected ?? (values.length > 0 && count === values.length);
  const indeterminate = suppliedIndeterminate ?? (count > 0 && count < values.length);
  let column = 0;
  const cells = (children: ReactNode): ReactNode =>
    Children.map(children, (child) => {
      if (!isValidElement<TableCellProps>(child)) return child;
      if (child.type === Fragment) return cloneElement(child, {}, cells(child.props.children));
      const currentColumn = column++;
      return child.type === TableCell
        ? cloneElement(child, { column: currentColumn, tagName: child.props.tagName ?? 'th' })
        : child;
    });
  return (
    <TableCellContext value="th">
      <tr {...other}>
        {selectable && (
          <TableCell className={cn(checkboxCellClasses, classNames?.checkboxCell)} tagName="th">
            {displaySelect && (
              <Checkbox
                aria-label={selectLabel}
                checked={selected}
                indeterminate={indeterminate}
                disabled={!multiSelectable || Boolean(selection && values.length === 0)}
                onChange={(checked, event) => {
                  onSelect?.(checked, event);
                  if (!event.defaultPrevented) selection?.selectAll(checked);
                }}
              />
            )}
          </TableCell>
        )}
        {cells(children)}
      </tr>
    </TableCellContext>
  );
}
export default TableHead;
