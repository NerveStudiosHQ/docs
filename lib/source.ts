import { defineDocs } from 'fumadocs-mdx/macro';
import { loader, type LoaderPlugin } from 'fumadocs-core/source';
import { createElement } from 'react';
import { lucideIcon } from '@/components/icon';

const docs = defineDocs({
  dir: 'content/docs',
});

/** Sidebar icons from meta.json names, accepting lucide's renamed-icon aliases too. */
function iconsPlugin(): LoaderPlugin {
  const resolve = <T extends { icon?: unknown }>(node: T): T => {
    if (typeof node.icon !== 'string') return node;
    const Icon = lucideIcon(node.icon);
    if (!Icon) console.warn(`[icons] Unknown lucide icon: ${node.icon}`);
    return { ...node, icon: Icon ? createElement(Icon) : undefined };
  };
  return {
    name: 'nerve:icons',
    transformPageTree: { file: resolve, folder: resolve, separator: resolve },
  };
}

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
  plugins: [iconsPlugin()],
});
