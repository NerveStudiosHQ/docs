import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Card as BaseCard, type CardProps } from 'fumadocs-ui/components/card';
import type { ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';
import { resolveIcon, type IconName } from '@/components/icon';
import { QuickLink, QuickLinks, Script, ScriptList } from '@/components/home';

/**
 * `<Card>` that accepts `icon` as a plain string (lucide icon name),
 * so MDX authors never need to import icon components.
 */
function Card({
  icon,
  ...props
}: Omit<CardProps, 'icon'> & { icon?: IconName | ReactNode }) {
  return <BaseCard icon={resolveIcon(icon)} {...props} />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Card,
    QuickLinks,
    QuickLink,
    ScriptList,
    Script,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
