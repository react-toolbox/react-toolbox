import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import registry from 'react-toolbox/registry/data.json';
import DocsArticle, { DocsSection } from '../../article';
import { components, exampleDependencies } from '../../catalog';
import { materialGuidelines } from '../../material-guidelines';
import CodeBlock from '../../code-block';
import ComponentPreview from '../../component-preview';
import ApiReference from '../../api-reference';
import { componentState } from '../../component-state';
import CompositionPreview, { hasCompositionExample } from '../../composition-preview';
import { workflowExamples } from '../../workflow-examples';

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
  const workflow = workflowExamples[component.slug];
  const stateNotes = componentState[component.slug];
  const installUrls = [component.slug, ...dependencies].map(
    (name) => `${new URL(registry.catalog.homepage).origin}/r/${name}.json`,
  );
  const installCommand =
    installUrls.length === 1
      ? `pnpm dlx shadcn@latest add ${installUrls[0]}`
      : ['pnpm dlx shadcn@latest add', ...installUrls.map((url) => `  ${url}`)].join(' \\\n');
  return (
    <DocsArticle
      title={component.title}
      description={component.description}
      category="Components"
      sections={[
        { id: 'preview', title: 'Preview' },
        { id: 'installation', title: 'Installation' },
        { id: 'usage', title: 'Usage' },
        ...(hasCompositionExample(component.slug) ? [{ id: 'composition', title: 'Composition' }] : []),
        ...(stateNotes ? [{ id: 'state', title: 'State and callbacks' }] : []),
        { id: 'api', title: 'API reference' },
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
        <CodeBlock language="Terminal" label={`Install ${component.title}`} code={installCommand} />
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          New here?{' '}
          <Link href="/docs/installation" className="text-toolbox-primary underline underline-offset-2">
            Set up your project
          </Link>{' '}
          first. Styles, fonts, and required components are included.
          {dependencies.length > 0 && ' The command includes the components used by the examples below.'}
        </p>
      </DocsSection>
      <DocsSection id="usage" title="Usage">
        <p className="text-toolbox-body/6 text-toolbox-text">{component.note}</p>
        {workflow && !hasCompositionExample(component.slug) && (
          <div className="mt-6 space-y-4">
            <h3 className="text-toolbox-subheading">{workflow.title}</h3>
            <CodeBlock label={workflow.title} code={workflow.code} />
          </div>
        )}
      </DocsSection>
      {hasCompositionExample(component.slug) && (
        <DocsSection id="composition" title="Composition">
          <CompositionPreview slug={component.slug} />
        </DocsSection>
      )}
      {stateNotes && (
        <DocsSection id="state" title="State and callbacks">
          <div className="space-y-3 text-toolbox-body/6 text-toolbox-text [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {stateNotes}
          </div>
          {component.slug === 'input' && (
            <div className="mt-4">
              <CodeBlock
                label="Controlled and uncontrolled inputs"
                code={
                  '// Controlled: the parent owns the current value.\nconst [name, setName] = useState("");\n<Input label="Name" value={name} onChange={setName} />\n\n// Uncontrolled: Input owns the value after initialization.\n<Input label="Name" defaultValue="Javi" name="name" />'
                }
              />
            </div>
          )}
        </DocsSection>
      )}
      <DocsSection id="api" title="API reference">
        <ApiReference slug={component.slug} />
      </DocsSection>
      <DocsSection id="material-guidelines" title="Material guidelines">
        <ul className="list-disc space-y-3 pl-5 text-toolbox-body/6 text-toolbox-text">
          {guidelines.guidance.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className="mt-4 text-toolbox-body/6">
          <a
            href={`https://m1.material.io/${guidelines.path}`}
            className="inline-flex min-h-toolbox-touch items-center text-toolbox-primary underline underline-offset-4"
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
            <Link
              href={`/docs/components/${previous.slug}`}
              className="inline-flex min-h-toolbox-touch items-center hover:underline"
            >
              ← {previous.title}
            </Link>
          )}
        </span>
        <span>
          {next && (
            <Link
              href={`/docs/components/${next.slug}`}
              className="inline-flex min-h-toolbox-touch items-center hover:underline"
            >
              {next.title} →
            </Link>
          )}
        </span>
      </nav>
    </DocsArticle>
  );
}
