import { Fragment, useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";

/**
 * Pemkot Reports page (pd-laporan) — full laporan table with filters
 * and CSV export. Inline "approve/reject" actions for pending rows.
 *
 * The same component is reused by BGN under the bgn-laporan route.
 */
export default function Reports() {
  const { db, updateLaporanStatus, showToast } = useApp();
  const [filter, setFilter] = useState("all");

  const visible =
    filter === "all" ? db.laporan : db.laporan.filter((l) => l.status === filter);

  const apply = (id, status) => {
    updateLaporanStatus(id, status, "Pemkot Mojokerto");
    showToast("success", "Status diperbarui", id);
  };

  const exportCsv = () => {
    const lines = [
      "ID,Tanggal,Waktu,Wilayah,Sekolah,Jenis,Status,Hash",
      ...db.laporan.map(
        (l) =>
          `${l.id},${l.tanggal},${l.waktu},${l.wilayah},${l.sekolah},${l.jenis},${l.status},${l.hash}`,
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "mbgwatch_laporan.csv";
    a.click();
  };

  const FILTERS = [
    ["all", "Semua"],
    ["pending", "Pending"],
    ["verified", "Verified"],
    ["done", "Selesai"],
    ["rejected", "Ditolak"],
  ];

  return (
    <div>
      <div className="page-header">
        <h2>📋 Semua Laporan Kota Mojokerto</h2>
        <p>Database lengkap 3 kecamatan</p>
      </div>

      <div style={{ display: "flex", gap: ".6rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {FILTERS.map(([key, label]) => (
          <button
            key={key}
            className={`btn btn-sm ${filter === key ? "btn-green" : "btn-ghost"}`}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <div className="table-header">
          <h3>Laporan Kota Mojokerto ({visible.length})</h3>
          <button className="btn btn-green btn-sm" onClick={exportCsv}>
            ⬇️ Ekspor CSV
          </button>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tanggal</th>
                <th>Kecamatan</th>
                <th>Sekolah</th>
                <th>Jenis</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((l) => (
                <tr key={l.id}>
                  <td>
                    <span className="id-badge">{l.id}</span>
                  </td>
                  <td style={{ fontSize: ".76rem" }}>{l.tanggal}</td>
                  <td style={{ fontSize: ".74rem", color: "var(--muted)" }}>{l.wilayah}</td>
                  <td style={{ fontSize: ".8rem", fontWeight: 500 }}>{l.sekolah}</td>
                  <td style={{ fontSize: ".75rem" }}>{l.jenis}</td>
                  <td>
                    <StatusBadge status={l.status} />
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: ".3rem", flexWrap: "wrap" }}>
                      {l.status === "pending" && (
                        <Fragment>
                          <button
                            className="btn btn-green btn-sm"
                            onClick={() => apply(l.id, "verified")}
                          >
                            ✅
                          </button>
                          <button
                            className="btn btn-red btn-sm"
                            onClick={() => apply(l.id, "rejected")}
                          >
                            ❌
                          </button>
                        </Fragment>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
