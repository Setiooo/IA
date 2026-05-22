import { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";

/**
 * Riwayat Laporan — paginated list of all laporan (filter by status).
 * Used by all three roles (m-riwayat / pd-laporan / bgn-laporan share
 * the same list view; pemda/bgn additionally route through Reports
 * which is a thin wrapper around this).
 */
export default function RiwayatLaporan() {
  const { db, navigate } = useApp();
  const [filter, setFilter] = useState("all");

  const visible = filter === "all" ? db.laporan : db.laporan.filter((l) => l.status === filter);
  const counts = {
    pending: db.laporan.filter((l) => l.status === "pending").length,
    verified: db.laporan.filter((l) => l.status === "verified").length,
    done: db.laporan.filter((l) => l.status === "done").length,
  };

  const filterButtons = [
    ["all", "Semua", db.laporan.length, "btn-outline"],
    ["pending", "Pending", counts.pending, "btn-ghost"],
    ["verified", "Verified", counts.verified, "btn-ghost"],
    ["done", "Selesai", counts.done, "btn-ghost"],
  ];

  return (
    <div>
      <div className="page-header">
        <h2>📋 Riwayat Laporan</h2>
        <p>Semua laporan MBG Watch Kota Mojokerto</p>
      </div>

      <div style={{ display: "flex", gap: ".6rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {filterButtons.map(([key, label, count, ghostClass]) => (
          <button
            key={key}
            className={`btn ${filter === key ? "btn-green" : ghostClass} btn-sm`}
            onClick={() => setFilter(key)}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <div className="table-header">
          <h3>Total {db.laporan.length} Laporan</h3>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tgl/Waktu</th>
                <th>Kecamatan</th>
                <th>Sekolah</th>
                <th>Jenis</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((l) => (
                <tr key={l.id}>
                  <td>
                    <span className="id-badge">{l.id}</span>
                  </td>
                  <td style={{ fontSize: ".76rem" }}>
                    {l.tanggal}
                    <br />
                    <span style={{ color: "var(--muted)" }}>{l.waktu}</span>
                  </td>
                  <td style={{ fontSize: ".74rem", color: "var(--muted)" }}>{l.wilayah}</td>
                  <td style={{ fontSize: ".8rem", fontWeight: 500 }}>{l.sekolah}</td>
                  <td style={{ fontSize: ".75rem" }}>{l.jenis}</td>
                  <td>
                    <StatusBadge status={l.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button className="btn btn-green" onClick={() => navigate("m-lapor")}>
        📝 Buat Laporan Baru
      </button>
    </div>
  );
}
