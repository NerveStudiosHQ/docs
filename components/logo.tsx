import { site } from '@/lib/site';

/**
 * Nerve Studios logo: the purple mark plus the name as live text, same as the
 * store header. Text follows the theme, so one asset works in light and dark.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo/nerve-logo.png" alt="" width={384} height={384} className="size-7 select-none" draggable={false} />
      <span className="whitespace-nowrap text-[1.0625rem] font-bold tracking-tight text-fd-foreground">{site.name}</span>
    </span>
  );
}
