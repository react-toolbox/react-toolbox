'use client';
import { createContext } from 'react';
export const TableCellContext = createContext<'th' | 'td'>('td');
export const TableSelectionContext = createContext<{
  mode: 'none' | 'single' | 'multiple';
  selected: readonly string[];
  rows: ReadonlyMap<string, boolean>;
  register: (value: string, disabled: boolean) => () => void;
  select: (value: string, checked: boolean) => void;
  selectAll: (checked: boolean) => void;
} | null>(null);
