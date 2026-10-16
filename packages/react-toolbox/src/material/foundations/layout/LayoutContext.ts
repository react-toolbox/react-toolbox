'use client';
import { createContext } from 'react';

export interface LayoutDrawerState {
  pinned: boolean;
  clipped: boolean;
  width?: number;
}

/** Shared shell coordination without an AppBar dependency on the entire Layout family. */
export const LayoutContext = createContext<{
  viewportWidth: number;
  appBarClasses: { appBar?: string; fixed?: string; inner?: string; leftIcon?: string };
  registerAppBar: (id: string, fixed: boolean) => () => void;
  registerNavDrawer: (id: string, drawer: LayoutDrawerState) => () => void;
  registerSidebar: (id: string, drawer: LayoutDrawerState) => () => void;
} | null>(null);
