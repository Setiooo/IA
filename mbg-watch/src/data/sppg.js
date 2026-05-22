/**
 * SPPG (Satuan Pelayanan Pemenuhan Gizi) list for Kota Mojokerto
 * — covers 3 kecamatan: Prajurit Kulon, Magersari, Kranggan.
 *
 * Each entry:
 *   no, kecamatan, kelurahan, alamat, nama, skor (0-100),
 *   laporan (jumlah laporan terkait),
 *   status: "Aktif" | "Masalah",
 *   slhs: "punya" | "proses" | "tidak" (Sertifikat Layak Higiene Sanitasi).
 */
export const sppgList = [
  // ── Prajurit Kulon ─────────────────────────────────────────
  {
    no: 22,
    kecamatan: "Prajurit Kulon",
    kelurahan: "Kauman",
    alamat: "Jl. Kyai H. Hasyim Ashari No.01, Kauman",
    nama: "SPPG Kota Mojokerto Prajuritkulon Kauman",
    skor: 87,
    laporan: 3,
    status: "Aktif",
    slhs: "punya",
  },
  {
    no: 50,
    kecamatan: "Prajurit Kulon",
    kelurahan: "Mentikan",
    alamat: "Cakarayam Gang 1 No 1-9, Mentikan",
    nama: "SPPG Kota Mojokerto Prajuritkulon Mentikan",
    skor: 83,
    laporan: 1,
    status: "Aktif",
    slhs: "proses",
  },
  {
    no: 63,
    kecamatan: "Prajurit Kulon",
    kelurahan: "Prajuritkulon",
    alamat: "Desa Prajuritkulon, Kec. Prajuritkulon",
    nama: "SPPG Kota Mojokerto Prajuritkulon Prajuritkulon 2",
    skor: 95,
    laporan: 0,
    status: "Aktif",
    slhs: "punya",
  },
  {
    no: 83,
    kecamatan: "Prajurit Kulon",
    kelurahan: "Prajuritkulon",
    alamat: "Prajurit Kulon, Kec. Prajuritkulon",
    nama: "SPPG Kota Mojokerto Prajuritkulon Prajuritkulon",
    skor: 90,
    laporan: 1,
    status: "Aktif",
    slhs: "punya",
  },
  {
    no: 90,
    kecamatan: "Prajurit Kulon",
    kelurahan: "Pulorejo",
    alamat: "Jl. Pendidikan Lingk. Rt.002/001, Pulorejo",
    nama: "SPPG Kota Mojokerto Prajuritkulon Pulorejo",
    skor: 72,
    laporan: 4,
    status: "Aktif",
    slhs: "tidak",
  },
  {
    no: 113,
    kecamatan: "Prajurit Kulon",
    kelurahan: "Pulorejo",
    alamat: "Jl. Cancer, Pulorejo, Kec. Prajuritkulon",
    nama: "SPPG Kota Mojokerto Prajuritkulon Pulorejo 2",
    skor: 85,
    laporan: 2,
    status: "Aktif",
    slhs: "proses",
  },
  {
    no: 115,
    kecamatan: "Prajurit Kulon",
    kelurahan: "Blooto",
    alamat: "Dusun Kemasan Gang 2 Rt02/03, Blooto",
    nama: "SPPG Kota Mojokerto Prajuritkulon Blooto",
    skor: 78,
    laporan: 3,
    status: "Aktif",
    slhs: "tidak",
  },

  // ── Magersari ──────────────────────────────────────────────
  {
    no: 8,
    kecamatan: "Magersari",
    kelurahan: "Magersari",
    alamat: "Jagalan, Kec. Magersari",
    nama: "SPPG Kota Mojokerto Magersari Magersari 2",
    skor: 88,
    laporan: 2,
    status: "Aktif",
    slhs: "punya",
  },
  {
    no: 11,
    kecamatan: "Magersari",
    kelurahan: "Magersari",
    alamat: "Jl. Raya Meri No.439, Meri, Kec. Magersari",
    nama: "SPPG Kota Mojokerto Magersari Magersari",
    skor: 82,
    laporan: 3,
    status: "Aktif",
    slhs: "punya",
  },
  {
    no: 44,
    kecamatan: "Magersari",
    kelurahan: "Wates",
    alamat: "Karanglo Gg. 1 No. 26 RT02/RW02, Wates",
    nama: "SPPG Kota Mojokerto Magersari Wates",
    skor: 91,
    laporan: 1,
    status: "Aktif",
    slhs: "punya",
  },
  {
    no: 53,
    kecamatan: "Magersari",
    kelurahan: "Kedundung",
    alamat: "Jalan Al-Azhar No. 1, Kedundung",
    nama: "SPPG Kota Mojokerto Magersari Kedundung",
    skor: 76,
    laporan: 4,
    status: "Aktif",
    slhs: "tidak",
  },
  {
    no: 91,
    kecamatan: "Magersari",
    kelurahan: "Kedundung",
    alamat: "Gg. Macan No.62 RT04/RW02, Kedundung",
    nama: "SPPG Kota Mojokerto Magersari Kedundung 2",
    skor: 69,
    laporan: 5,
    status: "Masalah",
    slhs: "tidak",
  },
  {
    no: 102,
    kecamatan: "Magersari",
    kelurahan: "Balongsari",
    alamat: "Desa Balongsari, Kec. Magersari",
    nama: "SPPG Kota Mojokerto Magersari Balongsari",
    skor: 94,
    laporan: 0,
    status: "Aktif",
    slhs: "punya",
  },

  // ── Kranggan ───────────────────────────────────────────────
  {
    no: 15,
    kecamatan: "Kranggan",
    kelurahan: "Miji",
    alamat: "Kedungkwali Gg.1 No.48 Rt004/003, Miji",
    nama: "SPPG Kota Mojokerto Kranggan Miji 2",
    skor: 88,
    laporan: 1,
    status: "Aktif",
    slhs: "punya",
  },
  {
    no: 37,
    kecamatan: "Kranggan",
    kelurahan: "Meri",
    alamat: "Lingk. Kuwung Rt02/03, Meri, Kec. Kranggan",
    nama: "SPPG Kota Mojokerto Kranggan Meri 2",
    skor: 93,
    laporan: 0,
    status: "Aktif",
    slhs: "punya",
  },
  {
    no: 80,
    kecamatan: "Kranggan",
    kelurahan: "Miji",
    alamat: "Jl. Miji Gg. 1 No. 4, Kel. Miji, Kranggan",
    nama: "SPPG Kota Mojokerto Kranggan Miji",
    skor: 97,
    laporan: 0,
    status: "Aktif",
    slhs: "punya",
  },
  {
    no: 89,
    kecamatan: "Kranggan",
    kelurahan: "Meri",
    alamat: "Jalan Tropodo, Meri, Kec. Kranggan",
    nama: "SPPG Kota Mojokerto Kranggan Meri",
    skor: 84,
    laporan: 2,
    status: "Aktif",
    slhs: "proses",
  },
  {
    no: 122,
    kecamatan: "Kranggan",
    kelurahan: "Purwotengah",
    alamat: "Jl. Taman Siswa No. 14, Purwotengah",
    nama: "SPPG Kota Mojokerto Kranggan Purwotengah",
    skor: 91,
    laporan: 1,
    status: "Aktif",
    slhs: "punya",
  },
];

/** District list (use "Kec. " prefix to match laporan.wilayah) */
export const wilayahList = ["Kec. Prajurit Kulon", "Kec. Magersari", "Kec. Kranggan"];

/** Plain kecamatan names (no prefix) */
export const kecamatanList = ["Prajurit Kulon", "Magersari", "Kranggan"];

/**
 * Visual / map metadata for each kecamatan.
 * count = number of SPPG, used by the BGN map view.
 */
export const kecamatanInfo = {
  "Prajurit Kulon": { color: "#3b82f6", bg: "#dbeafe", code: "PKL", count: 7 },
  Magersari: { color: "#166534", bg: "#f0fdf4", code: "MGR", count: 6 },
  Kranggan: { color: "#f59e0b", bg: "#fef3c7", code: "KRG", count: 5 },
};

/** Approximate GPS for each kecamatan (Kota Mojokerto) */
export const kecamatanGeo = {
  PKL: { lat: -7.47, lng: 112.43 },
  MGR: { lat: -7.48, lng: 112.44 },
  KRG: { lat: -7.46, lng: 112.445 },
};
