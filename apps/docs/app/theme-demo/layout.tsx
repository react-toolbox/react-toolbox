import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Theme demo · React Toolbox',
  robots: { index: false, follow: false },
};

export default function ThemeDemoLayout({ children }: { children: ReactNode }) {
  return children;
}
