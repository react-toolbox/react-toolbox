'use client';
import { cn } from '../utils/cn';
import type { ListTheme } from './types';
import { Children, isValidElement, type ReactNode } from 'react';
import ListItemAction, { type ListItemActionProps } from './ListItemAction';
export interface ListItemActionsProps {
  children?: ReactNode;
  theme?: ListTheme;
  type: 'left' | 'right';
}
export function ListItemActions({ type, children, theme }: ListItemActionsProps) {
  return (
    <span
      className={
        type === 'left'
          ? cn(
              'rt-list-left',
              "[&_[data-react-toolbox='font-icon']]:w-[var(--list-item-icon-size)]",
              "[&_:last-child>[data-react-toolbox='font-icon']]:mr-[var(--list-item-right-icon-margin)]",
              'items-center flex [flex:0_0_auto]',
              theme?.left,
            )
          : type === 'right'
            ? cn(
                'rt-list-right',
                '[&>:last-child]:mr-0',
                '[&>:first-child]:ml-[var(--list-horizontal-padding)]',
                'items-center flex [flex:0_0_auto]',
                theme?.right,
              )
            : undefined
      }
    >
      {Children.toArray(children).map((action, index) =>
        isValidElement<ListItemActionProps['action']['props']>(action) ? (
          <ListItemAction key={action.key ?? index} theme={theme} action={action} />
        ) : null,
      )}
    </span>
  );
}
export default ListItemActions;
