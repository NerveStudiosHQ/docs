import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { DiscordIcon } from '@/components/icons';
import { site } from '@/lib/site';

/** Branded intro for the docs home page, styled like the store and nervestudios.net. */
export function DocsHero() {
  return (
    <div className="not-prose docs-hero relative mb-12 overflow-hidden rounded-3xl border border-fd-primary/20 px-6 py-12 sm:px-10 sm:py-14">
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[32rem] -translate-x-1/2 rounded-full bg-[#a855f7]/25 blur-[90px]" />
      <div className="relative">
        <span className="chip">
          <span className="size-1.5 rounded-full bg-[#a855f7] shadow-[0_0_10px_2px_rgba(168,85,247,0.6)]" />
          Documentation
        </span>
        <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          <span className="text-gradient">{site.name}</span> docs
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-fd-muted-foreground sm:text-lg">
          Install guides, configuration references and troubleshooting for every {site.name} FiveM script.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/general/getting-started" className="hero-btn hero-btn-primary">
            Get started <ArrowRight className="size-4" />
          </Link>
          <a href={site.links.store} target="_blank" rel="noreferrer" className="hero-btn hero-btn-outline">
            Visit the store <ArrowUpRight className="size-4" />
          </a>
          <a href={site.links.discord} target="_blank" rel="noreferrer" className="hero-btn hero-btn-outline">
            <DiscordIcon className="size-4" /> Discord
          </a>
        </div>
      </div>
    </div>
  );
}
