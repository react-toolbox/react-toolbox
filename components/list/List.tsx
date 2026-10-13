'use client';
import { Children, cloneElement, isValidElement, type ComponentPropsWithRef } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import ListItem, { type ListItemProps } from './ListItem';
import defaultTheme from './theme';
export interface ListProps extends ComponentPropsWithRef<'ul'> {
  ripple?: boolean;
  selectable?: boolean;
  theme?: Partial<typeof defaultTheme>;
}
export function List({
  children,
  className = '',
  ripple = false,
  selectable = false,
  theme: suppliedTheme,
  ...other
}: ListProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <ul {...other} data-react-toolbox="list" className={classnames(theme.list, className)}>
      {Children.map(children, (item) =>
        isValidElement<ListItemProps>(item) && item.type === ListItem
          ? cloneElement(item, {
              selectable: item.props.selectable ?? selectable,
              ripple: item.props.ripple ?? ripple,
            })
          : item,
      )}
    </ul>
  );
}
export default List;
