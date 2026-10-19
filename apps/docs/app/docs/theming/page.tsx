import DocsArticle, { DocsSection } from '../article';
import CodeBlock from '../code-block';
import SpacingTable from './spacing-table';
import ThemedDistribution from './themed-distribution';
import { pageMetadata } from '../../site-metadata';

export const metadata = pageMetadata({
  title: 'Theming · React Toolbox',
  description:
    'Customize React Toolbox colors, component classes, and spacing with CSS variables and Tailwind CSS while keeping the Material Design foundation.',
  path: '/docs/theming',
});

export default function ThemingPage() {
  return (
    <DocsArticle
      path="/docs/theming"
      title="Theming"
      description="Keep the Material foundation. Change the parts that make it yours."
      sections={[
        { id: 'distribution', title: 'Field Notes' },
        { id: 'colors', title: 'Colors' },
        { id: 'source', title: 'Component classes' },
        { id: 'scopes', title: 'Scoped colors' },
        { id: 'spacing', title: 'Spacing' },
      ]}
    >
      <DocsSection id="distribution" title="A themed distribution">
        <p className="mb-4 text-toolbox-body/6 text-toolbox-text">
          Field Notes is an editable example built from the same components. Switch between the original palette, teal
          and deep orange, and a dark semantic theme. Dialogs, nested pickers, menus and tooltips carry the selected
          theme into their portals.
        </p>
        <ThemedDistribution />
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          The navigation drawer is contained in the example and leaves the documentation usable. In the installed{' '}
          <code>examples/field-notes/index.tsx</code>, <code>{'<DrawerRoot modal={false}>'}</code> wraps a positioned
          container, and <code>{'<DrawerPortal container={viewport}>'}</code> renders the drawer inside it with absolute
          positioning. Portal placement and modality are separate: a custom container does not scope a modal’s focus
          trap or scroll lock, so the visit dialog and its pickers use the page viewport and keep their modal behavior.
        </p>
        <div className="my-6">
          <CodeBlock
            language="Terminal"
            label="Install the editable example"
            code="pnpm dlx shadcn@latest add https://react-toolbox.io/r/example-field-notes.json"
          />
        </div>
        <CodeBlock
          label="Use Field Notes"
          code={
            'import { FieldNotes } from "@/components/ui/examples/field-notes";\n\n<FieldNotes appearance="field-notes" />'
          }
        />
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          The example exports its theme variables. Copy them into your own provider or edit the installed components.
          The example imports the optional <code>material/foundations/styles/shadcn.css</code> stylesheet. It maps
          semantic colors without changing Material dimensions or motion.
        </p>
      </DocsSection>
      <DocsSection id="colors" title="Start with color">
        <p className="mb-4 text-toolbox-body/6 text-toolbox-text">
          Theme shared colors with CSS variables in your global stylesheet. Tailwind utilities such as
          <code> bg-toolbox-primary</code> use those same variables. The default palette is Material indigo and pink.
        </p>
        <CodeBlock
          language="css"
          label="Global color variables"
          code={
            ':root {\n  --rt-color-primary: #00695c;\n  --rt-color-primary-dark: #004d40;\n  --rt-color-primary-contrast: #ffffff;\n  --rt-color-accent: #ff6d00;\n  --rt-color-accent-contrast: #212121;\n}'
          }
        />
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
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
      <DocsSection id="source" title="Style the components you compose">
        <p className="mb-4 text-toolbox-body/6 text-toolbox-text">
          Pass Tailwind utilities through <code>className</code> on each component. Compose the exported parts to
          customize individual nodes. For an internal element that is not exposed as a component, edit its classes in
          the installed source. The JSX and styles belong to your application.
        </p>
        <p className="mb-4 text-toolbox-body/6 text-toolbox-text">
          Checkbox, RadioButton and Switch apply both <code>className</code> and <code>style</code> to their root label.
          Native form attributes and event handlers still target the underlying input.
        </p>
        <CodeBlock
          label="Compose with className"
          code={
            'import { Button } from "@/components/ui/material/button";\nimport { Card, CardText, CardActions } from "@/components/ui/material/card";\n\n<Card className="max-w-md">\n  <CardText className="text-toolbox-text-secondary">\n    Your changes are ready to save.\n  </CardText>\n  <CardActions className="justify-end gap-2">\n    <Button primary className="min-w-24">Save</Button>\n  </CardActions>\n</Card>'
          }
        />
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          Conflicting base utilities resolve in favor of your classes. Responsive and state variants keep normal
          Tailwind precedence; match the variant when overriding it. Use CSS variables for colors across states.
        </p>
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          CSS variables control shared colors, and <code>ThemeProvider</code> scopes those variables when needed. For
          deeper customization, compose the exported parts or edit the installed source.
        </p>
      </DocsSection>
      <DocsSection id="scopes" title="Scope a palette when you need to">
        <p className="mb-4 text-toolbox-body/6 text-toolbox-text">
          Global CSS variables need no provider. Use <code>ThemeProvider</code> when a section needs its own palette: it
          carries scoped variables into dialogs, menus, and other portaled content too.
        </p>
        <CodeBlock
          label="Scoped color variables"
          code={
            'import { ThemeProvider } from "@/components/ui/material/theme";\n\n<ThemeProvider variables={{ "--rt-color-primary": "#00695c" }}>\n  <YourSection />\n</ThemeProvider>'
          }
        />
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          Material tokens use the <code>--rt-color-</code> prefix so they can coexist with a shadcn theme. Map them
          explicitly to your app’s semantic tokens if you want both libraries to share colors.
        </p>
      </DocsSection>
      <DocsSection id="spacing" title="A Material rhythm">
        <p className="mb-4 text-toolbox-body/6 text-toolbox-text">
          React Toolbox preserves your app’s Tailwind spacing scale. Components keep their Material dimensions;
          utilities such as <code>p-6</code> and <code>gap-2</code> follow your theme.
        </p>
        <p className="mb-4 text-toolbox-body/6 text-toolbox-text">
          To use the Material 4px subgrid throughout your app, add this optional setting to your global stylesheet after
          its imports. This site uses it for the spacing shown below.
        </p>
        <CodeBlock language="css" label="Optional Material spacing" code={'@theme {\n  --spacing: 4px;\n}'} />
        <p className="my-4 text-toolbox-body/6 text-toolbox-text">
          Prefer multiples of 8px for layout spacing; the 4px subgrid accommodates typography and icons.
        </p>
        <SpacingTable />
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          Earlier installations may have added <code>--spacing: 4px</code> to your stylesheet. Remove that declaration
          if you want to restore your app’s spacing scale; updating components does not remove it.
        </p>
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          Use <code>text-toolbox-title</code>, <code>text-toolbox-subheading</code>, and <code>text-toolbox-body</code>{' '}
          for Material text sizes with matching weight and line height.
          <code> min-h-toolbox-touch</code> provides a 48px target, and <code>max-w-toolbox-prose</code> keeps reading
          lines comfortable. These utilities are included by the registry.
        </p>
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
          Color utilities such as <code>bg-toolbox-primary</code> and <code>text-toolbox-text-secondary</code> follow
          the nearest theme. Card content and actions already include their Material padding.
        </p>
        <p className="mt-4 text-toolbox-body/6 text-toolbox-text">
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
    </DocsArticle>
  );
}
