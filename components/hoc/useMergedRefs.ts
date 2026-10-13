import { useMemo, type Ref, type RefCallback } from 'react';

/** Compose callback/object refs, including React 19 callback cleanup. */
export default function useMergedRefs<T>(
  first: Ref<T> | undefined,
  second: Ref<T> | undefined,
): RefCallback<T> {
  return useMemo(
    () => (node) => {
      const cleanups = [first, second].map((ref) => {
        if (typeof ref === 'function') {
          const cleanup = ref(node);
          return () => {
            if (typeof cleanup === 'function') cleanup();
            else ref(null);
          };
        }
        if (ref) ref.current = node;
        return () => {
          if (ref) ref.current = null;
        };
      });
      return () => cleanups.forEach((cleanup) => cleanup());
    },
    [first, second],
  );
}
