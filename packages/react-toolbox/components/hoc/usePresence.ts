'use client';

import { useLayoutEffect, useRef, useState } from 'react';

/** Keep the original delayed entrance and retained exit DOM without a HOC. */
export default function usePresence(active: boolean, delay = 500) {
  const previous = useRef(active);
  const [present, setPresent] = useState(active);
  const [visible, setVisible] = useState(active);
  useLayoutEffect(() => {
    if (previous.current === active) return;
    previous.current = active;
    setPresent(true);
    setVisible(false);
    const timer = setTimeout(
      () => (active ? setVisible(true) : setPresent(false)),
      active ? 20 : delay,
    );
    return () => clearTimeout(timer);
  }, [active]);
  return { present, visible };
}
