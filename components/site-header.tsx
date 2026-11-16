'use client';

import type { ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNotebookLayout } from 'fumadocs-ui/layouts/notebook';
import { ArrowUpRight, BookOpen, Globe, LifeBuoy, Menu, PanelLeft, ShoppingBag } from 'lucide-react';
import { DiscordIcon, YouTubeIcon } from '@/components/icons';
import { site } from '@/lib/site';

const nav = [
  { label: 'Docs', href: '/', Icon: BookOpen },
  { label: 'Support', href: '/general/support', Icon: LifeBuoy },
  { label: 'Store', href: site.links.store, Icon: ShoppingBag, external: true },
  { label: 'Website', href: site.links.website, Icon: Globe, external: true },
];

/** Same nav link as the store header: icon + label, the active one simply white. */
const navLink = (active: boolean) =>
  `flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors duration-200 hover:bg-white/[0.06] ${
    active ? 'text-ink' : 'text-ink-2 hover:text-ink'
  }`;

const iconBtn =
  'relative inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-ink-2 transition-colors duration-200 hover:bg-white/[0.06] hover:text-ink [&_svg]:size-[1.125rem]';

/**
 * Docs header laid out like the store header: watermark and links on the left, actions on the
 * right. A solid bar pinned to the top that looks the same at every scroll position. Search and
 * sidebar controls come from the Fumadocs layout slots, so search, the mobile drawer and sidebar
 * collapse keep working.
 */
export function SiteHeader(props: ComponentProps<'header'>) {
  const { slots, props: layout } = useNotebookLayout();
  const pathname = usePathname();
  const collapsible = layout.sidebar.collapsible ?? true;

  const isActive = (href: string) =>
    href === '/' ? !pathname.startsWith('/general/support') : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      id="nd-subnav"
      {...props}
      className="sticky top-(--fd-docs-row-1) z-30 flex h-18 min-w-0 items-center border-b border-white/[0.06] bg-bg px-3 [grid-area:header] layout:[--fd-header-height:--spacing(18)] md:px-5"
    >
      <nav aria-label="Main" className="flex h-full w-full min-w-0 items-center gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} docs home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/nerve-watermark.png"
              alt={site.name}
              width={480}
              height={191}
              draggable={false}
              className="h-12 w-auto select-none"
            />
          </Link>

          <ul className="hidden items-center lg:flex">
            {nav.map(({ label, href, Icon, external }) => {
              const active = !external && isActive(href);
              return (
                <li key={href}>
                  {external ? (
                    <a href={href} target="_blank" rel="noreferrer" className={navLink(false)}>
                      <Icon className="size-4 opacity-80" aria-hidden />
                      {label} <ArrowUpRight className="size-3.5 opacity-60" aria-hidden />
                    </a>
                  ) : (
                    <Link href={href} className={navLink(active)} aria-current={active ? 'page' : undefined}>
                      <Icon className="size-4 opacity-80" aria-hidden />
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center justify-end gap-0.5">
          {slots.searchTrigger && (
            <>
              <slots.searchTrigger.full hideIfDisabled className="nd-search mr-2 hidden w-56 md:inline-flex xl:w-64" />
              <slots.searchTrigger.sm hideIfDisabled className={`${iconBtn} md:hidden`} />
            </>
          )}
          <div className="hidden items-center xl:flex">
            <a href={site.links.discord} target="_blank" rel="noreferrer" className={iconBtn} aria-label="Discord" title="Discord">
              <DiscordIcon />
            </a>
            <a href={site.links.youtube} target="_blank" rel="noreferrer" className={iconBtn} aria-label="YouTube" title="YouTube">
              <YouTubeIcon />
            </a>
            <span aria-hidden className="mx-2 h-5 w-px shrink-0 bg-white/[0.1]" />
          </div>
          {collapsible && slots.sidebar && (
            <slots.sidebar.collapseTrigger className={`${iconBtn} max-md:hidden`} aria-label="Toggle sidebar" title="Toggle sidebar">
              <PanelLeft />
            </slots.sidebar.collapseTrigger>
          )}
          <a
            href={site.links.store}
            target="_blank"
            rel="noreferrer"
            className="btn ml-1.5 h-9 gap-2 rounded-lg bg-white/[0.08] px-4 text-sm font-semibold shadow-none hover:bg-white/[0.14] max-sm:hidden"
          >
            <ShoppingBag className="size-4" />
            Store
          </a>
          {slots.sidebar && (
            <slots.sidebar.trigger className={`${iconBtn} ml-1 md:hidden`} aria-label="Open menu">
              <Menu />
            </slots.sidebar.trigger>
          )}
        </div>
      </nav>
    </header>
  );
}
