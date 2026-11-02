/** Site-wide constants shared by layouts and metadata. */
export const site = {
  name: 'Nerve Studios',
  title: 'Nerve Studios Documentation',
  description:
    'Install guides, configuration references, and troubleshooting for every Nerve Studios FiveM script.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://docs.nervestudios.net',
  links: {
    discord: 'https://discord.gg/nervestudios',
    website: 'https://nervestudios.net',
    store: 'https://store.nervestudios.net',
  },
} as const;
