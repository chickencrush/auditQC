# V3.1.2 Backend HTML Recovery Fix

Tujuan: memulihkan pemisahan file Apps Script yang benar setelah index.html terisi/tertimpa kode backend.

## Apps Script — WAJIB
1. Buka file **Code.gs** di Apps Script, Ctrl+A, paste isi `backend-appsscript/Code.gs`.
2. Buka file **index.html** di Apps Script, Ctrl+A, paste isi `backend-appsscript/index.html`.
3. Pastikan index.html dimulai dengan `<!DOCTYPE html>` — BUKAN komentar CHICKEN CRUSH / `const APP_NAME`.
4. Save All.
5. Jalankan `healthCheckV312BackendRecovery()`.
6. Deploy > Manage deployments > Edit > New version > Deploy.
7. Buka URL `/exec` langsung terlebih dahulu. Jika login UI tampil, backend recovery PASS.
8. Setelah itu tes URL GitHub/PWA.

Tidak ada setup database dan tidak ada data yang dihapus.

## GitHub
Jika memakai file wrapper dari paket ini, pertahankan APP_URL pada `config.js` sesuai URL `/exec` deployment Anda.
