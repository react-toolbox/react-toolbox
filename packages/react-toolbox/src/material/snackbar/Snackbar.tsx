'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';

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
import { cn } from '../foundations/styles/cn';
import { Button } from '../button';
import Portal from '../foundations/portal/Portal';
import { usePortalTheme } from '../foundations/portal/usePortalTheme';
import usePresence from '../foundations/motion/usePresence';
import useMergedRefs from '../foundations/portal/useMergedRefs';

export interface SnackbarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  action?: string;
  active?: boolean;
  /** Override exit retention in milliseconds; by default it follows the surface animation. */
  delay?: number;
  label?: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
  onTimeout?: () => void;
  timeout?: number;
  type?: 'accept' | 'cancel' | 'warning';
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
  delay,
  children,
  label,
  onClick,
  onTimeout,
  timeout = 0,
  type,
  className,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ref,
  ...attributes
}: SnackbarProps) {
  const { present, visible, motionRef } = usePresence<HTMLDivElement>(active, delay);
  const surfaceRef = useMergedRefs(ref, motionRef);
  const theme = usePortalTheme(attributes.style);
  const latest = useRef({ visible, timeout, onTimeout });
  latest.current = { visible, timeout, onTimeout };
  const clock = useRef<Clock>({ remaining: 0, started: 0, pauses: new Set() });
  const [labelNode, setLabelNode] = useState<HTMLSpanElement | null>(null);
  const [multiline, setMultiline] = useState(false);
  const schedule = useCallback(() => {
    const state = clock.current;
    if (!latest.current.visible || state.remaining <= 0 || state.pauses.size || state.timer !== undefined) return;
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
      if (restart && clock.current.pauses.has(reason)) clock.current.remaining = latest.current.timeout;
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
  const restart = useCallback(() => {
    clearTimeout(clock.current.timer);
    clock.current.timer = undefined;
    clock.current.remaining = latest.current.timeout;
    schedule();
  }, [schedule]);
  useEffect(restart, [visible, timeout, restart]);
  useEffect(() => {
    if (!labelNode) return;
    /** JSX identity can change on every render; only a new rendered message restarts its clock. */
    let message = labelNode.textContent;
    const observer = new MutationObserver(() => {
      const next = labelNode.textContent;
      if (next === message) return;
      message = next;
      restart();
    });
    observer.observe(labelNode, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [labelNode, restart]);
  useEffect(() => {
    if (!labelNode) return;
    const measure = () => {
      const lineHeight = parseFloat(getComputedStyle(labelNode).lineHeight);
      setMultiline(labelNode.getBoundingClientRect().height > lineHeight + 0.5);
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measure);
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
        {...theme}
        style={{ ...theme.style, ...attributes.style }}
        ref={surfaceRef}
        data-react-toolbox="snackbar"
        data-multiline={multiline || undefined}
        className={cn(
          'rt-snackbar-snackbar',
          'items-center bg-(--snackbar-background-color) rounded-none bottom-0 text-(--snackbar-color) flex left-0 m-0 min-h-[calc(4.8*var(--unit))] p-[var(--snackbar-vertical-offset)_var(--snackbar-horizontal-offset)] fixed right-0 [transition:transform_var(--animation-duration-exit)_var(--animation-curve-fast-out-linear-in)] z-(--z-index-higher)',
          '[box-shadow:var(--shadow-6p)]',
          materialRoot,
          materialDescendants,
          '[&:not(.rt-snackbar-active)]:transform-[translateY(100%)]',
          '[@media_screen_and_(max-width:_599px)]:[&[data-multiline]]:min-h-[calc(8*var(--unit))]',
          '[@media_screen_and_(min-width:_600px)]:rounded-(--snackbar-border-radius) [@media_screen_and_(min-width:_600px)]:bottom-(--snackbar-horizontal-offset) [@media_screen_and_(min-width:_600px)]:left-(--snackbar-horizontal-offset) [@media_screen_and_(min-width:_600px)]:right-auto [@media_screen_and_(min-width:_600px)]:min-w-[calc(28.8*var(--unit))] [@media_screen_and_(min-width:_600px)]:max-w-[min(calc(56.8*var(--unit)),calc(100vw-4.8*var(--unit)))]',
          '[@media_screen_and_(min-width:_600px)]:[&:not(.rt-snackbar-active)]:transform-[translateY(calc(100%+var(--snackbar-horizontal-offset)))]',
          type &&
            (type === 'accept'
              ? 'rt-snackbar-accept'
              : type === 'cancel'
                ? 'rt-snackbar-cancel'
                : type === 'warning'
                  ? 'rt-snackbar-warning'
                  : undefined),
          visible &&
            cn(
              'rt-snackbar-active',
              '[.rt-snackbar-snackbar&]:transform-[translateY(0%)] [.rt-snackbar-snackbar&]:duration-(--animation-duration-enter) [.rt-snackbar-snackbar&]:ease-(--animation-curve-linear-out-slow-in)',
            ),
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
          if (!(event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)))
            resume('focus');
          onBlur?.(event);
        }}
      >
        <span
          ref={setLabelNode}
          className={cn('rt-snackbar-label', 'grow text-(length:--font-size-small) leading-[calc(2*var(--unit))]')}
        >
          {label}
          {children}
        </span>
        {action ? (
          <Button
            neutral={false}
            className={cn(
              'rt-snackbar-button',
              'text-(--snackbar-color)',
              'm-[calc(-0.8*var(--unit))_calc(-0.8*var(--unit))_calc(-0.8*var(--unit))_var(--snackbar-button-offset)] min-w-[calc(6.4*var(--unit))] pl-[calc(0.8*var(--unit))] pr-[calc(0.8*var(--unit))]',
              '[.rt-snackbar-snackbar.rt-snackbar-accept_&]:text-(--snackbar-color-accept)',
              '[.rt-snackbar-snackbar.rt-snackbar-warning_&]:text-(--snackbar-color-warning)',
              '[.rt-snackbar-snackbar.rt-snackbar-cancel_&]:text-(--snackbar-color-cancel)',
            )}
            label={action}
            onClick={onClick}
          />
        ) : null}
      </div>
    </Portal>
  );
}
export default Snackbar;
