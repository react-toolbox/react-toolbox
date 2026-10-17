import type { MetadataRoute } from 'next';
import { components } from './docs/catalog';
import { siteUrl } from './site-metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/docs',
    '/docs/installation',
    '/docs/theming',
    '/docs/recipes',
    '/docs/components',
    ...components.map((component) => `/docs/components/${component.slug}`),
  ];

  return paths.map((path) => ({ url: new URL(path, siteUrl).href }));
}
