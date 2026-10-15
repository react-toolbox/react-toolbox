'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { iconClasses } from './styles';
import type { MenuTheme } from './types';

import {
  useImperativeHandle,
  useContext,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react';
import { cn } from '../foundations/styles/cn';
import { FontIcon } from '../font-icon';
import { useRipple } from '../ripple';
import { MenuContext } from './context';

export type MenuItemTheme = MenuTheme;
export type MenuItemEvent = MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>;
export interface MenuItemHandle<Value = unknown> {
  readonly node: HTMLLIElement | null;
  readonly value: Value | undefined;
}
export interface MenuItemProps<Value = unknown> extends Omit<HTMLAttributes<HTMLLIElement>, 'onClick'> {
  caption?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  selected?: boolean;
  /** Keep the menu open for repeated selections. */
  closeOnSelect?: boolean;
  /** Typeahead text when the caption is custom JSX. */
  textValue?: string;
  shortcut?: ReactNode;
  value?: Value;
  ripple?: boolean;
  onClick?: (event: MenuItemEvent, item: MenuItemHandle<Value>) => void;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: MenuItemTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: MenuItemTheme;
  ref?: Ref<MenuItemHandle<Value>>;
}
export function MenuItem<Value = unknown>({
  caption,
  children,
  className,
  disabled = false,
  icon,
  selected: suppliedSelected,
  closeOnSelect = true,
  textValue,
  shortcut,
  value,
  ripple: suppliedRipple,
  onClick,
  onKeyDown,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  theme: legacyTheme,
  classNames,
  ref,
  ...attributes
}: MenuItemProps<Value>) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const menu = useContext(MenuContext);
  const selected = suppliedSelected ?? (value !== undefined && menu?.selectable && value === menu.selected) ?? false;
  const role = attributes.role ?? (menu?.selectable && value !== undefined ? 'menuitemradio' : 'menuitem');
  const ripple = suppliedRipple ?? menu?.ripple ?? true;
  const node = useRef<HTMLLIElement>(null);
  const handle: MenuItemHandle<Value> = {
    get node() {
      return node.current;
    },
    value,
  };
  useImperativeHandle(ref, () => handle, [value]);
  const ink = useRipple({
    disabled,
    ripple,
    theme: {
      ripple: cn('rt-menu-ripple', '[.rt-menu-menuItem_&]:text-(--rt-color-text-secondary)', theme?.ripple),
    },
  });
  const click = (event: MenuItemEvent) => {
    if (disabled || event.defaultPrevented) return;
    onClick?.(event, handle);
    if (!event.defaultPrevented) menu?.select(value, closeOnSelect);
  };
  return (
    <li
      {...attributes}
      ref={node}
      data-react-toolbox="menu-item"
      role={role}
      data-text-value={textValue}
      aria-disabled={disabled || undefined}
      aria-checked={
        role === 'menuitemradio' || role === 'menuitemcheckbox' ? (attributes['aria-checked'] ?? selected) : undefined
      }
      tabIndex={disabled ? -1 : (attributes.tabIndex ?? (menu ? -1 : 0))}
      className={cn(
        'rt-menu-menuItem',
        'items-center text-(--rt-color-text) flex text-(length:--menu-item-font-size) h-(--menu-item-height) overflow-hidden p-[0_var(--menu-item-padding)] relative',
        '[&:not(.rt-menu-disabled):hover]:bg-(--menu-item-hover-background) [&:not(.rt-menu-disabled):hover]:cursor-pointer',
        '[&:not(.rt-menu-disabled):focus-visible]:bg-(--menu-item-hover-background) [&:not(.rt-menu-disabled):focus-visible]:[outline:2px_solid_currentColor] [&:not(.rt-menu-disabled):focus-visible]:-outline-offset-2',
        theme?.menuItem,
        selected &&
          cn(
            'rt-menu-selected',
            '[.rt-menu-menuItem&]:bg-(--menu-item-selected-background) [.rt-menu-menuItem&]:[font-weight:500]',
            theme?.selected,
          ),
        disabled &&
          cn(
            'rt-menu-disabled',
            '[.rt-menu-menuItem&]:opacity-[0.5] [.rt-menu-menuItem&]:pointer-events-none',
            theme?.disabled,
          ),
        className,
      )}
      onClick={click}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && !disabled && (event.key === 'Enter' || event.key === ' ')) {
          click(event);
          event.preventDefault();
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
      {icon ? <FontIcon aria-hidden="true" value={icon} className={cn(iconClasses, theme?.icon)} /> : null}
      <span className={cn('rt-menu-caption', 'grow text-(length:--font-size-normal)', theme?.caption)}>{caption}</span>
      {shortcut ? (
        <small className={cn('rt-menu-shortcut', 'ml-(--menu-item-padding)', theme?.shortcut)}>{shortcut}</small>
      ) : null}
      {children}
      {ink.ripple}
    </li>
  );
}
export default MenuItem;

/** Style slots for the component. */
export type MenuItemClassNames = MenuItemTheme;
