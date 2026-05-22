import { useState } from "react";
import { sppgList } from "../data/sppg.js";

const DAPUR_REQS = [
  "Lantai kedap air, tidak licin, mudah dibersihkan",
  "Dinding bersih, tidak retak, terbuat dari bahan tidak menyerap",
  "Ventilasi & pencahayaan cukup di area pengolahan",
  "Tempat cuci tangan dengan air mengalir dan sabun tersedia",
  "Pisah area bersih & kotor (raw vs cooked food)",
  "Tempat sampah tertutup rapat & tidak berdekatan dengan makanan",
  "Bebas hama (tikus, kecoa, lalat)",
  "Fasilitas penyimpanan bahan baku bersuhu sesuai (chiller/freezer)",
  "Penjamah makanan memakai celemek, penutup kepala, dan sarung tangan",
  "Sertifikat laik sehat penjamah makanan (dari Puskesmas)",
];

const SLHS_FLOW = [
  {
    no: 1,
    icon: "📋",
    judul: "Persiapan Dokumen",
    isi: "Formulir permohonan, KTP pemohon, sertifikat usaha / NIB, denah lokasi dapur, daftar menu & bahan baku, hasil uji lab air (maksimal 3 bulan terakhir).",
  },
  {
    no: 2,
    icon: "🏥",
    judul: "Penyerahan ke Dinas Kesehatan",
    isi: "Berkas diserahkan ke Seksi Penyehatan Lingkungan Dinas Kesehatan Kota Mojokerto. Biaya administrasi sesuai Perda setempat (umumnya Rp 0 – Rp 150.000).",
  },
  {
    no: 3,
    icon: "🔍",
    judul: "Inspeksi Lapangan",
    isi: "Petugas sanitarian Dinkes melakukan pemeriksaan fisik: kondisi dapur, saluran pembuangan, tempat cuci tangan, suhu penyimpanan bahan, pakaian kerja penjamah makanan.",
  },
  {
    no: 4,
    icon: "🧪",
    judul: "Uji Lab Makanan (jika diperlukan)",
    isi: "Sampel makanan jadi dikirim ke laboratorium kesehatan daerah untuk uji Angka Lempeng Total (ALT), coliform, dan Salmonella.",
  },
  {
    no: 5,
    icon: "📜",
    judul: "Penerbitan SLHS",
    isi: "Jika lolos, SLHS diterbitkan dengan masa berlaku 3 tahun. Jika tidak lolos, diberikan rekomendasi perbaikan dan jadwal reinspeksi.",
  },
];

const SLHS_RISKS = [
  {
    ikon: "⚠️",
    teks: "Melanggar Permenkes No. 1098/2003 & Kepmenkes No. 942/2003 tentang Persyaratan Higiene Sanitasi Jasa Boga",
  },
  {
    ikon: "🚫",
    teks: "Dapat dikenai sanksi administratif berupa teguran tertulis, penghentian sementara kegiatan, hingga pencabutan izin usaha",
  },
  {
    ikon: "💉",
    teks: "Risiko kejadian luar biasa (KLB) keracunan pangan tanpa perlindungan hukum bagi pengelola SPPG",
  },
  {
    ikon: "📉",
    teks: "Dalam konteks MBG, SPPG tanpa SLHS berpotensi didiskualifikasi dari program oleh BGN sesuai Pedoman Teknis MBG 2024",
  },
  {
    ikon: "⚖️",
    teks: "Pengelola dapat dijerat Pasal 75–76 UU No. 18 Tahun 2012 tentang Pangan jika terjadi keracunan massal",
  },
];

/**
 * Expandable SLHS info card (Sertifikat Laik Higiene Sanitasi).
 *
 * Header always shows: punya/proses/tidak counts.
 * Body lists physical requirements, application flow, risks, and contact.
 */
