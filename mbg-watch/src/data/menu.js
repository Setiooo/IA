/**
 * Sidebar menu definitions per role.
 * Each item: { id, icon, label }. The `id` matches a page in
 * src/pages/index.jsx pageRegistry.
 */
export const menuByRole = {
  masyarakat: [
    { id: "m-lapor", icon: "📝", label: "Buat Laporan" },
    { id: "m-riwayat", icon: "📋", label: "Riwayat Laporan" },
    { id: "m-blockchain", icon: "⛓️", label: "Blockchain Audit" },
    { id: "m-notif", icon: "🔔", label: "Notifikasi" },
  ],
  pemda: [
    { id: "pd-home", icon: "🏠", label: "Dashboard" },
    { id: "pd-verifikasi", icon: "✅", label: "Verifikasi Laporan" },
    { id: "pd-laporan", icon: "📊", label: "Semua Laporan" },
    { id: "pd-sppg", icon: "🍱", label: "Monitor SPPG" },
    { id: "pd-blockchain", icon: "⛓️", label: "Blockchain Audit" },
    { id: "pd-notif", icon: "🔔", label: "Notifikasi" },
  ],
  bgn: [
    { id: "bgn-home", icon: "🏠", label: "Control Center" },
    { id: "bgn-peta", icon: "🗺️", label: "Peta Kecamatan" },
    { id: "bgn-laporan", icon: "📋", label: "Semua Laporan" },
    { id: "bgn-sppg", icon: "🍱", label: "Manajemen SPPG" },
    { id: "bgn-blockchain", icon: "⛓️", label: "Blockchain Ledger" },
    { id: "bgn-kebijakan", icon: "📌", label: "Kebijakan" },
  ],
};

/** Default landing page per role after login */
export const defaultPageByRole = {
  masyarakat: "m-lapor",
  pemda: "pd-home",
  bgn: "bgn-home",
};
