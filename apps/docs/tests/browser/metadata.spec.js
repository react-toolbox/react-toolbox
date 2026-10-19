import { test, expect } from '@playwright/test';

test('shared links expose page-specific metadata to social crawlers', async ({ page, request }) => {
  const pages = [
    ['/', 'React Toolbox · Material Design, down to the details'],
    ['/docs', 'Documentation · React Toolbox'],
    ['/docs/installation', 'Installation · React Toolbox'],
    ['/docs/theming', 'Theming · React Toolbox'],
    ['/docs/components', 'Components · React Toolbox'],
    ['/docs/components/button', 'Button · React Toolbox'],
    ['/docs/components/time-picker', 'Time picker · React Toolbox'],
  ];

  for (const [path, title] of pages) {
    const response = await request.get(path, { headers: { 'User-Agent': 'Twitterbot/1.0' } });
    expect(response.ok(), path).toBe(true);
    const metadata = await page.evaluate(
      (html) => {
        const head = new DOMParser().parseFromString(html, 'text/html').head;
        return {
          title: head.querySelector('title')?.textContent,
          canonical: head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
          tags: Object.fromEntries(
            [...head.querySelectorAll('meta[name], meta[property]')].map((tag) => [
              tag.getAttribute('name') ?? tag.getAttribute('property'),
              tag.getAttribute('content'),
            ]),
          ),
        };
      },
      await response.text(),
    );

    expect(metadata.title, path).toBe(title);
    expect(metadata.canonical).toBe(`https://react-toolbox.io${path === '/' ? '' : path}`);
    expect(metadata.tags['og:url']).toBe(metadata.canonical);
    expect(metadata.tags.description).toBeTruthy();
    expect(metadata.tags['og:title']).toBe(title);
    expect(metadata.tags['twitter:title']).toBe(title);
    expect(metadata.tags['og:description']).toBe(metadata.tags.description);
    expect(metadata.tags['twitter:description']).toBe(metadata.tags.description);
    expect(metadata.tags['og:type']).toBe('website');
    expect(metadata.tags['og:site_name']).toBe('React Toolbox');
    expect(metadata.tags['twitter:card']).toBe('summary_large_image');
    const image = `https://react-toolbox.io${path === '/' ? '' : '/docs'}/opengraph-image`;
    expect(metadata.tags['og:image']).toBe(image);
    expect(metadata.tags['twitter:image']).toBe(image);
    expect(metadata.tags['og:image:width']).toBe('1200');
    expect(metadata.tags['og:image:height']).toBe('630');
    expect(metadata.tags['og:image:alt']).toBeTruthy();
    expect(metadata.tags['twitter:image:alt']).toBe(metadata.tags['og:image:alt']);
  }
});

test('social cards and site icons are publicly served as PNGs at the advertised sizes', async ({ request }) => {
  for (const [path, width, height] of [
    ['/opengraph-image', 1200, 630],
    ['/docs/opengraph-image', 1200, 630],
    ['/icon', 48, 48],
    ['/apple-icon', 180, 180],
  ]) {
    const response = await request.get(path);
    expect(response.ok(), path).toBe(true);
    expect(response.headers()['content-type']).toContain('image/png');
    const png = await response.body();
    expect(png.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    expect(png.readUInt32BE(16)).toBe(width);
    expect(png.readUInt32BE(20)).toBe(height);
    expect(png.length).toBeLessThan(5 * 1024 * 1024);
  }
});

test('the homepage identifies the site and docs breadcrumbs match their structured data', async ({ page, request }) => {
  const home = await request.get('/');
  const website = await page.evaluate(
    (html) => {
      const document = new DOMParser().parseFromString(html, 'text/html');
      return JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
    },
    await home.text(),
  );
  expect(website).toEqual({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'React Toolbox',
    url: 'https://react-toolbox.io/',
  });

  for (const [path, names] of [
    ['/docs', ['Home', 'Docs']],
    ['/docs/installation', ['Home', 'Docs', 'Installation']],
    ['/docs/theming', ['Home', 'Docs', 'Theming']],
    ['/docs/components', ['Home', 'Docs', 'Components']],
    ['/docs/components/button', ['Home', 'Docs', 'Components', 'Button']],
    ['/docs/components/time-picker', ['Home', 'Docs', 'Components', 'Time picker']],
  ]) {
    const response = await request.get(path);
    expect(response.ok(), path).toBe(true);
    const breadcrumbs = await page.evaluate(
      (html) => {
        const document = new DOMParser().parseFromString(html, 'text/html');
        const navigation = document.querySelector('nav[aria-label="Breadcrumb"]');
        return {
          schema: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent),
          visible: [...navigation.querySelectorAll('a, [aria-current="page"]')].map((item) => ({
            name: item.textContent.trim(),
            path: item.getAttribute('href') ?? new URL(document.querySelector('link[rel="canonical"]').href).pathname,
          })),
          current: navigation.querySelector('[aria-current="page"]').textContent.trim(),
        };
      },
      await response.text(),
    );
    expect(breadcrumbs.schema['@context']).toBe('https://schema.org');
    expect(breadcrumbs.schema['@type']).toBe('BreadcrumbList');
    expect(breadcrumbs.visible.map((item) => item.name)).toEqual(names);
    expect(breadcrumbs.current).toBe(names.at(-1));
    expect(breadcrumbs.schema.itemListElement).toEqual(
      breadcrumbs.visible.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: new URL(item.path, 'https://react-toolbox.io').href,
      })),
    );
  }
});

test('standalone demos stay out of search results without blocking crawler access', async ({ page, request }) => {
  for (const path of ['/playground', '/theme-demo']) {
    const response = await request.get(path);
    expect(response.ok(), path).toBe(true);
    const robots = await page.evaluate(
      (html) => {
        const document = new DOMParser().parseFromString(html, 'text/html');
        return document.querySelector('meta[name="robots"]')?.getAttribute('content');
      },
      await response.text(),
    );
    expect(robots, path).toContain('noindex');
  }
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).not.toContain('Disallow:');
});

test('the sitemap lists canonical landing and docs pages, including the component catalog', async ({
  page,
  request,
}) => {
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain('Sitemap: https://react-toolbox.io/sitemap.xml');

  const catalog = await request.get('/docs/components');
  const componentPaths = await page.evaluate(
    (html) => {
      const document = new DOMParser().parseFromString(html, 'text/html');
      return [
        ...new Set(
          [...document.querySelectorAll('a[href^="/docs/components/"]')].map((link) => link.getAttribute('href')),
        ),
      ];
    },
    await catalog.text(),
  );
  expect(componentPaths).toContain('/docs/components/button');

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  const urls = await page.evaluate(
    (xml) => {
      const document = new DOMParser().parseFromString(xml, 'application/xml');
      return [...document.querySelectorAll('loc')].map((location) => location.textContent);
    },
    await sitemap.text(),
  );
  const paths = [
    '/',
    '/docs',
    '/docs/installation',
    '/docs/theming',
    '/docs/components',
    ...componentPaths,
  ];
  expect(urls.sort()).toEqual(paths.map((path) => new URL(path, 'https://react-toolbox.io').href).sort());
});

test('retired routes are absent from the current documentation', async ({ request }) => {
  for (const route of ['/components', '/docs/recipes', '/docs/components/link', '/docs/components/navigation']) {
    const response = await request.get(route, { maxRedirects: 0 });
    expect(response.status(), route).toBe(404);
  }
});
