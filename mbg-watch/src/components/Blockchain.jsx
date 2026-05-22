import { useApp } from "../context/AppContext.jsx";

/**
 * Shared Blockchain audit page — used by all three roles
 * (m-blockchain, pd-blockchain, bgn-blockchain).
 */
export default function Blockchain() {
  const { db } = useApp();
  const blocks = [...db.blockchain].reverse();
  return (
    <div>
      <div className="page-header">
        <h2>⛓️ Blockchain Audit Trail</h2>
        <p>Rekam jejak tidak dapat diubah</p>
      </div>

      <div
        style={{
          background: "var(--g-deep)",
          borderRadius: 14,
          padding: "1rem 1.25rem",
          marginBottom: "1.25rem",
          color: "rgba(255,255,255,.65)",
          fontSize: ".82rem",
        }}
      >
        ⛓️ <strong style={{ color: "var(--g-light)" }}>{db.blockchain.length} block valid</strong>{" "}
        · Genesis: <code style={{ color: "var(--g-bright)" }}>9e2b4f1c…</code>{" "}
        · <span style={{ color: "var(--g-bright)" }}>✅ VALID</span>
      </div>

      {blocks.map((b, i) => (
        <div className="chain-item" key={b.block}>
          <div style={{ flexShrink: 0, textAlign: "center" }}>
            <div
              style={{
                fontSize: ".7rem",
                fontWeight: 800,
                color: "var(--muted)",
                marginBottom: ".2rem",
              }}
            >
              #{b.block}
            </div>
            {i < blocks.length - 1 && (
              <div
                style={{
                  width: 2,
                  height: 20,
                  background: "var(--border)",
                  margin: "4px auto",
                }}
              />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: ".35rem",
                flexWrap: "wrap",
                gap: ".4rem",
              }}
            >
              <span style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--g-deep)" }}>
                {b.laporan === "GENESIS" ? "🌱 Genesis Block" : `📋 ${b.laporan}`}
              </span>
              <span style={{ fontSize: ".72rem", color: "var(--muted)" }}>{b.ts}</span>
            </div>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", fontSize: ".72rem" }}>
              <span>
                Hash: <span className="chain-hash">{b.hash}</span>
              </span>
              <span style={{ color: "var(--muted)" }}>
                Prev: <span className="chain-hash">{b.prev.slice(0, 8)}…</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
