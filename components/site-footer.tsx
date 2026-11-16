import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { DiscordIcon, YouTubeIcon } from '@/components/icons';
import { site } from '@/lib/site';

type FooterLink = { label: string; href: string; external?: boolean };

const groups: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Docs',
    links: [
      { label: 'Introduction', href: '/' },
      { label: 'Getting started', href: '/general/getting-started' },
      { label: 'FAQ', href: '/general/faq' },
      { label: 'Support', href: '/general/support' },
      { label: 'Changelog', href: '/changelog/overview' },
    ],
  },
  {
    title: 'Store',
    links: [
      { label: 'All Scripts', href: `${site.links.store}/scripts`, external: true },
      { label: 'Premium Scripts', href: `${site.links.store}/scripts/premium`, external: true },
      { label: 'Free Scripts', href: `${site.links.store}/scripts/free`, external: true },
      { label: 'Store FAQ', href: `${site.links.store}/faq`, external: true },
    ],
  },
  {
    title: 'Nerve Studios',
    links: [
      { label: 'Website', href: site.links.website, external: true },
      { label: 'Store Terms', href: `${site.links.store}/terms`, external: true },
    ],
  },
];

const socials = [
  { label: 'Discord', href: site.links.discord, Icon: DiscordIcon },
  { label: 'YouTube', href: site.links.youtube, Icon: YouTubeIcon },
  { label: 'Store', href: site.links.store, Icon: ShoppingBag },
];

const linkCls = 'text-sm text-ink-2 transition-colors duration-200 hover:text-ink';
const headingCls = 'mb-3 text-sm font-semibold uppercase tracking-wider text-ink';

function FooterAnchor({ link }: { link: FooterLink }) {
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={linkCls}>
      {link.label}
    </Link>
  );
}

/** The store footer: brand and blurb on the left, link columns, social icons, then a centred legal line. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 mt-auto border-t border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto w-full max-w-(--fd-layout-width) px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center" aria-label={`${site.name} docs home`}>
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
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-2">
              Install guides, configuration references and troubleshooting for every {site.name} FiveM script.
            </p>
          </div>

          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className={headingCls}>{group.title}</h2>
              <ul className="flex flex-col gap-2">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <FooterAnchor link={l} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className={headingCls}>Connect</h2>
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="text-ink-3 transition-colors duration-200 hover:text-accent-hi"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/[0.06] pt-8 text-center text-xs leading-relaxed text-ink-2">
          <p className="max-w-3xl">
            Copyright &copy; {year} {site.name}. Not affiliated with or endorsed by Rockstar North, Take-Two Interactive, Cfx.re or other
            rights holders. FiveM is a copyright and registered trademark of Take-Two Interactive Software, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
