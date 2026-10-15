'use client';

import React from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import Avatar from '../avatar/Avatar';
import defaults from './theme';
export type ChipTheme = Partial<typeof defaults>;
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
  theme: overrides,
  ...other
}: ChipProps) {
  const theme = mergeTheme(defaults, overrides);
  let hasAvatar = false;
  if (React.Children.count(children)) {
    const flatChildren = React.Children.toArray(children);
    const firstChild = flatChildren[0];
    hasAvatar = React.isValidElement(firstChild) && firstChild.type === Avatar;
  }

  const classes = classnames(
    theme.chip,
    {
      [theme.deletable]: !!deletable,
      [theme.avatar]: !!hasAvatar,
    },
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
          className={theme.delete}
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
            className={theme.deleteIcon}
            aria-hidden="true"
            focusable="false"
          >
            <path className={theme.deleteX} d="M 12,12 L 28,28 M 28,12 L 12,28" />
          </svg>
        </span>
      ) : null}
    </div>
  );
}

export default Chip;
