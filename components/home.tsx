import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { resolveIcon, type IconName } from '@/components/icon';

/** Row of compact shortcut tiles. */
export function QuickLinks({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-2 gap-3 sm:grid-cols-4">
      {children}
    </div>
  );
}

/** Icon in a small framed square, like the store card's view button. */
const iconBox =
  'flex shrink-0 items-center justify-center rounded-[0.625rem] border border-white/[0.1] bg-white/[0.04] text-ink-2 transition-colors duration-200 group-hover:text-accent-hi';

export function QuickLink({
  title,
  href,
  icon,
  children,
}: {
  title: string;
  href: string;
  icon?: IconName;
  children?: ReactNode;
}) {
  const external = href.startsWith('http');

  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="glass-card group flex flex-col gap-4 p-4 hover:-translate-y-0.5"
    >
      <span className="flex items-center justify-between">
        <span className={`${iconBox} size-9 [&_svg]:size-4`}>{resolveIcon(icon)}</span>
        {external && (
          <ArrowUpRight className="size-4 text-ink-3 opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </span>
      <span>
        <span className="block font-display text-[0.9375rem] font-semibold text-ink">{title}</span>
        {children && (
          <span className="mt-1 block text-xs text-ink-2">
            {children}
          </span>
        )}
      </span>
    </Link>
  );
}

/** Grid of script cards within one category. */
export function ScriptList({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose grid gap-4 sm:grid-cols-2 sm:[&>a:last-child:nth-child(odd)]:col-span-2">
      {children}
    </div>
  );
}

export function Script({
  name,
  id,
  icon,
  children,
}: {
  name: string;
  id: string;
  icon?: IconName;
  children?: ReactNode;
}) {
  return (
    <Link
      href={`/${id}/overview`}
      className="glass-card group flex gap-4 p-5 hover:-translate-y-0.5"
    >
      <span className={`${iconBox} size-10 [&_svg]:size-[1.125rem]`}>{resolveIcon(icon)}</span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <span className="font-display text-base font-semibold text-ink transition-colors duration-200 group-hover:text-accent-hi">
            {name}
          </span>
          <code className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-ink-2">
            {id}
          </code>
        </span>
        {children && (
          <span className="mt-2 block text-sm leading-relaxed text-ink-2">
            {children}
          </span>
        )}
      </span>
    </Link>
  );
}
