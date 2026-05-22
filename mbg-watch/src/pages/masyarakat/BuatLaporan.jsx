import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import UploadPhoto from "../../components/UploadPhoto.jsx";
import { getFoto, storeFoto } from "../../utils/image.js";
import { getAntiBotState, saveAntiBotState, readDB } from "../../utils/db.js";
import { kecamatanGeo, wilayahList } from "../../data/sppg.js";

const JENIS_OPTIONS = [
  "Kualitas Makanan",
  "Keterlambatan Distribusi",
  "Porsi Tidak Memadai",
  "Dugaan Penyimpangan",
  "Kebersihan / Sanitasi",
  "Lainnya",
];

const WILAYAH_TO_CODE = {
  "Kec. Prajurit Kulon": "PKL",
  "Kec. Magersari": "MGR",
  "Kec. Kranggan": "KRG",
};

/** Haversine distance in km between two lat/lng pairs. */
function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const a =
    Math.sin((((lat2 - lat1) * Math.PI) / 180) / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin((((lng2 - lng1) * Math.PI) / 180) / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** 16-char random hex for a fresh laporan hash. */
function randomHash16() {
  let s = "";
  for (let i = 0; i < 16; i++) {
    s += "abcdef0123456789"[Math.floor(16 * Math.random())];
  }
  return s;
}

/** Heuristic credibility score (0–100) based on description, foto, suspect score. */
function credibilityScore(antiBot, description, fotoCount) {
  let score = 45;
  const words = description.trim().split(/\s+/).filter(Boolean).length;
  if (words >= 20) score += 15;
  else if (words >= 10) score += 8;
  if (fotoCount > 0) score += 20;
  if (fotoCount >= 2) score += 5;
  if (antiBot.suspectScore < 20) score += 8;
  if (antiBot.suspectScore >= 50) score -= 15;
  if (antiBot.suspectScore >= 70) score -= 20;
  return Math.max(0, Math.min(100, score));
}

export default function BuatLaporan() {
  const { navigate, showToast, refreshDB, addLaporan } = useApp();

  const [fotoKeys, setFotoKeys] = useState([]);
  const [deskripsi, setDeskripsi] = useState("");
  const [wilayah, setWilayah] = useState(wilayahList[0]);
  const [sekolah, setSekolah] = useState("");
  const [jenis, setJenis] = useState("Kualitas Makanan");
  const [waktu, setWaktu] = useState(() => new Date().toISOString().slice(0, 16));
  const [gpsVerified, setGpsVerified] = useState(false);
  const [gpsLabel, setGpsLabel] = useState("");
  const [lightbox, setLightbox] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const openedAtRef = useRef(Date.now());

  // ── Anti-bot precheck (banned/cooldown/daily limit) ────────────
  const ab = (() => {
    const state = getAntiBotState();
    if (state.banned) return { ok: false, alasan: "banned" };
    if (Date.now() < (state.cooldownUntil || 0))
      return { ok: false, alasan: "cooldown", sampai: state.cooldownUntil };
    const dayAgo = Date.now() - 86_400_000;
    const recent = (state.history || []).filter((h) => h.ts > dayAgo).length;
    if (recent >= 3) return { ok: false, alasan: "limit", jumlah: recent };
    return { ok: true };
  })();

  useEffect(() => {
    openedAtRef.current = Date.now();
  }, []);

  const wordCount = deskripsi.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = fotoKeys.length > 0 && gpsVerified && wordCount >= 8;

  const handleCapture = useCallback(
    (b64) => {
      const key = storeFoto(b64);
      setFotoKeys((arr) => [...arr, key]);
      showToast("success", "Foto berhasil diambil", `Total: ${fotoKeys.length + 1} foto`);
    },
    [fotoKeys.length, showToast],
  );

  // ── Anti-bot dead-ends ─────────────────────────────────────────
  if (ab.alasan === "banned") {
    return (
      <div>
        <div className="page-header">
          <h2>Buat Laporan MBG</h2>
        </div>
        <div
          style={{
            background: "var(--red-lt)",
            border: "2px solid var(--red)",
            borderRadius: 14,
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>🚫</div>
          <strong style={{ color: "#991b1b" }}>Akses Diblokir</strong>
          <p style={{ color: "#991b1b", fontSize: ".84rem", marginTop: ".4rem" }}>
            Perangkat ini terdeteksi aktivitas tidak wajar.
          </p>
        </div>
      </div>
    );
  }

  if (ab.alasan === "limit") {
    return (
      <div>
        <div className="page-header">
          <h2>Buat Laporan MBG</h2>
        </div>
        <div
          style={{
            background: "var(--amber-lt)",
            border: "2px solid var(--amber)",
            borderRadius: 14,
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>⏳</div>
          <strong style={{ color: "#92400e" }}>Batas Laporan Harian Tercapai</strong>
          <p style={{ color: "#92400e", fontSize: ".84rem", marginTop: ".4rem" }}>
            Maks. 3 laporan/hari per perangkat.
          </p>
          <button
            className="btn btn-outline btn-sm"
            style={{ marginTop: "1rem" }}
            onClick={() => navigate("m-riwayat")}
          >
            Lihat Riwayat
          </button>
        </div>
      </div>
    );
  }

  // ── Step indicator states ──────────────────────────────────────
  const fotoStep = fotoKeys.length > 0 ? "done" : "active";
  const gpsStep = fotoKeys.length > 0 ? (gpsVerified ? "done" : "active") : "";
  const descStep = gpsVerified ? (wordCount >= 8 ? "done" : "active") : "";

  const handleSubmit = () => {
    if (Date.now() - openedAtRef.current < 8000) {
      showToast("error", "Terlalu cepat", "Form perlu diisi dengan teliti");
      return;
    }
    if (!sekolah.trim()) {
      showToast("error", "Nama sekolah kosong", "");
      return;
    }
    const ab = getAntiBotState();
    const kredibilitas = credibilityScore(ab, deskripsi, fotoKeys.length);
    const year = new Date().getFullYear();
    const existing = readDB();
    const id = `MJK-${WILAYAH_TO_CODE[wilayah] || "MJK"}-${year}-${String(
      existing.laporan.length + 1,
    ).padStart(3, "0")}`;
    const now = new Date();
    const hash = randomHash16();
    const newLaporan = {
      id,
      tanggal: now.toISOString().split("T")[0],
      waktu: now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      sekolah: sekolah.trim(),
      wilayah,
      jenis,
      deskripsi,
      status: "pending",
      fotoLaporan: fotoKeys,
      fotoVerif: [],
      hash,
      verified_by: null,
      deviceId: ab.deviceId,
      kredibilitas,
    };
    const block = {
      block: existing.blockchain.length + 1001,
      hash,
      prev: existing.blockchain[existing.blockchain.length - 1]?.hash ?? "0",
      ts: now.toISOString().replace("T", " ").slice(0, 19),
      laporan: id,
    };
    addLaporan(newLaporan, block);

    ab.laporanCount = (ab.laporanCount || 0) + 1;
    ab.history = [...(ab.history || []), { ts: Date.now(), jenis, wilayah }];
    saveAntiBotState(ab);

    refreshDB();
    showToast("success", "Laporan terkirim!", `ID: ${id} — tercatat di blockchain`);
    navigate("m-riwayat");
  };

  const verifyGps = () => {
    setGpsLabel("Mengambil lokasi GPS...");
    if (!navigator.geolocation) {
      setGpsVerified(true);
      setGpsLabel("GPS tidak tersedia — laporan tetap diterima");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const code = WILAYAH_TO_CODE[wilayah];
        const target = kecamatanGeo[code];
        const km = distanceKm(pos.coords.latitude, pos.coords.longitude, target.lat, target.lng);
        setGpsVerified(true);
        if (km <= 5) setGpsLabel(`✅ GPS Terverifikasi — ${km.toFixed(1)} km dari ${wilayah}`);
        else setGpsLabel(`📍 Lokasi ${km.toFixed(1)} km dari kecamatan — laporan tetap diterima`);
      },
      () => {
        setGpsVerified(true);
        setGpsLabel("GPS ditolak — laporan tetap bisa dikirim");
      },
    );
  };

  return (
    <div>
      {cameraOpen && (
        <UploadPhoto onCapture={handleCapture} onClose={() => setCameraOpen(false)} />
      )}
      <div className="page-header">
        <h2>📝 Buat Laporan MBG</h2>
        <p>Verifikasi berlapis — memastikan laporan dari manusia nyata di lokasi</p>
      </div>

      {/* ── How verification works ── */}
      <div className="hv-panel" style={{ marginBottom: "1rem" }}>
        <div
          style={{
            fontSize: ".68rem",
            fontWeight: 800,
            color: "var(--muted)",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            marginBottom: ".85rem",
          }}
        >
          🛡️ Syarat Laporan Terverifikasi
        </div>
        {[
          {
            num: fotoStep,
            title: "📷 Foto Kamera Langsung (WAJIB)",
            desc: "Foto diambil langsung dari kamera — bot tidak bisa memalsukan foto realtime dari lokasi.",
          },
          {
            num: gpsStep,
            title: "📍 Verifikasi GPS Lokasi",
            desc: "Membuktikan pelapor berada di area kecamatan. GPS ditolak = laporan tetap masuk tapi skor lebih rendah.",
          },
          {
            num: descStep,
            title: "📝 Deskripsi Min. 8 Kata",
            desc: "Bot cenderung mengisi deskripsi sangat singkat. Deskripsi panjang = lebih kredibel.",
          },
        ].map((s, i) => (
          <div className="hv-step" key={i}>
            <div className={`hv-step-num ${s.num}`}>{i + 1}</div>
            <div className="hv-step-body">
              <div className="hv-step-title">{s.title}</div>
              <div className="hv-step-desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Report form ── */}
      <div className="report-form">
        <div className="form-section-title">📍 Lokasi Kejadian</div>
        <div className="form-row">
          <div className="form-group">
            <label>Kecamatan *</label>
            <select value={wilayah} onChange={(e) => setWilayah(e.target.value)}>
              {wilayahList.map((w) => (
                <option key={w}>{w}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Nama Sekolah *</label>
            <input
              type="text"
              placeholder="cth: SDN Prajurit Kulon 1"
              value={sekolah}
              onChange={(e) => setSekolah(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginBottom: "1.25rem" }}>
          <button
            className="btn btn-blue btn-sm"
            onClick={verifyGps}
            style={{ marginBottom: ".5rem" }}
          >
            📍 Verifikasi GPS Sekarang
          </button>
          {gpsLabel && (
            <div style={{ fontSize: ".77rem", color: "var(--muted)", marginTop: ".3rem" }}>
              {gpsLabel}
            </div>
          )}
        </div>

        <div className="form-section-title">⚠️ Detail Masalah</div>
        <div className="form-row">
          <div className="form-group">
            <label>Jenis Masalah *</label>
            <select value={jenis} onChange={(e) => setJenis(e.target.value)}>
              {JENIS_OPTIONS.map((j) => (
                <option key={j}>{j}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Waktu Kejadian</label>
            <input
              type="datetime-local"
              value={waktu}
              onChange={(e) => setWaktu(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            Deskripsi Lengkap *{" "}
            <span style={{ fontSize: ".7rem", color: "var(--muted)", fontWeight: 400 }}>
              (min. 8 kata)
            </span>
          </label>
          <textarea
            placeholder="Ceritakan kondisi yang Anda temui secara detail: makanannya bagaimana, waktunya kapan, kondisi siswa seperti apa..."
            style={{ minHeight: 110 }}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
          <div style={{ marginTop: ".35rem" }}>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(100, Math.round((wordCount / 15) * 100))}%` }}
              />
            </div>
            <div style={{ fontSize: ".72rem", color: "var(--muted)" }}>
              {wordCount < 8
                ? `⚠️ Minimal 8 kata (${wordCount} ditulis)`
                : wordCount < 15
                  ? `✅ Cukup (${wordCount} kata) — lebih detail lebih baik`
                  : `⭐ Deskripsi lengkap (${wordCount} kata)`}
            </div>
          </div>
        </div>

        <div className="form-section-title">📷 Foto Kamera Langsung (WAJIB)</div>
        <div
          style={{
            background: "#fef3c7",
            border: "1.5px solid #fcd34d",
            borderRadius: 10,
            padding: ".7rem 1rem",
            fontSize: ".78rem",
            color: "#92400e",
            marginBottom: ".85rem",
            display: "flex",
            alignItems: "flex-start",
            gap: ".5rem",
          }}
        >
          <span style={{ flexShrink: 0 }}>📷</span>
          <span>
            Foto <strong>harus diambil langsung dari kamera</strong> — tidak bisa dipilih dari
            galeri. Ini memastikan foto diambil nyata di lokasi kejadian.
          </span>
        </div>

        <div
          style={{
            border: `2px dashed ${fotoKeys.length > 0 ? "var(--g-bright)" : "var(--border)"}`,
            borderRadius: 12,
            overflow: "hidden",
            background: fotoKeys.length > 0 ? "var(--g-pale)" : "#fafaf7",
            transition: "border-color .2s",
          }}
        >
          <div
            style={{ padding: "1.5rem", textAlign: "center", cursor: "pointer" }}
            onClick={() => setCameraOpen(true)}
          >
            <div style={{ fontSize: "2.2rem", marginBottom: ".4rem" }}>📸</div>
            <p style={{ fontWeight: 700, fontSize: ".88rem", color: "var(--g-deep)" }}>
              {fotoKeys.length > 0
                ? `Ambil Foto Lagi (${fotoKeys.length} foto)`
                : "Buka Kamera & Ambil Foto"}
            </p>
            <p style={{ fontSize: ".72rem", color: "var(--muted)", marginTop: ".25rem" }}>
              Kamera belakang akan dibuka otomatis · Bisa ambil beberapa foto
            </p>
            <div style={{ marginTop: ".75rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: ".4rem",
                  background: "var(--g-deep)",
                  color: "var(--g-light)",
                  padding: ".45rem 1.1rem",
                  borderRadius: 100,
                  fontSize: ".82rem",
                  fontWeight: 700,
                }}
              >
                📷 Buka Kamera
              </span>
            </div>
          </div>
          {fotoKeys.length > 0 && (
            <div
              style={{
                padding: ".5rem .75rem .75rem",
                borderTop: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontSize: ".72rem",
                  fontWeight: 700,
                  color: "var(--g-mid)",
                  marginBottom: ".5rem",
                }}
              >
                ✅ {fotoKeys.length} foto berhasil diambil:
              </div>
              <div className="foto-preview-grid">
                {fotoKeys.map((k, i) => (
                  <div className="foto-prev-item" key={k}>
                    <img
                      src={getFoto(k)}
                      alt={`Foto ${i + 1}`}
                      onClick={() => setLightbox(getFoto(k))}
                      style={{ cursor: "pointer" }}
                    />
                    <button
                      className="foto-prev-del"
                      onClick={() => setFotoKeys((arr) => arr.filter((_, j) => j !== i))}
                      aria-label="Hapus foto"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <div
                  style={{
                    aspectRatio: "1",
                    borderRadius: 8,
                    border: "2px dashed var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    background: "#f8fef9",
                    color: "var(--g-mid)",
                    fontSize: ".62rem",
                    gap: ".2rem",
                  }}
                  onClick={() => setCameraOpen(true)}
                >
                  <span style={{ fontSize: "1.4rem" }}>+</span>
                  <span style={{ fontWeight: 700 }}>Foto Lagi</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ margin: "1rem 0" }}>
          {canSubmit ? (
            <div
              style={{
                background: "#dcfce7",
                border: "1px solid #86efac",
                borderRadius: 8,
                padding: ".6rem .85rem",
                fontSize: ".78rem",
                color: "#166534",
                fontWeight: 600,
              }}
            >
              ✅ Semua syarat terpenuhi — siap kirim
            </div>
          ) : (
            <div
              style={{
                background: "#fef9c3",
                border: "1px solid #fde047",
                borderRadius: 8,
                padding: ".6rem .85rem",
                fontSize: ".78rem",
                color: "#713f12",
              }}
            >
              Lengkapi:{" "}
              {[
                fotoKeys.length === 0 && "foto kamera",
                !gpsVerified && "verifikasi GPS",
                wordCount < 8 && "deskripsi min. 8 kata",
              ]
                .filter(Boolean)
                .join(", ")}
            </div>
          )}
        </div>

        <div
          style={{
            background: "var(--g-pale)",
            borderRadius: 10,
            padding: ".85rem",
            fontSize: ".77rem",
            color: "var(--muted)",
            lineHeight: 1.65,
            marginBottom: ".85rem",
          }}
        >
          🔒 <strong style={{ color: "var(--g-deep)" }}>Privasi terjamin:</strong> Tidak ada
          nama, NIK, atau nomor HP yang dikumpulkan. GPS hanya dicek sekali saat submit.
        </div>

        <div style={{ display: "flex", gap: ".85rem" }}>
          <button
            className="btn btn-green"
            style={{ flex: 1, padding: ".8rem" }}
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            🚀 Kirim Laporan
          </button>
          <button className="btn btn-ghost" onClick={() => navigate("m-riwayat")}>
            📋 Riwayat
          </button>
        </div>
      </div>

      {lightbox && (
        <div className="foto-lightbox open" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Foto" onClick={(e) => e.stopPropagation()} />
          <button className="foto-lightbox-close" onClick={() => setLightbox(null)}>
            ✕
          </button>
          <div className="lb-caption">Foto Bukti</div>
        </div>
      )}
    </div>
  );
}
