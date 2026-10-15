'use client';

import {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { ThemeContext } from '../theme/ThemeProvider';

export type PortalContainer = Element | RefObject<Element | null> | (() => Element | null) | null;
export interface PortalHandle {
  getMountNode(): HTMLDivElement | null;
  getOverlayDOMNode(): HTMLDivElement | null;
}
export interface PortalProps {
  children?: ReactNode;
  className?: string;
  container?: PortalContainer;
  style?: CSSProperties;
  ref?: Ref<PortalHandle>;
}

/** Preserve the original two wrappers and scoped variable inheritance. */
export default function Portal({ children, className = '', container, style, ref }: PortalProps) {
  const { variables } = useContext(ThemeContext);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement | null>(null);
  useImperativeHandle(ref, () => ({ getMountNode: () => host.current, getOverlayDOMNode: () => overlay.current }), []);
  useEffect(() => {
    if (!children) {
      host.current?.remove();
      host.current = null;
      setTarget(null);
      return;
    }
    const resolved = typeof container === 'function' ? container() : container;
    const parent = (resolved && 'current' in resolved ? resolved.current : resolved) || document.body;
    if (!host.current) {
      host.current = document.createElement('div');
      setTarget(host.current);
    }
    if (host.current.parentNode !== parent) parent.appendChild(host.current);
  });
  useEffect(
    () => () => {
      host.current?.remove();
      host.current = null;
    },
    [],
  );
  if (!target || !children) return null;
  const scopedStyle = { ...variables, ...style };
  const tokens = Object.keys(scopedStyle)
    .filter((key) => key.startsWith('--'))
    .join(' ');
  return createPortal(
    <div
      className={className}
      data-react-toolbox-theme={tokens ? '' : undefined}
      data-react-toolbox-tokens={tokens || undefined}
      style={scopedStyle}
      ref={overlay}
    >
      {children}
    </div>,
    target,
  );
}
