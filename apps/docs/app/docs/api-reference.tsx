import Link from 'next/link';
import apiData from 'react-toolbox/registry/api.json';
import ApiTable from './api-table';
import type { FamilyApi } from './api-types';
import CodeBlock from './code-block';
import type { ComponentSlug } from './catalog';

const families: Record<string, FamilyApi> = apiData.families;

export default function ApiReference({ slug }: { slug: ComponentSlug }) {
  const family = families[slug];
  if (!family) throw new Error(`Missing API documentation for ${slug}`);
  return (
    <div className="space-y-8">
      <p className="text-sm leading-7 text-toolbox-text-secondary">
        Generated from the installed TypeScript source. Defaults are the values declared by each function; a dash means
        no parameter default is declared. Forwarded props can use the receiving component’s default. Callback types show
        the exact arguments passed to your handler.
      </p>
      {family.apis.map((api) => {
        const properties = api.properties.filter((property) => !property.callback);
        const callbacks = api.properties.filter((property) => property.callback);
        return (
          <section key={api.name} aria-labelledby={`api-${api.name}`} className="space-y-4">
            <h3 id={`api-${api.name}`} className="scroll-mt-24 text-lg font-medium">
              <code>{api.name}</code>
            </h3>
            {api.kind === 'hook' && (
              <p className="text-sm leading-7 text-toolbox-text-secondary">
                Call this hook inside a React component. Its argument properties are listed below.
              </p>
            )}
            {api.kind === 'factory' && (
              <p className="text-sm leading-7 text-toolbox-text-secondary">
                A decorator factory: pass these options, then the component to enhance. Create the enhanced component
                outside render.
              </p>
            )}
            {api.kind === 'decorator' && (
              <p className="text-sm leading-7 text-toolbox-text-secondary">
                Call <code>{api.name}(Component)</code> outside render. The returned component accepts the original
                component’s props plus the properties below.
              </p>
            )}
            {properties.length > 0 && <ApiTable name={api.name} properties={properties} />}
            {callbacks.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Callbacks</h4>
                <ApiTable name={`${api.name} callbacks`} properties={callbacks} />
              </div>
            )}
            {api.nativeProps.length > 0 && (
              <p className="text-sm leading-7 text-toolbox-text-secondary">
                Also inherits <code className="wrap-break-word">{api.nativeProps.join(', ')}</code>, except the omissions
                and overrides in its exported props type below. Use the supported native <code>aria-*</code>,{' '}
                <code>data-*</code>, event, and element attributes as appropriate.
              </p>
            )}
            {api.nativeDefaults.length > 0 && (
              <p className="text-sm leading-7 text-toolbox-text-secondary">
                Additional defaults on inherited props:{' '}
                {api.nativeDefaults.map(({ name, value }, index) => (
                  <span key={name}>
                    {index > 0 && '; '}
                    <code>
                      {name} = {value}
                    </code>
                  </span>
                ))}
                .
              </p>
            )}
            {api.styleSlots.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Style slots</h4>
                <p className="text-sm leading-7 text-toolbox-text-secondary">
                  Pass a map of Tailwind classes to <code>classNames</code>. Available keys:
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                  {api.styleSlots.map((slot) => (
                    <li key={slot}>
                      <code>{slot}</code>
                    </li>
                  ))}
                </ul>
                <p className="text-sm leading-7 text-toolbox-text-secondary">
                  <code>theme</code> is the deprecated compatibility alias. When both are provided,{' '}
                  <code>classNames</code> wins conflicting utilities within each slot. See{' '}
                  <Link href="/docs/theming#source" className="text-toolbox-primary underline underline-offset-2">
                    Theming
                  </Link>{' '}
                  for tokens and override rules.
                </p>
              </div>
            )}
          </section>
        );
      })}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Exported TypeScript types</h3>
        <p className="text-sm leading-7 text-toolbox-text-secondary">
          Expand a type to inspect its full declaration, including generic constraints, union branches, callback
          arguments, ref handles, and inherited props. Import these types from{' '}
          <code className="wrap-break-word">@/components/ui/material/{slug}</code>.
        </p>
        {family.types.map((type) => (
          <details key={type.name} className="rounded-toolbox border border-toolbox-divider">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
              <code>{type.name}</code>
            </summary>
            <div className="border-t border-toolbox-divider">
              <CodeBlock label={`${type.name} declaration`} code={type.declaration} />
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
