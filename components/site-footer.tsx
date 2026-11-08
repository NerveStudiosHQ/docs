import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { DiscordIcon } from '@/components/icons';
import { site } from '@/lib/site';

const links = [
  { label: 'Store', href: site.links.store },
  { label: 'Website', href: site.links.website },
  { label: 'Discord', href: site.links.discord },
];

/** Slim site footer, same tone as the store footer: hairline divider, mark + name, muted links. */
export function SiteFooter() {
  return (
    <footer className="border-t border-divider">
      <div className="mx-auto flex w-full max-w-(--fd-layout-width) flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex w-fit items-center gap-2" aria-label={`${site.name} docs home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/nerve-logo.png" alt="" width={384} height={384} className="size-5.5 select-none" draggable={false} />
            <span className="text-sm font-semibold tracking-tight text-ink">{site.name}</span>
          </Link>
          <p className="text-sm text-ink-3">
            © {new Date().getFullYear()} {site.name}. Premium FiveM resources.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-ink-2 transition-colors hover:text-ink"
            >
              {l.label === 'Discord' && <DiscordIcon className="size-4" />}
              {l.label}
              <ArrowUpRight className="size-3.5 text-ink-3" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
