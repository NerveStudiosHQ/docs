import * as lucide from 'lucide-react';
import { createElement, type ComponentType, type ReactNode } from 'react';
import { DiscordIcon } from '@/components/icons';

export type IconName = keyof typeof lucide.icons | 'Discord' | (string & {});

/**
 * Lucide renames icons between releases (Fingerprint became FingerprintPattern) and keeps
 * the old name only as an export alias, not in its `icons` map. Falling back to the exports
 * keeps names written into script manifests working after a lucide upgrade.
 */
export function lucideIcon(name: string): ComponentType | undefined {
  const exports = lucide as unknown as Record<string, ComponentType | undefined>;
  return lucide.icons[name as keyof typeof lucide.icons] ?? exports[`${name}Icon`] ?? exports[name];
}

/** Resolve an icon name (lucide, or "Discord") to an element. */
export function resolveIcon(icon: IconName | ReactNode | undefined): ReactNode {
  if (typeof icon !== 'string') return icon;
  if (icon === 'Discord') return <DiscordIcon />;
  const Icon = lucideIcon(icon);
  return Icon ? createElement(Icon) : undefined;
}
