# Nerve Studios docs — project instructions

## About this project

- Documentation for Nerve Studios's FiveM scripts.
- Built with Fumadocs on Next.js. Pages are MDX files with YAML frontmatter
  under `content/docs/`; one folder per script.
- Sidebar order, section labels, and folder icons live in `meta.json` files
  (one at `content/docs/meta.json`, one per script folder).

## Structure

- One section holding the current `nerve_*` scripts. The original
  `nexdev_*` scripts and their pages were removed.
- One folder per script, each with `overview`, `installation`,
  `configuration`, `troubleshooting` and `changelog` pages plus any extra
  pages it needs.
- Shared pages live under `content/docs/general/`; the release overview under
  `content/docs/changelog/`.
- Page URLs mirror the folder path with no prefix:
  `content/docs/nerve_blipcreator/installation.mdx` -> `/nerve_blipcreator/installation`.
- Internal links are root-relative and omit the file extension.
- Adding a page: create the `.mdx` file **and** add its name to the folder's
  `meta.json` `pages` array, or it will not show in the sidebar.

## nerve_ scripts are synced from the workspace

`nerve_*` docs are kept in step with the script source by `docs-sync.js` in
the Nerve Studios workspace (`.claude/skills/nerve/scripts/docs-sync.js`).
It runs on every feature, fix and release of a script. It owns:

- `<script>/changelog.mdx` (whole file, from the script's `CHANGELOG.md`)
- the `{/* nerve:config:start */}` block of `<script>/configuration.mdx`
  (from the script's `shared/config*.lua`)
- the `{/* nerve:scripts:start */}` block of `index.mdx` and the
  `{/* nerve:releases:start */}` block of `changelog/overview.mdx`
- `<script>/meta.json` title, icon and page order, the `nerve_*` entries and
  category separators in `content/docs/meta.json`, and `nerve-scripts.json`

Never edit those by hand; change the script and re-run the sync. Everything
else on a `nerve_*` page is hand-written. A page holding a
`{/* nerve:todo */}` marker is an unwritten stub and must not be merged.

## Components

- Callouts: `<Callout type="info">`, `<Callout type="warn">`,
  `<Callout type="error">`. Put a blank line after the opening tag and before
  the closing tag.
- Cards: `<Cards>` containing `<Card title="..." icon="Rocket" href="...">`.
  `icon` is a lucide icon name string (or `"Discord"`). Check the name exists
  in the installed `lucide-react`; unknown names render no icon.
- Home page only: `<QuickLinks>` with `<QuickLink title icon href>` tiles,
  and one `<ScriptList>` per category containing
  `<Script name="Garages" id="nexdev_garages" icon="Warehouse">` rows.
- Custom heading anchors: `## Heading text [#custom-id]`. Use these when a
  heading contains punctuation (em dashes, slashes, dots) so links stay clean.
- Code fences: `lua`, `sql`, `json`, and `cfg` (for `server.cfg`) are
  highlighted. Unknown languages fall back to plain text.

## Terminology

- Refer to products by their full name: "Nerve Studios Garage", "Nerve Studios Queue", etc.
- "Resource" or "script" for a FiveM resource; "framework" for ESX / QBox.

## Style preferences

- Use active voice and second person ("you").
- Keep sentences concise — one idea per sentence.
- Use sentence case for headings.
- Bold for UI elements: Click **Settings**.
- Code formatting for file names, commands, paths, and config keys.
- Use callouts for notes and cautions.

## Checks

- `npm run build` must pass before pushing; it fails on MDX or type errors.
- `node ../.claude/skills/nerve/scripts/docs-check.js content/docs` (from the
  workspace clone) flags stack names, internal paths and unwritten stubs.
- `npm run check:links` (after a build) verifies every internal link and
  `#anchor` resolves.

## Confidentiality

The scripts are sold as CFX-escrowed products. The docs describe **what a script
does and how to use it — never how it is built.**

- Never name UI frameworks, libraries, or build tooling (React, Vue, Svelte,
  Tailwind, Node, npm, bun, Vite, etc.) **in page content**. This rule is about
  the scripts, not about this docs site itself.
- Never document internal source structure (`web/src`, `web/dist`, `web/build`,
  `client/`, `server/` file names) or include UI build/rebuild instructions.
  If UI files are missing, the fix is "re-download from your purchase".
- Say "the UI ships ready to use — no build step" instead of naming the stack.
- Fine to mention: user-editable files (`shared/config.lua`, `shared/config_*.lua`,
  `shared/editable.lua`, `locales/`, `install/`, SQL files),
  public third-party dependencies (`ox_lib`, `oxmysql`, `ox_inventory` paths),
  and generic FiveM platform terms (NUI focus, ACE permissions, convars).

## Branding

- Brand is Nerve Studios; site lives at `https://docs.nervestudios.net`,
  main site `https://nervestudios.net`, Discord `https://discord.gg/nervestudios`.
- Current scripts use `nerve_` identifiers; the original scripts keep their
  `nexdev_` names (resource folders, exports, ACE permissions, commands,
  URLs). Only prose says "Nerve Studios".
- Supported frameworks for `nerve_` scripts are ESX and QBox. Never claim
  QBCore support on a `nerve_` page.
- Design matches store.nervestudios.net: same tokens (`--bg #0b0a10`, `--float`,
  `--fill-1/2/3`, `--divider`, `--ink/-2/-3`, `--accent #a855f7`, `--accent-hi #c084fc`,
  `--radius 0.75rem`) defined in `app/global.css` and mapped onto the Fumadocs
  `--color-fd-*` variables. Dark is the default theme; light keeps the same structure.
  Store utilities `.btn`, `.btn-primary`, `.btn-ghost`, `.pill`, `.surface-card` and
  `.text-gradient` are ported there too.
- Flat background only: no grids, glows, aurora or particles.
- Type is Plus Jakarta Sans (same as the store); code uses Geist Mono.
- Header is `components/site-header.tsx`, passed as the notebook layout's `header`
  slot: logo mark + name + tagline, centered links, search and an icon group. It is a
  solid bar pinned to the top that never changes on scroll (no floating island, no
  blur). It reuses the Fumadocs search, sidebar and theme slots, so keep those when
  editing it.
  Footer is `components/site-footer.tsx`.
- Fumadocs also puts `data-card` on heading anchors, so card styles target
  `[data-card][class*="bg-fd-card"]` only.
- Logo mark is `public/logo/nerve-logo.png`; `nerve-wordmark*.png` are kept for
  other uses. Favicons are `app/icon.png` and `app/apple-icon.png`, copied from nervestudios.net so
  both sites share one icon; recopy from that repo's `app/` when it changes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
