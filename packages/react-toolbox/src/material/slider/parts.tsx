'use client';
import './tokens.css';

import * as Primitive from '@radix-ui/react-slider';
import { createContext, useContext, type ComponentProps } from 'react';
import { cn } from '../foundations/styles/cn';

/** Radix keeps its hidden inputs enabled when disabled; omit their names from native form submission. */
const DisabledContext = createContext(false);

export type SliderRootProps = ComponentProps<typeof Primitive.Root>;
/** Radix owns range ordering, keyboard direction, form values and pointer capture. */
export function SliderRoot({ className, disabled = false, name, onPointerDown, ...props }: SliderRootProps) {
  return (
    <DisabledContext value={disabled}>
      <Primitive.Root
        disabled={disabled}
        name={disabled ? undefined : name}
        data-slot="SliderRoot"
        {...props}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          /** Secondary buttons open context menus; they must not move the value. */
          if (event.button !== 0) event.preventDefault();
        }}
        className={cn(
          'relative flex min-h-[48px] w-full touch-none select-none items-center data-[orientation=vertical]:min-h-[160px] data-[orientation=vertical]:w-[48px] data-[orientation=vertical]:flex-col',
          className,
        )}
      />
    </DisabledContext>
  );
}

export type SliderTrackProps = ComponentProps<typeof Primitive.Track>;
export function SliderTrack({ className, ...props }: SliderTrackProps) {
  return (
    <Primitive.Track
      data-slot="SliderTrack"
      {...props}
      className={cn(
        'relative h-(--slider-bar-height) grow bg-(--slider-track-color) data-[orientation=vertical]:h-full data-[orientation=vertical]:w-(--slider-bar-height)',
        className,
      )}
    />
  );
}

export type SliderRangeProps = ComponentProps<typeof Primitive.Range>;
export function SliderRange({ className, ...props }: SliderRangeProps) {
  return (
    <Primitive.Range
      data-slot="SliderRange"
      {...props}
      className={cn(
        'absolute bg-(--slider-main-color) data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full data-disabled:bg-(--slider-disabled-color)',
        className,
      )}
    />
  );
}

export type SliderThumbProps = ComponentProps<typeof Primitive.Thumb>;
/** Name each thumb separately (for example, Minimum price and Maximum price). */
export function SliderThumb({ className, name, onKeyDown, ...props }: SliderThumbProps) {
  const disabled = useContext(DisabledContext);
  return (
    <Primitive.Thumb
      data-slot="SliderThumb"
      name={disabled ? undefined : name}
      {...props}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        /** Leave platform shortcuts such as Alt+Arrow history navigation to the browser. */
        if (event.altKey || event.ctrlKey || event.metaKey) event.stopPropagation();
      }}
      className={cn(
        'relative block size-(--slider-inner-knob-size) rounded-full bg-(--slider-main-color) outline-none before:absolute before:left-1/2 before:top-1/2 before:size-[48px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full focus-visible:[box-shadow:0_0_0_10px_rgb(from_var(--slider-main-color)_r_g_b/26%)] data-disabled:cursor-not-allowed data-disabled:size-[calc(0.8*var(--unit))] data-disabled:bg-(--slider-disabled-color) data-disabled:[box-shadow:0_0_0_calc(0.2*var(--unit))_var(--rt-color-background)]',
        className,
      )}
    />
  );
}
