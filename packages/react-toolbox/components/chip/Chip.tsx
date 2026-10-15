'use client';
import { materialRoot, materialDescendants } from '../utils/styles';
import type { ChipTheme } from './types';

import React from 'react';
import { cn } from '../utils/cn';
import Avatar from '../avatar/Avatar';
export type { ChipTheme } from './types';
export type ChipEvent = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
export interface ChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  deletable?: boolean;
  deleteLabel?: string;
  disabled?: boolean;
  onClick?: (event: ChipEvent) => void;
  onDeleteClick?: (event: ChipEvent) => void;
  theme?: ChipTheme;
  ref?: React.Ref<HTMLDivElement>;
}
export function Chip({
  children,
  className = '',
  deletable = false,
  deleteLabel = 'Remove',
  disabled = false,
  onClick,
  onDeleteClick,
  onKeyDown,
  tabIndex,
  theme,
  ...other
}: ChipProps) {
  let hasAvatar = false;
  if (React.Children.count(children)) {
    const flatChildren = React.Children.toArray(children);
    const firstChild = flatChildren[0];
    hasAvatar = React.isValidElement(firstChild) && firstChild.type === Avatar;
  }

  const classes = cn(
    'rt-chip-chip',
    'bg-(--chip-background) rounded-(--chip-height) text-(--chip-color) inline-block text-(length:--chip-font-size) leading-(--chip-height) mr-(--chip-margin-right) max-w-full overflow-hidden p-[0_var(--chip-padding)] relative text-ellipsis whitespace-nowrap',
    materialRoot,
    materialDescendants,
    '[&:focus-visible]:[outline:2px_solid_var(--rt-color-primary)] [&:focus-visible]:outline-offset-2',
    theme?.chip,
    !!deletable &&
      cn('rt-chip-deletable', 'pr-[calc(var(--chip-remove-size)+2*var(--chip-remove-margin))]', theme?.deletable),
    !!hasAvatar &&
      cn(
        'rt-chip-avatar',
        'text-(length:--font-size-small) pl-0',
        "[&>[data-react-toolbox='avatar']]:h-(--chip-height) [&>[data-react-toolbox='avatar']]:mr-(--chip-icon-margin-right) [&>[data-react-toolbox='avatar']]:align-middle [&>[data-react-toolbox='avatar']]:w-(--chip-height)",
        "[&>[data-react-toolbox='avatar']>span]:text-(length:--chip-icon-font-size) [&>[data-react-toolbox='avatar']>span]:leading-(--chip-height)",
        theme?.avatar,
      ),
    className,
  );

  return (
    <div
      {...other}
      data-react-toolbox="chip"
      className={classes}
      tabIndex={tabIndex ?? (!disabled && (deletable || onClick) ? 0 : undefined)}
      role={other.role || (deletable ? 'group' : onClick ? 'button' : undefined)}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(event) => {
        if (onKeyDown) onKeyDown(event);
        if (event.defaultPrevented || disabled || event.target !== event.currentTarget) return;
        if (deletable && (event.key === 'Delete' || event.key === 'Backspace')) {
          event.preventDefault();
          if (onDeleteClick) onDeleteClick(event);
        } else if (onClick && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onClick(event);
        }
      }}
    >
      {typeof children === 'string' ? <span>{children}</span> : children}
      {deletable ? (
        <span
          className={cn(
            'rt-chip-delete',
            'cursor-pointer inline-block h-(--chip-remove-size) m-(--chip-remove-margin) p-(--chip-remove-margin) absolute right-0 w-(--chip-remove-size)',
            '[&:focus-visible]:[outline:2px_solid_var(--rt-color-primary)] [&:focus-visible]:outline-offset-2',
            theme?.delete,
          )}
          role="button"
          aria-label={deleteLabel}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
          onClick={(event) => {
            event.stopPropagation();
            if (!disabled && onDeleteClick) onDeleteClick(event);
          }}
          onKeyDown={(event) => {
            if (!disabled && ['Enter', ' ', 'Delete', 'Backspace'].includes(event.key)) {
              event.preventDefault();
              event.stopPropagation();
              if (onDeleteClick) onDeleteClick(event);
            }
          }}
        >
          <svg
            viewBox="0 0 40 40"
            className={cn(
              'rt-chip-deleteIcon',
              '[background:var(--chip-remove-background)] rounded-(--chip-remove-size) align-top',
              '[.rt-chip-delete:hover_&]:[background:var(--chip-remove-background-hover)]',
              theme?.deleteIcon,
            )}
            aria-hidden="true"
            focusable="false"
          >
            <path
              className={cn(
                'rt-chip-deleteX',
                '[.rt-chip-deleteIcon_&]:fill-transparent [.rt-chip-deleteIcon_&]:stroke-(--chip-remove-color) [.rt-chip-deleteIcon_&]:[stroke-width:var(--chip-remove-stroke-width)]',
                theme?.deleteX,
              )}
              d="M 12,12 L 28,28 M 28,12 L 12,28"
            />
          </svg>
        </span>
      ) : null}
    </div>
  );
}

export default Chip;
