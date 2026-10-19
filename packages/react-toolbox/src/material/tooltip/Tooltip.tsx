'use client';
import './tokens.css';
import {
  createElement,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  type RefObject,
} from 'react';
import { cn } from '../foundations/styles/cn';
import { mergeStyleSlots } from '../foundations/styles/slots';
import { TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent } from './parts';
import type { TooltipClassNames } from './types';

export type { TooltipClassNames } from './types';
export type TooltipPosition = 'bottom' | 'horizontal' | 'left' | 'right' | 'top' | 'vertical';
type Position = Exclude<TooltipPosition, 'horizontal' | 'vertical'>;
export interface TooltipProps {
  tooltip?: ReactNode;
  tooltipDelay?: number;
  tooltipHideOnClick?: boolean;
  tooltipPosition?: TooltipPosition;
  tooltipShowOnClick?: boolean;
  /** Classes for the component's rendered parts. */
  classNames?: TooltipClassNames;
}
export interface TooltipOptions {
  className?: string;
  delay?: number;
  hideOnClick?: boolean;
  passthrough?: boolean;
  position?: TooltipPosition;
  showOnClick?: boolean;
  /** Classes for the component's rendered parts. */
  classNames?: TooltipClassNames;
}
type TriggerProps = Pick<
  HTMLAttributes<HTMLElement>,
  | 'onClick'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onFocus'
  | 'onBlur'
  | 'onTouchStart'
  | 'onTouchEnd'
  | 'onTouchMove'
  | 'onTouchCancel'
  | 'onPointerMove'
  | 'onPointerLeave'
  | 'onPointerDown'
  | 'onPointerUp'
  | 'onPointerCancel'
  | 'onClickCapture'
  | 'onContextMenu'
  | 'aria-describedby'
>;
type TriggerHandlers = HTMLAttributes<HTMLElement>;

/** Connect the props-based hook to the same primitive trigger without introducing another DOM element or interaction model. */
function TriggerBridge({
  target,
  handlers,
  describe,
  ref,
  ...props
}: HTMLAttributes<HTMLElement> & {
  target: HTMLElement | null;
  handlers: RefObject<TriggerHandlers>;
  describe: (description: string | undefined) => void;
  ref?: Ref<HTMLElement>;
}) {
  useImperativeHandle(ref, () => target!, [target]);
  useLayoutEffect(() => {
    handlers.current = props;
  });
  useLayoutEffect(() => {
    describe(props['aria-describedby']);
  }, [describe, props['aria-describedby']]);
  return null;
}

