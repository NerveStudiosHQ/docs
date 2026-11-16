import Link from 'next/link';
import { ArrowRight, BookOpen, LifeBuoy, ShoppingBag } from 'lucide-react';
import { site } from '@/lib/site';

const shortcuts = [
  { href: '/general/getting-started', label: 'Getting started', Icon: BookOpen },
  { href: '/general/support', label: 'Support', Icon: LifeBuoy },
  { href: site.links.store, label: 'Store', Icon: ShoppingBag, external: true },
];

/**
 * 404 inside the docs layout. Unknown slugs render this within the docs grid,
 * so it claims the main column ([grid-area:main]) instead of the sidebar slot.
 */
export default function NotFound() {
  return (
    <main className="[grid-area:main] flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 font-display text-6xl font-extrabold uppercase tracking-tight text-ink sm:text-7xl">
        Page <span className="text-accent">lost</span>
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-2">
        This page does not exist or has moved. Search with{' '}
        <kbd className="whitespace-nowrap rounded-md border border-divider bg-fill-1 px-1.5 py-0.5 text-xs text-ink-3">Ctrl K</kbd> or pick a
        place to start.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-light">
          Back to the docs <ArrowRight className="size-4" />
        </Link>
        {shortcuts.map(({ href, label, Icon, external }) =>
          external ? (
            <a key={href} href={href} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <Icon className="size-4" /> {label}
            </a>
          ) : (
            <Link key={href} href={href} className="btn btn-ghost">
              <Icon className="size-4" /> {label}
            </Link>
          ),
        )}
      </div>
    </main>
  );
}
