import { cn } from './cn';

/** Compose inherited or factory slots with instance overrides, letting later utilities win. */
export function mergeStyleSlots<T extends Partial<Record<string, string>>>(base?: T, overrides?: T): T | undefined {
  if (!base) return overrides;
  if (!overrides) return base;
  return Object.fromEntries(
    [...new Set([...Object.keys(base), ...Object.keys(overrides)])].map((key) => [key, cn(base[key], overrides[key])]),
  ) as T;
}
