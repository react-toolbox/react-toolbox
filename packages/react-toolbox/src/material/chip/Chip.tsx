'use client';
import './tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { ChipTheme } from './types';

import React, { useRef } from 'react';
import { cn } from '../foundations/styles/cn';
import Avatar from '../avatar/Avatar';
export type { ChipTheme, ChipClassNames } from './types';
export type ChipEvent = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
export interface ChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  deletable?: boolean;
  deleteLabel?: string;
  disabled?: boolean;
  onClick?: (event: ChipEvent) => void;
  onDeleteClick?: (event: ChipEvent) => void;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: ChipTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
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
  theme: legacyTheme,
  classNames,
  ...other
}: ChipProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const primary = useRef<HTMLButtonElement>(null);
  let hasAvatar = false;
  if (React.Children.count(children)) {
    const flatChildren = React.Children.toArray(children);
    const firstChild = flatChildren[0];
    hasAvatar = React.isValidElement(firstChild) && firstChild.type === Avatar;
  }

  const classes = cn(
    'rt-chip-chip',
    'bg-(--chip-background) rounded-(--chip-height) text-(--chip-color) inline-block text-(length:--chip-font-size) leading-(--chip-height) me-(--chip-margin-right) max-w-full overflow-hidden p-[0_var(--chip-padding)] relative text-ellipsis whitespace-nowrap',
    materialRoot,
    materialDescendants,
    '[&:focus-visible]:[outline:2px_solid_var(--rt-color-primary)] [&:focus-visible]:outline-offset-2',
    theme?.chip,
    !!deletable &&
      cn('rt-chip-deletable', 'pe-[calc(var(--chip-remove-size)+2*var(--chip-remove-margin))]', theme?.deletable),
    "[&:has([data-react-toolbox='avatar'])]:text-(length:--font-size-small) [&:has([data-react-toolbox='avatar'])]:ps-0",
    "[&_[data-react-toolbox='avatar']]:h-(--chip-height) [&_[data-react-toolbox='avatar']]:me-(--chip-icon-margin-right) [&_[data-react-toolbox='avatar']]:align-middle [&_[data-react-toolbox='avatar']]:w-(--chip-height)",
    "[&_[data-react-toolbox='avatar']>span]:text-(length:--chip-icon-font-size) [&_[data-react-toolbox='avatar']>span]:leading-(--chip-height)",
    !!hasAvatar && cn('rt-chip-avatar', 'text-(length:--font-size-small) ps-0', theme?.avatar),
    className,
  );

  return (
    <div
      {...other}
      data-react-toolbox="chip"
      className={classes}
      tabIndex={onClick ? undefined : (tabIndex ?? (!disabled && deletable ? 0 : undefined))}
      role={other.role || (deletable ? 'group' : undefined)}
      aria-disabled={disabled || undefined}
      onKeyDown={(event) => {
        if (onKeyDown) onKeyDown(event);
        if (
          event.defaultPrevented ||
          disabled ||
          (event.target !== event.currentTarget && event.target !== primary.current)
        )
          return;
        if (deletable && (event.key === 'Delete' || event.key === 'Backspace')) {
          event.preventDefault();
          if (onDeleteClick) onDeleteClick(event);
        }
      }}
    >
      {onClick ? (
        <button
          ref={primary}
          type="button"
          disabled={disabled}
          tabIndex={disabled ? -1 : tabIndex}
          aria-label={other['aria-label']}
          aria-labelledby={other['aria-labelledby']}
          aria-describedby={other['aria-describedby']}
          className="inline-block max-w-full border-0 bg-transparent p-0 text-inherit [font:inherit] leading-[inherit] text-start cursor-pointer disabled:cursor-default focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--rt-color-primary)"
          onClick={onClick}
        >
          {children}
        </button>
      ) : typeof children === 'string' ? (
        <span>{children}</span>
      ) : (
        children
      )}
      {deletable ? (
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'rt-chip-delete',
            'cursor-pointer inline-block h-(--chip-remove-size) m-(--chip-remove-margin) p-(--chip-remove-margin) absolute end-0 top-0 w-(--chip-remove-size) border-0 bg-transparent text-inherit [font:inherit] disabled:cursor-default',
            '[&:focus-visible]:[outline:2px_solid_var(--rt-color-primary)] [&:focus-visible]:outline-offset-2',
            theme?.delete,
          )}
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
        </button>
      ) : null}
    </div>
  );
}

export default Chip;
