import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Layout demo · React Toolbox',
  robots: { index: false, follow: false },
};

export default function LayoutDemoLayout({ children }: { children: ReactNode }) {
  return children;
}
