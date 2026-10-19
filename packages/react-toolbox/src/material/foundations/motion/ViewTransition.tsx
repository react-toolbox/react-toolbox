'use client';

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '../styles/cn';
import useReducedMotion from './useReducedMotion';

interface ViewTransitionProps<View> {
  viewKey: string;
  view: View;
  enterFrom: string;
  exitTo: string;
  className?: string;
  style?: CSSProperties;
  children: (view: View) => ReactNode;
}

/** Keep keyed picker views mounted while their own CSS transitions finish. */
export default function ViewTransition<View>(props: ViewTransitionProps<View>) {
  const [views, setViews] = useState([{ key: props.viewKey, view: props.view, enter: false }]);
  if (!views.some((view) => view.key === props.viewKey)) {
    setViews([...views, { key: props.viewKey, view: props.view, enter: true }]);
  }
  return views.map((view) => (
    <TransitionPanel
      key={view.key}
      active={view.key === props.viewKey}
      enter={view.enter}
      enterFrom={props.enterFrom}
      exitTo={props.exitTo}
      className={props.className}
      style={props.style}
      onExit={() => setViews((current) => current.filter((candidate) => candidate.key !== view.key))}
    >
      {props.children(view.key === props.viewKey ? props.view : view.view)}
    </TransitionPanel>
  ));
}

function TransitionPanel({
  active,
  enter,
  enterFrom,
  exitTo,
  className,
  style,
  onExit,
  children,
}: {
  active: boolean;
  enter: boolean;
  enterFrom: string;
  exitTo: string;
  className?: string;
  style?: CSSProperties;
  onExit: () => void;
  children: ReactNode;
}) {
  const element = useRef<HTMLDivElement>(null);
  const [entering, setEntering] = useState(enter);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!entering) return;
    /** Resolve the initial transform before entering, without a fixed frame delay. */
    element.current?.getBoundingClientRect();
    setEntering(false);
  }, [entering]);

  useLayoutEffect(() => {
    if (active) return;
    let cancelled = false;
    const finishExit = () => {
      if (cancelled) return;
      const transitions = reducedMotion
        ? []
        : (element.current?.getAnimations?.() ?? []).filter(
            (animation) =>
              'transitionProperty' in animation && animation.playState !== 'finished' && animation.playState !== 'idle',
          );
      if (!transitions.length) {
        onExit();
      } else {
        /** Recheck when cancelled: a theme or direction change can start a replacement transition. */
        Promise.allSettled(transitions.map((animation) => animation.finished)).then(finishExit);
      }
    };
    const timer = setTimeout(finishExit, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [active, reducedMotion, onExit]);

  return (
    <div
      ref={element}
      data-view-state={active ? 'current' : 'departing'}
      inert={!active}
      aria-hidden={!active || undefined}
      className={cn(
        'absolute w-full duration-(--animation-duration) [transition-property:transform,opacity] motion-reduce:transition-none',
        className,
      )}
      style={{
        ...style,
        opacity: active && !entering ? 1 : 0,
        transform: active ? (entering ? enterFrom : 'none') : exitTo,
      }}
    >
      {children}
    </div>
  );
}
