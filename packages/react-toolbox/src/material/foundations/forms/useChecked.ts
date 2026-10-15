'use client';

import { useEffect, useState, type RefObject } from 'react';
import useFormReset from './useFormReset';

/** Native form semantics with controlled or default state and synchronized visuals. */
export default function useChecked(
  input: RefObject<HTMLInputElement | null>,
  checked: boolean | undefined,
  defaultChecked = false,
) {
  const [internal, setInternal] = useState(defaultChecked);
  useFormReset(input, () => {
    if (checked === undefined) setInternal(input.current?.checked ?? defaultChecked);
  });
  useEffect(() => {
    if (checked !== undefined || input.current?.type !== 'radio') return;
    // Native radio groups also uncheck peers; that does not fire a change event
    // on each peer. Read the browser's group state after any radio changes.
    const sync = (event: Event) => {
      if (event.target instanceof HTMLInputElement && event.target.type === 'radio' && input.current)
        setInternal(input.current.checked);
    };
    document.addEventListener('change', sync);
    return () => document.removeEventListener('change', sync);
  }, [checked, input]);
  return [checked ?? internal, setInternal] as const;
}
