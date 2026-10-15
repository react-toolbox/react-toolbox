'use client';

import { createContext, type MouseEvent } from 'react';
import type { RadioTheme } from './types';

export const RadioGroupContext = createContext<{
  name: string;
  form?: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  theme?: RadioTheme;
  onChange?: (value: string | undefined, event: MouseEvent<HTMLInputElement>) => void;
} | null>(null);
