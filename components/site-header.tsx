'use client';

import { useEffect, useState, type ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNotebookLayout } from 'fumadocs-ui/layouts/notebook';
import { ArrowUpRight, PanelLeft } from 'lucide-react';
import { DiscordIcon } from '@/components/icons';
import { site } from '@/lib/site';

/** Becomes the floating island past this many pixels; drops back only near the very top so it never flickers. */
const ISLAND_AT = 8;
const FLAT_AT = 2;

function useIsland() {
  const [island, setIsland] = useState(false);
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setIsland((on) => (on ? y > FLAT_AT : y > ISLAND_AT));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return island;
}

const nav = [
  { label: 'Docs', href: '/' },
  { label: 'Support', href: '/general/support' },
  { label: 'Store', href: site.links.store, external: true },
  { label: 'Website', href: site.links.website, external: true },
];

function Divider() {
  return <span aria-hidden className="h-4 w-px shrink-0 bg-fill-3" />;
}

/** Icon button inside the segmented group on the right. */
const groupBtn =
  'inline-flex size-9 items-center justify-center rounded-lg text-ink-2 transition-colors hover:bg-fill-1 hover:text-ink [&_svg]:size-[1.125rem]';

/**
 * Docs header, styled like the store header: transparent bar at the top of the page that turns
 * into a floating rounded island once the page scrolls. Search, sidebar and theme controls come
 * from the Fumadocs layout slots, so search, the mobile drawer and sidebar collapse keep working.
 */
export function SiteHeader(props: ComponentProps<'header'>) {
  const { slots, props: layout } = useNotebookLayout();
  const pathname = usePathname();
  const island = useIsland();
  const collapsible = layout.sidebar.collapsible ?? true;

  const isActive = (href: string) =>
    href === '/' ? !pathname.startsWith('/general/support') : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      id="nd-subnav"
      {...props}
      className="pointer-events-none sticky top-(--fd-docs-row-1) z-30 flex h-20 min-w-0 items-center px-3 [grid-area:header] layout:[--fd-header-height:--spacing(20)] md:px-5"
    >
      <nav
        aria-label="Main"
        data-island={island ? '' : undefined}
        className="nd-island pointer-events-auto grid h-15 w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
      >
        <div className="flex min-w-0 items-center justify-self-start">
          <Link href="/" className="flex h-12 min-w-0 items-center gap-3" aria-label={`${site.name} docs home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/nerve-logo.png"
              alt=""
              width={384}
              height={384}
              className="size-9 shrink-0 select-none"
              draggable={false}
            />
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-base font-extrabold leading-tight tracking-tight text-ink">{site.name}</span>
              <span className="truncate text-xs font-medium text-ink-3">{site.tagline}</span>
            </span>
          </Link>
        </div>

        <ul className="hidden items-center gap-1 xl:flex">
          {nav.map((item) => {
            const active = !item.external && isActive(item.href);
            const cls = `flex h-10 items-center gap-1 rounded-lg px-3 text-[0.9375rem] font-semibold transition-colors ${
              active ? 'text-ink' : 'text-ink-3 hover:text-ink'
            }`;
            return (
              <li key={item.href}>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className={cls}>
                    {item.label} <ArrowUpRight className="size-4 text-ink-3" />
                  </a>
                ) : (
                  <Link href={item.href} className={cls} aria-current={active ? 'page' : undefined}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-end gap-2 justify-self-end">
          {slots.searchTrigger && (
            <slots.searchTrigger.full hideIfDisabled className="nd-search hidden w-56 md:inline-flex xl:w-64" />
          )}

          <div className="hidden h-[2.625rem] items-center gap-0.5 rounded-xl bg-fill-2 p-[0.1875rem] md:flex">
            <a href={site.links.discord} target="_blank" rel="noreferrer" className={groupBtn} aria-label="Discord" title="Discord">
              <DiscordIcon />
            </a>
            {slots.themeSwitch && (
              <>
                <Divider />
                <slots.themeSwitch className="h-9 rounded-lg border-0 px-1 py-0 *:rounded-md" />
              </>
            )}
            {collapsible && slots.sidebar && (
              <>
                <Divider />
                <slots.sidebar.collapseTrigger className={groupBtn} aria-label="Toggle sidebar" title="Toggle sidebar">
                  <PanelLeft />
                </slots.sidebar.collapseTrigger>
              </>
            )}
          </div>

          <div className="flex h-[2.625rem] items-center gap-0.5 rounded-xl bg-fill-2 p-[0.1875rem] md:hidden">
            {slots.searchTrigger && <slots.searchTrigger.sm hideIfDisabled className={groupBtn} />}
            {slots.sidebar && (
              <>
                <Divider />
                <slots.sidebar.trigger className={groupBtn} aria-label="Open menu">
                  <PanelLeft />
                </slots.sidebar.trigger>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
