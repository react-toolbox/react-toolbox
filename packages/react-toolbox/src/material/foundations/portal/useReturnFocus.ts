'use client';

import { createContext, useContext, useEffect, useRef, useState, type RefObject } from 'react';

/** The nearest Dialog or Drawer content, used when a nested opener no longer exists. */
export const ReturnFocusParent = createContext<RefObject<HTMLElement | null> | null>(null);

/**
 * Whether the nearest Dialog or Drawer root is modal. Nonmodal roots keep Radix's own close focus,
 * which deliberately leaves focus on an outside control that dismissed the content.
 */
export const ReturnFocusModal = createContext(true);

/**
 * Whether the containing Dialog or Drawer content has run its mount effects. An open nested root waits for it so the
 * outer modal hides the page before the inner portal mounts; otherwise the outer one hides the inner portal.
 */
export const ReturnFocusParentMounted = createContext(true);

/** Radix only returns focus to a Trigger, which still wins after this runs; fall back to the opener, then the containing modal content. */
export function useReturnFocus(onCloseAutoFocus?: (event: Event) => void) {
  const parent = useContext(ReturnFocusParent);
  const modal = useContext(ReturnFocusModal);
  const node = useRef<HTMLElement | null>(null);
  const opener = useRef<Element | null>(null);
  /** Capture on every render while closed: the opener can be removed in the same commit that opens the content. */
  if (!node.current && typeof document !== 'undefined') opener.current = document.activeElement;
  const handleCloseAutoFocus = (event: Event) => {
    onCloseAutoFocus?.(event);
    if (event.defaultPrevented || !modal) return;
    [opener.current, parent?.current]
      .find(
        (element): element is HTMLElement =>
          element instanceof HTMLElement &&
          element !== document.body &&
          element.isConnected &&
          !element.closest('[inert]'),
      )
      ?.focus({ preventScroll: true });
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return { node, handleCloseAutoFocus, mounted };
}
