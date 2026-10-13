'use client';
import type { HTMLAttributes, ReactElement } from 'react';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
export interface ListItemActionProps {
  action: ReactElement<Pick<HTMLAttributes<HTMLElement>, 'onClick' | 'onMouseDown'>>;
  theme?: Partial<typeof defaultTheme>;
}
export function ListItemAction({ action, theme: suppliedTheme }: ListItemActionProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  const { onClick, onMouseDown } = action.props;
  return (
    <span
      className={theme.itemAction}
      onMouseDown={onClick && !onMouseDown ? (event) => event.stopPropagation() : undefined}
      onClick={onClick ? (event) => event.stopPropagation() : undefined}
    >
      {action}
    </span>
  );
}
export default ListItemAction;
