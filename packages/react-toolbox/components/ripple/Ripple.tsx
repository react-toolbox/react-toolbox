'use client';

import {
  createElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type ElementType,
  type MouseEventHandler,
  type ReactNode,
  type TouchEventHandler,
  type TransitionEventHandler,
} from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';

export type RippleTheme = Partial<typeof defaultTheme>;
export interface RippleOptions {
  centered?: boolean;
  className?: string;
  disabled?: boolean;
  multiple?: boolean;
  spread?: number;
  theme?: RippleTheme;
  ripple?: boolean;
  onRippleEnded?: TransitionEventHandler<HTMLSpanElement>;
  onMouseDown?: MouseEventHandler<HTMLElement>;
  onTouchStart?: TouchEventHandler<HTMLElement>;
  onTouchEnd?: TouchEventHandler<HTMLElement>;
  onTouchCancel?: TouchEventHandler<HTMLElement>;
}
export interface RippleProps {
  disabled?: boolean;
  ripple?: boolean;
  rippleCentered?: boolean;
  rippleClassName?: string;
  rippleMultiple?: boolean;
  rippleSpread?: number;
  onRippleEnded?: TransitionEventHandler<HTMLSpanElement>;
}
interface Ink {
  id: number;
  active: boolean;
  restarting: boolean;
  left: number;
  top: number;
  width: number;
}
export interface RippleBehavior {
  ripple: ReactNode;
  onMouseDown: MouseEventHandler<HTMLElement>;
  onTouchStart: TouchEventHandler<HTMLElement>;
  onTouchEnd: TouchEventHandler<HTMLElement>;
  onTouchCancel: TouchEventHandler<HTMLElement>;
}

