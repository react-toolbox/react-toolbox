'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { checkboxCellClasses } from './styles';
import { cn } from '../foundations/styles/cn';
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
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: TableTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: TableTheme;
}
export function TableHead({
  children,
  displaySelect = true,
  multiSelectable,
  onSelect,
  selectable,
  selected,
  theme: legacyTheme,
  classNames,
  ...other
}: TableHeadProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
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
