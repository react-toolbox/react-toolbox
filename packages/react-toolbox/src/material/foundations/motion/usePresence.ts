'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import useReducedMotion from './useReducedMotion';

/** Retain a surface until its own exit finishes, unless the consumer supplies an explicit lifetime. */
export default function usePresence<Element extends HTMLElement = HTMLElement>(active: boolean, delay?: number) {
  const reducedMotion = useReducedMotion();
  const [motionElement, setMotionElement] = useState<Element | null>(null);
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
  }, [active, reducedMotion]);
  useLayoutEffect(() => {
    if (!active || !present || visible || reducedMotion || !motionElement) return;
    /** Portals may attach after the opening render; establish hidden styles before starting the entrance. */
    motionElement.getBoundingClientRect();
    const timer = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(timer);
  }, [active, present, visible, reducedMotion, motionElement]);
  useLayoutEffect(() => {
    if (active || visible || !present || reducedMotion) return;
    if (delay !== undefined) {
      const timer = setTimeout(() => setPresent(false), delay);
      return () => clearTimeout(timer);
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const finishExit = () => {
      if (cancelled) return;
      /** Resolve exit styles on the surface only; descendants may contain ongoing activity indicators. */
      const animations = (motionElement?.getAnimations?.() ?? []).filter(
        (animation) =>
          animation.playState !== 'finished' &&
          animation.playState !== 'idle' &&
          animation.effect?.getComputedTiming().endTime !== Infinity,
      );
      if (!animations.length) {
        timer = setTimeout(() => setPresent(false), 0);
      } else {
        /** A theme change may cancel one animation and start another before the surface has finished exiting. */
        Promise.allSettled(animations.map((animation) => animation.finished)).then(finishExit);
      }
    };
    finishExit();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [active, visible, present, reducedMotion, delay, motionElement]);
  return { present, visible, motionRef: setMotionElement };
}
