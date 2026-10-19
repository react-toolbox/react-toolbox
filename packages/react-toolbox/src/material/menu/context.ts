'use client';

import { createContext } from 'react';

export const MenuContext = createContext<{
  isStatic: boolean;
  ripple: boolean;
  selectable: boolean;
  selected: unknown;
  select: (value: unknown, close: boolean) => void;
} | null>(null);
