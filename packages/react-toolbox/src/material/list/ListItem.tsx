'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useContext,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import { cn } from '../foundations/styles/cn';
import { useRipple, type RippleProps } from '../ripple';
import ListItemContent from './ListItemContent';
import ListItemLayout, { type ListItemLayoutOptions } from './ListItemLayout';
import { ListContext } from './context';
export interface ListItemProps extends ComponentPropsWithRef<'li'>, ListItemLayoutOptions, RippleProps {
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
  selectable: suppliedSelectable,
  primaryAction,
  theme: legacyTheme,
  classNames,
  to,
  onClick,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  ripple: suppliedRipple,
  rippleCentered = false,
  rippleClassName,
  rippleMultiple,
  rippleSpread,
  onRippleEnded,
  ...other
}: ListItemProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const list = useContext(ListContext);
  const selectable = suppliedSelectable ?? list?.selectable ?? false;
  const ripple = suppliedRipple ?? list?.ripple ?? false;
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
  const flatten = (nodes: ReactNode): ReactNode[] =>
    Children.toArray(nodes).flatMap((child) =>
      isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment
        ? flatten(child.props.children)
        : [child],
    );
  const childNodes = flatten(children);
  const hasContentPart = childNodes.some((child) => isValidElement(child) && child.type === ListItemContent);
  childNodes.forEach((child, index) => {
    if (!isValidElement<{ listItemIgnore?: boolean }>(child)) return;
    const clean = child.props.listItemIgnore ? cloneElement(child, { listItemIgnore: undefined }) : child;
    if (child.props.listItemIgnore) grouped.ignored.push(clean);
    else if (child.type === ListItemContent) grouped.content = clean;
    else if (hasContentPart)
      grouped[grouped.content ? 'right' : 'left'].push(cloneElement(clean, { key: child.key ?? index }));
  });
  const ordinaryChildren = childNodes.filter(
    (child) => !isValidElement<{ listItemIgnore?: boolean }>(child) || !child.props.listItemIgnore,
  );
  const childContent = hasContentPart ? (
    grouped.content
  ) : ordinaryChildren.length === 0 ? undefined : ordinaryChildren.every(
      (child) => typeof child === 'string' || typeof child === 'number',
    ) ? (
    <ListItemContent theme={theme} caption={caption ?? ordinaryChildren} legend={legend} />
  ) : !caption && !legend && ordinaryChildren.length === 1 ? (
    ordinaryChildren[0]
  ) : (
    <ListItemContent theme={theme} caption={caption} legend={legend}>
      {ordinaryChildren}
    </ListItemContent>
  );
  const content = (
    <ListItemLayout
      theme={theme}
      avatar={avatar}
      caption={caption}
      disabled={disabled}
      itemContent={itemContent ?? childContent}
      leftActions={leftActions ?? grouped.left}
      leftIcon={leftIcon}
      legend={legend}
      rightActions={rightActions ?? grouped.right}
      rightIcon={rightIcon}
      selectable={selectable}
      primaryAction={
        primaryAction ??
        (to ? (
          <a
            href={disabled ? undefined : to}
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : undefined}
          />
        ) : onClick ? (
          <button type="button" disabled={disabled} />
        ) : undefined)
      }
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
      onClickCapture={(event) => {
        if (disabled) {
          event.preventDefault();
          event.stopPropagation();
        } else other.onClickCapture?.(event);
      }}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          event.stopPropagation();
        } else if (!event.defaultPrevented) onClick?.(event);
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
      {content}
      {grouped.ignored}
      {ink.ripple}
    </li>
  );
}
export default ListItem;
