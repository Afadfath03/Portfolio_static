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
