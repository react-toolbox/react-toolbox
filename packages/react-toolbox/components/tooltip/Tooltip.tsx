'use client';

import {
  createElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  type TransitionEvent,
} from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import Portal from '../hoc/Portal';
import defaults from './theme';

export type TooltipTheme = Partial<typeof defaults>;
export type TooltipPosition = 'bottom' | 'horizontal' | 'left' | 'right' | 'top' | 'vertical';
type Position = Exclude<TooltipPosition, 'horizontal' | 'vertical'>;
export interface TooltipProps {
  tooltip?: ReactNode;
  tooltipDelay?: number;
  tooltipHideOnClick?: boolean;
  tooltipPosition?: TooltipPosition;
  tooltipShowOnClick?: boolean;
  theme?: TooltipTheme;
}
export interface TooltipOptions {
  className?: string;
  delay?: number;
  hideOnClick?: boolean;
  passthrough?: boolean;
  position?: TooltipPosition;
  showOnClick?: boolean;
  theme?: TooltipTheme;
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
  | 'aria-describedby'
>;
interface Placement {
  top: number;
  left: number;
  position: Position;
}
interface State {
  active: boolean;
  visible: boolean;
  position: Position;
  top?: number;
  left?: number;
}
type Timer = ReturnType<typeof setTimeout> | undefined;

/** Tooltip behavior is available directly; the decorator below is a convenience API. */
export function useTooltip(props: TooltipProps & TriggerProps) {
  const {
    tooltip,
    tooltipDelay = 0,
    tooltipHideOnClick = true,
    tooltipPosition = 'vertical',
    tooltipShowOnClick = false,
    theme: overrides,
  } = props;
  const theme = mergeTheme(defaults, overrides);
  const id = `toolbox-tooltip-${useId()}`;
  const [state, setState] = useState<State>({ active: false, visible: false, position: 'bottom' });
  const current = useRef(state);
  current.current = state;
  const latest = useRef({ tooltip, tooltipDelay, tooltipPosition, props });
  latest.current = { tooltip, tooltipDelay, tooltipPosition, props };
  const node = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const interaction = useRef({
    hovered: false,
    focused: false,
    touching: false,
    longPressed: false,
    ignoreClickUntil: 0,
  });
  const timers = useRef<{ activate: Timer; hide: Timer; touch: Timer; release: Timer }>({
    activate: undefined,
    hide: undefined,
    touch: undefined,
    release: undefined,
  });
  const deactivate = useCallback(() => {
    clearTimeout(timers.current.activate);
    clearTimeout(timers.current.hide);
    clearTimeout(timers.current.release);
    if (current.current.active) {
      setState((previous) => ({ ...previous, active: false }));
      const duration = node.current ? getComputedStyle(node.current).transitionDuration : '';
      const milliseconds = duration
        .split(',')
        .map((value) => parseFloat(value) * (value.trim().endsWith('ms') ? 1 : 1000));
      timers.current.hide = setTimeout(
        () => setState((previous) => ({ ...previous, visible: false })),
        Math.max(0, ...milliseconds.filter(Number.isFinite)) || 200,
      );
    } else if (current.current.visible) setState((previous) => ({ ...previous, visible: false }));
  }, []);
  const calculate = useCallback((element: HTMLElement): Placement => {
    trigger.current = element;
    const { top, left, width, height } = element.getBoundingClientRect();
    const requested = latest.current.tooltipPosition;
    const position: Position =
      requested === 'horizontal'
        ? left < (window.innerWidth - width) / 2
          ? 'right'
          : 'left'
        : requested === 'vertical'
          ? top < (window.innerHeight - height) / 2
            ? 'bottom'
            : 'top'
          : requested;
    const x = window.scrollX || window.pageXOffset;
    const y = window.scrollY || window.pageYOffset;
    if (position === 'bottom')
      return { top: top + height + y, left: left + width / 2 + x, position };
    if (position === 'top') return { top: top + y, left: left + width / 2 + x, position };
    if (position === 'left') return { top: top + height / 2 + y, left: left + x, position };
    return { top: top + height / 2 + y, left: left + width + x, position };
  }, []);
  const activate = useCallback((placement: Placement) => {
    if (latest.current.tooltip == null || latest.current.tooltip === '') return;
    clearTimeout(timers.current.activate);
    clearTimeout(timers.current.hide);
    clearTimeout(timers.current.release);
    setState((previous) => ({ ...previous, visible: true, position: placement.position }));
    timers.current.activate = setTimeout(
      () => setState((previous) => ({ ...previous, active: true, ...placement })),
      latest.current.tooltipDelay,
    );
  }, []);
  useEffect(() => {
    if (!state.visible) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        deactivate();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!(event.target instanceof Node && trigger.current?.contains(event.target))) deactivate();
    };
    document.addEventListener('keydown', escape, true);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('keydown', escape, true);
      document.removeEventListener('pointerdown', outside);
    };
  }, [state.visible, deactivate]);
  useEffect(() => () => Object.values(timers.current).forEach(clearTimeout), []);
  const triggerProps: TriggerProps = {
    onMouseEnter: (event) => {
      interaction.current.hovered = true;
      if (interaction.current.touching) return;
      activate(calculate(event.currentTarget));
      props.onMouseEnter?.(event);
    },
    onMouseLeave: (event) => {
      interaction.current.hovered = false;
      if (!interaction.current.focused) deactivate();
      props.onMouseLeave?.(event);
    },
    onClick: (event) => {
      if (interaction.current.ignoreClickUntil > Date.now()) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (tooltipHideOnClick && state.active) deactivate();
      if (tooltipShowOnClick && !state.active) activate(calculate(event.currentTarget));
      props.onClick?.(event);
    },
    onFocus: (event) => {
      interaction.current.focused = true;
      if (!interaction.current.touching) activate(calculate(event.currentTarget));
      props.onFocus?.(event);
    },
    onBlur: (event) => {
      if (!(
        event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)
      )) {
        interaction.current.focused = false;
        if (!interaction.current.hovered) deactivate();
      }
      props.onBlur?.(event);
    },
    onTouchStart: (event) => {
      interaction.current.touching = true;
      interaction.current.longPressed = false;
      clearTimeout(timers.current.touch);
      clearTimeout(timers.current.release);
      const element = event.currentTarget;
      timers.current.touch = setTimeout(() => {
        interaction.current.longPressed = true;
        activate(calculate(element));
      }, 500);
      props.onTouchStart?.(event);
    },
    onTouchEnd: (event) => {
      interaction.current.touching = false;
      clearTimeout(timers.current.touch);
      if (interaction.current.longPressed) {
        interaction.current.ignoreClickUntil = Date.now() + 750;
        timers.current.release = setTimeout(deactivate, 1500);
      }
      props.onTouchEnd?.(event);
    },
    onTouchMove: (event) => {
      interaction.current.touching = false;
      clearTimeout(timers.current.touch);
      clearTimeout(timers.current.release);
      deactivate();
      props.onTouchMove?.(event);
    },
    onTouchCancel: (event) => {
      interaction.current.touching = false;
      clearTimeout(timers.current.touch);
      clearTimeout(timers.current.release);
      deactivate();
      props.onTouchCancel?.(event);
    },
    'aria-describedby':
      [props['aria-describedby'], state.visible ? id : undefined].filter(Boolean).join(' ') ||
      undefined,
  };
  const positionClass =
    state.position === 'left'
      ? theme.tooltipLeft
      : state.position === 'right'
        ? theme.tooltipRight
        : state.position === 'top'
          ? theme.tooltipTop
          : undefined;
  const transitionEnd = (event: TransitionEvent<HTMLSpanElement>) => {
    if (event.propertyName === 'transform' && !state.active) {
      clearTimeout(timers.current.hide);
      setState((previous) => ({ ...previous, visible: false }));
    }
  };
  return {
    triggerProps,
    tooltip: state.visible ? (
      <Portal>
        <span
          id={id}
          role="tooltip"
          ref={node}
          className={classnames(theme.tooltip, state.active && theme.tooltipActive, positionClass)}
          data-react-toolbox="tooltip"
          style={{ top: state.top, left: state.left }}
          onTransitionEnd={transitionEnd}
        >
          <span className={theme.tooltipInner}>{tooltip}</span>
        </span>
      </Portal>
    ) : null,
  };
}

export function tooltipFactory(options: TooltipOptions = {}) {
  return function withTooltip<C extends ElementType>(Component: C) {
    return function TooltippedComponent(props: ComponentPropsWithRef<C> & TooltipProps) {
      const {
        children,
        theme,
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
        ...attributes
      } = props;
      const behavior = useTooltip({
        tooltip,
        tooltipDelay,
        tooltipHideOnClick,
        tooltipPosition,
        tooltipShowOnClick,
        theme: mergeTheme(mergeTheme(defaults, options.theme), theme),
        onClick,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
        onTouchCancel,
        'aria-describedby': attributes['aria-describedby'],
      });
      return createElement(
        Component,
        {
          ...attributes,
          className,
          ...behavior.triggerProps,
          ...(typeof Component !== 'string' && options.passthrough !== false ? { theme } : {}),
        },
        children,
        behavior.tooltip,
      );
    };
  };
}
export const Tooltip = tooltipFactory();
export default Tooltip;
