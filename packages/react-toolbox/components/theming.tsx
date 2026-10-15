'use client';

import { createContext, useContext, useMemo, type CSSProperties, type ReactNode } from 'react';

export type ThemeVariables = { [property: `--${string}`]: string | number };
export interface ThemeProviderProps {
  children?: ReactNode;
  /** Scoped CSS custom properties, inherited by portaled content. */
  variables?: ThemeVariables;
  className?: string;
  style?: CSSProperties & ThemeVariables;
}

export const ThemeContext = createContext<{ variables: ThemeVariables }>({ variables: {} });

// Only the original public colors are aliases. Unknown custom properties belong
// to the application, including shadcn's semantic --primary/--background tokens.
const legacyColors = new Set([
  '--color-accent',
  '--color-accent-contrast',
  '--color-accent-dark',
  '--color-background',
  '--color-black',
  '--color-dark-contrast',
  '--color-divider',
  '--color-light-contrast',
  '--color-primary',
  '--color-primary-contrast',
  '--color-primary-dark',
  '--color-text',
  '--color-text-secondary',
  '--color-white',
]);
function isVariable(key: string): key is `--${string}` {
  return key.startsWith('--');
}
function canonicalValue(value: string | number): string | number {
  return typeof value === 'string'
    ? value.replace(/var\(\s*(--color-[\w-]+)/g, (match, name: string) =>
        legacyColors.has(name) ? `var(--rt-${name.slice(2)}` : match,
      )
    : value;
}
function scopedVariables(source?: ThemeVariables): ThemeVariables {
  const result: ThemeVariables = {};
  for (const [key, value] of Object.entries<string | number>(source || {})) {
    if (!isVariable(key)) continue;
    const canonical: `--${string}` = legacyColors.has(key) ? `--rt-${key.slice(2)}` : key;
    if (!legacyColors.has(key) || source?.[canonical] === undefined) result[canonical] = canonicalValue(value);
  }
  return result;
}

export function ThemeProvider({ variables, children, className, style }: ThemeProviderProps) {
  const parent = useContext(ThemeContext);
  const value = useMemo(
    () => ({
      variables: {
        ...parent.variables,
        ...scopedVariables(variables),
        ...scopedVariables(style),
      },
    }),
    [parent, variables, style],
  );
  const tokens = Object.keys(value.variables).join(' ') || undefined;
  return (
    <ThemeContext value={value}>
      {variables || className || style ? (
        <div
          data-react-toolbox-theme={tokens ? '' : undefined}
          data-react-toolbox-tokens={tokens}
          className={className}
          style={{
            ...Object.fromEntries(Object.entries(style || {}).filter(([key]) => !key.startsWith('--'))),
            ...value.variables,
          }}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </ThemeContext>
  );
}
