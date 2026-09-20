# Chicken Crush QC V3.2 – Native PWA API

V3.2 menghapus iframe Google Apps Script dari aplikasi ter-install. Frontend berjalan langsung dari GitHub Pages dan berkomunikasi ke Apps Script melalui Cloudflare Worker sebagai CORS proxy. Database Google Sheets dan folder Google Drive tetap sama.

## Arsitektur
GitHub Pages PWA -> Cloudflare Worker -> Apps Script Web API -> Google Sheets / Drive

## Setup 1 — Apps Script
1. Replace `Code.gs` dengan `backend-appsscript/Code.gs`.
2. `index.html` Apps Script boleh dipertahankan sebagai fallback browser.
3. Jalankan `healthCheckV32()` dan pastikan `status: OK`.
4. Deploy Web App: Execute as **Me**, Who has access **Anyone**.
5. Salin URL `/exec`.

## Setup 2 — Cloudflare Worker
1. Buat Worker baru di Cloudflare.
2. Paste isi `cloudflare-worker.js`.
3. Tambahkan Variables/Secrets:
   - `GAS_URL` = URL Apps Script `/exec`
   - `ALLOWED_ORIGIN` = `https://chickencrush.github.io`
4. Deploy dan salin URL Worker, contoh `https://ccqc-api.<akun>.workers.dev`.

## Setup 3 — GitHub Pages
1. Edit `config.js`.
2. Isi `API_URL` dengan URL Worker.
3. Upload file root paket ini ke repo `auditQC`. Jangan upload folder `backend-appsscript` sebagai web root bila tidak diperlukan.
4. Pastikan GitHub Pages aktif dari branch main/root.
5. Hapus aplikasi PWA versi lama dari perangkat, buka `https://chickencrush.github.io/auditQC/`, refresh, lalu install ulang.

## Penting
- V3.2 tidak menggunakan iframe untuk UI utama.
- Service worker hanya cache file GitHub; request API tidak di-cache.
- Upload foto melalui API menggunakan Base64 karena browser GitHub tidak dapat mengirim Blob melalui `google.script.run`. Batas foto tetap konservatif (4–8 MB sesuai fungsi backend). Untuk iPhone, gunakan foto yang lebih kecil bila koneksi lambat.
- Database lama tidak dihapus atau dimigrasikan.
- Lakukan UAT penuh sebelum production.
