'use client';
import './tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { cn } from '../foundations/styles/cn';
import type { ListTheme } from './types';
import type { ComponentPropsWithRef, HTMLAttributes, ReactElement } from 'react';
export interface ListItemActionProps extends ComponentPropsWithRef<'span'> {
  action: ReactElement<Pick<HTMLAttributes<HTMLElement>, 'onClick' | 'onMouseDown'>>;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: ListTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: ListTheme;
}
export function ListItemAction({
  action,
  className,
  onClick: onWrapperClick,
  onMouseDown: onWrapperMouseDown,
  theme: legacyTheme,
  classNames,
  ...other
}: ListItemActionProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
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
        theme?.itemAction,
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
