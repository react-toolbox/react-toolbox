import type { ReactNode } from 'react';
import { ThemeProvider } from 'react-toolbox';
import DocsHeader from '../docs-header';
import SiteFooter from '../site-footer';
import DocsSidebar from './sidebar';
import { components } from './catalog';

export const revalidate = 3600;

export default function DocumentationLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      className="min-h-svh bg-white text-toolbox-text"
      variables={{ '--rt-color-text': 'rgb(0 0 0 / 87%)', '--rt-color-text-secondary': 'rgb(0 0 0 / 54%)' }}
    >
      <a className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:bg-white focus:p-4" href="#docs-content">
        Skip to content
      </a>
      <DocsHeader documentation />
      <div className="lg:grid lg:grid-cols-[256px_minmax(0,1fr)]">
        <DocsSidebar components={components.map(({ slug, title }) => ({ slug, title }))} />
        <main
          id="docs-content"
          tabIndex={-1}
          className="mx-auto w-full min-w-0 max-w-6xl px-4 py-8 outline-none min-[600px]:px-6 sm:py-12 lg:px-12"
        >
          {children}
        </main>
      </div>
      <SiteFooter />
    </ThemeProvider>
  );
}
