'use client';
import './tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { cn } from '../foundations/styles/cn';
import type { ListTheme } from './types';
import { Children, isValidElement, type ComponentPropsWithRef } from 'react';
import ListItemAction, { type ListItemActionProps } from './ListItemAction';
export interface ListItemActionsProps extends ComponentPropsWithRef<'span'> {
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: ListTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: ListTheme;
  type: 'left' | 'right';
}
export function ListItemActions({
  type,
  children,
  className,
  theme: legacyTheme,
  classNames,
  ...other
}: ListItemActionsProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
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
              theme?.left,
            )
          : type === 'right'
            ? cn(
                'rt-list-right',
                '[&>:last-child]:me-0',
                '[&>:first-child]:ms-(--list-horizontal-padding)',
                'items-center flex flex-[0_0_auto]',
                theme?.right,
              )
            : undefined,
        className,
      )}
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
