'use client';
import { Children, cloneElement, isValidElement, type ComponentPropsWithRef } from 'react';
import classnames from 'classnames';
import Checkbox from '../checkbox';
import { mergeTheme } from '../theming';
import TableCell, { type TableCellProps } from './TableCell';
import defaultTheme from './theme';
export interface TableRowProps extends Omit<ComponentPropsWithRef<'tr'>, 'onSelect'> {
  idx?: number;
  onSelect?: (index: number, selected: boolean) => void;
  selectable?: boolean;
  selected?: boolean;
  theme?: Partial<typeof defaultTheme>;
}
export function TableRow({
  children,
  className,
  idx = 0,
  onSelect,
  selectable,
  selected,
  theme: suppliedTheme,
  ...other
}: TableRowProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <tr
      {...other}
      className={classnames(theme.row, { [theme.selected]: selectable && selected }, className)}
    >
      {selectable && (
        <TableCell className={theme.checkboxCell}>
          <Checkbox checked={selected} onChange={(value) => onSelect?.(idx, value)} />
        </TableCell>
      )}
      {Children.map(children, (child, column) =>
        isValidElement<TableCellProps>(child)
          ? cloneElement(child, { column, tagName: 'td' })
          : child,
      )}
    </tr>
  );
}
export default TableRow;
