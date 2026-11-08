import { defineDocs } from 'fumadocs-mdx/macro';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/plugins/lucide-icons';

const docs = defineDocs({
  dir: 'content/docs',
});

/**
 * Content source for the whole site.
 *
 * `baseUrl` is `/` so page URLs match the folder structure exactly
 * (e.g. `content/docs/nerve_garages/installation.mdx` -> `/nerve_garages/installation`).
 * Existing links across the docs rely on this.
 */
export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});
