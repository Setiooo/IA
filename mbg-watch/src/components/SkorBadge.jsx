/**
 * SPPG quality score bar (0–100).
 * Color thresholds:
 *   ≥ 85 → bright green
 *   ≥ 70 → amber
 *   < 70 → red
 */
export default function SkorBadge({ skor }) {
  const color =
    skor >= 85 ? "var(--g-bright)" : skor >= 70 ? "var(--amber)" : "var(--red)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
      <div
        style={{
          flex: 1,
          height: 7,
          background: "var(--border)",
          borderRadius: 100,
          overflow: "hidden",
          minWidth: 60,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${skor}%`,
            background: color,
            borderRadius: 100,
            transition: "width .8s",
          }}
        />
      </div>
      <span style={{ fontSize: ".8rem", fontWeight: 700 }}>{skor}</span>
    </div>
  );
}
