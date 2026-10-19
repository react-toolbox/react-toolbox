'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { SliderClassNames } from './types';

import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent,
  type Ref,
  type SyntheticEvent,
} from 'react';
import { cn } from '../foundations/styles/cn';
import useFormReset from '../foundations/forms/useFormReset';
import Input, { type InputHandle } from '../input';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from './parts';

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
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onInput,
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
  const container = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => container.current as HTMLDivElement, []);
  const thumb = useRef<HTMLSpanElement>(null);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  useEffect(() => {
    if (container.current)
      setDirection(
        dir === 'rtl' || (dir !== 'ltr' && getComputedStyle(container.current).direction === 'rtl') ? 'rtl' : 'ltr',
      );
  }, [dir]);
  const change = (next: number, event?: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (controlledValue === undefined) setValue(next);
    if (event) onChange?.(next, event);
    else onChange?.(next);
  };
  const input = useRef<InputHandle>(null);
  const cancelled = useRef(false);
  const [pressed, setPressed] = useState(false);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const native = useRef<HTMLInputElement>(null);
  const resetting = useFormReset(native, () => {
    if (controlledValue === undefined) setValue(defaultValue);
    setInputValue(null);
  });
  const stepSize = Number.isFinite(step) && step > 0 ? step : 1;
  const decimals = Math.min(20, Math.max(decimalPlaces(stepSize), decimalPlaces(min), decimalPlaces(max)));
  const precision = 10 ** decimals;
  const forInput = (number: number) => (decimals > 0 ? number.toFixed(decimals) : number.toString());
  function trim(number: number) {
    if (!Number.isFinite(number) || number <= min) return min;
    if (number >= max) return max;
    return Math.round(number * precision) / precision;
  }
  useEffect(() => {
    setInputValue((current) => (current === null ? null : decimals > 0 ? value.toFixed(decimals) : value.toString()));
  }, [value, decimals]);
  useEffect(() => {
    if (!disabled) return;
    thumb.current?.blur();
    setPressed(false);
    if (pressed) onDragStop?.();
  }, [disabled]);
  function release() {
    if (!pressed) return;
    setPressed(false);
    onDragStop?.();
  }
  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    onPointerDown?.(event);
    if (disabled || event.defaultPrevented || event.button !== 0) return;
    if (inputValue !== null) input.current?.blur();
    setPressed(true);
    onDragStart?.();
  }
  const span = max - min;
  /** Radix snaps to the nearest step before clamping, so a max off the step grid (0..10 step 3) stops at 9. */
  const reach = Math.min(span, Math.round(span / stepSize) * stepSize);
  const count = span > 0 ? Math.floor(reach / stepSize) : 0;
  const stride = Math.max(1, Math.ceil(count / 1000));
  const stops =
    snaps && span > 0
      ? [
          ...new Set([
            ...Array.from({ length: Math.floor(count / stride) + 1 }, (_, i) => i * stride * stepSize),
            reach,
            span,
          ]),
        ]
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
      ref={container}
    >
      {/* Radix snaps to the step's decimal precision from zero, so it works on the offset from min. */}
      <SliderRoot
        asChild
        className={cn(
          'rt-slider-container',
          'h-[max(48px,var(--slider-knob-size))] mx-[calc(var(--slider-knob-size)/2)] w-[calc(100%-var(--slider-knob-size))] data-disabled:opacity-100',
          materialRoot,
          materialDescendants,
          '[&:not(:last-child)]:mr-[calc(var(--slider-side-separation)+var(--slider-knob-size)/2)]',
          classNames?.container,
        )}
        dir={direction}
        disabled={disabled}
        form={form}
        min={0}
        max={span}
        step={stepSize}
        value={[Math.round((trim(value) - min) * precision) / precision]}
        onValueChange={([next]) => {
          if (resetting.current) return;
          setInputValue(null);
          const resolved = trim(next + min);
          if (resolved !== value) change(resolved);
        }}
        onValueCommit={([next]) => onValueCommit?.(trim(next + min))}
      >
        <div
          {...other}
          onPointerDown={handlePointerDown}
          onPointerUp={(event) => {
            onPointerUp?.(event);
            release();
          }}
          onPointerCancel={(event) => {
            onPointerCancel?.(event);
            release();
          }}
          onInput={(event) => {
            /** Radix’s nameless input contains offsets, not public domain values. */
            if (event.target instanceof HTMLInputElement && !event.target.name) event.stopPropagation();
            else onInput?.(event);
          }}
        >
          <SliderTrack
            className={cn(
              'rt-slider-progress',
              '[transition:margin_0.18s_ease]',
              '[.rt-slider-slider.rt-slider-ring_&]:ms-[calc(var(--slider-empty-knob-border)*2)]',
              '[.rt-slider-slider.rt-slider-ring.rt-slider-pinned_&]:ms-0',
              '[.rt-slider-slider.rt-slider-pressed:not(.rt-slider-pinned).rt-slider-ring_&]:ms-[calc((var(--slider-pressed-knob-size)-var(--slider-empty-knob-border)*2)/2)]',
              '[.rt-slider-slider:not([disabled]):has(.rt-slider-thumb:focus-visible)_&]:bg-(--slider-track-focus-color)',
              '[.rt-slider-slider:not([disabled]).rt-slider-pressed_&]:bg-(--slider-track-focus-color)',
              classNames?.progress,
            )}
          >
            {buffer > 0 && (
              <span
                aria-hidden="true"
                className="rt-slider-buffer absolute inset-y-0 start-0 [background:linear-gradient(rgb(from_var(--slider-main-color-contrast)_r_g_b/70%),rgb(from_var(--slider-main-color-contrast)_r_g_b/70%)),var(--slider-main-color)]"
                style={{ width: `${span > 0 ? Math.min(100, Math.max(0, (100 * (buffer - min)) / span)) : 0}%` }}
              />
            )}
            <SliderRange
              className={cn(
                'rt-slider-innerprogress',
                '[.rt-slider-slider[disabled]_&]:bg-(--slider-disabled-color)',
                classNames?.innerprogress,
              )}
            />
            {stops.length > 0 && (
              <div
                className={cn(
                  'rt-slider-snaps',
                  'flex flex-row h-(--slider-snap-size) left-0 pointer-events-none absolute top-[calc((var(--slider-bar-height)-var(--slider-snap-size))/2)] w-full rtl:-scale-x-100',
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
          </SliderTrack>
          {/* A zero-size thumb keeps Radix's position linear so the Material knob travels the inset rail exactly. */}
          <SliderThumb
            aria-label={other['aria-label']}
            aria-labelledby={other['aria-labelledby']}
            aria-describedby={other['aria-describedby']}
            aria-valuetext={other['aria-valuetext']}
            ref={thumb}
            className="rt-slider-thumb size-0 bg-transparent before:hidden focus-visible:[box-shadow:none] data-disabled:size-0 data-disabled:bg-transparent data-disabled:[box-shadow:none]"
            tabIndex={disabled ? -1 : (tabIndex ?? 0)}
            aria-disabled={disabled || undefined}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={trim(value)}
          >
            <div
              className={cn(
                'rt-slider-knob',
                'absolute items-center bg-transparent flex flex-row h-(--slider-knob-size) justify-center left-[calc(var(--slider-knob-size)/-2)] top-[calc(var(--slider-knob-size)/-2)] w-(--slider-knob-size) z-(--z-index-higher)',
                "[.rt-slider-slider:not([disabled]):has(.rt-slider-thumb:focus-visible)_&::before]:bg-(--slider-main-color) [.rt-slider-slider:not([disabled]):has(.rt-slider-thumb:focus-visible)_&::before]:rounded-[50%] [.rt-slider-slider:not([disabled]):has(.rt-slider-thumb:focus-visible)_&::before]:bottom-0 [.rt-slider-slider:not([disabled]):has(.rt-slider-thumb:focus-visible)_&::before]:[content:''] [.rt-slider-slider:not([disabled]):has(.rt-slider-thumb:focus-visible)_&::before]:left-0 [.rt-slider-slider:not([disabled]):has(.rt-slider-thumb:focus-visible)_&::before]:opacity-[0.26] [.rt-slider-slider:not([disabled]):has(.rt-slider-thumb:focus-visible)_&::before]:absolute [.rt-slider-slider:not([disabled]):has(.rt-slider-thumb:focus-visible)_&::before]:right-0 [.rt-slider-slider:not([disabled]):has(.rt-slider-thumb:focus-visible)_&::before]:top-0 [.rt-slider-slider:not([disabled]):has(.rt-slider-thumb:focus-visible)_&::before]:z-(--z-index-normal)",
                '[.rt-slider-slider.rt-slider-ring:has(.rt-slider-thumb:focus-visible)_&&::before]:bg-(--slider-track-focus-color)',
                classNames?.knob,
              )}
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
                  '[.rt-slider-slider:not([disabled]).rt-slider-ring:has(.rt-slider-thumb:focus-visible)_&]:border-(--slider-track-focus-color)',
                  '[.rt-slider-slider:not([disabled]).rt-slider-ring.rt-slider-pressed_&]:border-(--slider-track-focus-color)',
                  classNames?.innerknob,
                )}
                data-value={trim(value)}
              />
            </div>
          </SliderThumb>
        </div>
      </SliderRoot>
      <input ref={native} type="hidden" name={name} form={form} disabled={disabled} value={trim(value)} />
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
