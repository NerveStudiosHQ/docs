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
      className="group flex flex-col gap-3 rounded-lg border p-3.5 transition-colors hover:border-fd-primary/40 hover:bg-fd-muted"
    >
      <span className="flex items-center justify-between text-fd-muted-foreground [&_svg]:size-4">
        {resolveIcon(icon)}
        {external && (
          <ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </span>
      <span>
        <span className="block text-sm font-medium">{title}</span>
        {children && (
          <span className="mt-0.5 block text-xs text-fd-muted-foreground">
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
    <div className="not-prose grid gap-px overflow-hidden rounded-lg border bg-fd-border sm:grid-cols-2 sm:[&>a:last-child:nth-child(odd)]:col-span-2">
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
      className="group flex gap-3 bg-fd-background p-4 transition-colors hover:bg-fd-muted"
    >
      <span className="mt-0.5 shrink-0 text-fd-muted-foreground transition-colors group-hover:text-fd-primary [&_svg]:size-4">
        {resolveIcon(icon)}
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-sm font-medium">{name}</span>
          <code className="font-mono text-[11px] text-fd-muted-foreground">
            {id}
          </code>
        </span>
        {children && (
          <span className="mt-1 block text-[13px] leading-relaxed text-fd-muted-foreground">
            {children}
          </span>
        )}
      </span>
    </Link>
  );
}
