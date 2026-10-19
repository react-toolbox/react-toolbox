'use client';

import { createContext, type MouseEvent } from 'react';

export const RadioGroupContext = createContext<{
  name: string;
  form?: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string | undefined, event: MouseEvent<HTMLInputElement>) => void;
} | null>(null);
