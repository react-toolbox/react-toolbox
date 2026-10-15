import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import registry from 'react-toolbox/registry/data.json';
import DocsArticle, { DocsSection } from '../../article';
import { components, exampleDependencies } from '../../catalog';
import { materialGuidelines } from '../../material-guidelines';
import CodeBlock from '../../code-block';
import ComponentPreview from '../../component-preview';

export const dynamicParams = false;
export function generateStaticParams() {
  return [...components.map(({ slug }) => ({ slug })), { slug: 'link' }, { slug: 'navigation' }];
}
export async function generateMetadata({ params }: PageProps<'/docs/components/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const component = components.find((item) => item.slug === slug);
  return { title: `${component?.title ?? 'Component'} · React Toolbox`, description: component?.description };
}
export default async function ComponentPage({ params }: PageProps<'/docs/components/[slug]'>) {
  const { slug } = await params;
  if (slug === 'link' || slug === 'navigation') permanentRedirect('/docs/installation#routing');
  const index = components.findIndex((item) => item.slug === slug);
  const component = components[index];
  if (!component) notFound();
  const previous = components[index - 1];
  const next = components[index + 1];
  const guidelines = materialGuidelines[component.slug];
  const dependencies = exampleDependencies[component.slug] ?? [];
  return (
    <DocsArticle
      title={component.title}
      description={component.description}
      category="Components"
      sections={[
        { id: 'preview', title: 'Preview' },
        { id: 'installation', title: 'Installation' },
        { id: 'usage', title: 'Usage' },
        { id: 'material-guidelines', title: 'Material guidelines' },
      ]}
    >
      <section id="preview" className="scroll-mt-24" aria-label={`${component.title} example`}>
        <ComponentPreview
          key={component.slug}
          slug={component.slug}
          code={<CodeBlock label="Component example" code={component.code} />}
        />
      </section>
      <DocsSection id="installation" title="Installation">
        <CodeBlock
          language="Terminal"
          label={`Install ${component.title}`}
          code={`pnpm dlx shadcn@latest add ${[component.slug, ...dependencies].map((name) => `${new URL(registry.catalog.homepage).origin}/r/${name}.json`).join(' ')}`}
        />
        <p className="mt-4 text-sm leading-6 text-toolbox-text-secondary">
          New here?{' '}
          <Link href="/docs/installation" className="text-toolbox-primary hover:underline">
            Set up your project
          </Link>{' '}
          first. Styles, fonts, and required components are included.
          {dependencies.length > 0 && ' This example also installs Button for its trigger.'}
        </p>
      </DocsSection>
      <DocsSection id="usage" title="Usage">
        <p className="text-sm leading-7 text-toolbox-text-secondary">{component.note}</p>
        <p className="mt-4 text-sm leading-7 text-toolbox-text-secondary">
          Use the Code tab above for a complete example. The import follows your configured UI alias. See{' '}
          <Link href="/docs/theming" className="text-toolbox-primary hover:underline">
            Theming
          </Link>{' '}
          to customize colors, spacing, and style slots.
        </p>
      </DocsSection>
      <DocsSection id="material-guidelines" title="Material guidelines">
        <ul className="list-disc space-y-3 pl-5 text-sm leading-7 text-toolbox-text-secondary">
          {guidelines.guidance.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-7">
          <a
            href={`https://m1.material.io/${guidelines.path}`}
            className="text-toolbox-primary underline underline-offset-4"
          >
            Material Design 1: {guidelines.title}
          </a>
        </p>
      </DocsSection>
      <nav
        aria-label="Component pages"
        className="flex justify-between gap-6 border-t border-toolbox-divider pt-6 text-sm text-toolbox-primary"
      >
        <span>
          {previous && (
            <Link href={`/docs/components/${previous.slug}`} className="hover:underline">
              ← {previous.title}
            </Link>
          )}
        </span>
        <span>
          {next && (
            <Link href={`/docs/components/${next.slug}`} className="hover:underline">
              {next.title} →
            </Link>
          )}
        </span>
      </nav>
    </DocsArticle>
  );
}
