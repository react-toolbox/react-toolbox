'use client';
import { useContext, useId, useLayoutEffect } from 'react';
import { LayoutContext } from '../foundations/layout/LayoutContext';
import breakpoints from './breakpoints';
import type { LayoutBreakpoint, SidebarWidth } from './types';

export function useLayoutDrawer(
  kind: 'navigation' | 'sidebar',
  options: {
    pinned: boolean;
    clipped: boolean;
    permanentAt: LayoutBreakpoint | undefined;
    width?: SidebarWidth;
  },
) {
  const layout = useContext(LayoutContext);
  const id = useId();
  const pinned =
    options.pinned || Boolean(options.permanentAt && layout && layout.viewportWidth > breakpoints[options.permanentAt]);
  const register = kind === 'navigation' ? layout?.registerNavDrawer : layout?.registerSidebar;
  useLayoutEffect(
    () => register?.(id, { pinned, clipped: options.clipped, width: options.width }),
    [register, id, pinned, options.clipped, options.width],
  );
  return pinned;
}
