import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    // Include the workspace package's compiled exports in Turbopack's root.
    root: fileURLToPath(new URL('../..', import.meta.url)),
  },
};

export default nextConfig;
