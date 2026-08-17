# Project Conventions

## Architecture

- Next.js static export only (`output: "export"`).
- Tanpa backend, API routes, database, authentication, admin panel, server actions, atau environment variables.
- Konten publik disimpan di `data/<section>/en.json` dan `data/<section>/id.json`.
- `data/index.ts` menggabungkan file JSON menjadi typed contract `{ en, id }`.
- State bahasa di in-memory, default EN setiap halaman dimuat.

## Public Data Boundary

Perlakukan setiap tracked file dan file yang dihasilkan di `out/` sebagai publik.

Jangan tambah file `.env`, credentials, tokens, cookies, private keys, database files, internal URLs, server addresses, local absolute paths, atau data pribadi nonpublik. Hanya konten portofolio publik yang boleh ada di file JSON.

## Content Changes

- Update `en.json` dan `id.json` untuk section yang terpengaruh.
- Kedua file bahasa harus structurally identical.
- Tambah section baru hanya dengan update file JSON, `data/index.ts`, `app/i18n.ts`, navigasi, dan section component secara bersamaan.

## Commands

```bash
npm run dev
npm run build
```

`npm run build` harus selesai tanpa backend atau environment configuration dan menghasilkan static site di `out/`.

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

Setiap section component di `app/sections/`:
- Props: `{ t: Dict }`
- Root: `<section className="section is-visible">`
- Judul: `<h2 className="sec-title reveal">`
- Elemen interaktif: class `reveal` untuk entrance animation
- List: `Array.map()` dengan key
- Murni render dari `t`, tanpa local state atau side effect

Cara tambah section baru:
1. Buat `data/<section>/en.json` dan `id.json` (struktur identik).
2. Tambah import + key di `data/index.ts`.
3. Tambah `SectionId` ke `sectionIds` di `app/i18n.ts`.
4. Buat `app/sections/<Section>.tsx`.
5. Daftarkan di `PageClient.tsx` (conditional render + import).
6. Tambah label nav di `data/nav/en.json` dan `id.json`.

## i18n Pattern

State bahasa di `app/i18n.ts`. In-memory, default EN setiap load.

- `getLang()` / `setLang(lang)`
- `subscribeLang(listener)` → pakai `useSyncExternalStore` di PageClient
- `sectionIds` → ordered array, drive nav + section switching
- Toggle bahasa: fixed top-right di PageClient, trigger slide animation
- Akses konten: `t.<section>.<field>` (contoh: `t.hero.tagline`)

## Writing Style

- Singkat, padat, jelas
- Tidak boleh pakai dash di tengah kalimat (`-`, `--`, atau `—`). Contoh salah: "Next.js - framework React" atau "Next.js — framework". Contoh benar: "Next.js adalah framework React"
- Tidak ada filler (certainly, let me, here's what, dll)
- List markdown dengan `-` boleh
- Kalimat aktif, bukan pasif

## Maintenance

Update file ini saat konvensi project berubah. File ini adalah source of truth untuk perilaku agent di project ini.
