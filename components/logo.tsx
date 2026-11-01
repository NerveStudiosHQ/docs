import { site } from '@/lib/site';

/**
 * Nerve Studios wordmark. The dark-mode asset has white lettering; the
 * light-mode asset swaps the lettering to near-black. The purple mark is
 * identical in both.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/nerve-wordmark-light.png"
        alt={site.name}
        width={519}
        height={200}
        className={`h-9 w-auto dark:hidden ${className}`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/nerve-wordmark.png"
        alt={site.name}
        width={519}
        height={200}
        className={`hidden h-9 w-auto dark:block ${className}`}
      />
    </>
  );
}
