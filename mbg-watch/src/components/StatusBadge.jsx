import { STATUS_MAP } from "../utils/status.js";

/**
 * Pill-shaped status badge used in all tables and cards.
 * Maps a laporan status string to its tailwindless class + label.
 */
export default function StatusBadge({ status }) {
  const [cls, label] = STATUS_MAP[status] ?? ["status-pending", "—"];
  return <span className={`status-badge ${cls}`}>{label}</span>;
}
