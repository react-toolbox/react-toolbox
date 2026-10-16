'use client';

import { cloneElement, useImperativeHandle, useState, type HTMLAttributes, type ReactElement, type Ref } from 'react';
import { Slot } from '@radix-ui/react-slot';
import useMergedRefs from '../foundations/portal/useMergedRefs';

export type SurfaceElement = ReactElement<HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }>;
interface ActiveSurfaceProps extends HTMLAttributes<HTMLElement> {
  active: boolean;
  children: SurfaceElement;
  ref?: Ref<HTMLElement | null>;
}

/** Retained exit DOM must leave the primitive focus/layer registries immediately. */
export function ActiveSurface({ active, children, ref, ...attributes }: ActiveSurfaceProps) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const childRef = useMergedRefs(children.props.ref, setNode);
  useImperativeHandle<HTMLElement | null, HTMLElement | null>(ref, () => (active ? node : null), [active, node]);
  return <Slot {...(active ? attributes : {})}>{cloneElement(children, { ref: childRef })}</Slot>;
}
