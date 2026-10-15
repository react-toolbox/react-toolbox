import registry from 'react-toolbox/registry/data.json';

// Dependencies follow the URL the installer used, including local previews.
// The generated snapshot is bundled with Next; source files aren't read at runtime.
export async function GET(request: Request, context: RouteContext<'/r/[item]'>) {
  const { item: filename } = await context.params;
  const requestUrl = new URL(request.url);
  // Next can normalize request.url to localhost even when the installer used
  // another host. Respect the incoming host (or the deployment proxy's host).
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto')?.split(',')[0].trim();
  const scheme = protocol === 'http' || protocol === 'https' ? `${protocol}:` : requestUrl.protocol;
  const origin = `${scheme}//${host?.split(',')[0].trim() || requestUrl.host}`;
  const base = new URL(new URL('./', requestUrl).pathname, origin);
  const rebase = <T extends { registryDependencies: string[] }>(item: T) => ({
    ...item,
    registryDependencies: item.registryDependencies.map(
      (dependency) => new URL(new URL(dependency).pathname.split('/').at(-1)!, base).href,
    ),
  });
  const headers = {
    'Access-Control-Allow-Origin': '*',
    // Registry source follows the deployment. Don't cache it across releases.
    'Cache-Control': 'no-store',
  };
  if (filename === 'registry.json') {
    return Response.json({ ...registry.catalog, items: registry.catalog.items.map(rebase) }, { headers });
  }
  const item = registry.items.find((entry) => `${entry.name}.json` === filename);
  return item
    ? Response.json(rebase(item), { headers })
    : Response.json({ error: 'Unknown component' }, { status: 404, headers });
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    },
  });
}
