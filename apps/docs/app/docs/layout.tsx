import type { ReactNode } from 'react';
import { ThemeProvider } from 'react-toolbox/theme';
import DocsHeader from '../docs-header';
import SiteFooter from '../site-footer';
import DocumentationShell from './shell';
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
      <DocumentationShell
        header={<DocsHeader documentation />}
        components={components.map(({ slug, title }) => ({ slug, title }))}
      >
        <main
          id="docs-content"
          tabIndex={-1}
          className="documentation-content w-full min-w-0 flex-1 scroll-mt-(--docs-appbar-height) px-4 py-8 outline-none min-[600px]:py-12 toolbox-desktop:max-[1025px]:px-6 min-[1025px]:px-10 min-[1025px]:pt-8"
        >
          {children}
        </main>
        <SiteFooter />
      </DocumentationShell>
    </ThemeProvider>
  );
}
