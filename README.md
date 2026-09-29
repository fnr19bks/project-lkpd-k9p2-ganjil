# 🎮 Misi Kurir Muda — Petualangan Graf Berbobot

**LKPD Interaktif Berpikir Komputasional · Graf Berbobot dan Rute Terpendek**
SMP Negeri 19 Kota Bekasi · Informatika Kelas 8 · © 2026

---

## 📖 Deskripsi Proyek

Aplikasi web statis (HTML + CSS + JavaScript **Vanilla**, tanpa framework, tanpa backend, tanpa database) berbentuk game edukasi 4 level untuk membantu murid memahami konsep **graf berbobot** (*weighted graph*) dan **rute terpendek** (*shortest path*).

**Fitur utama**
- 4 level linear bertingkat + tutorial interaktif (Level 0)
- Sistem skor (maks. **240**), 3 nyawa ❤️, bintang ⭐ 1–3, dan lencana
- Dwibahasa **ID ↔ EN** (toggle 🌐)
- Graf SVG interaktif (klik simpul & sisi)
- Modal umpan balik dengan penjelasan + rumus perhitungan
- Kalkulator bantu 🧮, Glosarium 📖, Dark Mode 🌙, Suara 🔊 (Web Audio API)
- Mode Tantangan Kilat ⏱️ (60 detik per level)
- Sertifikat digital siap cetak (A4)
- Skor terbaik tersimpan di **localStorage** (tanpa server)
- Responsif (mobile-first 320 px), aksesibel keyboard (Tab + Enter), kontras WCAG AA

---

## 📁 Struktur File

```
graf-berbobot-lkpd/
├── index.html        Struktur halaman utama (SPA)
├── style.css         Semua gaya (CSS Variables + responsive)
├── script.js         Logika game, soal (DATA), bahasa (I18N), state
├── favicon.svg       Ikon tab browser
├── logo.png          Logo sekolah (ganti dengan logo resmi)
├── README.md         Dokumentasi ini
└── assets/
    ├── sounds/       (kosong — suara dibuat via Web Audio API)
    └── images/       (kosong — graf dibuat via SVG inline)
```

---

## 🚀 Cara Menjalankan Secara Lokal

### Cara 1 — Buka langsung (paling cepat, offline)
1. Ekstrak folder `graf-berbobot-lkpd`.
2. Klik dua kali **`index.html`** → terbuka di browser.
3. Selesai. Game langsung berjalan tanpa internet.

