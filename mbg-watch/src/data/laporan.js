/**
 * Demo laporan (reports) seed data — Mojokerto MBG.
 * Persisted to localStorage on first load. Each laporan has:
 *   id, tanggal, waktu, sekolah, wilayah, jenis, deskripsi,
 *   status (pending|verified|done|rejected),
 *   fotoLaporan (foto keys uploaded by warga),
 *   fotoVerif (foto keys uploaded by Pemkot),
 *   hash (16-char blockchain hash),
 *   verified_by (string or null)
 */
export const initialLaporan = [
  {
    id: "MJK-PKL-2025-001",
    tanggal: "2025-03-01",
    waktu: "07:45",
    sekolah: "SDN Prajurit Kulon 1",
    wilayah: "Kec. Prajurit Kulon",
    jenis: "Kualitas Makanan",
    deskripsi:
      "Nasi terasa basi dan berbau. Lauk ayam tidak matang sempurna. Beberapa siswa menolak untuk makan.",
    status: "pending",
    fotoLaporan: [],
    fotoVerif: [],
    hash: "a3f9c2d8b1e7f406",
    verified_by: null,
  },
  {
    id: "MJK-MGR-2025-002",
    tanggal: "2025-03-02",
    waktu: "10:15",
    sekolah: "SMPN 1 Mojokerto",
    wilayah: "Kec. Magersari",
    jenis: "Keterlambatan Distribusi",
    deskripsi:
      "Makanan baru datang pukul 12.30 sementara jadwal makan siang pukul 11.00. SPPG tidak memberikan konfirmasi apapun kepada pihak sekolah.",
    status: "verified",
    fotoLaporan: [],
    fotoVerif: ["__demo_v1", "__demo_v2"],
    hash: "b7e4a1c9d2f8e305",
    verified_by: "Pemkot Mojokerto",
  },
  {
    id: "MJK-KRG-2025-003",
    tanggal: "2025-03-02",
    waktu: "11:30",
    sekolah: "SDN Kranggan 2",
    wilayah: "Kec. Kranggan",
    jenis: "Porsi Tidak Memadai",
    deskripsi:
      "Porsi nasi hanya setengah dari standar. Tidak ada lauk protein sama sekali hari ini. Banyak siswa mengeluh lapar.",
    status: "done",
    fotoLaporan: [],
    fotoVerif: ["__demo_v3"],
    hash: "c1d6b4e9a3f7c208",
    verified_by: "Pemkot Mojokerto",
  },
  {
    id: "MJK-PKL-2025-004",
    tanggal: "2025-03-03",
    waktu: "08:20",
    sekolah: "MAN 1 Mojokerto",
    wilayah: "Kec. Prajurit Kulon",
    jenis: "Dugaan Penyimpangan",
    deskripsi:
      "Jumlah kotak makan yang diantarkan jauh lebih sedikit dibanding jumlah siswa terdaftar. Perlu investigasi segera.",
    status: "pending",
    fotoLaporan: [],
    fotoVerif: [],
    hash: "d4f2c8b6e1a9d507",
    verified_by: null,
  },
  {
    id: "MJK-MGR-2025-005",
    tanggal: "2025-03-03",
    waktu: "09:50",
    sekolah: "SDN Magersari 3",
    wilayah: "Kec. Magersari",
    jenis: "Kebersihan / Sanitasi",
    deskripsi:
      "Kotak makan kotor dan tidak higienis. Ada serangga kecil ditemukan di dalam kotak makan oleh guru kelas.",
    status: "pending",
    fotoLaporan: [],
    fotoVerif: [],
    hash: "e9a1d5c3b8f4e106",
    verified_by: null,
  },
  {
    id: "MJK-KRG-2025-006",
    tanggal: "2025-03-04",
    waktu: "07:55",
    sekolah: "SMAN 2 Mojokerto",
    wilayah: "Kec. Kranggan",
    jenis: "Kualitas Makanan",
    deskripsi:
      "Sayuran sudah layu dan tidak segar. Menu tidak sesuai jadwal yang ditempel di papan informasi sekolah.",
    status: "verified",
    fotoLaporan: [],
    fotoVerif: ["__demo_v4"],
    hash: "f2b7e4a6c9d1f803",
    verified_by: "Pemkot Mojokerto",
  },
];

/**
 * Initial blockchain ledger — one block per laporan, plus genesis.
 * Each block contains:
 *   block (number), hash, prev, ts (timestamp), laporan (laporan ID).
 */
export const initialBlockchain = [
  {
    block: 1001,
    hash: "9e2b4f1c8d7a3e05",
    prev: "0000000000000000",
    ts: "2025-02-28 00:00:00",
    laporan: "GENESIS",
  },
  {
    block: 1002,
    hash: "a3f9c2d8b1e7f406",
    prev: "9e2b4f1c8d7a3e05",
    ts: "2025-03-01 07:45:12",
    laporan: "MJK-PKL-2025-001",
  },
  {
    block: 1003,
    hash: "b7e4a1c9d2f8e305",
    prev: "a3f9c2d8b1e7f406",
    ts: "2025-03-02 10:15:33",
    laporan: "MJK-MGR-2025-002",
  },
  {
    block: 1004,
    hash: "c1d6b4e9a3f7c208",
    prev: "b7e4a1c9d2f8e305",
    ts: "2025-03-02 11:30:44",
    laporan: "MJK-KRG-2025-003",
  },
  {
    block: 1005,
    hash: "d4f2c8b6e1a9d507",
    prev: "c1d6b4e9a3f7c208",
    ts: "2025-03-03 08:20:01",
    laporan: "MJK-PKL-2025-004",
  },
  {
    block: 1006,
    hash: "e9a1d5c3b8f4e106",
    prev: "d4f2c8b6e1a9d507",
    ts: "2025-03-03 09:50:17",
    laporan: "MJK-MGR-2025-005",
  },
  {
    block: 1007,
    hash: "f2b7e4a6c9d1f803",
    prev: "e9a1d5c3b8f4e106",
    ts: "2025-03-04 07:55:28",
    laporan: "MJK-KRG-2025-006",
  },
];
