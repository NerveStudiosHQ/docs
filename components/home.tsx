import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { resolveIcon, type IconName } from '@/components/icon';

/** Row of compact shortcut tiles. */
export function QuickLinks({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-2 gap-2 sm:grid-cols-4">
      {children}
    </div>
  );
}

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
      className="surface-card group flex flex-col gap-3 p-3.5 hover:bg-fill-2"
    >
      <span className="flex items-center justify-between text-ink-3 [&>svg:first-child]:size-7 [&>svg:first-child]:rounded-lg [&>svg:first-child]:bg-accent-dim [&>svg:first-child]:p-1.5 [&>svg:first-child]:text-accent-hi [&_svg]:size-4">
        {resolveIcon(icon)}
        {external && (
          <ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </span>
      <span>
        <span className="block text-sm font-semibold text-ink">{title}</span>
        {children && (
          <span className="mt-0.5 block text-xs text-ink-3">
            {children}
          </span>
        )}
      </span>
    </Link>
  );
}

/** Bordered list of scripts within one category. */
export function ScriptList({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose grid gap-px overflow-hidden rounded-(--radius) border border-divider bg-divider sm:grid-cols-2 sm:[&>a:last-child:nth-child(odd)]:col-span-2">
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
      href={`${id.startsWith('nexdev_') ? '/legacy' : ''}/${id}/overview`}
      className="group flex gap-3 bg-bg p-4 transition-colors hover:bg-fd-card"
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-fill-2 text-ink-3 transition-colors group-hover:bg-accent-dim group-hover:text-accent-hi [&_svg]:size-3.5">
        {resolveIcon(icon)}
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-sm font-semibold text-ink">{name}</span>
          <code className="font-mono text-[11px] text-ink-3">
            {id}
          </code>
        </span>
        {children && (
          <span className="mt-1 block text-[13px] leading-relaxed text-ink-2">
            {children}
          </span>
        )}
      </span>
    </Link>
  );
}
