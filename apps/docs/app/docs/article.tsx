import type { ReactNode } from 'react';
import Link from 'next/link';
import JsonLd from '../json-ld';
import { siteUrl } from '../site-metadata';

type Section = { id: string; title: string };

export default function DocsArticle({
  title,
  path,
  description,
  children,
  sections = [],
}: {
  title: string;
  path: string;
  description: string;
  children: ReactNode;
  sections?: Section[];
}) {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Docs', path: '/docs' },
    ...(path.startsWith('/docs/components/') ? [{ name: 'Components', path: '/docs/components' }] : []),
    ...(path === '/docs' ? [] : [{ name: title, path }]),
  ];

  return (
    <div className="grid min-w-0 gap-10 xl:grid-cols-[minmax(0,1fr)_144px]">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((breadcrumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: breadcrumb.name,
            item: new URL(breadcrumb.path, siteUrl).href,
          })),
        }}
      />
      <article className="min-w-0">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-toolbox-text-secondary">
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={breadcrumb.path} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span aria-current="page" className="inline-flex min-h-toolbox-touch items-center">
                    {breadcrumb.name}
                  </span>
                ) : (
                  <Link
                    href={breadcrumb.path}
                    className="inline-flex min-h-toolbox-touch min-w-toolbox-touch items-center hover:text-toolbox-primary"
                  >
                    {breadcrumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-toolbox-display-1 sm:text-toolbox-display-2">{title}</h1>
        <p className="mt-4 mb-10 text-toolbox-subheading text-toolbox-text-secondary">{description}</p>
        <div className="space-y-10">{children}</div>
      </article>
      {sections.length > 0 && (
        <aside className="hidden xl:block">
          <nav aria-label="On this page" className="sticky top-24 text-sm leading-5">
            <p className="mb-4 font-medium">On this page</p>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex min-h-toolbox-touch items-center text-toolbox-text-secondary hover:text-toolbox-primary"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
      )}
    </div>
  );
}

export function DocsSection({ id, title, children }: Section & { children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-4 text-toolbox-title">{title}</h2>
      {children}
    </section>
  );
}
