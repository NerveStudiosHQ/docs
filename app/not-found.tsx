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
      <span className="chip">
        <span className="size-1.5 rounded-full bg-[#a855f7] shadow-[0_0_10px_2px_rgba(168,85,247,0.6)]" />
        Error 404
      </span>
      <h1 className="mt-6 text-6xl font-bold tracking-tight sm:text-7xl">
        <span className="text-gradient">Lost?</span>
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-fd-muted-foreground">
        This page does not exist or has moved. Search with{' '}
        <kbd className="whitespace-nowrap rounded-md border bg-fd-muted px-1.5 py-0.5 font-mono text-xs">Ctrl K</kbd> or pick a
        place to start.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="hero-btn hero-btn-primary">
          Back to the docs <ArrowRight className="size-4" />
        </Link>
        {shortcuts.map(({ href, label, Icon, external }) =>
          external ? (
            <a key={href} href={href} target="_blank" rel="noreferrer" className="hero-btn hero-btn-outline">
              <Icon className="size-4" /> {label}
            </a>
          ) : (
            <Link key={href} href={href} className="hero-btn hero-btn-outline">
              <Icon className="size-4" /> {label}
            </Link>
          ),
        )}
      </div>
    </main>
  );
}
