/**
 * SLHS (Sertifikat Layak Higiene Sanitasi) status badge for SPPGs.
 *   "punya"  → green check
 *   "proses" → amber clock
 *   else     → red cross
 */
const baseStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: ".3rem",
  borderRadius: 6,
  padding: ".15rem .55rem",
  fontSize: ".68rem",
  fontWeight: 700,
  whiteSpace: "nowrap",
};

export default function SLHSBadge({ slhs }) {
  if (slhs === "punya") {
    return (
      <span style={{ ...baseStyle, background: "#dcfce7", border: "1px solid #86efac", color: "#166534" }}>
        ✅ Punya SLHS
      </span>
    );
  }
  if (slhs === "proses") {
    return (
      <span style={{ ...baseStyle, background: "#fef3c7", border: "1px solid #fcd34d", color: "#92400e" }}>
        ⏳ Sedang Proses
      </span>
    );
  }
  return (
    <span style={{ ...baseStyle, background: "#fee2e2", border: "1px solid #fca5a5", color: "#991b1b" }}>
      ❌ Belum Ada
    </span>
  );
}
