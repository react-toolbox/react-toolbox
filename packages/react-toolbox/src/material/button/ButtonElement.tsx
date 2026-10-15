'use client';

import { Slot, Slottable } from '@radix-ui/react-slot';
import { cloneElement, isValidElement, type ElementType, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import type { useRipple } from '../ripple';
import type { ButtonNativeProps } from './types';

// Keep native link semantics while sharing event and ref composition between
// text and icon buttons. Slottable leaves icons and ink inside the child.
export default function ButtonElement({
  asChild,
  disabled,
  children,
  leading,
  ink,
  ...props
}: Omit<ButtonNativeProps, 'asChild'> & {
  asChild: boolean;
  disabled: boolean;
  leading: ReactNode;
  ink: ReturnType<typeof useRipple>;
}) {
  const native = props as HTMLAttributes<HTMLElement> & { href?: string; type?: string; ref?: Ref<HTMLElement> };
  const Element: ElementType = asChild ? Slot : native.href !== undefined ? 'a' : 'button';
  const child =
    asChild && disabled && isValidElement<HTMLAttributes<HTMLElement> & { disabled?: boolean }>(children)
      ? cloneElement(children, { disabled: true, 'aria-disabled': true, tabIndex: -1 })
      : children;
  return (
    <Element
      {...native}
      disabled={disabled}
      type={asChild || native.href !== undefined ? native.type : native.type || 'button'}
      data-react-toolbox="button"
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : native.tabIndex}
      onClickCapture={(event: React.MouseEvent<HTMLElement>) => {
        if (disabled) {
          event.preventDefault();
          event.stopPropagation();
        } else native.onClickCapture?.(event);
      }}
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        if (disabled) {
          event.preventDefault();
          event.stopPropagation();
        } else if (!event.defaultPrevented) native.onClick?.(event);
      }}
      onMouseDown={(event: React.MouseEvent<HTMLElement>) => {
        native.onMouseDown?.(event);
        if (!event.defaultPrevented) ink.onMouseDown(event);
      }}
      onTouchStart={(event: React.TouchEvent<HTMLElement>) => {
        native.onTouchStart?.(event);
        if (!event.defaultPrevented) ink.onTouchStart(event);
      }}
      onTouchEnd={(event: React.TouchEvent<HTMLElement>) => {
        native.onTouchEnd?.(event);
        ink.onTouchEnd(event);
      }}
      onTouchCancel={(event: React.TouchEvent<HTMLElement>) => {
        native.onTouchCancel?.(event);
        ink.onTouchCancel(event);
      }}
    >
      {leading}
      {asChild ? <Slottable>{child}</Slottable> : children}
      {ink.ripple}
    </Element>
  );
}
