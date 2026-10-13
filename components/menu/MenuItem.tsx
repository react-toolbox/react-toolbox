'use client';

import {
  useImperativeHandle,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import { FontIcon } from '../font_icon';
import { useRipple } from '../ripple';
import defaults from './theme';

export type MenuItemTheme = Partial<typeof defaults>;
export type MenuItemEvent = MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>;
export interface MenuItemHandle<Value = unknown> {
  readonly node: HTMLLIElement | null;
  readonly value: Value | undefined;
}
export interface MenuItemProps<Value = unknown> extends Omit<
  HTMLAttributes<HTMLLIElement>,
  'onClick'
> {
  caption?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  selected?: boolean;
  shortcut?: ReactNode;
  value?: Value;
  ripple?: boolean;
  onClick?: (event: MenuItemEvent, item: MenuItemHandle<Value>) => void;
  theme?: MenuItemTheme;
  ref?: Ref<MenuItemHandle<Value>>;
}
export function MenuItem<Value = unknown>({
  caption,
  children,
  className,
  disabled = false,
  icon,
  selected = false,
  shortcut,
  value,
  ripple = true,
  onClick,
  onKeyDown,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  theme: overrides,
  ref,
  ...attributes
}: MenuItemProps<Value>) {
  const theme = mergeTheme(defaults, overrides);
  const node = useRef<HTMLLIElement>(null);
  const handle: MenuItemHandle<Value> = {
    get node() {
      return node.current;
    },
    value,
  };
  useImperativeHandle(ref, () => handle, [value]);
  const ink = useRipple({ disabled, ripple, theme });
  const click = (event: MenuItemEvent) => {
    if (!disabled) onClick?.(event, handle);
  };
  return (
    <li
      {...attributes}
      ref={node}
      data-react-toolbox="menu-item"
      role={attributes.role || 'menuitem'}
      aria-disabled={disabled || undefined}
      aria-checked={attributes.role === 'menuitemradio' ? selected : undefined}
      tabIndex={disabled ? -1 : (attributes.tabIndex ?? 0)}
      className={classnames(
        theme.menuItem,
        selected && theme.selected,
        disabled && theme.disabled,
        className,
      )}
      onClick={click}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && !disabled && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          click(event);
        }
      }}
      onMouseDown={(event) => {
        onMouseDown?.(event);
        if (!event.defaultPrevented) ink.onMouseDown(event);
      }}
      onTouchStart={(event) => {
        onTouchStart?.(event);
        if (!event.defaultPrevented) ink.onTouchStart(event);
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
      {icon ? <FontIcon value={icon} className={theme.icon} /> : null}
      <span className={theme.caption}>{caption}</span>
      {shortcut ? <small className={theme.shortcut}>{shortcut}</small> : null}
      {children}
      {ink.ripple}
    </li>
  );
}
export default MenuItem;
