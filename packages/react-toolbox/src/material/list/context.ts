'use client';
import { createContext } from 'react';

/** List defaults follow React composition, including fragments and application wrappers. */
export const ListContext = createContext<{ ripple: boolean; selectable: boolean } | null>(null);
