import type { ComponentProps } from 'react';
import type { Button, Input, ThemeProvider } from 'react-toolbox';
import type { DialogProps } from 'react-toolbox/dialog';
import { shadcnThemeVariables } from 'react-toolbox/shadcn';

// These examples compile against the workspace package's public declarations,
// protecting the same root, subpath, and theme imports used by the web app.
export const primaryButton = {
  label: 'Save', primary: true, raised: true,
} satisfies ComponentProps<typeof Button>;
export const nameInput = {
  label: 'Your name', value: 'Javier', onChange: (value: string) => value,
} satisfies ComponentProps<typeof Input>;
export const dialog = {
  active: false, title: 'Settings', type: 'small',
} satisfies DialogProps;
export const theme = {
  variables: { ...shadcnThemeVariables, '--rt-color-primary': '#455a64' },
} satisfies ComponentProps<typeof ThemeProvider>;
