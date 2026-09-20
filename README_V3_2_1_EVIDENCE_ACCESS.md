# Chicken Crush QC V3.2.1 — Secure Evidence Viewer

## Tujuan
User tidak perlu meminta akses Google Drive untuk melihat foto Temuan/Perbaikan.
Evidence tetap PRIVATE di Drive dan ditampilkan langsung di aplikasi setelah backend memvalidasi session, role, dan outlet.

## Hak akses
- OWNER / ADMIN / QC / MANAGEMENT: evidence seluruh outlet sesuai akses aplikasi.
- STORE_MANAGER / PIC_OUTLET (SPV): hanya evidence outlet yang tercantum pada OUTLET ACCESS.
- File Drive tidak dibuat public dan user tidak perlu menjadi Viewer folder Drive.

## Instalasi
1. Replace `backend-appsscript/Code.gs` dengan file paket ini.
2. Deploy Apps Script sebagai New version (Execute as Me / Anyone untuk endpoint API V3.2).
3. Update GAS_URL Worker bila URL deployment berubah.
4. Replace frontend GitHub dengan file V3.2.1.
5. Jalankan `healthCheckV321EvidenceAccess()`.

Expected:
- status = OK
- privateDriveEvidence = true
- inAppEvidenceViewer = true
- roleOutletEnforcement = true
- drivePublicSharingRequired = false

## UAT
Buka Tindak Lanjut Temuan > tekan `Lihat Bukti Temuan` atau `Lihat Bukti Perbaikan`.
Foto/PDF harus tampil dalam modal aplikasi tanpa membuka Google Drive dan tanpa Request Access.
