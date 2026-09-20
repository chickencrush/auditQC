# Chicken Crush QC V3.1 Production Candidate

V3.1 mempertahankan backend Google Apps Script/Google Sheets/Google Drive dan menambahkan shell PWA production untuk GitHub Pages.

## Penting
V3.1 ini masih memakai aplikasi inti Apps Script di dalam shell PWA agar seluruh fungsi audit, upload foto, CAPA, login, dan database lama tetap kompatibel. Jangan hapus deployment Apps Script lama.

## 1. Backend Apps Script
Ganti Code.gs dan index.html project Apps Script dengan file dalam folder `backend-appsscript`, Save, lalu jalankan sekali:

1. `setupV31Production()`
2. `healthCheckV31()`

`setupV31Production()` membuat folder backup database, sheet `System_Log`, backup awal, dan trigger backup harian sekitar pukul 02.00 sesuai timezone project. Tidak menghapus data lama.

Deploy backend: Deploy > Manage deployments > Edit > New version > Deploy. Salin URL `/exec`.

## 2. GitHub Pages
Edit `config.js` dan isi `APP_URL` dengan URL `/exec` backend yang baru. Upload seluruh file root V3.1 ke repository GitHub Pages, lalu commit.

## 3. Bersihkan cache versi lama
Desktop: Ctrl+Shift+R. Jika perlu DevTools > Application > Service Workers > Unregister lalu reload.
Android: tutup PWA/browser, buka ulang URL GitHub. Jika masih lama, hapus site data GitHub Pages lalu buka kembali.

## 4. Instalasi
- Windows Chrome/Edge: tombol `Install Aplikasi` atau menu browser > Install app.
- Android Chrome: tombol `Install Aplikasi` / Install app / Add to Home screen.
- iPhone/iPad: Safari > Share > Add to Home Screen. iOS tidak menyediakan prompt install yang sama seperti Chrome.

## 5. UAT sebelum dipakai seluruh tim
Wajib uji minimal: login semua role; audit Produk dan Pelayanan; outlet reguler dan CCS; autosave/recovery; upload foto Temuan dari galeri dan kamera; upload bukti Perbaikan; Simpan Draft; Kirim ke QC; Approve/Reject; ranking; riwayat; jaringan putus/sambung; force close/reopen; 2 user bersamaan; Windows; Android; iPhone/iPad.

Status production baru diberikan setelah seluruh skenario kritis PASS.
