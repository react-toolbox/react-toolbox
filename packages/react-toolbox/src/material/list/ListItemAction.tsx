'use client';
import './tokens.css';

import { cn } from '../foundations/styles/cn';
import type { ComponentPropsWithRef, HTMLAttributes, ReactElement } from 'react';
export interface ListItemActionProps extends ComponentPropsWithRef<'span'> {
  action: ReactElement<Pick<HTMLAttributes<HTMLElement>, 'onClick' | 'onMouseDown'>>;
}
export function ListItemAction({
  action,
  className,
  onClick: onWrapperClick,
  onMouseDown: onWrapperMouseDown,
  ...other
}: ListItemActionProps) {
  const { onClick, onMouseDown } = action.props;
  return (
    <span
      {...other}
      className={cn(
        'rt-list-itemAction',
        'flex my-(--list-item-child-margin) me-(--list-horizontal-padding) ms-0',
        '[&>:not(button)]:p-0',
        "[&>[data-react-toolbox='font-icon']]:text-(--rt-color-text-secondary) [&>[data-react-toolbox='font-icon']]:text-(length:--list-item-icon-font-size)",
        "[.rt-list-item:has(.rt-list-itemContentRoot[data-line-count='3'])_&]:mt-[calc(1.6*var(--unit))]",

        className,
      )}
      onMouseDown={(event) => {
        onWrapperMouseDown?.(event);
        if (onClick && !onMouseDown) event.stopPropagation();
      }}
      onClick={(event) => {
        onWrapperClick?.(event);
        if (onClick) event.stopPropagation();
      }}
    >
      {action}
    </span>
  );
}
export default ListItemAction;
