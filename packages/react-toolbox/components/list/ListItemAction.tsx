'use client';
import { cn } from '../utils/cn';
import type { ListTheme } from './types';
import type { HTMLAttributes, ReactElement } from 'react';
export interface ListItemActionProps {
  action: ReactElement<Pick<HTMLAttributes<HTMLElement>, 'onClick' | 'onMouseDown'>>;
  theme?: ListTheme;
}
export function ListItemAction({ action, theme }: ListItemActionProps) {
  const { onClick, onMouseDown } = action.props;
  return (
    <span
      className={cn(
        'rt-list-itemAction',
        'flex m-[var(--list-item-child-margin)_var(--list-horizontal-padding)_var(--list-item-child-margin)_0]',
        '[&>:not(button)]:p-0',
        "[&>[data-react-toolbox='font-icon']]:text-(--rt-color-text-secondary) [&>[data-react-toolbox='font-icon']]:text-(length:--list-item-icon-font-size)",
        "[.rt-list-item:has(.rt-list-itemContentRoot[data-line-count='3'])_&]:mt-[calc(1.6*var(--unit))]",
        theme?.itemAction,
      )}
      onMouseDown={onClick && !onMouseDown ? (event) => event.stopPropagation() : undefined}
      onClick={onClick ? (event) => event.stopPropagation() : undefined}
    >
      {action}
    </span>
  );
}
export default ListItemAction;
