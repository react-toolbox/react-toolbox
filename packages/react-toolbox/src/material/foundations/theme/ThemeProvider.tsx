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

function scopedVariables(source?: ThemeVariables): ThemeVariables {
  return Object.fromEntries(Object.entries(source ?? {}).filter(([key]) => key.startsWith('--')));
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
          style={{ ...style, ...value.variables }}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </ThemeContext>
  );
}
