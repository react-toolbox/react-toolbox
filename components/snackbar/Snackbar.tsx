'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
  type Ref,
} from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import { Button } from '../button';
import Portal from '../hoc/Portal';
import usePresence from '../hoc/usePresence';
import defaults from './theme';

export type SnackbarTheme = Partial<typeof defaults>;
export interface SnackbarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  action?: string;
  active?: boolean;
  delay?: number;
  label?: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
  onTimeout?: () => void;
  timeout?: number;
  type?: 'accept' | 'cancel' | 'warning';
  theme?: SnackbarTheme;
  ref?: Ref<HTMLDivElement>;
}
interface Clock {
  timer?: ReturnType<typeof setTimeout>;
  remaining: number;
  started: number;
  pauses: Set<string>;
}
export function Snackbar({
  action,
  active = false,
  delay = 500,
  children,
  label,
  onClick,
  onTimeout,
  timeout = 0,
  type,
  theme: overrides,
  className,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ref,
  ...attributes
}: SnackbarProps) {
  const theme = mergeTheme(defaults, overrides);
  const { present, visible } = usePresence(active, delay);
  const latest = useRef({ visible, timeout, onTimeout });
  latest.current = { visible, timeout, onTimeout };
  const clock = useRef<Clock>({ remaining: 0, started: 0, pauses: new Set() });
  const [labelNode, setLabelNode] = useState<HTMLSpanElement | null>(null);
  const [multiline, setMultiline] = useState(false);
  const schedule = useCallback(() => {
    const state = clock.current;
    if (
      !latest.current.visible ||
      state.remaining <= 0 ||
      state.pauses.size ||
      state.timer !== undefined
    )
      return;
    state.started = Date.now();
    state.timer = setTimeout(() => {
      state.timer = undefined;
      state.remaining = 0;
      latest.current.onTimeout?.();
    }, state.remaining);
  }, []);
  const pause = useCallback((reason: string) => {
    const state = clock.current;
    state.pauses.add(reason);
    if (state.timer !== undefined) {
      clearTimeout(state.timer);
      state.timer = undefined;
      state.remaining = Math.max(0, state.remaining - (Date.now() - state.started));
    }
  }, []);
  const resume = useCallback(
    (reason: string, restart = false) => {
      if (restart && clock.current.pauses.has(reason))
        clock.current.remaining = latest.current.timeout;
      clock.current.pauses.delete(reason);
      schedule();
    },
    [schedule],
  );
  useEffect(() => {
    if (!present) return;
    if (document.hidden) clock.current.pauses.add('hidden');
    const blur = () => pause('window');
    const focus = () => resume('window', true);
    const visibility = () => (document.hidden ? pause('hidden') : resume('hidden', true));
    window.addEventListener('blur', blur);
    window.addEventListener('focus', focus);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      window.removeEventListener('blur', blur);
      window.removeEventListener('focus', focus);
      document.removeEventListener('visibilitychange', visibility);
      clearTimeout(clock.current.timer);
      clock.current.timer = undefined;
      clock.current.pauses.clear();
    };
  }, [present, pause, resume]);
  useEffect(() => {
    clearTimeout(clock.current.timer);
    clock.current.timer = undefined;
    clock.current.remaining = timeout;
    schedule();
  }, [visible, timeout, label, children, schedule]);
  useEffect(() => {
    if (!labelNode) return;
    const measure = () => {
      const lineHeight = parseFloat(getComputedStyle(labelNode).lineHeight);
      setMultiline(labelNode.getBoundingClientRect().height > lineHeight + 0.5);
    };
    measure();
    const observer =
      typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measure);
    if (observer) observer.observe(labelNode);
    else window.addEventListener('resize', measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [labelNode]);
  if (!present) return null;
  return (
    <Portal>
      <div
        {...attributes}
        ref={ref}
        data-react-toolbox="snackbar"
        data-multiline={multiline || undefined}
        className={classnames(
          theme.snackbar,
          type && theme[type],
          visible && theme.active,
          className,
        )}
        role={attributes.role || 'status'}
        aria-live={attributes['aria-live'] || 'polite'}
        aria-atomic="true"
        aria-hidden={!visible || undefined}
        inert={!visible || undefined}
        onMouseEnter={(event) => {
          pause('hover');
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          resume('hover');
          onMouseLeave?.(event);
        }}
        onFocus={(event) => {
          pause('focus');
          onFocus?.(event);
        }}
        onBlur={(event) => {
          if (!(
            event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)
          ))
            resume('focus');
          onBlur?.(event);
        }}
      >
        <span ref={setLabelNode} className={theme.label}>
          {label}
          {children}
        </span>
        {action ? <Button className={theme.button} label={action} onClick={onClick} /> : null}
      </div>
    </Portal>
  );
}
export default Snackbar;
