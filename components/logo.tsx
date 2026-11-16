import { site } from '@/lib/site';

/** Nerve Studios watermark, the same image as the store header. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo/nerve-watermark.png"
      alt={site.name}
      width={480}
      height={191}
      draggable={false}
      className={`h-10 w-auto select-none ${className}`}
    />
  );
}
