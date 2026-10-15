'use client';
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
import { cn } from '../utils/cn';
import { useRipple } from '../ripple';
import { FontIcon } from '../font_icon';

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
  theme,
  ref,
  ...attributes
}: TabProps) {
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
        'text-[color:var(--tab-text-inactive-color)] text-[length:var(--tab-text-height)] [font-weight:var(--font-weight-semi-bold)] leading-[1] p-[var(--tab-label-v-padding)_var(--tab-label-h-padding)] relative uppercase [transition-duration:var(--animation-duration)] [transition-property:background-color,_box-shadow,_color] [transition-timing-function:var(--animation-curve-default)]',
        '[&:focus]:bg-[var(--tab-focus-color)] [&:focus]:[outline:none]',
        '[&:focus-visible]:[outline:2px_solid_currentColor] [&:focus-visible]:[outline-offset:-2px]',
        '[&:not(.rt-tabs-disabled)]:cursor-pointer',
        '[.rt-tabs-fixed_&]:[flex:1] [.rt-tabs-fixed_&]:text-center',
        '[.rt-tabs-inverse_&]:text-[color:var(--tab-inverse-text-inactive-color)]',
        theme?.label,
        active && cn(activeClasses, theme?.active),
        hidden && cn('rt-tabs-hidden', '[.rt-tabs-label&]:hidden', theme?.hidden),
        Boolean(label) &&
          cn(
            'rt-tabs-withText',
            '[.rt-tabs-label.rt-tabs-withIcon&]:pt-[calc(0.8_*_var(--unit))] [.rt-tabs-label.rt-tabs-withIcon&]:pb-[calc(1.6_*_var(--unit))]',
            theme?.withText,
          ),
        Boolean(icon) &&
          cn(
            'rt-tabs-withIcon',
            '[.rt-tabs-label&]:pb-[calc((var(--tab-label-height)_-_var(--tab-icon-height))_/_2)] [.rt-tabs-label&]:pt-[calc((var(--tab-label-height)_-_var(--tab-icon-height))_/_2)] [.rt-tabs-label&]:text-center',
            theme?.withIcon,
          ),
        disabled &&
          cn('rt-tabs-disabled', '[.rt-tabs-label&]:opacity-[var(--tab-label-disabled-opacity)]', theme?.disabled),
        active && activeClassName,
        className,
      )}
      onClick={click}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && (event.key === 'Enter' || event.key === ' ')) {
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
      {icon && (
        <FontIcon
          className={cn(
            'rt-tabs-icon',
            'block h-[var(--tab-icon-height)] leading-[var(--tab-icon-height)] m-[0_auto]',
            '[.rt-tabs-label.rt-tabs-withText_&]:mb-[var(--tab-icon-margin-bottom)]',
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
