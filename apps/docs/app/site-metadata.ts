import type { Metadata } from 'next';
import registry from 'react-toolbox/registry/data.json';

export const siteUrl = new URL(registry.catalog.homepage);

interface SitePage {
  title: string;
  description: string;
  path: string;
}

export function pageMetadata(page: SitePage): Metadata {
  const documentation = page.path === '/docs' || page.path.startsWith('/docs/');
  const image = {
    url: new URL(documentation ? '/docs/opengraph-image' : '/opengraph-image', siteUrl),
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: documentation
      ? 'React Toolbox documentation — Build with Material Design.'
      : 'React Toolbox — The details make the design.',
  };

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      type: 'website',
      siteName: 'React Toolbox',
      locale: 'en_US',
      title: page.title,
      description: page.description,
      url: page.path,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
}
