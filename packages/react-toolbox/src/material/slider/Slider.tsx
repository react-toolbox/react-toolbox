'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { SliderClassNames } from './types';

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
  type SyntheticEvent,
  type TouchEvent,
} from 'react';
import { cn } from '../foundations/styles/cn';
import Input, { type InputHandle } from '../input';
import ProgressBar from '../progress-bar';
import useFormReset from '../foundations/forms/useFormReset';

export type { SliderClassNames } from './types';
export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onDragStart' | 'defaultValue'> {
  buffer?: number;
  defaultValue?: number;
  name?: string;
  form?: string;
  /** Fires after a completed drag, keyboard change, or editable value commit. */
  onValueCommit?: (value: number) => void;
  disabled?: boolean;
  editable?: boolean;
  max?: number;
  min?: number;
  onChange?: (value: number, event?: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onDragStart?: () => void;
  onDragStop?: () => void;
  pinned?: boolean;
  snaps?: boolean;
  step?: number;
  /** Classes for the component's rendered parts. */
  classNames?: SliderClassNames;
  value?: number;
  ref?: Ref<HTMLDivElement>;
}
const decimalPlaces = (number: number) => {
  const [coefficient, exponent = '0'] = number.toString().split('e');
  return Math.max(0, (coefficient.split('.')[1] || '').length - Number(exponent));
};

