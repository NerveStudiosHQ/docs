'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';

/** Same reactbits Aurora + Particles pair as nervestudios.net and the store. Loaded after first paint. */
const Aurora = dynamic(() => import('@/components/reactbits/Aurora'), { ssr: false });
const Particles = dynamic(() => import('@/components/reactbits/Particles'), { ssr: false });

const DESKTOP = '(pointer: fine) and (min-width: 1024px)';
const CALM = '(prefers-reduced-motion: reduce)';

function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Waits until the browser is idle so the background never competes with the page itself. */
function useIdle() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const go = () => setReady(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(go, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(go, 600);
    return () => clearTimeout(id);
  }, []);
  return ready;
}

/**
 * Fixed backdrop behind the docs, dark mode only: a slow violet Aurora along the top and faint
 * drifting Particles (desktop only), over a static glow so nothing changes before WebGL loads.
 * The aurora renders at half size and is scaled up; reduced-motion users get the static glow only.
 */
export function SiteBackground() {
  const ready = useIdle();
  const desktop = useMedia(DESKTOP);
  const calm = useMedia(CALM);
  const animate = ready && !calm;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden dark:block">
      <div className="site-light absolute inset-x-0 top-0 h-[42rem]" />
      {animate && (
        <div className="absolute inset-x-0 top-0 h-[70vh] opacity-40 motion-safe:animate-[bg-fade_1.6s_ease-out]">
          <div className="h-1/2 w-1/2 origin-top-left scale-[2]">
            <Aurora colorStops={['#3b0764', '#a855f7', '#4c1d95']} amplitude={1.1} blend={0.6} speed={0.5} />
          </div>
        </div>
      )}
      {animate && desktop && (
        <div className="absolute inset-0 opacity-50">
          <Particles
            particleColors={['#ffffff', '#c084fc', '#a855f7']}
            particleCount={120}
            particleSpread={10}
            speed={0.06}
            particleBaseSize={70}
            alphaParticles
            disableRotation={false}
            pixelRatio={1}
          />
        </div>
      )}
      <div className="site-grain absolute inset-0" />
    </div>
  );
}
