/**
 * Status label dictionary used by StatusBadge and a few pages directly.
 */
export const STATUS_MAP = {
  pending: ["status-pending", "⏳ Menunggu"],
  verified: ["status-verified", "🔵 Diverifikasi"],
  done: ["status-done", "✅ Selesai"],
  rejected: ["status-rejected", "❌ Ditolak"],
};

/** Generate the next sequential laporan ID for a kecamatan code. */
export function nextLaporanId(existing, kecamatanCode) {
  const year = new Date().getFullYear();
  const prefix = `MJK-${kecamatanCode}-${year}-`;
  const used = existing
    .filter((l) => l.id.startsWith(prefix))
    .map((l) => parseInt(l.id.slice(prefix.length), 10))
    .filter((n) => !Number.isNaN(n));
  const next = used.length ? Math.max(...used) + 1 : existing.length + 1;
  return `${prefix}${String(next).padStart(3, "0")}`;
}

/** Map "Kec. Prajurit Kulon" → "PKL", "Kec. Magersari" → "MGR", etc. */
export function kecamatanCode(wilayah) {
  if (!wilayah) return "MJK";
  if (wilayah.includes("Prajurit")) return "PKL";
  if (wilayah.includes("Magersari")) return "MGR";
  if (wilayah.includes("Kranggan")) return "KRG";
  return "MJK";
}
