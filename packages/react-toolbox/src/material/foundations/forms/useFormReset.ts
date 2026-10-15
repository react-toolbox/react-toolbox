'use client';

import { useEffect, useRef, type RefObject } from 'react';

/** Reset derived UI after the browser has reset its form, including external forms. */
export default function useFormReset(
  control: RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>,
  reset: () => void,
) {
  const latest = useRef(reset);
  latest.current = reset;
  useEffect(() => {
    const pending = new Set<ReturnType<typeof setTimeout>>();
    const listener = (event: Event) => {
      if (event.target !== control.current?.form) return;
      // Native reset-button activation can run microtasks before the reset's
      // default action. Wait for the next task to read the browser's new value.
      const timer = setTimeout(() => {
        pending.delete(timer);
        if (!event.defaultPrevented && control.current?.isConnected) latest.current();
      }, 0);
      pending.add(timer);
    };
    document.addEventListener('reset', listener, true);
    return () => {
      document.removeEventListener('reset', listener, true);
      pending.forEach(clearTimeout);
    };
  }, [control]);
}