export function Slider({
  buffer = 0,
  defaultValue = 0,
  name,
  form,
  dir,
  onValueCommit,
  className = '',
  disabled = false,
  editable = false,
  max = 100,
  min = 0,
  onChange,
  onDragStart,
  onDragStop,
  onKeyDown,
  onMouseDown,
  onTouchStart,
  pinned = false,
  snaps = false,
  step = 0.01,
  style,
  tabIndex,
  classNames,
  value: controlledValue,
  ref,
  ...other
}: SliderProps) {
  const [internalValue, setValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const native = useRef<HTMLInputElement>(null);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  useEffect(() => {
    if (container.current)
      setDirection(
        dir === 'rtl' || (dir !== 'ltr' && getComputedStyle(container.current).direction === 'rtl') ? 'rtl' : 'ltr',
      );
  }, [dir]);
  useFormReset(native, () => {
    if (controlledValue === undefined) setValue(defaultValue);
    setInputValue(null);
  });
  const latestValue = useRef(value);
  latestValue.current = value;
  const change = (next: number, event?: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    latestValue.current = next;
    if (controlledValue === undefined) setValue(next);
    if (event) onChange?.(next, event);
    else onChange?.(next);
  };
  const container = useRef<HTMLDivElement>(null);
  const knob = useRef<HTMLDivElement>(null);
  const input = useRef<InputHandle>(null);
  const cancelled = useRef(false);
  const drag = useRef<{ start: number; length: number; touch: boolean; initial: number } | null>(null);
  const [pressed, setPressed] = useState(false);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const stepSize = Number.isFinite(step) && step > 0 ? step : 1;
  const decimals = Math.min(20, Math.max(decimalPlaces(stepSize), decimalPlaces(min), decimalPlaces(max)));
  const forInput = (number: number) => (decimals > 0 ? number.toFixed(decimals) : number.toString());
  function trim(number: number) {
    if (!Number.isFinite(number) || number <= min) return min;
    if (number >= max) return max;
    const precision = 10 ** decimals;
    return Math.round(number * precision) / precision;
  }
  useEffect(() => {
    setInputValue((current) => (current === null ? null : decimals > 0 ? value.toFixed(decimals) : value.toString()));
  }, [value, decimals]);

  function positionToValue(x: number) {
    const bounds = drag.current;
    if (!bounds || bounds.length <= 0 || max <= min) return trim(value);
    if (direction === 'rtl') x = bounds.start + bounds.length - (x - bounds.start);
    if (x <= bounds.start) return min;
    if (x >= bounds.start + bounds.length) return max;
    return trim(Math.round((((x - bounds.start) / bounds.length) * (max - min)) / stepSize) * stepSize + min);
  }
  function end(event?: Event) {
    if (!drag.current) return;
    const changed = latestValue.current !== drag.current.initial;
    drag.current = null;
    setPressed(false);
    onDragStop?.();
    if (event && event.type !== 'touchcancel' && changed) onValueCommit?.(latestValue.current);
  }
  useEffect(() => {
    if (disabled) {
      container.current?.blur();
      end();
    }
  }, [disabled]);
  useEffect(() => {
    if (!pressed || disabled) return;
    function move(x: number) {
      const next = positionToValue(x);
      if (next !== latestValue.current) change(next);
    }
    const mouseMove = (event: globalThis.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      move(event.clientX);
    };
    const touchMove = (event: globalThis.TouchEvent) => {
      if (event.cancelable) event.preventDefault();
      if (event.touches[0]) move(event.touches[0].pageX - window.scrollX);
    };
    if (drag.current?.touch) {
      document.addEventListener('touchmove', touchMove, { passive: false });
      document.addEventListener('touchend', end);
      document.addEventListener('touchcancel', end);
    } else {
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', end);
    }
    return () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', end);
      document.removeEventListener('touchmove', touchMove);
      document.removeEventListener('touchend', end);
      document.removeEventListener('touchcancel', end);
    };
  }, [pressed, disabled, value, min, max, stepSize, decimals, onChange, onDragStop, onValueCommit, direction]);

  function start(x: number, touch: boolean) {
    if (!container.current || !knob.current) return;
    if (inputValue !== null) input.current?.blur();
    const { left, width } = container.current.getBoundingClientRect();
    drag.current = {
      start: left + knob.current.getBoundingClientRect().width / 2,
      length: width,
      touch,
      initial: value,
    };
    setPressed(true);
    onDragStart?.();
    change(positionToValue(x));
  }
  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    onMouseDown?.(event);
    if (disabled || event.defaultPrevented || event.button !== 0) return;
    container.current?.focus({ preventScroll: true });
    start(event.clientX, false);
    event.preventDefault();
    event.stopPropagation();
  }
  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    onTouchStart?.(event);
    if (disabled || event.defaultPrevented || event.touches.length !== 1 || !event.touches[0]) return;
    start(event.touches[0].pageX - window.scrollX, true);
    event.preventDefault();
    event.stopPropagation();
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (disabled || event.defaultPrevented) return;
    const pressedKey = event.key || event.code;
    const key =
      direction === 'rtl' && (pressedKey === 'ArrowLeft' || pressedKey === 'ArrowRight')
        ? pressedKey === 'ArrowLeft'
          ? 'ArrowRight'
          : 'ArrowLeft'
        : pressedKey;
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      !['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(key)
    )
      return;
    event.preventDefault();
    const position = (value - min) / stepSize;
    const increment = key === 'PageUp' || key === 'PageDown' || event.shiftKey ? 10 : 1;
    const stop =
      key === 'ArrowUp' || key === 'ArrowRight' || key === 'PageUp'
        ? Math.floor(position + 1e-9) + increment
        : Math.ceil(position - 1e-9) - increment;
    const next = key === 'Home' ? min : key === 'End' ? max : trim(min + stop * stepSize);
    if (next !== value) {
      change(next);
      onValueCommit?.(next);
    }
  }
  const span = max - min;
  const count = span > 0 ? Math.ceil(span / stepSize) : 0;
  const stride = Math.max(1, Math.ceil(count / 1000));
  const stops =
    snaps && span > 0
      ? [...Array.from({ length: Math.ceil(count / stride) }, (_, i) => i * stride * stepSize), span]
      : [];
  return (
    <div
      className={cn(
        'rt-slider-slider',
        '[&[disabled]]:cursor-auto [&[disabled]]:pointer-events-none',
        classNames?.slider,
        editable &&
          cn(
            'rt-slider-editable',
            '[.rt-slider-slider&]:items-center [.rt-slider-slider&]:flex [.rt-slider-slider&]:flex-row',
            classNames?.editable,
          ),
        pinned && cn('rt-slider-pinned', classNames?.pinned),
        pressed && cn('rt-slider-pressed', classNames?.pressed),
        value === min && cn('rt-slider-ring', classNames?.ring),
        className,
      )}
      {...{ disabled }}
      data-react-toolbox="slider"
      style={style}
      dir={dir}
      ref={ref}
    >
      <div
        {...other}
        ref={container}
        role="slider"
        aria-orientation="horizontal"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={trim(value)}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : (tabIndex ?? 0)}
        className={cn(
          'rt-slider-container',
          'h-[max(48px,var(--slider-knob-size))] mr-(--slider-knob-size) relative [outline:none] [touch-action:pan-y] [-webkit-user-select:none] [-moz-user-select:none] select-none w-[calc(100%-var(--slider-knob-size))]',
          materialRoot,
          materialDescendants,
          '[&:not(:last-child)]:mr-[calc(var(--slider-side-separation)+var(--slider-knob-size))]',
          '[&:not(:first-child)]:ml-(--slider-side-separation)',
          classNames?.container,
        )}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <input ref={native} type="hidden" name={name} form={form} disabled={disabled} value={trim(value)} />
        <div
          ref={knob}
          className={cn(
            'rt-slider-knob',
            'items-center bg-transparent flex flex-row h-(--slider-knob-size) justify-center left-0 relative top-[max(0px,calc((48px-var(--slider-knob-size))/2))] w-(--slider-knob-size) z-(--z-index-higher)',
            "[.rt-slider-slider:not([disabled]):has(.rt-slider-container:focus-visible)_&::before]:bg-(--slider-main-color) [.rt-slider-slider:not([disabled]):has(.rt-slider-container:focus-visible)_&::before]:rounded-[50%] [.rt-slider-slider:not([disabled]):has(.rt-slider-container:focus-visible)_&::before]:bottom-0 [.rt-slider-slider:not([disabled]):has(.rt-slider-container:focus-visible)_&::before]:[content:''] [.rt-slider-slider:not([disabled]):has(.rt-slider-container:focus-visible)_&::before]:left-0 [.rt-slider-slider:not([disabled]):has(.rt-slider-container:focus-visible)_&::before]:opacity-[0.26] [.rt-slider-slider:not([disabled]):has(.rt-slider-container:focus-visible)_&::before]:absolute [.rt-slider-slider:not([disabled]):has(.rt-slider-container:focus-visible)_&::before]:right-0 [.rt-slider-slider:not([disabled]):has(.rt-slider-container:focus-visible)_&::before]:top-0 [.rt-slider-slider:not([disabled]):has(.rt-slider-container:focus-visible)_&::before]:z-(--z-index-normal)",
            '[.rt-slider-slider.rt-slider-ring:has(.rt-slider-container:focus-visible)_&&::before]:bg-(--slider-track-focus-color)',
            classNames?.knob,
          )}
          style={{
            position: direction === 'rtl' ? 'absolute' : undefined,
            left: `${direction === 'rtl' ? 100 - (span > 0 ? (100 * (trim(value) - min)) / span : 0) : span > 0 ? (100 * (trim(value) - min)) / span : 0}%`,
          }}
        >
          <div
            className={cn(
              'rt-slider-innerknob',
              'bg-(--slider-main-color) rounded-[50%] h-(--slider-inner-knob-size) duration-100 [transition-property:height,width,background-color,border] [transition-timing-function:var(--animation-curve-default)] w-(--slider-inner-knob-size) z-(--z-index-high)',
              '[.rt-slider-slider[disabled]_&]:bg-(--slider-disabled-color) [.rt-slider-slider[disabled]_&]:h-[calc(0.8*var(--unit))] [.rt-slider-slider[disabled]_&]:w-[calc(0.8*var(--unit))] [.rt-slider-slider[disabled]_&]:[box-shadow:0_0_0_calc(0.2*var(--unit))_var(--rt-color-background)]',
              "[.rt-slider-slider.rt-slider-pinned_&::before]:bg-(--slider-main-color) [.rt-slider-slider.rt-slider-pinned_&::before]:rounded-[50%_50%_50%_0] [.rt-slider-slider.rt-slider-pinned_&::before]:[content:''] [.rt-slider-slider.rt-slider-pinned_&::before]:h-(--slider-pin-size) [.rt-slider-slider.rt-slider-pinned_&::before]:left-0 [.rt-slider-slider.rt-slider-pinned_&::before]:ml-[calc((var(--slider-knob-size)-var(--slider-pin-size))/2)] [.rt-slider-slider.rt-slider-pinned_&::before]:absolute [.rt-slider-slider.rt-slider-pinned_&::before]:top-0 [.rt-slider-slider.rt-slider-pinned_&::before]:transform-[rotate(-45deg)_scale(0)_translate(0)] [.rt-slider-slider.rt-slider-pinned_&::before]:[transition:transform_0.2s_ease,background-color_0.18s_ease] [.rt-slider-slider.rt-slider-pinned_&::before]:w-(--slider-pin-size)",
              '[.rt-slider-slider.rt-slider-pinned_&::after]:text-(--rt-color-background) [.rt-slider-slider.rt-slider-pinned_&::after]:[content:attr(data-value)] [.rt-slider-slider.rt-slider-pinned_&::after]:text-[10px] [.rt-slider-slider.rt-slider-pinned_&::after]:h-(--slider-pin-size) [.rt-slider-slider.rt-slider-pinned_&::after]:left-0 [.rt-slider-slider.rt-slider-pinned_&::after]:absolute [.rt-slider-slider.rt-slider-pinned_&::after]:text-center [.rt-slider-slider.rt-slider-pinned_&::after]:top-0 [.rt-slider-slider.rt-slider-pinned_&::after]:transform-[scale(0)_translate(0)] [.rt-slider-slider.rt-slider-pinned_&::after]:[transition:transform_0.2s_ease,background-color_0.18s_ease] [.rt-slider-slider.rt-slider-pinned_&::after]:w-(--slider-knob-size)',
              '[.rt-slider-slider.rt-slider-ring_&]:bg-transparent [.rt-slider-slider.rt-slider-ring_&]:[border:var(--slider-empty-knob-border)_solid_var(--slider-track-color)]',
              '[.rt-slider-slider.rt-slider-ring_&::before]:bg-(--slider-main-color)',
              '[.rt-slider-slider.rt-slider-ring.rt-slider-pinned_&]:bg-(--rt-color-background)',
              '[.rt-slider-slider.rt-slider-pressed.rt-slider-pinned_&::before]:transform-[rotate(-45deg)_scale(1)_translate(var(--slider-pin-elevation),calc(-1*var(--slider-pin-elevation)))] [.rt-slider-slider.rt-slider-pressed.rt-slider-pinned_&::before]:delay-100',
              '[.rt-slider-slider.rt-slider-pressed.rt-slider-pinned_&::after]:transform-[scale(1)_translate(0,calc(-1*var(--slider-pin-elevation)))] [.rt-slider-slider.rt-slider-pressed.rt-slider-pinned_&::after]:delay-100',
              '[.rt-slider-slider.rt-slider-pressed:not(.rt-slider-pinned)_&]:h-(--slider-pressed-knob-size) [.rt-slider-slider.rt-slider-pressed:not(.rt-slider-pinned)_&]:transform-[translateZ(0)] [.rt-slider-slider.rt-slider-pressed:not(.rt-slider-pinned)_&]:w-(--slider-pressed-knob-size)',
              '[@media_(hover:_hover)]:[.rt-slider-slider:not([disabled]):not(.rt-slider-pinned):not(.rt-slider-pressed)_.rt-slider-knob:hover_&]:h-(--slider-hover-knob-size) [@media_(hover:_hover)]:[.rt-slider-slider:not([disabled]):not(.rt-slider-pinned):not(.rt-slider-pressed)_.rt-slider-knob:hover_&]:w-(--slider-hover-knob-size)',
              '[.rt-slider-slider:not([disabled]).rt-slider-ring:has(.rt-slider-container:focus-visible)_&]:border-(--slider-track-focus-color)',
              '[.rt-slider-slider:not([disabled]).rt-slider-ring.rt-slider-pressed_&]:border-(--slider-track-focus-color)',
              classNames?.innerknob,
            )}
            data-value={trim(value)}
          />
        </div>
        <div
          style={direction === 'rtl' ? { transform: 'scaleX(-1)' } : undefined}
          className={cn(
            'rt-slider-progress',
            'h-(--slider-knob-size) left-[calc(var(--slider-knob-size)/2)] absolute top-[max(0px,calc((48px-var(--slider-knob-size))/2))] w-full',
            '[.rt-slider-slider.rt-slider-ring_&]:left-[calc(var(--slider-knob-size)/2+var(--slider-empty-knob-border)*2)] [.rt-slider-slider.rt-slider-ring_&]:[transition:left_0.18s_ease,width_0.18s_ease] [.rt-slider-slider.rt-slider-ring_&]:w-[calc(100%-var(--slider-empty-knob-border)*2)]',
            '[.rt-slider-slider.rt-slider-ring.rt-slider-pinned_&]:left-[calc(var(--slider-knob-size)/2)] [.rt-slider-slider.rt-slider-ring.rt-slider-pinned_&]:w-full',
            '[.rt-slider-slider.rt-slider-pressed:not(.rt-slider-pinned).rt-slider-ring_&]:left-[calc(var(--slider-knob-size)/2+(var(--slider-pressed-knob-size)-var(--slider-empty-knob-border)*2)/2)] [.rt-slider-slider.rt-slider-pressed:not(.rt-slider-pinned).rt-slider-ring_&]:w-[calc(100%-((var(--slider-pressed-knob-size)-var(--slider-empty-knob-border)*2)/2))]',
            classNames?.progress,
          )}
        >
          <ProgressBar
            aria-hidden="true"
            disabled={disabled}
            className={cn(
              'rt-slider-innerprogress',
              '[.rt-slider-progress_&]:[background:var(--slider-track-color)] [.rt-slider-progress_&]:h-(--slider-bar-height) [.rt-slider-progress_&]:absolute [.rt-slider-progress_&]:top-[calc(var(--slider-knob-size)/2-var(--slider-bar-height)/2)]',
              "[.rt-slider-progress_&_[data-ref='value']]:duration-[0s]",
              '[.rt-slider-slider:not([disabled]):has(.rt-slider-container:focus-visible)_&]:[background:var(--slider-track-focus-color)]',
              '[.rt-slider-slider:not([disabled]).rt-slider-pressed_&]:[background:var(--slider-track-focus-color)]',
              "[.rt-slider-slider[disabled]_&_[data-ref='value']]:bg-(--slider-disabled-color)",
              classNames?.innerprogress,
            )}
            max={max}
            min={min}
            mode="determinate"
            value={value}
            buffer={buffer}
          />
          {stops.length > 0 && (
            <div
              className={cn(
                'rt-slider-snaps',
                'flex flex-row h-(--slider-snap-size) left-0 pointer-events-none absolute top-[calc(var(--slider-knob-size)/2-var(--slider-snap-size)/2)] w-full',
                "[&::after]:bg-(--slider-snap-color) [&::after]:rounded-[50%] [&::after]:[content:''] [&::after]:hidden [&::after]:h-(--slider-snap-size) [&::after]:w-(--slider-snap-size)",
                classNames?.snaps,
              )}
            >
              {stops.map((stop) => (
                <div
                  key={stop}
                  className={cn(
                    'rt-slider-snap',
                    'absolute transform-[translateX(-50%)]',
                    "[&::after]:bg-(--slider-snap-color) [&::after]:rounded-[50%] [&::after]:[content:''] [&::after]:block [&::after]:h-(--slider-snap-size) [&::after]:w-(--slider-snap-size)",
                    classNames?.snap,
                  )}
                  style={{ left: `${(100 * stop) / span}%` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {editable && (
        <Input
          ref={input}
          className={cn(
            'rt-slider-input',
            'mb-0 p-0 w-(--slider-input-width)',
            '[&>input]:text-center',
            classNames?.input,
          )}
          disabled={disabled}
          aria-label={other['aria-label'] ? `${other['aria-label']} value` : undefined}
          aria-labelledby={other['aria-labelledby']}
          inputMode="decimal"
          onFocus={() => setInputValue(forInput(value))}
          onChange={setInputValue}
          onBlur={(event) => {
            const parsed = parseFloat(inputValue ?? '');
            setInputValue(null);
            if (!cancelled.current) {
              const next = trim(Number.isFinite(parsed) ? parsed : value);
              change(next, event);
              if (next !== value) onValueCommit?.(next);
            }
            cancelled.current = false;
          }}
          onKeyDown={(event) => {
            const key = event.key || event.code;
            if (key === 'Escape') cancelled.current = true;
            if (key === 'Enter' || key === 'Escape') {
              event.preventDefault();
              input.current?.blur();
            }
          }}
          value={inputValue ?? forInput(value)}
        />
      )}
    </div>
  );
}
export default Slider;
