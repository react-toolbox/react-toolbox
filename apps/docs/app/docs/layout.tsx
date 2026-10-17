import type { ReactNode } from 'react';
import { ThemeProvider } from 'react-toolbox/theme';
import DocsHeader from '../docs-header';
import SiteFooter from '../site-footer';
import DocsSidebar from './sidebar';
import { components } from './catalog';

export const revalidate = 3600;

export default function DocumentationLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      className="documentation-shell min-h-svh bg-white text-toolbox-text [--docs-appbar-height:var(--appbar-height)] toolbox-mobile-portrait:[--docs-appbar-height:var(--appbar-height-m-portrait)] toolbox-mobile-landscape:[--docs-appbar-height:var(--appbar-height-m-landscape)]"
      variables={{ '--rt-color-text': 'rgb(0 0 0 / 87%)', '--rt-color-text-secondary': 'rgb(0 0 0 / 54%)' }}
    >
      <a className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:bg-white focus:p-4" href="#docs-content">
        Skip to content
      </a>
      <DocsHeader documentation />
      <div className="lg:grid lg:grid-cols-[256px_minmax(0,1fr)]">
        <DocsSidebar components={components.map(({ slug, title }) => ({ slug, title }))} />
        <div className="flex min-w-0 flex-col lg:col-start-2 lg:min-h-[calc(100svh-var(--docs-appbar-height))]">
          <main
            id="docs-content"
            tabIndex={-1}
            className="mx-auto w-full min-w-0 max-w-6xl flex-1 px-4 py-8 outline-none min-[600px]:px-6 sm:py-12 lg:px-12"
          >
            {children}
          </main>
          <SiteFooter documentation />
        </div>
      </div>
    </ThemeProvider>
  );
}
