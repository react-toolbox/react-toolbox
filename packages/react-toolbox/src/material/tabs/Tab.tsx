'use client';
import './tokens.css';

import { activeClasses, labelSizeClasses, labelFocusClasses } from './styles';
import type { TabsClassNames } from './types';

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

export type TabClassNames = TabsClassNames;
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
  /** Classes for the component's rendered parts. */
  classNames?: TabClassNames;
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
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  ripple = true,
  classNames,
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
    classNames: {
      rippleWrapper: cn('rt-tabs-rippleWrapper', '[.rt-tabs-label>&]:overflow-hidden', classNames?.rippleWrapper),
    },
  });
  return (
    <div
      {...attributes}
      ref={ref}
      data-react-toolbox="tab"
      role="tab"
      aria-label={attributes['aria-label'] ?? (!label && typeof icon === 'string' ? icon : undefined)}
      aria-selected={active}
      aria-disabled={disabled || undefined}
      aria-hidden={hidden || undefined}
      className={cn(
        'rt-tabs-label',
        labelSizeClasses,
        'text-(--tab-text-inactive-color) text-(length:--tab-text-height) font-(--font-weight-semi-bold) leading-none text-center p-[var(--tab-label-v-padding)_var(--tab-label-h-padding)] relative uppercase [transition-duration:var(--animation-duration)] [transition-property:background-color,box-shadow,color] [transition-timing-function:var(--animation-curve-default)]',
        labelFocusClasses,
        '[&:not(.rt-tabs-disabled)]:cursor-pointer',
        '[.rt-tabs-fixed_&]:min-w-0 [.rt-tabs-fixed_&]:max-w-none [.rt-tabs-fixed_&]:flex-1 [.rt-tabs-fixed_&]:text-center',
        '[.rt-tabs-inverse_&]:text-(--tab-inverse-text-inactive-color)',
        classNames?.label,
        active && cn(activeClasses, classNames?.active),
        hidden && cn('rt-tabs-hidden', '[.rt-tabs-label&]:hidden', classNames?.hidden),
        Boolean(label) &&
          cn(
            'rt-tabs-withText',
            '[.rt-tabs-label.rt-tabs-withIcon&]:pt-[calc(0.8*var(--unit))] [.rt-tabs-label.rt-tabs-withIcon&]:pb-[calc(1.6*var(--unit))]',
            classNames?.withText,
          ),
        Boolean(icon) &&
          cn(
            'rt-tabs-withIcon',
            '[.rt-tabs-label&]:pb-[calc((var(--tab-label-height)-var(--tab-icon-height))/2)] [.rt-tabs-label&]:pt-[calc((var(--tab-label-height)-var(--tab-icon-height))/2)] [.rt-tabs-label&]:text-center',
            classNames?.withIcon,
          ),
        disabled &&
          cn('rt-tabs-disabled', '[.rt-tabs-label&]:opacity-(--tab-label-disabled-opacity)', classNames?.disabled),
        active && activeClassName,
        className,
      )}
      onClick={(event) => {
        if (!disabled && !hidden) onClick?.(event, index);
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
            classNames?.icon,
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
