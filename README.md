# Digital Group ID — Company Profile

Website company profile statis, siap deploy ke Vercel. Tanpa build step, tanpa dependency.

## Struktur
```
digital-group-id/
├── index.html
├── styles.css
├── script.js
└── vercel.json
```

## Deploy ke Vercel (3 cara)

### Cara 1 — Drag & Drop (paling cepat)
1. Buka https://vercel.com/new
2. Drag folder `digital-group-id` ke sana / import via GitHub.

### Cara 2 — Vercel CLI
```bash
cd digital-group-id
npx vercel --prod
```

### Cara 3 — Via GitHub
1. Push folder ini sebagai repo GitHub.
2. Di Vercel: Add New Project → Import repo.
3. Framework Preset: **Other**. Build Command: kosong. Output: `./`.
4. Deploy.

## Kustomisasi cepat
- Nomor WhatsApp: edit `script.js` → `waNumber`.
- Email & alamat: edit bagian `#kontak` di `index.html`.
- Warna: edit `:root` di `styles.css`.
- Produk: tiap kartu di section `#produk` adalah satu `<article class="product">`.

## Catatan
Form kontak membuka WhatsApp dengan pesan terisi otomatis — tidak butuh backend.
Kalau nanti butuh backend/form ke email, bisa tambah Vercel Serverless Function atau Formspree.
