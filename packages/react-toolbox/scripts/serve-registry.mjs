import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { buildRegistry } from './build-registry.mjs';

const port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be an integer from 1 to 65535');
const host = '127.0.0.1';
const registry = await buildRegistry({ origin: process.env.REGISTRY_ORIGIN || `http://${host}:${port}` });
const server = createServer(async (request, response) => {
  let relative;
  try {
    const url = new URL(request.url || '/', `http://${host}:${port}`);
    relative = url.pathname === '/' ? 'registry.json' : decodeURIComponent(url.pathname).replace(/^\/+/, '');
  } catch {
    response.writeHead(400);
    response.end('Invalid request path');
    return;
  }
  const file = path.resolve(registry.destination, relative);
  if (!file.startsWith(`${registry.destination}${path.sep}`) || !file.endsWith('.json')) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  try {
    const content = await readFile(file);
    response.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    });
    response.end(content);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});
server.listen(port, host, () =>
  console.log(
    `React Toolbox registry: http://${host}:${port}/registry.json\nInstall: pnpm dlx shadcn@latest add ${registry.baseUrl}button.json`,
  ),
);
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
