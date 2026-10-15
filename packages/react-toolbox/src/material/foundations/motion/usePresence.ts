'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import useReducedMotion from './useReducedMotion';

/** Keep the original delayed entrance and retained exit DOM without a HOC. */
export default function usePresence(active: boolean, delay = 500) {
  const reducedMotion = useReducedMotion();
  const previous = useRef(active);
  const [present, setPresent] = useState(active);
  const [visible, setVisible] = useState(active);
  useLayoutEffect(() => {
    if (reducedMotion) {
      previous.current = active;
      setPresent(active);
      setVisible(active);
      return;
    }
    if (previous.current === active) return;
    previous.current = active;
    setPresent(true);
    setVisible(false);
    const timer = setTimeout(() => (active ? setVisible(true) : setPresent(false)), active ? 20 : delay);
    return () => clearTimeout(timer);
  }, [active, reducedMotion]);
  return { present, visible };
}
