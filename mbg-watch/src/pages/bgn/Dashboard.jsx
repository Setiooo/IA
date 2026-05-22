import { useApp } from "../../context/AppContext.jsx";
import ProgressBar from "../../components/ProgressBar.jsx";
import { sppgList } from "../../data/sppg.js";

/**
 * BGN Control Center (bgn-home).
 * Aggregate KPIs across all 18 SPPG, two summary charts, troubled-SPPG
 * callouts, and quick-action navigation.
 */
export default function BGNDashboard() {
  const { db, navigate } = useApp();
  const pending = db.laporan.filter((l) => l.status === "pending").length;
  const totalSppg = sppgList.length;
  const masalah = sppgList.filter((s) => s.status === "Masalah").length;
  const avgSkor = Math.round(sppgList.reduce((a, s) => a + s.skor, 0) / totalSppg);

  return (
    <div>
      <div
        className="welcome-banner"
        style={{ background: "linear-gradient(135deg,#0a3622,#1a5c35)" }}
      >
        <h2>🇮🇩 Control Center BGN — Kota Mojokerto</h2>
        <p>
          18 SPPG · 3 Kecamatan ·{" "}
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-num">{totalSppg}</div>
          <div className="stat-label">Total SPPG</div>
          <div className="stat-change" style={{ color: "var(--g-bright)" }}>
            ↑ 18 unit aktif
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: "var(--amber)" }}>
            {pending}
          </div>
          <div className="stat-label">Laporan Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: "var(--red)" }}>
            {masalah}
          </div>
          <div className="stat-label">SPPG Bermasalah</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{avgSkor}</div>
          <div className="stat-label">Skor Rata-rata</div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
          marginBottom: "1.25rem",
        }}
      >
        <div className="chart-wrap">
          <div className="chart-title">📊 Skor per Kecamatan</div>
          <div className="bar-chart">
            {[
              ["Prajurit Kulon", 84, "var(--blue)"],
              ["Magersari", 83, "var(--g-mid)"],
              ["Kranggan", 91, "var(--amber)"],
            ].map(([name, val, color]) => (
              <div className="bar-row" key={name}>
                <div className="bar-label">{name}</div>
                <ProgressBar val={val} color={color} />
              </div>
            ))}
          </div>
        </div>
        <div className="chart-wrap">
          <div className="chart-title">🍱 SPPG per Kecamatan</div>
          <div className="bar-chart">
            {[
              ["Prajurit Kulon", 7, 18],
              ["Magersari", 6, 18],
              ["Kranggan", 5, 18],
            ].map(([name, val, max]) => (
              <div className="bar-row" key={name}>
                <div className="bar-label">{name}</div>
                <ProgressBar val={val} max={max} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {sppgList
        .filter((s) => s.status === "Masalah")
        .map((s) => (
          <div
            key={s.no}
            style={{
              background: "var(--red-lt)",
              border: "1.5px solid var(--red)",
              borderRadius: 12,
              padding: "1rem 1.25rem",
              marginBottom: ".75rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: ".5rem",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: "#991b1b", fontSize: ".9rem" }}>
                🔴 {s.nama}
              </div>
              <div style={{ fontSize: ".76rem", color: "#991b1b", marginTop: ".2rem" }}>
                Kec. {s.kecamatan} · {s.laporan} laporan · Skor: {s.skor}
              </div>
            </div>
            <button className="btn btn-red btn-sm" onClick={() => navigate("bgn-sppg")}>
              Lihat Detail
            </button>
          </div>
        ))}

      <div style={{ display: "flex", gap: ".85rem", flexWrap: "wrap" }}>
        <button className="btn btn-green" onClick={() => navigate("bgn-sppg")}>
          🍱 Manajemen SPPG
        </button>
        <button className="btn btn-outline" onClick={() => navigate("bgn-laporan")}>
          📋 Semua Laporan
        </button>
        <button className="btn btn-ghost" onClick={() => navigate("bgn-peta")}>
          🗺️ Peta
        </button>
      </div>
    </div>
  );
}
