import type { Metadata } from 'next';
import DocsArticle, { DocsSection } from '../article';
import CodeBlock from '../code-block';
import SpacingTable from './spacing-table';

export const metadata: Metadata = { title: 'Theming · React Toolbox' };

export default function ThemingPage() {
  return (
    <DocsArticle
      title="Theming"
      description="Keep the Material foundation. Change the parts that make it yours."
      sections={[
        { id: 'colors', title: 'Colors' },
        { id: 'spacing', title: 'Spacing' },
        { id: 'source', title: 'Source and styles' },
      ]}
    >
      <DocsSection id="colors" title="Start with color">
        <p className="mb-4 text-sm leading-7 text-toolbox-text-secondary">
          The original indigo and pink palette is the default. Scope a different palette with ThemeProvider. Nested
          components and their dialogs inherit the same variables.
        </p>
        <CodeBlock
          label="Theme example"
          code={
            "import { Button } from '@/components/ui/material/button';\nimport { ThemeProvider } from '@/components/ui/material/theme';\n\n<ThemeProvider variables={{\n  '--rt-color-primary': '#00695c',\n  '--rt-color-primary-dark': '#004d40',\n  '--rt-color-accent': '#ff6d00',\n}}>\n  <Button primary raised label=\"A different shade\" />\n</ThemeProvider>"
          }
        />
        <p className="mt-4 text-sm leading-7 text-toolbox-text-secondary">
          On light surfaces, M1 uses 87% black for primary text, 54% for secondary text, 38% for disabled text, and 12%
          for dividers. These docs scope the text variables to alpha colors so they blend with their surface. When
          customizing a palette, check text and icon contrast in every state. See the{' '}
          <a
            href="https://m1.material.io/style/color.html"
            className="text-toolbox-primary underline underline-offset-4"
          >
            original color guidance
          </a>
          .
        </p>
      </DocsSection>
      <DocsSection id="spacing" title="A Material rhythm">
        <p className="mb-4 text-sm leading-7 text-toolbox-text-secondary">
          The registry configures Tailwind’s spacing unit to the Material 4px subgrid. Use ordinary utilities to keep
          page layouts on the same rhythm as the components. Prefer multiples of 8px for layout spacing; the 4px subgrid
          accommodates typography and icons.
        </p>
        <SpacingTable />
        <p className="mt-4 text-sm leading-7 text-toolbox-text-secondary">
          Color utilities such as <code>bg-toolbox-primary</code> and <code>text-toolbox-text-secondary</code> follow
          the nearest theme. Card content and actions already include their Material padding.
        </p>
        <p className="mt-4 text-sm leading-7 text-toolbox-text-secondary">
          Use 16px content insets on phones and 24px on larger screens, and allow 48px interaction areas even when an
          icon or button is visually smaller. Follow the{' '}
          <a
            href="https://m1.material.io/layout/metrics-keylines.html"
            className="text-toolbox-primary underline underline-offset-4"
          >
            M1 metrics and keylines
          </a>{' '}
          when composing a page.
        </p>
      </DocsSection>
      <DocsSection id="source" title="Go beyond the defaults">
        <p className="text-sm leading-7 text-toolbox-text-secondary">
          Use className for layout around a component and the theme prop for individual style slots. The installed CSS
          and TypeScript are yours to edit. Component styles live in your UI directory under <code>react-toolbox/</code>
          , with public entries in <code>material/</code>.
        </p>
        <p className="mt-4 text-sm leading-7 text-toolbox-text-secondary">
          Keep importing the public entries so their styles and fonts load automatically. Standard shadcn colors do not
          replace the Material palette unless you explicitly map them.
        </p>
      </DocsSection>
    </DocsArticle>
  );
}
