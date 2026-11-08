import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// Every page is prerendered at build time. Without an incremental cache the
// worker cannot find that output and renders each page again per request
// (400-800 ms of CPU each, measured with `wrangler tail`). The static assets
// cache serves the prerendered HTML from the ASSETS binding, and cache
// interception answers from it before Next.js itself is loaded.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
