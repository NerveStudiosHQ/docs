import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// The search index is built once at build time and searched in the browser
// (RootProvider uses type: 'static'). Building it in the worker cost ~800 ms
// of CPU on every cold start.
export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
  language: 'english',
});
