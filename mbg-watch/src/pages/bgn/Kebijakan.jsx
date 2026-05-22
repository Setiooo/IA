import { kebijakanList, kebijakanStatusMap } from "../../data/kebijakan.js";

/**
 * BGN Kebijakan (bgn-kebijakan) — active policy agenda for Kota Mojokerto.
 * Each policy shows a priority pill (Tinggi/Sedang) and status badge
 * (Aktif/Berjalan/Draft). Bottom card gives counts by status.
 */
export default function Kebijakan() {
  const statusCounts = {
    Aktif: kebijakanList.filter((k) => k.status === "Aktif").length,
    Berjalan: kebijakanList.filter((k) => k.status === "Berjalan").length,
    Draft: kebijakanList.filter((k) => k.status === "Draft").length,
  };

  return (
    <div>
      <div className="page-header">
        <h2>📌 Kebijakan & Tindak Lanjut</h2>
        <p>Agenda kebijakan aktif Kota Mojokerto</p>
      </div>

      {kebijakanList.map((k, i) => (
        <div className="kebijakan-card" key={i}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: ".5rem",
              flexWrap: "wrap",
              gap: ".4rem",
            }}
          >
            <h4>{k.title}</h4>
            <div style={{ display: "flex", gap: ".4rem" }}>
              <span
                className={`priority-badge priority-${k.prioritas === "Tinggi" ? "tinggi" : "sedang"}`}
              >
                {k.prioritas}
              </span>
              <span className={`status-badge ${kebijakanStatusMap[k.status][0]}`}>
                {kebijakanStatusMap[k.status][1]}
              </span>
            </div>
          </div>
          <p style={{ fontSize: ".83rem", color: "var(--muted)", lineHeight: 1.6 }}>
            {k.desc}
          </p>
        </div>
      ))}

      <div
        style={{
          background: "var(--g-pale)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "1.25rem",
          marginTop: "1.25rem",
        }}
      >
        <div
          style={{
            fontFamily: "Syne,sans-serif",
            fontWeight: 700,
            fontSize: ".9rem",
            color: "var(--g-deep)",
            marginBottom: ".75rem",
          }}
        >
          📊 Statistik Kebijakan
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: ".75rem",
          }}
        >
          {Object.entries(statusCounts).map(([label, count]) => (
            <div
              key={label}
              style={{
                textAlign: "center",
                background: "#fff",
                borderRadius: 10,
                padding: ".85rem",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontFamily: "Syne,sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "var(--g-deep)",
                }}
              >
                {count}
              </div>
              <div style={{ fontSize: ".72rem", color: "var(--muted)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
