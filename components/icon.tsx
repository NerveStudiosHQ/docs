import { icons } from 'lucide-react';
import { createElement, type ReactNode } from 'react';
import { DiscordIcon } from '@/components/icons';

export type IconName = keyof typeof icons | 'Discord';

/** Resolve an icon name (lucide, or "Discord") to an element. */
export function resolveIcon(icon: IconName | ReactNode | undefined): ReactNode {
  if (typeof icon !== 'string') return icon;
  if (icon === 'Discord') return <DiscordIcon />;
  const Icon = icons[icon as keyof typeof icons];
  return Icon ? createElement(Icon) : undefined;
}
