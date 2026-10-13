'use client';
import { Children, cloneElement, isValidElement, type ComponentPropsWithRef } from 'react';
import Checkbox, { type CheckboxProps } from '../checkbox';
import { mergeTheme } from '../theming';
import TableCell, { type TableCellProps } from './TableCell';
import defaultTheme from './theme';
export interface TableHeadProps extends Omit<ComponentPropsWithRef<'tr'>, 'onSelect'> {
  displaySelect?: boolean;
  multiSelectable?: boolean;
  onSelect?: CheckboxProps['onChange'];
  selectable?: boolean;
  selected?: boolean;
  theme?: Partial<typeof defaultTheme>;
}
export function TableHead({
  children,
  displaySelect = true,
  multiSelectable,
  onSelect,
  selectable,
  selected,
  theme: suppliedTheme,
  ...other
}: TableHeadProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <tr {...other}>
      {selectable && (
        <TableCell className={theme.checkboxCell} tagName="th">
          {displaySelect && (
            <Checkbox checked={selected} disabled={!multiSelectable} onChange={onSelect} />
          )}
        </TableCell>
      )}
      {Children.map(children, (child, column) =>
        isValidElement<TableCellProps>(child)
          ? cloneElement(child, { column, tagName: 'th' })
          : child,
      )}
    </tr>
  );
}
export default TableHead;
