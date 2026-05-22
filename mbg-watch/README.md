# MBG Watch — Kota Mojokerto

Platform pengawasan partisipatif Program Makan Bergizi Gratis (MBG) untuk
Kota Mojokerto. Project ini direkonstruksi ulang dari satu file HTML hasil
build Parcel menjadi struktur React + Vite yang rapi dan modular.

## ✨ Fitur

- **3 portal peran** — Masyarakat (anonim), Pemerintah Kota, BGN/SPPG
- **Pelaporan terverifikasi** — kamera langsung, GPS, deskripsi min. 8 kata,
  anti-bot (rate-limit per perangkat)
- **Dashboard Pemkot & BGN** — KPI, bar chart, monitor SPPG, peta kecamatan
- **Blockchain audit trail** — hash 16 karakter, prev-hash, genesis block
- **Manajemen SLHS** — info panel Sertifikat Layak Higiene Sanitasi
- **Persistensi lokal** — `localStorage` + `BroadcastChannel` sync antar tab
- **Toast & modal global** lewat React Context

## 🚀 Menjalankan

```bash
npm install
npm run dev
```

Lalu buka <http://localhost:5173>.

Demo credentials:

| Peran | Username | Password | Catatan |
|---|---|---|---|
| Masyarakat | — | — | Klik kartu portal, langsung masuk anonim |
| Pemkot | `pemkot` | `mojokerto2025` | Pilih wilayah kerja saat login |
| BGN | `bgn.mojokerto` | `bgn2025` | Pilih unit SPPG saat login |

## 🗂️ Struktur Project

```
mbg-watch/
├── index.html
├── package.json
├── vite.config.js
├── public/
└── src/
    ├── main.jsx                       # entry — mount React + import CSS
    ├── App.jsx                        # provider + Landing/AppShell router
    ├── styles/
    │   ├── global.css                 # token, reset, animations, h1, scrollbar
    │   ├── layout.css                 # navbar, sidebar, hero, portal, buttons
    │   ├── dashboard.css              # stat cards, tables, charts, badges
    │   ├── form.css                   # forms, photo upload, hv-steps
    │   ├── modal.css                  # modal, lightbox, toast
    │   └── responsive.css             # media queries
    ├── context/
    │   └── AppContext.jsx             # screen/user/page/db/toasts + actions
    ├── data/
    │   ├── laporan.js                 # initialLaporan + initialBlockchain
    │   ├── sppg.js                    # 18 SPPG + kecamatan meta
    │   ├── menu.js                    # sidebar menu per role
    │   ├── notifications.js           # notifikasi & chart data
    │   └── kebijakan.js               # BGN kebijakan list
    ├── utils/
    │   ├── db.js                      # localStorage DB + anti-bot
    │   ├── image.js                   # storeFoto/getFoto/demo SVG
    │   ├── blockchain.js              # fake hash + appendBlock helper
    │   └── status.js                  # STATUS_MAP + ID helpers
    ├── components/
    │   ├── Navbar.jsx                 # landing top nav
    │   ├── Hero.jsx                   # landing hero
    │   ├── Sidebar.jsx                # left rail nav (mobile drawer)
    │   ├── Modal.jsx                  # reusable modal shell
    │   ├── Toast.jsx                  # global toast container
    │   ├── UploadPhoto.jsx            # camera capture (getUserMedia)
    │   ├── VerifikasiFotoUploader.jsx # Pemkot multi-file uploader
    │   ├── StatusBadge.jsx
    │   ├── SkorBadge.jsx
    │   ├── SLHSBadge.jsx
    │   ├── SLHSInfoCard.jsx
    │   ├── ProgressBar.jsx
    │   ├── BarChart.jsx
    │   ├── Blockchain.jsx             # shared blockchain page
    │   └── Notification.jsx           # shared notifications page
    └── pages/
        ├── index.jsx                  # pageRegistry { id → Component }
        ├── Landing.jsx
        ├── masyarakat/
        │   ├── BuatLaporan.jsx
        │   └── RiwayatLaporan.jsx
        ├── pemda/
        │   ├── Dashboard.jsx
        │   ├── Verifikasi.jsx
        │   ├── Reports.jsx
        │   └── MonitorSPPG.jsx
        └── bgn/
            ├── Dashboard.jsx
            ├── PetaKecamatan.jsx
            └── Kebijakan.jsx
```

## 🔎 Catatan Rekonstruksi

File asal (`index-(7).html`) adalah hasil build Parcel React 19 dengan:

- Inline `<style>` ± 18 KB → dipecah ke 6 file CSS sesuai tanggung jawab.
- `<script type="module">` ± 270 KB → bundle React + ReactDOM + kode user.
  Bagian "user code" diidentifikasi, dideminifikasi, JSX-runtime call
  (`o.jsx`, `o.jsxs`) dikonversi balik ke JSX syntax dengan transformer
  Babel custom, lalu variabel single-letter (`E`, `M`, `j`, `Z`, `K`, …)
  diberi nama yang masuk akal.
- `<script>` tail (mutator DOM dengan `patchAll`) tidak diikutsertakan
  karena di rekonstruksi React murni, render dilakukan langsung oleh
  komponen — tidak perlu lagi tambalan DOM eksternal. Modal detail /
  verifikasi tetap tersedia secara native lewat `Modal` + state lokal.

### Asumsi yang diambil

1. `bc = new BroadcastChannel('mbgwatch_sync')` digunakan untuk sinkronisasi
   antar tab. Kalau browser tidak mendukung, fallback `storage` event tetap
   bekerja. Logika ini dipindahkan ke `AppProvider.useEffect`.
2. ID laporan baru dihitung dari `db.laporan.length + 1` dipadukan dengan
   kode kecamatan (PKL/MGR/KRG). Cara yang sama dipakai oleh bundle asal.
3. Skor "kredibilitas" (0–100) di-derive dari deskripsi (panjang kata),
   jumlah foto, dan `suspectScore` perangkat — heuristik di file asal
   dipertahankan persis.
4. Hash blockchain 16 karakter random hex untuk laporan baru sama persis
   dengan implementasi `Math.random()`-based pada bundle.
5. Tombol "Selesai" di kamera kapture menjalankan `onCapture(shot)` lalu
   menutup overlay (perilaku identik dengan bundle).

### Tidak diikutsertakan

- Tampilan modal detail laporan yang dirender via `document.createElement`
  oleh `tail.js`. Modal versi React yang setara dapat ditambahkan kapan
  pun dengan memakai `Modal.jsx` (struktur dan datanya sudah tersedia di
  context). Kalau diperlukan, modal ini bisa di-port di iterasi berikutnya.