/** A props-based adapter over the compound Tooltip, not a separate hover/focus/touch implementation. */
export function useTooltip(props: TooltipProps & TriggerProps) {
  const {
    tooltip,
    tooltipDelay = 0,
    tooltipHideOnClick = true,
    tooltipShowOnClick = false,
    tooltipPosition = 'vertical',
    classNames,
  } = props;
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [side, setSide] = useState<Position>('bottom');
  const [description, setDescription] = useState<string>();
  const handlers = useRef<TriggerHandlers>({});
  const anchor = (element: HTMLElement) => {
    setTarget(element);
    const bounds = element.getBoundingClientRect();
    setSide(
      tooltipPosition === 'vertical'
        ? bounds.top < (window.innerHeight - bounds.height) / 2
          ? 'bottom'
          : 'top'
        : tooltipPosition === 'horizontal'
          ? bounds.left < (window.innerWidth - bounds.width) / 2
            ? 'right'
            : 'left'
          : tooltipPosition,
    );
  };
  const triggerProps: HTMLAttributes<HTMLElement> = {
    'aria-describedby': [props['aria-describedby'], description].filter(Boolean).join(' ') || undefined,
    onMouseEnter: (event) => {
      anchor(event.currentTarget);
      props.onMouseEnter?.(event);
    },
    onMouseLeave: props.onMouseLeave,
    onFocus: (event) => {
      anchor(event.currentTarget);
      props.onFocus?.(event);
      if (!event.defaultPrevented) handlers.current.onFocus?.(event);
    },
    onBlur: (event) => {
      props.onBlur?.(event);
      if (!event.defaultPrevented) handlers.current.onBlur?.(event);
    },
    onPointerMove: (event) => {
      if (target !== event.currentTarget) anchor(event.currentTarget);
      props.onPointerMove?.(event);
      if (!event.defaultPrevented) handlers.current.onPointerMove?.(event);
    },
    onPointerLeave: (event) => {
      props.onPointerLeave?.(event);
      if (!event.defaultPrevented) handlers.current.onPointerLeave?.(event);
    },
    onPointerDown: (event) => {
      anchor(event.currentTarget);
      props.onPointerDown?.(event);
      if (!event.defaultPrevented) {
        handlers.current.onPointerDown?.(event);
        if (open && !tooltipHideOnClick && event.pointerType !== 'touch') setOpen(true);
      }
    },
    onPointerUp: (event) => {
      props.onPointerUp?.(event);
      if (!event.defaultPrevented) handlers.current.onPointerUp?.(event);
    },
    onPointerCancel: (event) => {
      props.onPointerCancel?.(event);
      if (!event.defaultPrevented) handlers.current.onPointerCancel?.(event);
    },
    onClickCapture: (event) => {
      props.onClickCapture?.(event);
      if (!event.defaultPrevented) handlers.current.onClickCapture?.(event);
    },
    onContextMenu: (event) => {
      props.onContextMenu?.(event);
      if (!event.defaultPrevented) handlers.current.onContextMenu?.(event);
    },
    onClick: (event) => {
      anchor(event.currentTarget);
      props.onClick?.(event);
      if (event.defaultPrevented) return;
      if (tooltipHideOnClick) handlers.current.onClick?.(event);
      if (tooltipShowOnClick && !open) setOpen(true);
    },
    onTouchStart: props.onTouchStart,
    onTouchEnd: props.onTouchEnd,
    onTouchMove: props.onTouchMove,
    onTouchCancel: props.onTouchCancel,
  };
  return {
    triggerProps,
    tooltip: (
      <TooltipRoot open={open && tooltip != null && tooltip !== ''} onOpenChange={setOpen} delayDuration={tooltipDelay}>
        <TooltipTrigger asChild>
          <TriggerBridge target={target} handlers={handlers} describe={setDescription} />
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            side={side}
            className={cn(
              'rt-tooltip-tooltip',
              classNames?.tooltip,
              open && cn('rt-tooltip-tooltipActive', classNames?.tooltipActive),
              side === 'top' && cn('rt-tooltip-tooltipTop', classNames?.tooltipTop),
              side === 'left' && cn('rt-tooltip-tooltipLeft', classNames?.tooltipLeft),
              side === 'right' && cn('rt-tooltip-tooltipRight', classNames?.tooltipRight),
            )}
          >
            <span className={cn('rt-tooltip-tooltipInner', classNames?.tooltipInner)}>{tooltip}</span>
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    ),
  };
}

export function tooltipFactory(options: TooltipOptions = {}) {
  const factoryClassNames = options.classNames;
  return function withTooltip<C extends ElementType>(Component: C) {
    return function TooltippedComponent(props: ComponentPropsWithRef<C> & TooltipProps) {
      const {
        children,
        classNames,
        tooltip,
        tooltipDelay = options.delay,
        tooltipHideOnClick = options.hideOnClick,
        tooltipPosition = options.position,
        tooltipShowOnClick = options.showOnClick,
        className = options.className,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
        onTouchCancel,
        onPointerMove,
        onPointerLeave,
        onPointerDown,
        onPointerUp,
        onPointerCancel,
        onClickCapture,
        onContextMenu,
        ...attributes
      } = props;
      const behavior = useTooltip({
        tooltip,
        tooltipDelay,
        tooltipHideOnClick,
        tooltipPosition,
        tooltipShowOnClick,
        classNames: mergeStyleSlots(factoryClassNames, classNames),
        onClick,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
        onTouchCancel,
        onPointerMove,
        onPointerLeave,
        onPointerDown,
        onPointerUp,
        onPointerCancel,
        onClickCapture,
        onContextMenu,
        'aria-describedby': attributes['aria-describedby'],
      });
      return (
        <>
          {createElement(
            Component,
            {
              ...attributes,
              className,
              ...behavior.triggerProps,
              ...(typeof Component !== 'string' && options.passthrough !== false ? { classNames } : {}),
            },
            children,
          )}
          {behavior.tooltip}
        </>
      );
    };
  };
}
export const Tooltip = tooltipFactory();
export default Tooltip;
