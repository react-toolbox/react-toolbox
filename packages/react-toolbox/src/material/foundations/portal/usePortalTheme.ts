'use client';
import { useContext, type CSSProperties } from 'react';
import { ThemeContext } from '../theme/ThemeProvider';

/** Put theme tokens on the actual portal surface, preserving primitive presence. */
export function usePortalTheme(style?: CSSProperties) {
  const { variables } = useContext(ThemeContext);
  const tokens =
    [...new Set([...Object.keys(variables), ...Object.keys(style ?? {}).filter((key) => key.startsWith('--'))])].join(
      ' ',
    ) || undefined;
  return { 'data-react-toolbox-theme': tokens ? '' : undefined, 'data-react-toolbox-tokens': tokens, style: variables };
}
