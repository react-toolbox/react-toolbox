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
        { id: 'fonts', title: 'Fonts and first paint' },
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
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          In Vite, use Tailwind’s Vite plugin. If your project uses <code>@tailwindcss/postcss</code> instead, set its{' '}
          <code>optimize</code> option to <code>false</code> so Vite can resolve imported font URLs before minifying the
          CSS. Next.js can keep its standard PostCSS configuration.
        </p>
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
      <DocsSection id="fonts" title="Fonts and first paint">
        <p className="mb-4 text-toolbox-body/6 text-toolbox-text">
          Roboto and Material Icons are included and served with your app. No font service is required. The default
          Roboto styles use <code>font-display: swap</code>, which can change the text’s appearance when the font
          arrives.
        </p>
        <p className="mb-4 text-toolbox-body/6 text-toolbox-text">
          In Next.js, prefer{' '}
          <a
            href="https://nextjs.org/docs/app/getting-started/fonts"
            className="text-toolbox-primary underline underline-offset-2"
          >
            <code>next/font/google</code>
          </a>
          . It downloads the font at build time, then serves it from your own deployment with preloading and an adjusted
          fallback. Visitors make no requests to Google.
        </p>
        <CodeBlock
          label="app/layout.tsx"
          code={`import { Roboto } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const appRoboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-app',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  display: 'optional',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className={appRoboto.variable}><body>{children}</body></html>;
}`}
        />
        <div className="mt-4">
          <CodeBlock
            label="app/globals.css (after existing imports)"
            language="css"
            code={
              ':root {\n  --preferred-font: var(--font-app);\n}\n\nbody {\n  font-family: var(--preferred-font);\n}'
            }
          />
        </div>
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          Remove the two @fontsource/roboto imports from your copied material/foundations/styles/fonts.css to avoid
          loading Roboto twice. Keep its Material Icons import: built-in calendar arrows, scrollable tabs, and sorted
          table headers still use it. If you already load a font, reuse its CSS variable instead of adding another
          loader.
        </p>
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          <a
            href="https://web.dev/articles/font-best-practices#choose_an_appropriate_font-display_strategy"
            className="text-toolbox-primary underline underline-offset-2"
          >
            <code>display: 'optional'</code>
          </a>{' '}
          prevents a late font swap: on a slow first visit, the fallback can stay in place for that page load. A hosted
          font alone does not prevent flicker. Include the weights and language subsets your app needs.
        </p>
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          If your build must work offline or use pinned font files,{' '}
          <a
            href="https://nextjs.org/docs/app/getting-started/fonts#local-fonts"
            className="text-toolbox-primary underline underline-offset-2"
          >
            <code>next/font/local</code>
          </a>{' '}
          provides the same loading controls with the included Fontsource files. Other frameworks can use local{' '}
          <code>@font-face</code> rules with <code>font-display: optional</code> and preload critical fonts.
        </p>
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          React Toolbox reserves space for font icons while they load. For icons that must appear on first paint, pass
          an SVG element to the component’s icon prop; font icons still need their font download to render.
        </p>
      </DocsSection>
      <DocsSection id="routing" title="Use your router for navigation">
        <p className="mb-4 text-toolbox-body/6 text-toolbox-text">
          The earlier <code>Link</code> and <code>Navigation</code> components are retired. React Toolbox supplies
          Material surfaces and controls; routing stays with your application. In Next.js, use <code>Link</code> from{' '}
          <code>next/link</code>; elsewhere, use your router’s link or a native anchor.
        </p>
        <CodeBlock
          label="Router links in a List"
          code={
            "import Link from 'next/link';\nimport { List, ListItem } from '@/components/ui/material/list';\n\nexport function ProjectNavigation({ current }: { current: string }) {\n  return (\n    <nav aria-label=\"Projects\">\n      <List selectable ripple>\n        <ListItem\n          caption=\"Projects\"\n          primaryAction={<Link href=\"/projects\" aria-current={current === '/projects' ? 'page' : undefined} />}\n        />\n      </List>\n    </nav>\n  );\n}"
          }
        />
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          Passing the link as <code>primaryAction</code> keeps the whole row interactive and keyboard accessible. Mark
          the selected destination with <code>aria-current="page"</code>.
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
          The installed source is yours; there is no package version to upgrade. To update, commit your edits, run the
          add command again, and review each overwrite prompt against the diff before replacing a customized file. The{' '}
          <a
            href="https://github.com/react-toolbox/react-toolbox/releases"
            className="text-toolbox-primary underline underline-offset-2"
          >
            source releases
          </a>{' '}
          carry the notes and migration steps for the behavior changes to expect in that diff, and pin every dependency
          to one reviewed edition.
        </p>
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          Convenience and compound components now share their interaction primitives. When updating an older copy,
          review the{' '}
          <a
            href="https://github.com/react-toolbox/react-toolbox/blob/dev/docs/component-behavior.md"
            className="text-toolbox-primary underline underline-offset-2"
          >
            behavior migration guide
          </a>{' '}
          for focus timing, keyboard navigation and event cancellation changes.
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
