'use client';

import { useEffect, useRef, type HTMLAttributes, type Ref } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import defaults from './theme';

export type OverlayTheme = Partial<typeof defaults>;
export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  lockScroll?: boolean;
  onEscKeyDown?: (event: KeyboardEvent) => void;
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
  theme: overrides,
  className,
  ref,
  ...attributes
}: OverlayProps) {
  const theme = mergeTheme(defaults, overrides);
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
      if (scrollLocks.delete(token) && !scrollLocks.size)
        document.body.style.overflow = previousOverflow;
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
      className={classnames(theme.overlay, active && theme.active, className)}
    />
  );
}
export default Overlay;
