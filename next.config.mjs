import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    // Old NEX.dev domain still points at this worker; send it to the new one.
    // Root needs its own rule: on Cloudflare an empty `:path*` is left as a
    // literal in the destination.
    return [
      // nexdev_ docs moved under /legacy when nerve_ scripts took the main
      // section. Tebex pages and old Discord posts still link the old paths.
      {
        source: '/:script(nexdev_[a-z0-9_]+)',
        destination: '/legacy/:script/overview',
        permanent: true,
      },
      {
        source: '/:script(nexdev_[a-z0-9_]+)/:path+',
        destination: '/legacy/:script/:path+',
        permanent: true,
      },
      {
        source: '/changelog/v1',
        destination: '/legacy/changelog/v1',
        permanent: true,
      },
      {
        source: '/',
        has: [{ type: 'host', value: 'docs.nexdev.site' }],
        destination: 'https://docs.nervestudios.net/',
        permanent: true,
      },
      {
        source: '/:path+',
        has: [{ type: 'host', value: 'docs.nexdev.site' }],
        destination: 'https://docs.nervestudios.net/:path+',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
