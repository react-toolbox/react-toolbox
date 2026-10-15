import type { ReactNode } from 'react';
import Link from 'next/link';

type Section = { id: string; title: string };

export default function DocsArticle({
  title,
  description,
  children,
  sections = [],
  category = 'Getting started',
}: {
  title: string;
  description: string;
  children: ReactNode;
  sections?: Section[];
  category?: string;
}) {
  return (
    <div className="grid min-w-0 gap-10 xl:grid-cols-[minmax(0,1fr)_144px]">
      <article className="min-w-0">
        <div className="mb-4 flex items-center gap-2 text-xs text-toolbox-text-secondary">
          <Link
            href="/docs"
            className="inline-flex min-h-toolbox-touch min-w-toolbox-touch items-center hover:text-toolbox-primary"
          >
            Docs
          </Link>
          <span aria-hidden="true">/</span>
          <span>{category}</span>
        </div>
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
