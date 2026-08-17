# Project Conventions

## Architecture

- Next.js static export only (`output: "export"`).
- No backend, API routes, database, authentication, admin panel, server actions, or environment variables.
- Public content is stored in `data/<section>/en.json` and `data/<section>/id.json`.
- `data/index.ts` assembles JSON files into the typed `{ en, id }` content contract.
- Language state is in memory and defaults to EN on every page load.

## Public Data Boundary

Treat every tracked file and every file generated in `out/` as publicly readable.

Do not add `.env` files, credentials, tokens, cookies, private keys, database files, internal URLs, server addresses, local absolute paths, or nonpublic personal data. Only public portfolio content belongs in JSON files.

## Content Changes

- Update both `en.json` and `id.json` for the affected section.
- Keep both language files structurally identical.
- Add a new section only by updating its JSON files, `data/index.ts`, `app/i18n.ts`, navigation, and section component together.

## Commands

```bash
npm run dev
npm run build
```

`npm run build` must complete without a backend or environment configuration and produce the static site in `out/`.

## File Structure

```text
app/
├── layout.tsx          # Root layout, font, analytics
├── page.tsx            # Server entry → PageClient
├── PageClient.tsx      # Client shell: nav, section switch, lang toggle
├── i18n.ts             # Lang state, sectionIds
├── globals.css         # All styles
├── not-found.tsx       # 404
├── components/
│   └── Nav.tsx         # Sidebar (desktop) / bottom bar (mobile)
└── sections/
    ├── Hero.tsx
    ├── About.tsx
    ├── Stack.tsx
    ├── Experience.tsx
    ├── Education.tsx
    ├── Works.tsx
    └── Contact.tsx

data/
├── index.ts            # Assembles JSON → { en, id } contract
├── nav/{en,id}.json
├── hero/{en,id}.json
├── about/{en,id}.json
├── stack/{en,id}.json
├── experience/{en,id}.json
├── education/{en,id}.json
├── works/{en,id}.json
└── contact/{en,id}.json
```

## Component Pattern

Every section component in `app/sections/`:
- Props: `{ t: Dict }`
- Root: `<section className="section is-visible">`
- Title: `<h2 className="sec-title reveal">`
- Interactive elements: `reveal` class for entrance animation
- Lists: `Array.map()` with key
- Pure render from `t`, no local state or side effects

How to add a new section:
1. Create `data/<section>/en.json` and `id.json` (structurally identical).
2. Add import + key in `data/index.ts`.
3. Add `SectionId` to `sectionIds` in `app/i18n.ts`.
4. Create `app/sections/<Section>.tsx`.
5. Register in `PageClient.tsx` (conditional render + import).
6. Add nav label in `data/nav/en.json` and `id.json`.

## i18n Pattern

Language state lives in `app/i18n.ts`. In-memory, defaults to EN on every load.

- `getLang()` / `setLang(lang)`
- `subscribeLang(listener)` → use `useSyncExternalStore` in PageClient
- `sectionIds` → ordered array, drives nav + section switching
- Language toggle: fixed top-right in PageClient, triggers slide animation
- Content access: `t.<section>.<field>` (e.g. `t.hero.tagline`)

## Writing Style

- Short, concise, clear
- No dashes mid-sentence (`-`, `--`, or `—`). Wrong: "Next.js - framework React" or "Next.js — a framework". Correct: "Next.js is a React framework"
- No filler words (certainly, let me, here's what, etc.)
- Markdown lists with `-` are allowed
- Active voice, not passive

## Maintenance

Update this file whenever project conventions change. This file is the source of truth for agent behavior in this project.
