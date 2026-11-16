import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/notebook/page';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Folder, Node } from 'fumadocs-core/page-tree';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { getMDXComponents } from '@/components/mdx';
import { DocsHero } from '@/components/docs-hero';
import { site } from '@/lib/site';

function findFolder(nodes: Node[], url: string): Folder | undefined {
  for (const node of nodes) {
    if (node.type !== 'folder') continue;
    if (node.index?.url === url || node.children.some((child) => child.type === 'page' && child.url === url)) return node;
    const nested = findFolder(node.children, url);
    if (nested) return nested;
  }
}

/** Where the store-style "Back to ..." link points: a script's first page, or the docs home from there and from loose pages. */
function backLink(url: string) {
  const folder = findFolder(source.getPageTree().children, url);
  const first = folder?.index ?? folder?.children.find((child) => child.type === 'page');
  if (folder && first && first.type === 'page' && first.url !== url) {
    return { href: first.url, label: folder.name };
  }
  return { href: '/', label: 'Docs' };
}

export default async function Page(props: PageProps<'/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const isHome = page.url === '/';
  const back = backLink(page.url);

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{ enabled: false }}
    >
      {isHome ? (
        <DocsHero />
      ) : (
        <header className="nd-page-header">
          <Link href={back.href} className="nd-back">
            <ArrowLeft aria-hidden />
            Back to {back.label}
          </Link>
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsDescription>{page.data.description}</DocsDescription>
        </header>
      )}
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // allows linking to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const isHome = page.url === '/';
  // Script pages get the script name in the title so tabs and search results
  // aren't just sixteen different "Overview | Nerve Studios" entries.
  const folder = page.slugs
    .slice(0, -1)
    .find((slug) => slug.startsWith('nerve_'));
  const title =
    folder
      ? `${page.data.title} · ${folder}`
      : page.data.title;

  return {
    title: isHome ? { absolute: site.title } : title,
    description: page.data.description,
    openGraph: {
      title: isHome ? site.title : `${title} | ${site.name}`,
      description: page.data.description,
      url: page.url,
    },
  };
}
