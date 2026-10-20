'use client';
import './tokens.css';

import { cn } from '../foundations/styles/cn';
import { Children, isValidElement, type ComponentPropsWithRef } from 'react';
import ListItemAction, { type ListItemActionProps } from './ListItemAction';
export interface ListItemActionsProps extends ComponentPropsWithRef<'span'> {
  type: 'left' | 'right';
}
export function ListItemActions({ type, children, className, ...other }: ListItemActionsProps) {
  return (
    <span
      {...other}
      className={cn(
        type === 'left'
          ? cn(
              'rt-list-left',
              "[&_[data-react-toolbox='font-icon']]:w-(--list-item-icon-size)",
              "[&_:last-child>[data-react-toolbox='font-icon']]:me-(--list-item-right-icon-margin)",
              'items-center flex flex-[0_0_auto]',
            )
          : type === 'right'
            ? cn(
                'rt-list-right',
                '[&>:last-child]:me-0',
                '[&>:first-child]:ms-(--list-horizontal-padding)',
                'items-center flex flex-[0_0_auto]',
              )
            : undefined,
        className,
      )}
    >
      {Children.toArray(children).map((action, index) =>
        isValidElement<ListItemActionProps['action']['props']>(action) ? (
          <ListItemAction key={action.key ?? index} action={action} />
        ) : null,
      )}
    </span>
  );
}
export default ListItemActions;
