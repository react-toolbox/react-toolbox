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

/** Add local class overrides without a wrapper component or injection layer. */
export function mergeTheme<T extends Record<string, string>>(
  defaults: T,
  overrides?: Partial<Record<keyof T, string>>,
): { [K in keyof T]: string } {
  if (!overrides) return defaults;
  const result: { [K in keyof T]: string } = { ...defaults };
  for (const key in defaults) {
    result[key] = [...new Set(`${defaults[key]} ${overrides[key] || ''}`.trim().split(/\s+/))].join(
      ' ',
    );
  }
  return result;
}

export function ThemeProvider({ variables, children, className, style }: ThemeProviderProps) {
  const parent = useContext(ThemeContext);
  const value = useMemo(
    () => ({
      variables: {
        ...parent.variables,
        ...variables,
        ...Object.fromEntries(Object.entries(style || {}).filter(([key]) => key.startsWith('--'))),
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
          style={{ ...value.variables, ...style }}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </ThemeContext>
  );
}
