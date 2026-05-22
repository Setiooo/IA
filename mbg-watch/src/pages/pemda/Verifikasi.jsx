import { useApp } from "../../context/AppContext.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";
import VerifikasiFotoUploader from "../../components/VerifikasiFotoUploader.jsx";

/**
 * Pemkot Verifikasi page (pd-verifikasi) — lists all pending laporan and
 * lets the operator mark them as verified / done / rejected.
 *
 * Each card also includes the VerifikasiFotoUploader so the operator can
 * upload field-verification photos directly from the desktop.
 */
export default function Verifikasi() {
  const { db, updateLaporanStatus, showToast } = useApp();

  const pending = db.laporan.filter((l) => l.status === "pending");

  const apply = (id, status) => {
    updateLaporanStatus(id, status, "Pemkot Mojokerto");
    const verb =
      status === "verified"
        ? "diverifikasi"
        : status === "done"
          ? "diselesaikan"
          : "ditolak";
    showToast("success", `Laporan ${verb}`, id);
  };

  return (
    <div>
      <div className="page-header">
        <h2>✅ Verifikasi Laporan</h2>
        <p>{pending.length} laporan menunggu verifikasi</p>
      </div>

      {pending.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            background: "#fff",
            borderRadius: 14,
            border: "1px solid var(--border)",
            color: "var(--muted)",
          }}
        >
          🎉 Semua laporan sudah diverifikasi!
        </div>
      ) : (
        pending.map((l) => {
          const kredClass =
            l.kredibilitas >= 75
              ? "kred-tinggi"
              : l.kredibilitas >= 50
                ? "kred-sedang"
                : "kred-rendah";
          const kredEmoji =
            l.kredibilitas >= 75 ? "🟢" : l.kredibilitas >= 50 ? "🟡" : "🔴";
          return (
            <div className="verif-card" key={l.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: ".4rem",
                  flexWrap: "wrap",
                  gap: ".5rem",
                }}
              >
                <h4>
                  {l.sekolah} — {l.jenis}
                </h4>
                <StatusBadge status={l.status} />
              </div>
              <div className="verif-meta">
                <span>📍 {l.wilayah}</span>
                <span>
                  🕐 {l.tanggal} {l.waktu}
                </span>
                <span className="id-badge">{l.id}</span>
                {l.kredibilitas !== undefined && (
                  <span className={kredClass}>
                    {kredEmoji} Kredibilitas {l.kredibilitas}%
                  </span>
                )}
              </div>
              <div className="verif-desc">{l.deskripsi}</div>

              <VerifikasiFotoUploader laporan={l} />

              <div className="verif-actions" style={{ marginTop: ".85rem" }}>
                <button
                  className="btn btn-green btn-sm"
                  onClick={() => apply(l.id, "verified")}
                >
                  ✅ Verifikasi Valid
                </button>
                <button
                  className="btn btn-red btn-sm"
                  onClick={() => apply(l.id, "rejected")}
                >
                  ❌ Tolak
                </button>
                <button
                  className="btn btn-amber btn-sm"
                  onClick={() => apply(l.id, "done")}
                >
                  ✓ Selesai
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
