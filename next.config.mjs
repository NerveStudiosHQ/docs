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
