import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/notebook/page';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { getMDXComponents } from '@/components/mdx';
import { DocsHero } from '@/components/docs-hero';
import { site } from '@/lib/site';

export default async function Page(props: PageProps<'/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const isHome = page.url === '/';

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{ enabled: !isHome, className: 'nd-crumbs' }}
    >
      {isHome ? (
        <DocsHero />
      ) : (
        <header className="nd-page-header">
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
