'use client';

import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  if (typeof window.matchMedia !== 'function') return () => {};
  const media = window.matchMedia(query);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function getSnapshot() {
  return typeof window.matchMedia === 'function' && window.matchMedia(query).matches;
}

/** Respond to preference changes without reading browser state during SSR. */
export default function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
