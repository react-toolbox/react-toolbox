'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { Children, cloneElement, isValidElement, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cn } from '../foundations/styles/cn';
import { useRipple, type RippleProps } from '../ripple';
import ListItemContent from './ListItemContent';
import ListItemLayout, { type ListItemLayoutProps } from './ListItemLayout';
export interface ListItemProps extends ComponentPropsWithRef<'li'>, ListItemLayoutProps, RippleProps {
  to?: string;
}
export function ListItem({
  avatar,
  caption,
  children,
  className = '',
  disabled = false,
  itemContent,
  leftActions,
  leftIcon,
  legend,
  rightActions,
  rightIcon,
  selectable,
  theme: legacyTheme,
  classNames,
  to,
  onClick,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  ripple = false,
  rippleCentered = false,
  rippleClassName,
  rippleMultiple,
  rippleSpread,
  onRippleEnded,
  ...other
}: ListItemProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const ink = useRipple({
    disabled,
    centered: rippleCentered,
    className: rippleClassName,
    multiple: rippleMultiple,
    spread: rippleSpread,
    theme: {
      ripple: cn('rt-list-ripple', '[.rt-list-listItem_&]:text-(--rt-color-text-secondary)', theme?.ripple),
    },
    ripple,
    onRippleEnded,
  });
  const grouped: {
    left: ReactNode[];
    right: ReactNode[];
    ignored: ReactNode[];
    content?: ReactNode;
  } = { left: [], right: [], ignored: [] };
  Children.forEach(children, (child, index) => {
    if (!isValidElement<{ listItemIgnore?: boolean }>(child)) return;
    const clean = child.props.listItemIgnore ? cloneElement(child, { listItemIgnore: undefined }) : child;
    if (child.props.listItemIgnore) grouped.ignored.push(clean);
    else if (child.type === ListItemContent) grouped.content = clean;
    else grouped[grouped.content ? 'right' : 'left'].push(cloneElement(clean, { key: child.key ?? index }));
  });
  const content = (
    <ListItemLayout
      theme={theme}
      avatar={avatar}
      caption={caption}
      disabled={disabled}
      itemContent={itemContent ?? grouped.content}
      leftActions={leftActions ?? grouped.left}
      leftIcon={leftIcon}
      legend={legend}
      rightActions={rightActions ?? grouped.right}
      rightIcon={rightIcon}
      selectable={selectable}
    />
  );
  return (
    <li
      {...other}
      className={cn(
        'rt-list-listItem',
        'relative',
        "[&>[data-react-toolbox='ripple']]:overflow-hidden",
        theme?.listItem,
        className,
      )}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          event.stopPropagation();
        } else onClick?.(event);
      }}
      onMouseDown={(event) => {
        onMouseDown?.(event);
        ink.onMouseDown(event);
      }}
      onTouchStart={(event) => {
        onTouchStart?.(event);
        ink.onTouchStart(event);
      }}
      onTouchEnd={(event) => {
        onTouchEnd?.(event);
        ink.onTouchEnd(event);
      }}
      onTouchCancel={(event) => {
        onTouchCancel?.(event);
        ink.onTouchCancel(event);
      }}
    >
      {to ? (
        <a href={to} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : undefined}>
          {content}
        </a>
      ) : (
        content
      )}
      {grouped.ignored}
      {ink.ripple}
    </li>
  );
}
export default ListItem;
