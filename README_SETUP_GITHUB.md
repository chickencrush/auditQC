# Chicken Crush QC V3.0 — GitHub PWA

Versi ini adalah **PWA wrapper stabil** untuk aplikasi Apps Script V2.6.8.3. Tujuannya membuat aplikasi dapat di-install di Windows/PC, Android, dan iOS tanpa memindahkan database Google Sheet/Drive dan tanpa memutus fungsi `google.script.run`, upload foto, CAPA, atau checklist.

## 1. Backend Apps Script
Gunakan deployment Web App yang saat ini sudah bekerja. Pastikan URL berakhiran `/exec`. Folder `backend-appsscript/` berisi snapshot source V2.6.8.3 yang menjadi basis paket ini; jangan membuat spreadsheet baru.

## 2. Buat repository GitHub
1. GitHub → **New repository** → misalnya `chicken-crush-qc`.
2. Upload seluruh isi folder paket ini ke root repository.
3. Buka `config.js` dan ganti `PASTE_GOOGLE_APPS_SCRIPT_EXEC_URL_HERE` dengan URL `/exec` Web App Apps Script Anda.
4. Commit perubahan.

## 3. Aktifkan GitHub Pages
Repository → **Settings → Pages → Build and deployment → Deploy from a branch** → Branch `main`, folder `/ (root)` → Save.
GitHub akan memberikan URL HTTPS seperti `https://username.github.io/chicken-crush-qc/`.

## 4. Install
- **Windows / Chrome / Edge:** buka URL GitHub Pages → menu browser → Install Chicken Crush QC / Install app.
- **Android / Chrome:** buka URL → menu ⋮ → Install app / Add to Home screen.
- **iPhone/iPad / Safari:** buka URL → Share → Add to Home Screen → Add.

## Kenapa V3.0 memakai wrapper?
Frontend V2.6.8.3 memiliki banyak panggilan `google.script.run` dan upload form khusus Apps Script. Memindahkannya langsung ke GitHub akan memutus fungsi backend dan upload foto. V3.0 mempertahankan aplikasi aktif di dalam PWA shell sehingga fungsi audit lama tetap kompatibel, sementara GitHub menyediakan manifest, service worker, icon, installability, dan shell lintas platform.

## Data & keamanan
- Google Sheet/Drive tetap menjadi database dan evidence storage.
- Service worker **tidak meng-cache URL Apps Script atau data audit**; hanya shell GitHub yang di-cache.
- Jangan memasukkan password/user database ke repository GitHub.

## Update aplikasi
Untuk update UI/backend Apps Script, deploy versi Apps Script baru pada deployment yang sama. Jika URL `/exec` tidak berubah, PWA GitHub otomatis membuka versi backend terbaru tanpa mengubah `config.js`.
