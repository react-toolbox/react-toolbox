'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { MenuTheme } from './types';

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type Ref,
} from 'react';
import { cn } from '../foundations/styles/cn';
import MenuItem, { type MenuItemProps } from './MenuItem';

export type { MenuTheme, MenuClassNames } from './types';
export type MenuPosition = 'auto' | 'static' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
type ResolvedPosition = Exclude<MenuPosition, 'auto'>;
export interface MenuHandle {
  show(): void;
  hide(): void;
  readonly node: HTMLDivElement | null;
}
export interface MenuProps<Value = unknown> extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onKeyDown'> {
  active?: boolean;
  initialFocus?: 'first' | 'last';
  onHide?: () => void;
  onSelect?: (value: Value | undefined) => void;
  onShow?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLUListElement>) => void;
  outline?: boolean;
  position?: MenuPosition;
  ripple?: boolean;
  selectable?: boolean;
  selected?: Value;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: MenuTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: MenuTheme;
  ref?: Ref<MenuHandle>;
}
interface Dimensions {
  width?: number;
  height?: number;
  outlineTop?: number;
  outlineLeft?: number;
  offsetX: number;
  offsetY: number;
}
export function Menu<Value = unknown>({
  active = false,
  children,
  className,
  initialFocus = 'first',
  onHide,
  onSelect,
  onShow,
  onKeyDown,
  outline = true,
  position: requestedPosition = 'static',
  ripple = true,
  selectable = true,
  selected,
  theme: legacyTheme,
  classNames,
  ref,
  style,
  ...attributes
}: MenuProps<Value>) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const root = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(active);
  const [position, setPosition] = useState<ResolvedPosition | undefined>(
    requestedPosition === 'auto' ? undefined : requestedPosition,
  );
  const [rippled, setRippled] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions>({ offsetX: 0, offsetY: 0 });
  const previousFocus = useRef<HTMLElement | null>(null);
  const callbacks = useRef({ onHide, onShow, initialFocus });
  callbacks.current = { onHide, onShow, initialFocus };
  const previousActive = useRef(active);
  const previousPosition = useRef(requestedPosition);
  const previousVisible = useRef(visible);
  const search = useRef('');
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const calculatePosition = useCallback((): ResolvedPosition | undefined => {
    const parent = root.current?.parentElement;
    if (!parent) return;
    const bounds = parent.getBoundingClientRect();
    const top = bounds.top < (window.innerHeight - bounds.height) / 2;
    const left = bounds.left < (window.innerWidth - bounds.width) / 2;
    return top ? (left ? 'topLeft' : 'topRight') : left ? 'bottomLeft' : 'bottomRight';
  }, []);
  const restoreFocus = useCallback(() => {
    if (previousFocus.current?.isConnected && root.current?.contains(document.activeElement))
      previousFocus.current.focus({ preventScroll: true });
    previousFocus.current = null;
  }, []);
  const updateDimensions = useCallback(() => {
    const node = menu.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    // Multiple resize/scroll notifications can measure the same committed DOM
    // before React applies their state updates. Remove the offset actually
    // painted in that DOM, rather than one from a newer queued update.
    const placement = root.current?.style;
    const appliedX = position?.endsWith('Right')
      ? -(parseFloat(placement?.right || '') || 0)
      : parseFloat(placement?.left || '') || 0;
    const appliedY = position?.startsWith('bottom')
      ? -(parseFloat(placement?.bottom || '') || 0)
      : parseFloat(placement?.top || '') || 0;
    setDimensions((previous) => {
      let offsetX = 0;
      let offsetY = 0;
      if (visible && position !== 'static') {
        const unit = parseFloat(getComputedStyle(node).getPropertyValue('--unit')) || 10;
        const margin = (window.innerWidth >= 600 ? 2.4 : 1.6) * unit;
        const left = bounds.left - appliedX;
        const top = bounds.top - appliedY;
        offsetX =
          Math.round((Math.max(margin, Math.min(left, window.innerWidth - margin - bounds.width)) - left) * 64) / 64;
        offsetY =
          Math.round((Math.max(margin, Math.min(top, window.innerHeight - margin - bounds.height)) - top) * 64) / 64;
      }
      const next = {
        width: bounds.width,
        height: bounds.height,
        outlineTop: position === 'static' ? node.offsetTop : undefined,
        outlineLeft: position === 'static' ? node.offsetLeft : undefined,
        offsetX,
        offsetY,
      };
      return previous.width === next.width &&
        previous.height === next.height &&
        previous.outlineTop === next.outlineTop &&
        previous.outlineLeft === next.outlineLeft &&
        previous.offsetX === offsetX &&
        previous.offsetY === offsetY
        ? previous
        : next;
    });
  }, [position, visible]);
  const show = useCallback(() => {
    const bounds = menu.current?.getBoundingClientRect();
    if (bounds) setDimensions((previous) => ({ ...previous, width: bounds.width, height: bounds.height }));
    setVisible(true);
  }, []);
  const hide = useCallback(() => setVisible(false), []);
  useImperativeHandle(
    ref,
    () => ({
      show,
      hide,
      get node() {
        return root.current;
      },
    }),
    [show, hide],
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setPosition(requestedPosition === 'auto' ? calculatePosition() : requestedPosition);
      updateDimensions();
    });
    return () => clearTimeout(timer);
  }, []);
  useLayoutEffect(() => {
    if (previousPosition.current === requestedPosition) return;
    previousPosition.current = requestedPosition;
    setPosition(requestedPosition === 'auto' ? calculatePosition() : requestedPosition);
  }, [requestedPosition, calculatePosition]);
  useEffect(() => {
    if (previousActive.current === active) return;
    previousActive.current = active;
    if (!active) {
      hide();
      return;
    }
    const next = requestedPosition === 'auto' ? calculatePosition() : requestedPosition;
    if (requestedPosition === 'auto' && next !== position) {
      setPosition(next);
      const timer = setTimeout(show, 20);
      return () => clearTimeout(timer);
    }
    show();
  }, [active, requestedPosition, calculatePosition, hide, show]);
  useLayoutEffect(updateDimensions, [
    updateDimensions,
    children,
    className,
    theme,
    dimensions.width,
    dimensions.height,
  ]);
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(updateDimensions);
    if (observer && menu.current && root.current) {
      observer.observe(menu.current, { box: 'border-box' });
      observer.observe(root.current, { box: 'border-box' });
    }
    if (!observer) document.fonts?.addEventListener('loadingdone', updateDimensions);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', updateDimensions);
      document.fonts?.removeEventListener('loadingdone', updateDimensions);
    };
  }, [updateDimensions]);
  useEffect(() => {
    if (!visible) return;
    if (requestedPosition !== 'static') {
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const items = menu.current?.querySelectorAll<HTMLElement>(
        '[data-react-toolbox="menu-item"]:not([aria-disabled="true"]):not([hidden])',
      );
      const enabled = items ? Array.from(items) : [];
      const target =
        callbacks.current.initialFocus === 'last'
          ? enabled.at(-1)
          : enabled.find((item) => item.getAttribute('aria-checked') === 'true') || enabled[0];
      (target || menu.current)?.focus({ preventScroll: true });
    }
    let frame: number | undefined;
    const scroll = (event: Event) => {
      if (event.target === menu.current || frame !== undefined) return;
      frame = requestAnimationFrame(() => {
        frame = undefined;
        updateDimensions();
      });
    };
    const outside = (event: Event) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        setVisible(false);
        setRippled(false);
      }
    };
    window.addEventListener('scroll', scroll, true);
    document.addEventListener('click', outside);
    document.addEventListener('touchstart', outside);
    return () => {
      window.removeEventListener('scroll', scroll, true);
      document.removeEventListener('click', outside);
      document.removeEventListener('touchstart', outside);
      if (frame !== undefined) cancelAnimationFrame(frame);
      restoreFocus();
    };
  }, [visible, requestedPosition, updateDimensions, restoreFocus]);
  useEffect(() => {
    if (previousVisible.current === visible) return;
    previousVisible.current = visible;
    if (visible) callbacks.current.onShow?.();
    else callbacks.current.onHide?.();
  }, [visible]);
  useEffect(
    () => () => {
      clearTimeout(searchTimer.current);
      restoreFocus();
    },
    [restoreFocus],
  );
  const keyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !menu.current) return;
    const items = Array.from(
      menu.current.querySelectorAll<HTMLElement>(
        '[data-react-toolbox="menu-item"]:not([aria-disabled="true"]):not([hidden])',
      ),
    );
    const current = items.findIndex((item) => item === document.activeElement);
    let next: HTMLElement | undefined;
    if (event.key === 'ArrowDown') next = items[(current + 1) % items.length];
    if (event.key === 'ArrowUp') next = items[(current - 1 + items.length) % items.length];
    if (event.key === 'Home') [next] = items;
    if (event.key === 'End') next = items.at(-1);
    if (event.key === 'Escape' && visible) {
      event.preventDefault();
      event.stopPropagation();
      restoreFocus();
      hide();
      return;
    }
    if (event.key === 'Tab' && visible && requestedPosition !== 'static') {
      restoreFocus();
      hide();
      return;
    }
    if (event.key.length === 1 && event.key !== ' ' && !event.ctrlKey && !event.metaKey && !event.altKey) {
      clearTimeout(searchTimer.current);
      search.current += event.key.toLowerCase();
      const term = Array.from(search.current).every((character) => character === search.current[0])
        ? search.current[0]
        : search.current;
      next = items
        .slice(current + 1)
        .concat(items.slice(0, current + 1))
        .find((item) => item.textContent?.trim().toLowerCase().startsWith(term));
      searchTimer.current = setTimeout(() => {
        search.current = '';
      }, 500);
    }
    if (next) {
      event.preventDefault();
      next.focus();
    }
  };
  const { width = 0, height = 0, offsetX, offsetY } = dimensions;
  let clip: string | undefined;
  if (position !== 'static') {
    if (visible) clip = `rect(0 ${width}px ${height}px 0)`;
    else if (position === 'topRight') clip = `rect(0 ${width}px 0 ${width}px)`;
    else if (position === 'bottomRight') clip = `rect(${height}px ${width}px ${height}px ${width}px)`;
    else if (position === 'bottomLeft') clip = `rect(${height}px 0 ${height}px 0)`;
    else if (position === 'topLeft') clip = 'rect(0 0 0 0)';
  }
  const rootStyle: CSSProperties | undefined =
    position === 'static'
      ? style
      : {
          ...style,
          width: dimensions.width,
          height: dimensions.height,
          left: position?.endsWith('Left') && offsetX ? offsetX : undefined,
          right: position?.endsWith('Right') && offsetX ? -offsetX : undefined,
          top: position?.startsWith('top') && offsetY ? offsetY : undefined,
          bottom: position?.startsWith('bottom') && offsetY ? -offsetY : undefined,
        };
  let firstEnabled = true;
  const items = Children.map(children, (item) => {
    if (!isValidElement<MenuItemProps<Value>>(item) || item.type !== MenuItem) return item;
    const tabIndex = requestedPosition === 'static' && !item.props.disabled && firstEnabled ? 0 : -1;
    if (!item.props.disabled) firstEnabled = false;
    return cloneElement(item, {
      role: selectable && item.props.value !== undefined ? 'menuitemradio' : 'menuitem',
      tabIndex,
      ripple: item.props.ripple || ripple,
      selected: item.props.value !== undefined && selectable && item.props.value === selected,
      onClick: (event, handle) => {
        restoreFocus();
        setVisible(false);
        setRippled(ripple);
        item.props.onClick?.(event, handle);
        onSelect?.(item.props.value);
      },
    });
  });
  return (
    <div
      {...attributes}
      id={undefined}
      data-react-toolbox="menu"
      ref={root}
      className={cn(
        'rt-menu-menu',
        'inline-block relative',
        '[&:not(.rt-menu-static)]:pointer-events-none [&:not(.rt-menu-static)]:z-(--z-index-higher)',
        theme?.menu,
        position &&
          (position === 'static'
            ? cn('rt-menu-static', theme?.static)
            : position === 'topLeft'
              ? cn(
                  'rt-menu-topLeft',
                  '[.rt-menu-menu&]:left-0 [.rt-menu-menu&]:absolute [.rt-menu-menu&]:top-0',
                  theme?.topLeft,
                )
              : position === 'topRight'
                ? cn(
                    'rt-menu-topRight',
                    '[.rt-menu-menu&]:absolute [.rt-menu-menu&]:right-0 [.rt-menu-menu&]:top-0',
                    theme?.topRight,
                  )
                : position === 'bottomLeft'
                  ? cn(
                      'rt-menu-bottomLeft',
                      '[.rt-menu-menu&]:bottom-0 [.rt-menu-menu&]:left-0 [.rt-menu-menu&]:absolute',
                      theme?.bottomLeft,
                    )
                  : position === 'bottomRight'
                    ? cn(
                        'rt-menu-bottomRight',
                        '[.rt-menu-menu&]:bottom-0 [.rt-menu-menu&]:absolute [.rt-menu-menu&]:right-0',
                        theme?.bottomRight,
                      )
                    : undefined),
        visible && cn('rt-menu-active', '[.rt-menu-menu:not(.rt-menu-static)&]:[pointer-events:all]', theme?.active),
        rippled && cn('rt-menu-rippled', theme?.rippled),
        className,
      )}
      style={rootStyle}
    >
      {outline ? (
        <div
          className={cn(
            'rt-menu-outline',
            'bg-(--menu-background-color) rounded-(--menu-outline-border-radius) [box-shadow:var(--shadow-2p)] block left-0 absolute top-0',
            '[.rt-menu-menu.rt-menu-topLeft>&]:origin-top-left',
            '[.rt-menu-menu.rt-menu-topRight>&&]:origin-top-right',
            '[.rt-menu-menu.rt-menu-bottomLeft>&]:origin-bottom-left',
            '[.rt-menu-menu.rt-menu-bottomRight>&&]:origin-bottom-right',
            '[.rt-menu-menu:not(.rt-menu-static)>&]:opacity-0 [.rt-menu-menu:not(.rt-menu-static)>&]:transform-[scale(0)] [.rt-menu-menu:not(.rt-menu-static)>&]:[transition:transform_var(--menu-expand-duration)_var(--animation-curve-default),opacity_var(--menu-fade-duration)_var(--animation-curve-default)] [.rt-menu-menu:not(.rt-menu-static)>&]:will-change-transform',
            '[.rt-menu-menu:not(.rt-menu-static).rt-menu-active>&]:opacity-[1] [.rt-menu-menu:not(.rt-menu-static).rt-menu-active>&]:transform-[scale(1)]',
            '[.rt-menu-menu:not(.rt-menu-static).rt-menu-rippled:not(.rt-menu-active)>&]:delay-(--menu-ripple-delay)',
            theme?.outline,
          )}
          style={{
            width: dimensions.width,
            height: dimensions.height,
            top: dimensions.outlineTop,
            left: dimensions.outlineLeft,
          }}
        />
      ) : null}
      <ul
        id={attributes.id}
        role="menu"
        aria-label={attributes['aria-label']}
        aria-labelledby={attributes['aria-labelledby']}
        aria-hidden={(position !== 'static' && !visible) || undefined}
        inert={(position !== 'static' && !visible) || undefined}
        tabIndex={-1}
        onKeyDown={keyDown}
        ref={menu}
        className={cn(
          'rt-menu-menuInner',
          'block [list-style:none] p-(--menu-padding) relative text-left whitespace-nowrap max-h-[calc(100vh-var(--menu-item-height))] overflow-y-auto',
          '[.rt-menu-menu:not(.rt-menu-static)>&]:left-0 [.rt-menu-menu:not(.rt-menu-static)>&]:m-0 [.rt-menu-menu:not(.rt-menu-static)>&]:opacity-0 [.rt-menu-menu:not(.rt-menu-static)>&]:absolute [.rt-menu-menu:not(.rt-menu-static)>&]:top-0',
          '[.rt-menu-menu.rt-menu-topRight>&&]:left-auto [.rt-menu-menu.rt-menu-topRight>&&]:right-0',
          '[.rt-menu-menu.rt-menu-bottomRight>&&]:left-auto [.rt-menu-menu.rt-menu-bottomRight>&&]:right-0',
          '[.rt-menu-menu:not(.rt-menu-static).rt-menu-active>&]:opacity-[1] [.rt-menu-menu:not(.rt-menu-static).rt-menu-active>&]:[transition:opacity_var(--menu-fade-duration)_var(--animation-curve-default),clip_var(--menu-expand-duration)_var(--animation-curve-default)]',
          '[.rt-menu-menu:not(.rt-menu-static).rt-menu-rippled:not(.rt-menu-active)>&]:delay-(--menu-ripple-delay)',
          theme?.menuInner,
        )}
        style={{ clip }}
      >
        {items}
      </ul>
    </div>
  );
}
export default Menu;
