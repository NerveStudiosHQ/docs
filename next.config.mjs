import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        // Old NEX.dev domain still points at this worker; send it to the new one.
        source: '/:path*',
        has: [{ type: 'host', value: 'docs.nexdev.site' }],
        destination: 'https://docs.nervestudios.net/:path*',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
