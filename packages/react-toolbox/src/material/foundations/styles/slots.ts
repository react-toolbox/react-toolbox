import { cn } from './cn';

/** Merge compatibility overrides first, then the current style-slot API. */
export function mergeStyleSlots<T extends Partial<Record<string, string>>>(legacy?: T, current?: T): T | undefined {
  if (!legacy) return current;
  if (!current) return legacy;
  return Object.fromEntries(
    [...new Set([...Object.keys(legacy), ...Object.keys(current)])].map((key) => [key, cn(legacy[key], current[key])]),
  ) as T;
}
