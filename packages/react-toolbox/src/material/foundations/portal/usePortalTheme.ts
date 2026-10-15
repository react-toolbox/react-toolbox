'use client';
import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeProvider';

/** Put theme tokens on the actual portal surface, preserving primitive presence. */
export function usePortalTheme() {
  const { variables } = useContext(ThemeContext);
  const tokens = Object.keys(variables).join(' ') || undefined;
  return { 'data-react-toolbox-theme': tokens ? '' : undefined, 'data-react-toolbox-tokens': tokens, style: variables };
}
