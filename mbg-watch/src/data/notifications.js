/** Notifications shown in the Notifikasi page (mock feed). */
export const notifications = [
  {
    title: "✅ Laporan MJK-KRG-2025-003 Selesai",
    msg: "Porsi tidak memadai di SDN Kranggan 2 telah selesai ditangani.",
    type: "",
    time: "2 jam lalu",
    unread: true,
  },
  {
    title: "⚠️ Laporan Baru Masuk",
    msg: "2 laporan baru di Prajurit Kulon & Magersari menunggu verifikasi.",
    type: "amber",
    time: "3 jam lalu",
    unread: false,
  },
  {
    title: "🔵 Laporan MJK-MGR-2025-002 Diverifikasi",
    msg: "Laporan keterlambatan distribusi di SMPN 1 Mojokerto telah diverifikasi Pemkot.",
    type: "",
    time: "5 jam lalu",
    unread: false,
  },
  {
    title: "🔴 SPPG Magersari Kedundung 2 Bermasalah",
    msg: "SPPG Magersari Kedundung 2 terima 5 laporan minggu ini — perlu audit segera.",
    type: "red",
    time: "8 jam lalu",
    unread: false,
  },
  {
    title: "ℹ️ Sistem Blockchain Diperbarui",
    msg: "Block #1007 berhasil ditambahkan. Semua data laporan terverifikasi.",
    type: "",
    time: "1 hari lalu",
    unread: false,
  },
];

/** Aggregate report chart — used in Pemkot dashboard (bar chart) */
export const reportTypeChart = [
  ["Kualitas Makanan", 62],
  ["Keterlambatan", 38],
  ["Porsi Kurang", 45],
  ["Penyimpangan", 20],
  ["Kebersihan", 18],
];

/** Aggregate per-kecamatan chart — used in Pemkot dashboard */
export const wilayahChart = [
  ["Prajurit Kulon", 75],
  ["Magersari", 55],
  ["Kranggan", 42],
];
