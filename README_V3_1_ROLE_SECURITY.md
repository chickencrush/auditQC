# V3.1 Role Security Hardening

Role production: OWNER > ADMIN > QC / MANAGEMENT > STORE_MANAGER > PIC_OUTLET (SPV).

## Setup
1. Replace backend Apps Script `Code.gs` dan `index.html`.
2. Jalankan `setupV31Production()` bila belum pernah.
3. Jalankan `setupV31RoleSecurityHardening()`.
4. Di sheet `Users`, ubah SATU akun terpercaya pada kolom ROLE menjadi `OWNER`. Jangan menonaktifkan admin lama dulu.
5. Jalankan `healthCheckV31RoleSecurity()`; `ownerConfigured` harus `true`.
6. Deploy New version. Login dengan OWNER dan uji semua role.

## Hak akses
- OWNER: seluruh akses operasional + fungsi keamanan/administrasi kritis.
- ADMIN: seluruh administrasi operasional dan audit, tetapi fungsi perubahan akses user via backend khusus OWNER.
- QC: audit + verifikasi CAPA sesuai audit type.
- MANAGEMENT: monitoring/dashboard/CAPA, tanpa audit/verifikasi.
- STORE_MANAGER: outlet yang ditugaskan; tindak lanjut CAPA.
- PIC_OUTLET/SPV: outlet yang ditugaskan; tindak lanjut CAPA.

Outlet access tetap divalidasi di backend melalui `userCanAccessOutlet_`, bukan hanya UI.

Tidak ada data audit/checklist/CAPA/user lama yang dihapus oleh setup hardening.