### Cara 2 — VS Code + Live Server (disarankan saat mengedit)
1. Install [Visual Studio Code](https://code.visualstudio.com/).
2. Buka folder proyek: `File → Open Folder → graf-berbobot-lkpd`.
3. Install ekstensi **Live Server** (cari di panel Extensions).
4. Klik kanan `index.html` → **Open with Live Server**.
5. Browser terbuka otomatis di `http://127.0.0.1:5500`.

### Cara 3 — Python HTTP Server
Buka terminal di folder proyek, lalu jalankan:
```bash
python -m http.server 8000
```
Buka `http://localhost:8000` di browser.

---

## 🌐 Cara Deploy Gratis ke GitHub Pages (Step-by-Step untuk Pemula)

### 🧭 Langkah 0 — Persiapan
Siapkan:
- Komputer/laptop dengan koneksi internet.
- Akun GitHub (daftar gratis di https://github.com/signup).
- Akun email aktif.
- File hasil dari AI: `index.html`, `style.css`, `script.js`, `favicon.svg`, `logo.png`, `README.md`.

### 🧭 Langkah 1 — Daftar GitHub
1. Buka https://github.com/signup.
2. Masukkan email, buat kata sandi, buat username.
3. Verifikasi email.
4. Selesai.

### 🧭 Langkah 2 — Buat Repository Baru
1. Login ke GitHub.
2. Klik tombol **"+"** di kanan atas → **"New repository"**.
3. Isi:
   - **Repository name:** `graf-berbobot-lkpd`
   - **Description:** `LKPD Interaktif Graf Berbobot dan Rute Terpendek — SMPN 19 Kota Bekasi`
   - Pilih **Public** (wajib untuk GitHub Pages gratis).
   - Centang: **Add a README file**.
4. Klik **Create repository**.

### 🧭 Langkah 3 — Unggah File
1. Di halaman repository, klik **"Add file"** → **"Upload files"**.
2. Drag & drop semua file (`index.html`, `style.css`, `script.js`, `favicon.svg`, `logo.png`) ke area unggah.
3. Scroll ke bawah, klik **"Commit changes"**.
4. Tunggu hingga proses selesai (beberapa detik).

### 🧭 Langkah 4 — Aktifkan GitHub Pages
1. Di halaman repository, klik tab **"Settings"** (ikon gerigi di atas).
2. Di sidebar kiri, scroll ke bawah, klik **"Pages"**.
3. Di bagian **"Branch"**, pilih:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` + folder `/ (root)`
4. Klik **"Save"**.
5. Tunggu 1–2 menit. Refresh halaman.
6. Akan muncul tulisan:
   ✅ *"Your site is live at https://<username-anda>.github.io/graf-berbobot-lkpd/"*

### 🧭 Langkah 5 — Buka Situs
1. Klik tautan yang muncul.
2. Aplikasi Anda langsung online dan bisa dibagikan ke murid.
3. Kirim tautan melalui WhatsApp/Google Classroom.

### 🧭 Langkah 6 — Update Konten (Jika Perlu Revisi)
1. Di repository, klik file yang ingin diubah (mis. `script.js`).
2. Klik ikon pensil ✏️ di kanan atas.
3. Edit, lalu klik **"Commit changes"**.
4. Tunggu 1 menit → situs otomatis ter-update.

### 🧭 Langkah 7 — Ganti Logo
1. Siapkan file logo resmi SMPN 19 Bekasi bernama `logo.png` (disarankan 200×200 px, latar transparan).
2. Buka repository → klik **"Add file"** → **"Upload files"**.
3. Unggah file baru dengan nama `logo.png` (akan menimpa yang lama).
4. **Commit changes** → tunggu 1 menit.

### 🧭 Langkah 8 — Alternatif Cepat (Drag & Drop)
Jika kesulitan dengan cara di atas, gunakan **GitHub Desktop** (aplikasi gratis untuk Windows/Mac) atau **github.dev** (tekan tombol `.` pada halaman repository untuk membuka editor web langsung).

---

## 🖼️ Cara Mengganti `logo.png` & `favicon.svg`

**Logo sekolah (`logo.png`)**
1. Siapkan logo resmi berukuran **200×200 px**, latar transparan (PNG).
2. Timpa file `logo.png` di folder proyek.
3. Refresh browser (Ctrl + F5).
> Jika file tidak ada, aplikasi otomatis menampilkan logo cadangan bertuliskan "LOGO".

**Favicon (`favicon.svg`)**
1. Buka `favicon.svg` dengan teks editor.
2. Ubah nilai `fill="#0B3D91"` (warna lingkaran) atau huruf `G` di dalam `<text>`.
3. Simpan, lalu refresh browser.

---

## ✏️ Cara Mengubah Soal

Semua soal tersimpan dalam **satu objek bernama `DATA`** di bagian atas **`script.js`** (sekitar baris 40).

```js
const DATA = {
  level1: [ { q: "...", options: [...], answer: 0, explain: {...}, formula: "..." }, ... ],
  level2: [ { route: "...", q: {...}, answer: 16, unit: "menit", explain: {...}, formula: "..." }, ... ],
  level3: [ { scenario: {...}, options: [...], answer: 1, explain: {...}, formula: "..." }, ... ],
  level4: [ { q: {...}, minNumbers: 2, keywords: [...], sample: {...}, explain: {...} }, ... ]
};
```

- `answer` pada `level1` dan `level3` adalah **indeks** pilihan (dimulai dari 0).
- `answer` pada `level2` adalah **angka murni** (contoh: `16`, `3000`).
- `q`, `explain`, `sample`, dan `scenario` memakai format dwibahasa `{ id: "...", en: "..." }`.
- Data graf utama ada di objek **`GRAPH_MAIN`** (simpul & sisi dengan bobot waktu/biaya).

**Contoh mengubah satu soal Level 2:**
```js
{
  route:'A → B → D → F',
  q:{ id:'Hitung total waktu (menit) untuk rute berikut:', en:'...' },
  answer:16,             // ← ubah angka jawaban di sini
  unit:'menit',
  explain:{ id:'...', en:'...' },
  formula:'5 + 6 + 5 = 16 menit'
}
```

---

## ⚙️ Parameter yang Bisa Diubah (Tunable)

| Parameter | Lokasi | Default | Rentang |
|---|---|---|---|
| `MAX_LIVES` | `script.js` baris awal | `3` | 1–5 |
| `TOTAL_LEVELS` | `script.js` | `4` | 3–6 |
| `LEVEL_TIMER` | `script.js` | `null` (nonaktif) | 30–180 detik |
| `BLITZ_SECONDS` | `script.js` | `60` | 30–180 |
| `DEFAULT_LANG` | `script.js` | `"id"` | `"id"` / `"en"` |
| `SOUND_ENABLED` | `script.js` | `true` | `true`/`false` |
| `AUTHOR_NAME` | `script.js` | `SMP Negeri 19 Kota Bekasi` | teks |
| `SCHOOL_YEAR` | `script.js` | `2026` | tahun |
| `--primary` | `style.css` `:root` | `#0B3D91` | bebas (hex) |
| `--font-head` / `--font-body` | `style.css` `:root` | Poppins / Inter | Google Fonts |

---

## ✅ Kriteria Keberhasilan (Uji Manual oleh Guru)

| # | Kriteria | Cara Menguji |
|---|---|---|
| 1 | Berjalan tanpa error | Buka `index.html`, cek Console (F12) — tidak ada error merah |
| 2 | Semua 4 level dapat dimainkan sampai selesai | Klik "Mulai", ikuti alur |
| 3 | Skor akhir 0–240 | Selesaikan semua level, cek total |
| 4 | Bintang 1–3 sesuai skor | Skor ≥200 → ⭐⭐⭐ |
| 5 | Toggle bahasa ID/EN berfungsi | Klik 🌐, cek semua label berubah |
| 6 | Istilah teknis punya terjemahan | Cek visual & glosarium 📖 |
| 7 | Skor terbaik tersimpan | Refresh halaman, skor lama muncul |
| 8 | Footer tampil persis | Cek visual di bawah halaman |
| 9 | Logo muncul di header | Cek visual |
| 10 | favicon.svg tampil di tab | Cek tab browser |
| 11 | Responsif di mobile 375 px | DevTools → Toggle device toolbar |
| 12 | Aksesibel keyboard | Tekan Tab, lalu Enter |
| 13 | Kontras WCAG AA | Uji di https://webaim.org/resources/contrastchecker/ |
| 14 | Sertifikat dapat dicetak | Klik "Unduh Sertifikat" → Ctrl+P |
| 15 | Ter-deploy di GitHub Pages | Buka URL `https://<user>.github.io/graf-berbobot-lkpd/` |

---

## 📚 Sumber Materi

Seluruh isi soal, nama simpul, bobot sisi, dan kunci jawaban bersumber dari:
**Modul Ajar Informatika Kelas IX — Elemen Berpikir Komputasional, Pertemuan 2 dari 16, topik "Graf Berbobot dan Rute Terpendek"** (SMP Negeri 19 Kota Bekasi).

| Sisi | Waktu (menit) | Biaya (Rp) |
|---|---|---|
| A–B | 5 | 0 |
| A–C | 8 | 2.000 |
| B–C | 3 | 0 |
| B–D | 6 | 1.000 |
| C–D | 4 | 0 |
| C–E | 7 | 2.000 |
| D–E | 2 | 0 |
| D–F | 5 | 1.000 |
| E–F | 4 | 0 |

---

## 📄 Lisensi

Karya ini dilisensikan di bawah
**Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**

Anda bebas:
- **Berbagi** — menyalin dan menyebarluaskan materi ini.
- **Mengadaptasi** — mengubah, menggubah, dan membangun di atas materi ini.

Dengan syarat:
- **Atribusi (BY)** — cantumkan sumber asli (SMP Negeri 19 Kota Bekasi).
- **NonKomersial (NC)** — tidak untuk tujuan komersial.
- **BerbagiSerupa (SA)** — hasil adaptasi harus memakai lisensi yang sama.

Lisensi lengkap: https://creativecommons.org/licenses/by-nc-sa/4.0/

---

**Dibuat untuk pembelajaran Informatika yang menyenangkan. Selamat mengajar! 🎓**