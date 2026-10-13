'use client';
import { Children, isValidElement, type ReactNode } from 'react';
import { mergeTheme } from '../theming';
import ListItemAction, { type ListItemActionProps } from './ListItemAction';
import defaultTheme from './theme';
export interface ListItemActionsProps {
  children?: ReactNode;
  theme?: Partial<typeof defaultTheme>;
  type: 'left' | 'right';
}
export function ListItemActions({ type, children, theme: suppliedTheme }: ListItemActionsProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <span className={theme[type]}>
      {Children.toArray(children).map((action, index) =>
        isValidElement<ListItemActionProps['action']['props']>(action) ? (
          <ListItemAction key={action.key ?? index} theme={theme} action={action} />
        ) : null,
      )}
    </span>
  );
}
export default ListItemActions;
