import Link from 'next/link';
import registry from 'react-toolbox/registry/data.json';
import DocsArticle, { DocsSection } from '../article';
import CodeBlock from '../code-block';
import { pageMetadata } from '../../site-metadata';

export const metadata = pageMetadata({
  title: 'Installation · React Toolbox',
  description:
    'Install React Toolbox with the shadcn CLI. Add editable Material Design components, styles, fonts, and dependencies to your React project.',
  path: '/docs/installation',
});

export default function InstallationPage() {
  const origin = new URL(registry.catalog.homepage).origin;
  return (
    <DocsArticle
      path="/docs/installation"
      title="Installation"
      description="Add a component. Keep the source. Everything you need comes with it, including styles, fonts, and dependencies."
      sections={[
        { id: 'setup', title: 'Set up your project' },
        { id: 'add', title: 'Add a component' },
        { id: 'use', title: 'Use it' },
        { id: 'routing', title: 'Navigation and links' },
        { id: 'namespace', title: 'Registry shortcut' },
        { id: 'updates', title: 'Updates' },
      ]}
    >
      <DocsSection id="setup" title="1. Set up your project">
        <p className="mb-4 text-toolbox-body/6 text-toolbox-text">
          Start with React 19, TypeScript, and Tailwind CSS 4. Initialize shadcn once, or skip this step if your project
          already uses it.
        </p>
        <CodeBlock language="Terminal" label="Initialize shadcn" code="pnpm dlx shadcn@latest init" />
      </DocsSection>
      <DocsSection id="add" title="2. Add a component">
        <CodeBlock
          language="Terminal"
          label="Install React Toolbox button"
          code={`pnpm dlx shadcn@latest add ${origin}/r/button.json`}
        />
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          The CLI copies the component and its dependencies into your project. Replace <code>button</code> with another{' '}
          <Link href="/docs/components" className="text-toolbox-primary underline underline-offset-2">
            component name
          </Link>
          , or <code>all</code> for the full collection.
        </p>
      </DocsSection>
      <DocsSection id="use" title="3. Use it">
        <CodeBlock
          label="Button usage"
          code={
            'import { Button } from \'@/components/ui/material/button\';\n\nexport default function Example() {\n  return <Button primary raised label="Hello, Material" />;\n}'
          }
        />
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          Use your configured UI alias if it differs from <code>@/components/ui</code>. Component entries load their
          styles automatically. Add <code>'use client'</code> to examples that use state or event handlers in Next.js.
        </p>
      </DocsSection>
      <DocsSection id="routing" title="Use your router for navigation">
        <p className="mb-4 text-toolbox-body/6 text-toolbox-text">
          In Next.js, use Link from next/link. In other React apps, use your router’s link or a native anchor. React
          Toolbox supplies Material surfaces and controls; routing stays with your application.
        </p>
        <CodeBlock
          label="Next.js navigation"
          code={
            'import Link from \'next/link\';\n\nexport default function ProjectNavigation() {\n  return (\n    <nav aria-label="Projects">\n      <Link href="/projects"\n        className="inline-flex min-h-toolbox-touch items-center px-4 text-sm font-medium text-toolbox-primary focus-visible:outline-2 focus-visible:outline-toolbox-primary">\n        Projects\n      </Link>\n    </nav>\n  );\n}'
          }
        />
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          For a drawer or sidebar, place your router link in ListItem’s itemContent and enable ripple on List. Keep the
          whole row interactive and use aria-current="page" for the selected destination. Link and Navigation wrappers
          are no longer part of the public collection.
        </p>
      </DocsSection>
      <DocsSection id="namespace" title="Use the @react-toolbox shortcut">
        <p className="mb-4 text-toolbox-body/6 text-toolbox-text">
          Add this registry to your existing <code>components.json</code>, keeping the rest of its configuration:
        </p>
        <CodeBlock
          language="components.json"
          label="Registry configuration"
          code={JSON.stringify({ registries: { '@react-toolbox': `${origin}/r/{name}.json` } }, null, 2)}
        />
        <div className="mt-4">
          <CodeBlock
            language="Terminal"
            label="Install by namespace"
            code="pnpm dlx shadcn@latest add @react-toolbox/button"
          />
        </div>
        <p className="mt-4 text-xs leading-6 text-toolbox-text-secondary">
          The shortcut requires this configuration until React Toolbox is listed in shadcn’s public registry directory.
          The full URL requires no namespace configuration.
        </p>
      </DocsSection>
      <DocsSection id="updates" title="Make changes. Keep them.">
        <p className="text-toolbox-body/6 text-toolbox-text">
          Public entries live in <code>material/</code>, alongside existing shadcn components. Shared helpers live in{' '}
          <code>material/foundations/</code>. Edit them to fit your project.
        </p>
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          Already using the earlier toolbox-prefixed entries? Add the components again and update imports to
          <code> material/button</code>, <code>material/theme</code>, or the corresponding family. The CLI leaves old
          entry files in place; remove them after migrating your imports.
        </p>
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          To update, run the add command again and review the overwrite prompts. Commit your edits first and check the
          diff before replacing customized files.
        </p>
        <Link
          href="/docs/theming"
          className="mt-6 inline-block text-sm text-toolbox-primary underline underline-offset-2"
        >
          Next: Theming →
        </Link>
      </DocsSection>
    </DocsArticle>
  );
}