/** Ink behavior shared by components, with no injected component or theme wrapper. */
export function useRipple({
  centered = false,
  className,
  disabled = false,
  multiple = true,
  spread = 2,
  theme: suppliedTheme,
  ripple = true,
  onRippleEnded,
  onMouseDown: suppliedMouseDown,
  onTouchStart: suppliedTouchStart,
  onTouchEnd: suppliedTouchEnd,
  onTouchCancel: suppliedTouchCancel,
}: RippleOptions = {}): RippleBehavior {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  const [inks, setInks] = useState<Ink[]>([]);
  const nodes = useRef(new Map<number, HTMLSpanElement>());
  const listeners = useRef(new Map<number, () => void>());
  const sequence = useRef(0);
  const touchCache = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      for (const dispose of listeners.current.values()) dispose();
      listeners.current.clear();
    };
  }, []);

  // Commit scale(0), force that starting geometry, then activate the CSS transition.
  // This preserves the original ink timing without an extra animation frame delay.
  useLayoutEffect(() => {
    if (!inks.some((ink) => ink.restarting)) return;
    for (const ink of inks) if (ink.restarting) void nodes.current.get(ink.id)?.offsetWidth;
    setInks((current) =>
      current.map((ink) => (ink.restarting ? { ...ink, restarting: false, active: true } : ink)),
    );
  }, [inks]);

  function deactivate(id: number) {
    listeners.current.get(id)?.();
    listeners.current.delete(id);
    if (mounted.current)
      setInks((current) => current.map((ink) => (ink.id === id ? { ...ink, active: false } : ink)));
  }
  function start(origin: HTMLElement, x: number, y: number, touch: boolean) {
    if (disabled || !ripple) return;
    const trigger = touch || !touchCache.current;
    touchCache.current = touch;
    if (!trigger) return;
    const { left, top, width, height } = origin.getBoundingClientRect();
    const id = !multiple && inks.length ? sequence.current : ++sequence.current;
    listeners.current.get(id)?.();
    const finish = (event: Event) => {
      if (event.type === 'touchcancel') touchCache.current = false;
      deactivate(id);
    };
    const event = touch ? 'touchend' : 'mouseup';
    document.addEventListener(event, finish);
    if (touch) document.addEventListener('touchcancel', finish);
    listeners.current.set(id, () => {
      document.removeEventListener(event, finish);
      if (touch) document.removeEventListener('touchcancel', finish);
    });
    const ink: Ink = {
      id,
      active: false,
      restarting: true,
      left: centered ? 0 : x - left - width / 2,
      top: centered ? 0 : y - top - height / 2,
      width: Math.max(width, height) * spread,
    };
    setInks((current) => [...current.filter((item) => item.id !== id), ink]);
  }
  const onMouseDown: MouseEventHandler<HTMLElement> = (event) => {
    suppliedMouseDown?.(event);
    if (!event.defaultPrevented && event.button === 0)
      start(event.currentTarget, event.clientX, event.clientY, false);
  };
  const onTouchStart: TouchEventHandler<HTMLElement> = (event) => {
    suppliedTouchStart?.(event);
    const touch = event.touches[0];
    if (!event.defaultPrevented && touch)
      start(event.currentTarget, touch.pageX - window.scrollX, touch.pageY - window.scrollY, true);
  };
  const onTouchEnd: TouchEventHandler<HTMLElement> = (event) => {
    suppliedTouchEnd?.(event);
    for (const id of [...listeners.current.keys()]) deactivate(id);
  };
  const onTouchCancel: TouchEventHandler<HTMLElement> = (event) => {
    suppliedTouchCancel?.(event);
    touchCache.current = false;
    for (const id of [...listeners.current.keys()]) deactivate(id);
  };
  return {
    onMouseDown,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
    ripple: ripple
      ? inks.map((ink) => (
          <span key={ink.id} data-react-toolbox="ripple" className={theme.rippleWrapper}>
            <span
              ref={(node) => {
                if (node) nodes.current.set(ink.id, node);
                else nodes.current.delete(ink.id);
              }}
              className={classnames(
                theme.ripple,
                { [theme.rippleActive]: ink.active, [theme.rippleRestarting]: ink.restarting },
                className,
              )}
              style={{
                transform: `translate3d(${-ink.width / 2 + ink.left}px, ${-ink.width / 2 + ink.top}px, 0) scale(${ink.restarting ? 0 : 1})`,
                width: ink.width,
                height: ink.width,
              }}
              onTransitionEnd={(event) => {
                if (event.target !== event.currentTarget || event.propertyName !== 'opacity')
                  return;
                onRippleEnded?.(event);
                listeners.current.get(ink.id)?.();
                listeners.current.delete(ink.id);
                setInks((current) => current.filter((item) => item.id !== ink.id));
              }}
            />
          </span>
        ))
      : null,
  };
}

/** Optional convenience decorator for application components. Library components use the hook. */
export function rippleFactory(options: RippleOptions & { passthrough?: boolean } = {}) {
  return function withRipple<C extends ElementType>(Component: C) {
    return function RippledComponent(props: ComponentPropsWithRef<C> & RippleProps) {
      const {
        children,
        disabled,
        ripple,
        rippleCentered,
        rippleClassName,
        rippleMultiple,
        rippleSpread,
        onRippleEnded,
        onMouseDown,
        onTouchStart,
        onTouchEnd,
        onTouchCancel,
        ...rest
      } = props;
      const ink = useRipple({
        ...options,
        disabled,
        ripple,
        centered: rippleCentered ?? options.centered,
        className: rippleClassName ?? options.className,
        multiple: rippleMultiple ?? options.multiple,
        spread: rippleSpread ?? options.spread,
        onRippleEnded,
      });
      return createElement(
        Component,
        {
          ...rest,
          disabled,
          onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
            onMouseDown?.(event);
            ink.onMouseDown(event);
          },
          onTouchStart: (event: React.TouchEvent<HTMLElement>) => {
            onTouchStart?.(event);
            ink.onTouchStart(event);
          },
          onTouchEnd: (event: React.TouchEvent<HTMLElement>) => {
            onTouchEnd?.(event);
            ink.onTouchEnd(event);
          },
          onTouchCancel: (event: React.TouchEvent<HTMLElement>) => {
            onTouchCancel?.(event);
            ink.onTouchCancel(event);
          },
        },
        children,
        ink.ripple,
      );
    };
  };
}
export { rippleFactory as Ripple };
export default rippleFactory;
