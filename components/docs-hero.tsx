import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { DiscordIcon } from '@/components/icons';
import { site } from '@/lib/site';

/** Intro for the docs home page, built like the store hero: announcement pill, big uppercase title with one accent word, two buttons. */
export function DocsHero() {
  return (
    <div className="not-prose mb-12 pt-2">
      <Link
        href="/general/getting-started"
        className="hero-in group inline-flex h-8 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] pl-1 pr-3 text-xs font-medium text-ink-2 transition-colors hover:border-white/[0.16] hover:text-ink"
      >
        <span className="rounded-full bg-accent px-2 py-1 text-[0.625rem] font-bold uppercase leading-none tracking-wider text-white">
          Docs
        </span>
        New here? Install your first script
        <ChevronRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
      </Link>
      <h1
        className="hero-in mt-6 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-6xl"
        style={{ animationDelay: '60ms' }}
      >
        Get the most out of <span className="text-accent">Nerve</span> scripts
      </h1>
      <p className="hero-in mt-5 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg" style={{ animationDelay: '120ms' }}>
        Install guides, configuration references and troubleshooting for every {site.name} FiveM script.
      </p>
      <div className="hero-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: '180ms' }}>
        <Link href="/general/getting-started" className="btn btn-light btn-lg">
          Get started <ChevronRight className="size-4" />
        </Link>
        <a href={site.links.discord} target="_blank" rel="noreferrer" className="btn btn-primary btn-lg">
          <DiscordIcon className="size-[1.125rem]" /> Join Discord
        </a>
      </div>
    </div>
  );
}
