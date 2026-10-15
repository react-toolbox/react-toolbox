import type { Metadata } from 'next';
import { CardText, CardTitle, FontIcon } from 'react-toolbox';
import DocsArticle from '../article';
import ActionCard from '../action-card';
import { components } from '../catalog';

export const metadata: Metadata = { title: 'Components · React Toolbox' };

export default function ComponentsIndex() {
  return (
    <DocsArticle
      title="Components"
      category="Components"
      description="The whole collection, from everyday controls to the details that make an interface feel right. Choose a component to try it and get the code."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {components.map((component) => (
          <ActionCard key={component.slug} href={`/docs/components/${component.slug}`}>
            <CardTitle
              avatar={
                <FontIcon value={component.icon} aria-hidden="true" className="mr-4 text-2xl text-toolbox-primary" />
              }
            >
              <h2 className="m-0 text-base font-medium group-hover:text-toolbox-primary">{component.title}</h2>
            </CardTitle>
            <CardText className="text-toolbox-text-secondary">{component.description}</CardText>
          </ActionCard>
        ))}
      </div>
    </DocsArticle>
  );
}
