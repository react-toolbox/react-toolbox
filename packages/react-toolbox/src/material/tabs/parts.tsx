'use client';
import './tokens.css';
import { labelSizeClasses, labelFocusClasses } from './styles';
import * as Primitive from '@radix-ui/react-tabs';
import { useLayoutEffect, useRef, useState, useImperativeHandle, type ComponentProps, type CSSProperties } from 'react';
import { cn } from '../foundations/styles/cn';
import { focusClasses } from '../foundations/styles/composition';
import { useRipple } from '../ripple';

export type TabsRootProps = ComponentProps<typeof Primitive.Root>;
export function TabsRoot({ className, ...props }: TabsRootProps) {
  return (
    <Primitive.Root
      data-slot="TabsRoot"
      {...props}
      className={cn('box-border [&_*]:box-border font-(family-name:--preferred-font)', className)}
    />
  );
}
export type TabsListProps = ComponentProps<typeof Primitive.List>;
export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <Primitive.List
      data-slot="TabsList"
      {...props}
      className={cn(
        'relative flex overflow-x-auto border-0 border-b border-solid border-(--tab-navigation-border-color) data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-e [&:has([data-slot=TabsIndicator])_[data-slot=TabsTrigger]]:after:hidden',
        className,
      )}
    />
  );
}
export type TabsTriggerProps = ComponentProps<typeof Primitive.Trigger> & { ripple?: boolean };
export function TabsTrigger({
  className,
  children,
  disabled,
  ripple = true,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  asChild,
  ...props
}: TabsTriggerProps) {
  const ink = useRipple({ disabled, ripple: ripple && !asChild });
  return (
    <Primitive.Trigger
      data-slot="TabsTrigger"
      {...props}
      asChild={asChild}
      disabled={disabled}
      className={cn(
        labelFocusClasses,
        labelSizeClasses,
        'relative flex min-h-(--tab-label-height) shrink-0 items-center justify-center gap-[8px] overflow-hidden border-0 bg-transparent px-(--tab-label-h-padding) py-(--tab-label-v-padding) text-(length:--tab-text-height) leading-none font-medium uppercase text-(--tab-text-inactive-color) data-[state=active]:text-(--tab-text-color) disabled:opacity-(--tab-label-disabled-opacity) focus-visible:bg-(--tab-focus-color) after:absolute after:inset-x-0 after:bottom-0 after:h-(--tab-pointer-height) after:bg-(--tab-pointer-color) after:opacity-0 data-[state=active]:after:opacity-100 data-[orientation=vertical]:after:inset-x-auto data-[orientation=vertical]:after:inset-y-0 data-[orientation=vertical]:after:end-0 data-[orientation=vertical]:after:h-auto data-[orientation=vertical]:after:w-(--tab-pointer-height)',
        className,
      )}
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
      {asChild ? (
        children
      ) : (
        <>
          {children}
          {ink.ripple}
        </>
      )}
    </Primitive.Trigger>
  );
}
export type TabsContentProps = ComponentProps<typeof Primitive.Content>;
export function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <Primitive.Content
      data-slot="TabsContent"
      {...props}
      className={cn(
        focusClasses,
        'py-[24px] text-(length:--tab-text-height) leading-[24px] text-(--rt-color-text) data-[state=inactive]:hidden',
        className,
      )}
    />
  );
}
export type TabsIndicatorProps = ComponentProps<'span'>;
/** Optional moving indicator. Measures rendered tabs, including custom wrappers. */
export function TabsIndicator({ className, style, ref, ...props }: TabsIndicatorProps) {
  const node = useRef<HTMLSpanElement>(null);
  useImperativeHandle(ref, () => node.current!, []);
  /** Consumer dimensions and decoration must not be multiplied by the default bar's scale. */
  const scaleIndicator = !className && !style;
  const [position, setPosition] = useState<CSSProperties>({ opacity: 0 });
  useLayoutEffect(() => {
    const list = node.current?.closest<HTMLElement>('[role=tablist]');
    if (!list) return;
    const update = () => {
      const tab = list.querySelector<HTMLElement>('[role=tab][aria-selected=true]');
      if (!tab) {
        setPosition({ opacity: 0 });
        return;
      }
      const bounds = list.getBoundingClientRect();
      const active = tab.getBoundingClientRect();
      const vertical = list.getAttribute('aria-orientation') === 'vertical';
      /** Keep the moving axis one pixel wide and express its rendered length as a scale. */
      setPosition(
        vertical
          ? {
              opacity: 1,
              insetInlineEnd: 0,
              top: 0,
              width: 'var(--tab-pointer-height)',
              height: scaleIndicator ? 1 : active.height,
              transform: `translateY(${active.top - bounds.top + list.scrollTop}px) scaleY(${scaleIndicator ? active.height : 1})`,
            }
          : {
              opacity: 1,
              left: 0,
              bottom: 0,
              height: 'var(--tab-pointer-height)',
              width: scaleIndicator ? 1 : active.width,
              transform: `translateX(${active.left - bounds.left + list.scrollLeft}px) scaleX(${scaleIndicator ? active.width : 1})`,
            },
      );
    };
    const resize = new ResizeObserver(update);
    const observe = () => {
      resize.disconnect();
      resize.observe(list);
      list.querySelectorAll('[role=tab]').forEach((tab) => resize.observe(tab));
      update();
    };
    const mutation = new MutationObserver(observe);
    mutation.observe(list, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['aria-selected', 'aria-orientation', 'dir'],
    });
    observe();
    return () => {
      resize.disconnect();
      mutation.disconnect();
    };
  }, [scaleIndicator]);
  return (
    <span
      {...props}
      ref={node}
      aria-hidden="true"
      data-slot="TabsIndicator"
      style={{ ...position, ...style }}
      className={cn(
        'pointer-events-none absolute bg-(--tab-pointer-color) duration-(--animation-duration) ease-(--animation-curve-default) motion-reduce:transition-none',
        scaleIndicator ? 'origin-top-left transition-[transform]' : 'transition-[transform,width,height]',
        className,
      )}
    />
  );
}
