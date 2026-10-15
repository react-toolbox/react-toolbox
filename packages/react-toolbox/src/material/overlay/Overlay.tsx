'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { OverlayTheme } from './types';

import { useEffect, useRef, type HTMLAttributes, type Ref } from 'react';
import { cn } from '../foundations/styles/cn';

export type { OverlayTheme, OverlayClassNames } from './types';
export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  lockScroll?: boolean;
  onEscKeyDown?: (event: KeyboardEvent) => void;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: OverlayTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: OverlayTheme;
  ref?: Ref<HTMLDivElement>;
}
const scrollLocks = new Set<object>();
const activeOverlays = new Set<object>();
let previousOverflow = '';
export function Overlay({
  active = false,
  lockScroll = true,
  onEscKeyDown,
  onClick,
  theme: legacyTheme,
  classNames,
  className,
  ref,
  ...attributes
}: OverlayProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const identity = useRef({});
  const escape = useRef(onEscKeyDown);
  escape.current = onEscKeyDown;
  useEffect(() => {
    if (!active) return;
    const token = identity.current;
    activeOverlays.add(token);
    const handleKey = (event: KeyboardEvent) => {
      if (
        Array.from(activeOverlays).at(-1) === token &&
        !event.defaultPrevented &&
        (event.key === 'Escape' || event.which === 27) &&
        escape.current
      ) {
        event.preventDefault();
        escape.current(event);
      }
    };
    document.body.addEventListener('keydown', handleKey);
    return () => {
      activeOverlays.delete(token);
      document.body.removeEventListener('keydown', handleKey);
    };
  }, [active]);
  useEffect(() => {
    if (!active || !lockScroll) return;
    const token = identity.current;
    if (!scrollLocks.size) previousOverflow = document.body.style.overflow;
    scrollLocks.add(token);
    document.body.style.overflow = 'hidden';
    return () => {
      if (scrollLocks.delete(token) && !scrollLocks.size) document.body.style.overflow = previousOverflow;
    };
  }, [active, lockScroll]);
  return (
    <div
      {...attributes}
      ref={ref}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick?.(event);
      }}
      className={cn(
        'rt-overlay-overlay',
        'bg-(--overlay-color) bottom-0 h-screen left-0 opacity-0 pointer-events-none fixed top-0 [transition:opacity_var(--animation-duration)_var(--animation-curve-default)] w-screen',
        theme?.overlay,
        active &&
          cn(
            'rt-overlay-active',
            '[.rt-overlay-overlay&]:opacity-(--overlay-opacity) [.rt-overlay-overlay&]:[pointer-events:all]',
            theme?.active,
          ),
        className,
      )}
    />
  );
}
export default Overlay;
