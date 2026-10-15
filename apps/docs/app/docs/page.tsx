import type { Metadata } from 'next';
import Link from 'next/link';
import { CardText, CardTitle } from 'react-toolbox';
import DocsArticle, { DocsSection } from './article';
import ActionCard from './action-card';

export const metadata: Metadata = { title: 'Documentation · React Toolbox' };

export default function IntroductionPage() {
  return (
    <DocsArticle
      title="The original, renewed."
      description="Material Design, down to the details. A collection of 27 component families for modern React, with the source in your hands."
      sections={[
        { id: 'start', title: 'Start building' },
        { id: 'material', title: 'Made of Material' },
        { id: 'your-code', title: 'Your code' },
      ]}
    >
      <DocsSection id="start" title="Start building">
        <div className="grid gap-4 sm:grid-cols-2">
          <ActionCard href="/docs/installation">
            <CardTitle>
              <h3 className="m-0 text-2xl leading-8 font-normal group-hover:text-toolbox-primary">
                Installation <span aria-hidden="true">↗</span>
              </h3>
            </CardTitle>
            <CardText className="text-toolbox-text-secondary">
              Set up your project and add your first component.
            </CardText>
          </ActionCard>
          <ActionCard href="/docs/components">
            <CardTitle>
              <h3 className="m-0 text-2xl leading-8 font-normal group-hover:text-toolbox-primary">
                Components <span aria-hidden="true">↗</span>
              </h3>
            </CardTitle>
            <CardText className="text-toolbox-text-secondary">
              Explore the collection. Try it, then take the code.
            </CardText>
          </ActionCard>
        </div>
      </DocsSection>
      <DocsSection id="material" title="Made of Material">
        <p className="text-sm leading-7 text-toolbox-text-secondary">
          React Toolbox brings Google’s original Material Design to React: the palette, the shadows, the keylines, and
          the motion. Raised buttons, floating labels, ripples, and radial time pickers keep the character of the
          original library.
        </p>
        <p className="mt-4 text-sm leading-7 text-toolbox-text-secondary">
          The foundation is modern: React 19, TypeScript, and Tailwind CSS 4. Components use local fonts and preserve
          their own Material styling. You can use them alongside existing shadcn components.
        </p>
      </DocsSection>
      <DocsSection id="your-code" title="Your project. Your code.">
        <p className="text-sm leading-7 text-toolbox-text-secondary">
          Install only what you need through the shadcn CLI. Component source, styles, fonts, and dependencies come with
          it. Read the code, change a detail, or build something entirely your own.
        </p>
        <Link href="/docs/theming" className="mt-4 inline-block text-sm text-toolbox-primary hover:underline">
          Explore theming and spacing →
        </Link>
      </DocsSection>
      <div className="flex justify-end border-t border-toolbox-divider pt-6">
        <Link href="/docs/installation" className="text-sm text-toolbox-primary hover:underline">
          Next: Installation →
        </Link>
      </div>
    </DocsArticle>
  );
}
