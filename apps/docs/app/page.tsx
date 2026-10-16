import type { Metadata } from 'next';
import { Button } from 'react-toolbox';
import DocsHeader from './docs-header';
import LandingDemo from './landing-demo';
import SiteFooter from './site-footer';

export const metadata: Metadata = {
  title: 'React Toolbox · Material Design, down to the details',
  description: 'The original Material Design components for modern React. A project by Javi Velasco.',
};

// Retry the header's GitHub count even if an upstream failure occurs during a build.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col bg-white text-toolbox-text">
      <a className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:bg-white focus:p-4" href="#main-content">
        Skip to content
      </a>
      <DocsHeader />
      <main id="main-content" className="flex flex-1 items-center">
        <section
          className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 toolbox-desktop:px-6 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:py-24"
          aria-labelledby="hero-title"
        >
          <div>
            <p className="mb-6 text-xs font-medium tracking-widest text-toolbox-primary uppercase">
              Original Material Design. Modern React.
            </p>
            <h1
              id="hero-title"
              className="text-[clamp(3rem,5.5vw,4.5rem)] leading-[1.08] font-light tracking-[-0.04em]"
            >
              The details
              <br />
              make the <span className="text-toolbox-primary">design.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-toolbox-text-secondary">
              Familiar motion. Thoughtful details. The original Material Design components, ready for modern React and
              yours to shape.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button primary raised href="/docs/installation" label="Get started" icon="arrow_forward" />
              <Button primary href="/docs/components" label="Browse components" />
            </div>
            <p className="mt-8 text-xs leading-4 text-toolbox-text-secondary">
              React 19{' '}
              <span className="px-2" aria-hidden="true">
                ·
              </span>{' '}
              TypeScript{' '}
              <span className="px-2" aria-hidden="true">
                ·
              </span>{' '}
              Tailwind CSS
            </p>
          </div>
          <LandingDemo />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
