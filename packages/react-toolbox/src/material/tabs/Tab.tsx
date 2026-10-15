'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { activeClasses } from './styles';
import type { TabsTheme } from './types';

import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react';
import { cn } from '../foundations/styles/cn';
import { useRipple } from '../ripple';
import { FontIcon } from '../font-icon';

export type TabTheme = TabsTheme;
export type TabEvent = MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>;
export interface TabProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  active?: boolean;
  activeClassName?: string;
  disabled?: boolean;
  icon?: ReactNode;
  index?: number;
  label?: ReactNode;
  onActive?: () => void;
  onClick?: (event: TabEvent, index?: number) => void;
  ripple?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: TabTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: TabTheme;
  ref?: Ref<HTMLDivElement>;
}
export function Tab({
  active = false,
  activeClassName,
  children,
  className,
  disabled = false,
  hidden = false,
  label,
  icon,
  index,
  onActive,
  onClick,
  onKeyDown,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  ripple = true,
  theme: legacyTheme,
  classNames,
  ref,
  ...attributes
}: TabProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const previousActive = useRef(active);
  useEffect(() => {
    if (!previousActive.current && active) onActive?.();
    previousActive.current = active;
  }, [active, onActive]);
  const ink = useRipple({
    centered: false,
    disabled: disabled || hidden,
    ripple,
    theme: { rippleWrapper: cn('rt-tabs-rippleWrapper', '[.rt-tabs-label>&]:overflow-hidden', theme?.rippleWrapper) },
  });
  const click = (event: TabEvent) => {
    if (!disabled && !hidden) onClick?.(event, index);
  };
  return (
    <div
      {...attributes}
      ref={ref}
      data-react-toolbox="tab"
      role="tab"
      aria-selected={active}
      aria-disabled={disabled || undefined}
      aria-hidden={hidden || undefined}
      tabIndex={disabled || hidden ? -1 : (attributes.tabIndex ?? (active ? 0 : -1))}
      className={cn(
        'rt-tabs-label',
        'text-(--tab-text-inactive-color) text-(length:--tab-text-height) font-(--font-weight-semi-bold) leading-none p-[var(--tab-label-v-padding)_var(--tab-label-h-padding)] relative uppercase [transition-duration:var(--animation-duration)] [transition-property:background-color,box-shadow,color] [transition-timing-function:var(--animation-curve-default)]',
        '[&:focus]:bg-(--tab-focus-color) [&:focus]:[outline:none]',
        '[&:focus-visible]:[outline:2px_solid_currentColor] [&:focus-visible]:-outline-offset-2',
        '[&:not(.rt-tabs-disabled)]:cursor-pointer',
        '[.rt-tabs-fixed_&]:flex-1 [.rt-tabs-fixed_&]:text-center',
        '[.rt-tabs-inverse_&]:text-(--tab-inverse-text-inactive-color)',
        theme?.label,
        active && cn(activeClasses, theme?.active),
        hidden && cn('rt-tabs-hidden', '[.rt-tabs-label&]:hidden', theme?.hidden),
        Boolean(label) &&
          cn(
            'rt-tabs-withText',
            '[.rt-tabs-label.rt-tabs-withIcon&]:pt-[calc(0.8*var(--unit))] [.rt-tabs-label.rt-tabs-withIcon&]:pb-[calc(1.6*var(--unit))]',
            theme?.withText,
          ),
        Boolean(icon) &&
          cn(
            'rt-tabs-withIcon',
            '[.rt-tabs-label&]:pb-[calc((var(--tab-label-height)-var(--tab-icon-height))/2)] [.rt-tabs-label&]:pt-[calc((var(--tab-label-height)-var(--tab-icon-height))/2)] [.rt-tabs-label&]:text-center',
            theme?.withIcon,
          ),
        disabled && cn('rt-tabs-disabled', '[.rt-tabs-label&]:opacity-(--tab-label-disabled-opacity)', theme?.disabled),
        active && activeClassName,
        className,
      )}
      onClick={click}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && (event.key === 'Enter' || event.key === ' ')) {
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
      {icon && (
        <FontIcon
          className={cn(
            'rt-tabs-icon',
            'block h-(--tab-icon-height) leading-(--tab-icon-height) m-[0_auto]',
            '[.rt-tabs-label.rt-tabs-withText_&]:mb-(--tab-icon-margin-bottom)',
            theme?.icon,
          )}
          value={icon}
        />
      )}
      {label}
      {children}
      {ink.ripple}
    </div>
  );
}
export default Tab;

/** Style slots for the component. */
export type TabClassNames = TabTheme;
