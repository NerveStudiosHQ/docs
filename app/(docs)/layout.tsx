import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default function Layout({ children }: LayoutProps<'/'>) {
  const { nav, ...base } = baseOptions();

  return (
    <>
      <DocsLayout
        {...base}
        nav={{ ...nav, mode: 'top' }}
        slots={{ header: SiteHeader }}
        tree={source.getPageTree()}
        sidebar={{ defaultOpenLevel: 0 }}
      >
        {children}
      </DocsLayout>
      <SiteFooter />
    </>
  );
}