export default function SLHSInfoCard() {
  const [open, setOpen] = useState(false);

  const counts = {
    punya: sppgList.filter((s) => s.slhs === "punya").length,
    proses: sppgList.filter((s) => s.slhs === "proses").length,
    tidak: sppgList.filter((s) => s.slhs === "tidak").length,
  };
  const sppgWithoutSlhs = sppgList.filter((s) => s.slhs === "tidak");

  return (
    <div
      style={{
        background: "#fff",
        border: "2px solid #fcd34d",
        borderRadius: 16,
        marginBottom: "1.5rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg,#fef3c7,#fffbeb)",
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => setOpen((o) => !o)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: "#f59e0b",
              borderRadius: 10,
              display: "grid",
              placeItems: "center",
              fontSize: "1.3rem",
              flexShrink: 0,
            }}
          >
            📜
          </div>
          <div>
            <div
              style={{
                fontFamily: "Syne,sans-serif",
                fontWeight: 800,
                fontSize: ".95rem",
                color: "#0a3622",
              }}
            >
              Sertifikat Laik Higiene Sanitasi (SLHS)
            </div>
            <div style={{ fontSize: ".74rem", color: "#92400e", marginTop: ".1rem" }}>
              Syarat wajib operasional SPPG · Dasar: Permenkes No. 1098/2003
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
          <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
            <span style={pill("#dcfce7", "#166534", "#86efac")}>
              ✅ {counts.punya} Punya
            </span>
            <span style={pill("#fef3c7", "#92400e", "#fcd34d")}>
              ⏳ {counts.proses} Proses
            </span>
            <span style={pill("#fee2e2", "#991b1b", "#fca5a5")}>
              ❌ {counts.tidak} Belum
            </span>
          </div>
          <span
            style={{
              color: "#92400e",
              fontSize: "1rem",
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform .2s",
            }}
          >
            ▾
          </span>
        </div>
      </div>

      {open && (
        <div style={{ padding: "1.25rem", borderTop: "1px solid #fde68a" }}>
          {sppgWithoutSlhs.length > 0 && (
            <div
              style={{
                background: "#fee2e2",
                border: "1.5px solid #fca5a5",
                borderRadius: 10,
                padding: "1rem 1.1rem",
                marginBottom: "1.1rem",
                display: "flex",
                gap: ".75rem",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>🚨</span>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    color: "#991b1b",
                    fontSize: ".88rem",
                    marginBottom: ".25rem",
                  }}
                >
                  {sppgWithoutSlhs.length} SPPG belum memiliki SLHS
                </div>
                <div style={{ fontSize: ".78rem", color: "#991b1b", lineHeight: 1.6 }}>
                  SPPG berikut beroperasi tanpa sertifikasi higiene sanitasi yang sah dan perlu
                  segera mengurus SLHS ke Dinas Kesehatan Kota Mojokerto:{" "}
                  <strong>
                    {sppgWithoutSlhs
                      .map((s) => s.nama.split(" ").slice(-2).join(" "))
                      .join(", ")}
                  </strong>
                </div>
              </div>
            </div>
          )}

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
          >
            {/* Left: explanation + physical requirements */}
            <div>
              <SectionTitle>📌 Apa itu SLHS?</SectionTitle>
              <p
                style={{
                  fontSize: ".8rem",
                  color: "#374151",
                  lineHeight: 1.7,
                  marginBottom: ".85rem",
                }}
              >
                SLHS adalah sertifikat yang dikeluarkan Dinas Kesehatan sebagai bukti bahwa
                tempat pengolahan pangan memenuhi persyaratan higiene dan sanitasi sesuai
                standar kesehatan. Bagi SPPG dalam program MBG, SLHS merupakan{" "}
                <strong>
                  jaminan bahwa makanan yang didistribusikan ke siswa diproduksi di lingkungan
                  yang aman.
                </strong>
              </p>
              <SectionTitle>🏗️ Syarat Fisik Dapur</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: ".3rem" }}>
                {DAPUR_REQS.map((req, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: ".45rem",
                      fontSize: ".76rem",
                      color: "#374151",
                      lineHeight: 1.55,
                    }}
                  >
                    <span style={{ color: "#166534", flexShrink: 0, marginTop: ".05rem" }}>
                      ✓
                    </span>
                    {req}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: process + risks */}
            <div>
              <SectionTitle>📋 Alur Pengurusan SLHS</SectionTitle>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                  marginBottom: "1rem",
                }}
              >
                {SLHS_FLOW.map((step) => (
                  <div
                    key={step.no}
                    style={{ display: "flex", gap: ".6rem", alignItems: "flex-start" }}
                  >
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: "#0a3622",
                        color: "#bbf7d0",
                        fontSize: ".7rem",
                        fontWeight: 800,
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      {step.no}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: ".78rem",
                          color: "#0a3622",
                          marginBottom: ".1rem",
                        }}
                      >
                        {step.icon} {step.judul}
                      </div>
                      <div
                        style={{ fontSize: ".73rem", color: "#6b7280", lineHeight: 1.55 }}
                      >
                        {step.isi}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <SectionTitle style={{ color: "#991b1b" }}>⚠️ Risiko Tanpa SLHS</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
                {SLHS_RISKS.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: ".45rem",
                      alignItems: "flex-start",
                      fontSize: ".74rem",
                      color: "#374151",
                      lineHeight: 1.55,
                    }}
                  >
                    <span style={{ flexShrink: 0 }}>{r.ikon}</span>
                    <span>{r.teks}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "1rem",
              paddingTop: "1rem",
              borderTop: "1px solid #fde68a",
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ fontSize: ".74rem", color: "#92400e" }}>
              📞 <strong>Dinas Kesehatan Kota Mojokerto</strong> — Seksi Penyehatan Lingkungan
            </div>
            <div style={{ fontSize: ".74rem", color: "#92400e" }}>
              📄 Dasar hukum: <strong>Permenkes 1098/2003</strong> ·{" "}
              <strong>Kepmenkes 942/2003</strong> · <strong>UU Pangan 18/2012</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ children, style }) {
  return (
    <div
      style={{
        fontFamily: "Syne,sans-serif",
        fontWeight: 700,
        fontSize: ".85rem",
        color: "#0a3622",
        marginBottom: ".65rem",
        display: "flex",
        alignItems: "center",
        gap: ".4rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function pill(bg, color, border) {
  return {
    background: bg,
    color,
    border: `1px solid ${border}`,
    borderRadius: 100,
    padding: ".15rem .6rem",
    fontSize: ".68rem",
    fontWeight: 700,
  };
}
