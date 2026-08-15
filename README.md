# Portofolio Static

Portfolio bilingual EN/ID yang dibangun sebagai static export Next.js. Proyek ini tidak memiliki backend, database, API route, authentication, atau admin panel.

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Development server berjalan di `http://localhost:3000` secara default.

## Build Static

```bash
npm run build
```

Hasil static export tersedia di folder `out/` dan dapat disajikan oleh static web server apa pun.

## Mengubah Konten

Konten berada di `data/<section>/<lang>.json`. Setiap section memiliki file `en.json` dan `id.json`:

```text
data/
├── nav/{en,id}.json
├── hero/{en,id}.json
├── about/{en,id}.json
├── stack/{en,id}.json
├── experience/{en,id}.json
├── education/{en,id}.json
├── works/{en,id}.json
└── contact/{en,id}.json
```

Struktur EN dan ID untuk section yang sama harus tetap identik.

## Keamanan Data

Semua nilai dalam `data/**/*.json` adalah data publik. Nilai tersebut dapat masuk ke HTML atau JavaScript hasil build dan dibaca oleh siapa pun.

Jangan simpan password, API key, token, cookie, private URL, alamat server internal, data pribadi nonpublik, atau credential dalam repository ini. Proyek tidak membutuhkan file `.env`.
