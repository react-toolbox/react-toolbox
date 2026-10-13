'use client';
import type { ComponentPropsWithRef, MouseEvent } from 'react';
import classnames from 'classnames';
import FontIcon from '../font_icon';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
export interface TableCellProps extends Omit<ComponentPropsWithRef<'th'>, 'onClick'> {
  column?: number;
  numeric?: boolean;
  onClick?: (event: MouseEvent<HTMLTableCellElement>, column?: number, row?: number) => void;
  row?: number;
  sorted?: 'asc' | 'desc';
  tagName?: 'td' | 'th';
  theme?: Partial<typeof defaultTheme> & { tableCell?: string };
}
export function TableCell({
  children,
  className = '',
  column,
  numeric = false,
  onClick,
  row,
  sorted,
  tagName: Tag = 'td',
  theme: suppliedTheme,
  ...other
}: TableCellProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <Tag
      {...other}
      className={classnames(
        suppliedTheme?.tableCell,
        {
          [theme.headCell]: Tag === 'th',
          [theme.rowCell]: Tag === 'td',
          [theme.sorted]: sorted,
          [theme.numeric]: numeric,
        },
        className,
      )}
      onClick={(event) => onClick?.(event, column, row)}
    >
      {sorted && (
        <FontIcon
          className={classnames(theme.sortIcon, { [theme.asc]: sorted === 'asc' })}
          value="arrow_downward"
        />
      )}
      {children}
    </Tag>
  );
}
export default TableCell;
