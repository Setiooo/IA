import SLHSInfoCard from "../../components/SLHSInfoCard.jsx";
import SLHSBadge from "../../components/SLHSBadge.jsx";
import SkorBadge from "../../components/SkorBadge.jsx";
import { kecamatanInfo, kecamatanList, sppgList } from "../../data/sppg.js";

/**
 * MonitorSPPG — Pemkot/BGN page listing all 18 SPPG, broken down by
 * kecamatan. Header stats, then SLHS info card, then per-kecamatan
 * summary tiles, then a table per kecamatan.
 */
export default function MonitorSPPG() {
  const total = sppgList.length;
  const aktif = sppgList.filter((s) => s.status === "Aktif").length;
  const masalah = sppgList.filter((s) => s.status === "Masalah").length;
  const avgSkor = Math.round(sppgList.reduce((a, s) => a + s.skor, 0) / total);
  const slhsCount = sppgList.filter((s) => s.slhs === "punya").length;

  return (
    <div>
      <div className="page-header">
        <h2>🍱 Monitor SPPG — Kota Mojokerto</h2>
        <p>18 SPPG aktif tersebar di 3 kecamatan — data resmi per-kelurahan</p>
      </div>

      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-num">{total}</div>
          <div className="stat-label">Total SPPG</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: "var(--g-bright)" }}>
            {aktif}
          </div>
          <div className="stat-label">Aktif</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: "var(--red)" }}>
            {masalah}
          </div>
          <div className="stat-label">Perlu Perhatian</div>
        </div>
        <div className="stat-card">
          <div
            className="stat-num"
            style={{ color: slhsCount === total ? "var(--g-bright)" : "var(--amber)" }}
          >
            {slhsCount}/{total}
          </div>
          <div className="stat-label">Punya SLHS</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{avgSkor}</div>
          <div className="stat-label">Skor Rata-rata</div>
        </div>
      </div>

      <SLHSInfoCard />

      {/* ── Per-kecamatan summary tiles ──────────────────────── */}
      <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
        {kecamatanList.map((k) => {
          const info = kecamatanInfo[k];
          const group = sppgList.filter((s) => s.kecamatan === k);
          const skor = Math.round(group.reduce((a, s) => a + s.skor, 0) / group.length);
          const slhs = group.filter((s) => s.slhs === "punya").length;
          return (
            <div
              key={k}
              style={{
                background: info.bg,
                border: `1px solid ${info.color}33`,
                borderRadius: 12,
                padding: ".65rem 1.1rem",
                flex: 1,
                minWidth: 140,
              }}
            >
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  fontFamily: "Syne,sans-serif",
                  color: info.color,
                }}
              >
                {info.count}
              </div>
              <div style={{ fontSize: ".72rem", color: info.color, fontWeight: 600 }}>
                Kec. {k}
              </div>
              <div style={{ fontSize: ".68rem", color: "var(--muted)", marginTop: ".2rem" }}>
                Skor: <strong style={{ color: "var(--ink)" }}>{skor}</strong> · SLHS:{" "}
                <strong style={{ color: slhs === group.length ? "#166534" : "#92400e" }}>
                  {slhs}/{group.length}
                </strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Per-kecamatan tables ─────────────────────────────── */}
      {kecamatanList.map((k) => {
        const info = kecamatanInfo[k];
        const group = sppgList.filter((s) => s.kecamatan === k);
        const skor = Math.round(group.reduce((a, s) => a + s.skor, 0) / group.length);
        const slhs = group.filter((s) => s.slhs === "punya").length;
        return (
          <div style={{ marginBottom: "1.25rem" }} key={k}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".6rem",
                marginBottom: ".65rem",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: info.color,
                  flexShrink: 0,
                }}
              />
              <h3
                style={{
                  fontFamily: "Syne,sans-serif",
                  fontWeight: 700,
                  fontSize: ".95rem",
                  color: "var(--g-deep)",
                }}
              >
                Kec. {k}
              </h3>
              <span
                style={{
                  fontSize: ".72rem",
                  background: info.bg,
                  color: info.color,
                  padding: ".18rem .6rem",
                  borderRadius: 100,
                  fontWeight: 700,
                }}
              >
                {group.length} SPPG
              </span>
              <span
                style={{ fontSize: ".72rem", color: "var(--muted)", marginLeft: "auto" }}
              >
                Skor: <strong style={{ color: "var(--g-deep)" }}>{skor}</strong> · SLHS:{" "}
                <strong style={{ color: slhs === group.length ? "#166534" : "#92400e" }}>
                  {slhs}/{group.length} sah
                </strong>
              </span>
            </div>

            <div className="table-wrap">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nama SPPG</th>
                      <th>Kelurahan</th>
                      <th>Alamat</th>
                      <th>SLHS</th>
                      <th>Status</th>
                      <th>Laporan</th>
                      <th>Skor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.map((s) => (
                      <tr
                        key={s.no}
                        style={{ background: s.slhs === "tidak" ? "#fff5f5" : undefined }}
                      >
                        <td
                          style={{
                            fontSize: ".7rem",
                            color: "var(--muted)",
                            fontFamily: "monospace",
                          }}
                        >
                          #{s.no}
                        </td>
                        <td style={{ fontWeight: 600, fontSize: ".84rem" }}>{s.nama}</td>
                        <td style={{ fontSize: ".74rem", color: "var(--muted)" }}>
                          {s.kelurahan}
                        </td>
                        <td
                          style={{
                            fontSize: ".74rem",
                            color: "var(--muted)",
                            maxWidth: 180,
                          }}
                        >
                          {s.alamat}
                        </td>
                        <td>
                          <SLHSBadge slhs={s.slhs} />
                        </td>
                        <td>
                          <span
                            className={`status-badge ${s.status === "Aktif" ? "status-done" : "status-rejected"}`}
                          >
                            {s.status === "Aktif" ? "✅ Aktif" : "⚠️ Masalah"}
                          </span>
                        </td>
                        <td
                          style={{
                            fontWeight: 700,
                            color:
                              s.laporan >= 5
                                ? "var(--red)"
                                : s.laporan >= 3
                                  ? "var(--amber)"
                                  : "var(--ink)",
                          }}
                        >
                          {s.laporan}
                        </td>
                        <td style={{ minWidth: 110 }}>
                          <SkorBadge skor={s.skor} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
