'use client';
import { checkboxCellClasses } from './styles';
import { cn } from '../utils/cn';
import type { TableTheme } from './types';
import { Children, cloneElement, isValidElement, type ComponentPropsWithRef } from 'react';
import Checkbox, { type CheckboxProps } from '../checkbox';
import TableCell, { type TableCellProps } from './TableCell';
export interface TableHeadProps extends Omit<ComponentPropsWithRef<'tr'>, 'onSelect'> {
  displaySelect?: boolean;
  multiSelectable?: boolean;
  onSelect?: CheckboxProps['onChange'];
  selectable?: boolean;
  selected?: boolean;
  theme?: TableTheme;
}
export function TableHead({
  children,
  displaySelect = true,
  multiSelectable,
  onSelect,
  selectable,
  selected,
  theme,
  ...other
}: TableHeadProps) {
  return (
    <tr {...other}>
      {selectable && (
        <TableCell className={cn(checkboxCellClasses, theme?.checkboxCell)} tagName="th">
          {displaySelect && <Checkbox checked={selected} disabled={!multiSelectable} onChange={onSelect} />}
        </TableCell>
      )}
      {Children.map(children, (child, column) =>
        isValidElement<TableCellProps>(child) ? cloneElement(child, { column, tagName: 'th' }) : child,
      )}
    </tr>
  );
}
export default TableHead;
