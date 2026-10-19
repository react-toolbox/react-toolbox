import Link from 'next/link';
import { CardText, CardTitle } from 'react-toolbox/card';
import DocsArticle, { DocsSection } from './article';
import ActionCard from './action-card';
import { pageMetadata } from '../site-metadata';

export const metadata = pageMetadata({
  title: 'Documentation · React Toolbox',
  description:
    'Build with the original Material Design components for modern React. Explore installation guides, theming, component APIs, and editable examples.',
  path: '/docs',
});

export default function IntroductionPage() {
  return (
    <DocsArticle
      path="/docs"
      title="The original, renewed."
      description="Material Design, down to the details. A collection of 28 component families for modern React, with the source in your hands."
      sections={[
        { id: 'start', title: 'Start building' },
        { id: 'material', title: 'Made of Material' },
        { id: 'your-code', title: 'Your code' },
      ]}
    >
      <DocsSection id="start" title="Start building">
        <div className="grid gap-4 @min-[600px]/article:grid-cols-2 @min-[600px]/article:gap-6">
          <ActionCard href="/docs/installation">
            <CardTitle>
              <h3 className="m-0 text-toolbox-headline group-hover:text-toolbox-primary">Installation</h3>
            </CardTitle>
            <CardText className="text-toolbox-text-secondary">
              Set up your project and add your first component.
            </CardText>
          </ActionCard>
          <ActionCard href="/docs/components">
            <CardTitle>
              <h3 className="m-0 text-toolbox-headline group-hover:text-toolbox-primary">Components</h3>
            </CardTitle>
            <CardText className="text-toolbox-text-secondary">
              Explore the collection. Try it, then take the code.
            </CardText>
          </ActionCard>
        </div>
      </DocsSection>
      <DocsSection id="material" title="Made of Material">
        <p className="text-toolbox-body/6 text-toolbox-text">
          React Toolbox brings Google’s{' '}
          <a href="https://m1.material.io/" className="text-toolbox-primary underline underline-offset-4">
            original Material Design
          </a>{' '}
          to React: the palette, the shadows, the keylines, and the motion. Raised buttons, floating labels, ripples,
          and radial time pickers keep the character of the original library.
        </p>
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          The foundation is modern:{' '}
          <a href="https://react.dev/" className="text-toolbox-primary underline underline-offset-4">
            React 19
          </a>
          ,{' '}
          <a href="https://www.typescriptlang.org/" className="text-toolbox-primary underline underline-offset-4">
            TypeScript
          </a>
          , and{' '}
          <a href="https://tailwindcss.com/" className="text-toolbox-primary underline underline-offset-4">
            Tailwind CSS 4
          </a>
          . Components preserve their own Material styling. You can use them alongside existing{' '}
          <a href="https://ui.shadcn.com/" className="text-toolbox-primary underline underline-offset-4">
            shadcn/ui
          </a>{' '}
          components.
        </p>
      </DocsSection>
      <DocsSection id="your-code" title="Your project. Your code.">
        <p className="text-toolbox-body/6 text-toolbox-text">
          Install only what you need through the{' '}
          <a href="https://ui.shadcn.com/docs/cli" className="text-toolbox-primary underline underline-offset-4">
            shadcn CLI
          </a>
          . Component source, styles, fonts, and dependencies come with it. Read the code, change a detail, or build
          something entirely your own.
        </p>
        <Link
          href="/docs/theming"
          className="mt-4 inline-flex min-h-toolbox-touch items-center text-sm text-toolbox-primary hover:underline"
        >
          Explore theming and spacing →
        </Link>
      </DocsSection>
      <div className="flex justify-end border-t border-toolbox-divider pt-6">
        <Link
          href="/docs/installation"
          className="inline-flex min-h-toolbox-touch items-center text-sm text-toolbox-primary hover:underline"
        >
          Next: Installation →
        </Link>
      </div>
    </DocsArticle>
  );
}
