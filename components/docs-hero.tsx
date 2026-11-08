import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { DiscordIcon } from '@/components/icons';
import { site } from '@/lib/site';

/** Intro for the docs home page, laid out like the store's page header: pill, bold title, muted line, buttons, purple rule. */
export function DocsHero() {
  return (
    <div className="not-prose relative mb-12 pb-10 pt-2">
      <span className="pill" data-tone="accent">
        Documentation
      </span>
      <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.25rem]">
        <span className="text-gradient">{site.name}</span> docs
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg">
        Install guides, configuration references and troubleshooting for every {site.name} FiveM script.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/general/getting-started" className="btn btn-primary">
          Get started <ArrowRight className="size-4" />
        </Link>
        <a href={site.links.store} target="_blank" rel="noreferrer" className="btn btn-ghost">
          Visit the store <ArrowUpRight className="size-4 text-ink-3" />
        </a>
        <a href={site.links.discord} target="_blank" rel="noreferrer" className="btn btn-ghost">
          <DiscordIcon className="size-4" /> Discord
        </a>
      </div>
      <span aria-hidden className="nd-rule absolute inset-x-0 bottom-0 h-px" />
    </div>
  );
}
