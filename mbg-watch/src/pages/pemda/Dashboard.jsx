import { useApp } from "../../context/AppContext.jsx";
import BarChart from "../../components/BarChart.jsx";
import { reportTypeChart, wilayahChart } from "../../data/notifications.js";

/**
 * Pemkot Dashboard (pd-home).
 * Shows headline stat cards, two summary charts, kecamatan ringkasan table,
 * and a row of quick-action buttons.
 */
export default function PemdaDashboard() {
  const { db, user, navigate } = useApp();

  const pending = db.laporan.filter((l) => l.status === "pending").length;
  const verified = db.laporan.filter((l) => l.status === "verified").length;
  const done = db.laporan.filter((l) => l.status === "done").length;

  const rows = [
    ["Kec. Prajurit Kulon", "PKL", 14, "high"],
    ["Kec. Magersari", "MGR", 18, "high"],
    ["Kec. Kranggan", "KRG", 8, "medium"],
  ];

  return (
    <div>
      <div className="welcome-banner">
        <h2>Dashboard Pemkot — {user?.wilayah} 🏛️</h2>
        <p>
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · Kota Mojokerto
        </p>
      </div>

      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-num" style={{ color: "var(--amber)" }}>
            {pending}
          </div>
          <div className="stat-label">Menunggu Verifikasi</div>
          <div className="stat-change" style={{ color: "var(--amber)" }}>
            ⚡ Perlu tindakan
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: "var(--blue)" }}>
            {verified}
          </div>
          <div className="stat-label">Sedang Diproses</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: "var(--g-bright)" }}>
            {done}
          </div>
          <div className="stat-label">Selesai</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{db.laporan.length}</div>
          <div className="stat-label">Total Laporan</div>
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
          <div className="chart-title">📊 Laporan per Jenis</div>
          <BarChart items={reportTypeChart} />
        </div>
        <div className="chart-wrap">
          <div className="chart-title">🗺️ Per Kecamatan</div>
          <BarChart items={wilayahChart} />
        </div>
      </div>

      <div className="table-wrap" style={{ marginBottom: "1.25rem" }}>
        <div className="table-header">
          <h3>Ringkasan Kecamatan</h3>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Kecamatan</th>
                <th>Kode</th>
                <th>Laporan</th>
                <th>SPPG</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([nama, kode, jumlah, level]) => (
                <tr key={nama}>
                  <td style={{ fontWeight: 600 }}>{nama}</td>
                  <td>
                    <span className="id-badge">{kode}</span>
                  </td>
                  <td
                    style={{
                      fontWeight: 700,
                      color: level === "high" ? "var(--red)" : "var(--amber)",
                    }}
                  >
                    {jumlah}
                  </td>
                  <td style={{ color: "var(--muted)" }}>
                    {kode === "PKL" ? 7 : kode === "MGR" ? 6 : 5}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${level === "high" ? "status-rejected" : "status-pending"}`}
                    >
                      {level === "high" ? "🔴 Tinggi" : "🟡 Sedang"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: "flex", gap: ".85rem", flexWrap: "wrap" }}>
        <button className="btn btn-blue" onClick={() => navigate("pd-verifikasi")}>
          ✅ Verifikasi ({pending})
        </button>
        <button className="btn btn-outline" onClick={() => navigate("pd-laporan")}>
          📋 Semua Laporan
        </button>
        <button className="btn btn-ghost" onClick={() => navigate("pd-sppg")}>
          🍱 Monitor SPPG
        </button>
      </div>
    </div>
  );
}
