import { Fragment, useRef, useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { wilayahList } from "../data/sppg.js";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Modal from "../components/Modal.jsx";

/**
 * Landing page — Navbar + Hero + role portal cards + login modals.
 *
 * `modal` state:
 *   null     — no modal
 *   "info"   — about modal
 *   "pemda"  — Pemkot login modal
 *   "bgn"    — BGN login modal
 *
 * "Masyarakat" portal logs in immediately with an anonymous user.
 */
export default function Landing() {
  const { login } = useApp();
  const [modal, setModal] = useState(null);
  const [wilayahPemda, setWilayahPemda] = useState(wilayahList[0]);
  const [unitBgn, setUnitBgn] = useState("SPPG Prajurit Kulon");
  const portalRef = useRef(null);

  const scrollToPortal = () =>
    portalRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <Fragment>
      <Navbar onInfoClick={() => setModal("info")} onLoginClick={scrollToPortal} />

      <Hero onPortalClick={scrollToPortal} onInfoClick={() => setModal("info")} />

      <div className="portal" id="portal-section" ref={portalRef}>
        <h2 className="portal-title">Pilih Peran Anda</h2>
        <p className="portal-sub">
          Masyarakat bisa langsung masuk — tidak perlu daftar, tidak perlu NIK
        </p>
        <div className="portal-grid">
          <div
            className="portal-card"
            onClick={() => {
              login({
                role: "masyarakat",
                label: "Masyarakat",
                avatar: "👤",
                nama: "Pelapor Anonim",
              });
            }}
          >
            <span className="portal-icon">👨‍👩‍👧</span>
            <div className="role-tag">PELAPOR · TANPA REGISTRASI</div>
            <h3>Masyarakat</h3>
            <p>
              Klik dan langsung buat laporan. Tidak perlu NIK, nama, atau nomor HP. Identitas
              Anda sepenuhnya anonim.
            </p>
            <button className="btn btn-green" style={{ width: "100%" }}>
              Masuk Langsung & Lapor →
            </button>
          </div>

          <div className="portal-card" onClick={() => setModal("pemda")}>
            <span className="portal-icon">🏛️</span>
            <div className="role-tag">VERIFIKATOR</div>
            <h3>Pemerintah Kota</h3>
            <p>
              Dinas terkait Kota Mojokerto — verifikasi laporan dan evaluasi kinerja SPPG di 3
              kecamatan.
            </p>
            <button className="btn btn-blue" style={{ width: "100%" }}>
              Masuk sebagai Pemkot →
            </button>
          </div>

          <div className="portal-card" onClick={() => setModal("bgn")}>
            <span className="portal-icon">🇮🇩</span>
            <div className="role-tag">ADMIN KOTA</div>
            <h3>BGN / SPPG Mojokerto</h3>
            <p>
              BGN koordinator Kota Mojokerto dan pengelola SPPG untuk monitoring data seluruh
              kecamatan.
            </p>
            <button className="btn btn-amber" style={{ width: "100%" }}>
              Masuk sebagai BGN/SPPG →
            </button>
          </div>
        </div>
      </div>

      {/* ── About modal ─────────────────────────────────────────── */}
      <Modal
        open={modal === "info"}
        onClose={() => setModal(null)}
        title="📖 Tentang MBG Watch"
        subtitle="Sistem pengawasan partisipatif 3 kecamatan"
      >
        <div style={{ fontSize: ".85rem", lineHeight: 1.7, color: "var(--ink)" }}>
          <p style={{ marginBottom: ".7rem" }}>
            <strong style={{ color: "var(--g-deep)" }}>🌾 MBG Watch</strong> adalah platform
            pemantauan Program Makan Bergizi Gratis (MBG) berbasis komunitas untuk Kota
            Mojokerto.
          </p>
          <p style={{ marginBottom: ".7rem" }}>
            <strong style={{ color: "var(--g-deep)" }}>🔵 Pemkot:</strong> Login untuk
            verifikasi laporan di Kec. Prajurit Kulon, Magersari, dan Kranggan.
          </p>
          <p style={{ marginBottom: ".7rem" }}>
            <strong style={{ color: "var(--g-deep)" }}>🟡 BGN/SPPG:</strong> Monitor data
            seluruh Kota Mojokerto real-time.
          </p>
          <p style={{ marginBottom: ".7rem" }}>
            <strong style={{ color: "var(--g-deep)" }}>👤 Masyarakat:</strong> Lapor langsung
            tanpa registrasi, anonim 100%.
          </p>
          <div
            style={{
              background: "var(--g-pale)",
              borderRadius: 10,
              padding: ".85rem",
              marginTop: "1rem",
              fontSize: ".78rem",
              color: "var(--muted)",
            }}
          >
            ⛓️ Semua laporan tercatat di blockchain — tidak bisa dihapus atau dimanipulasi.
          </div>
        </div>
      </Modal>

      {/* ── Pemkot login modal ──────────────────────────────────── */}
      <Modal
        open={modal === "pemda"}
        onClose={() => setModal(null)}
        title="🏛️ Login Pemerintah Kota"
        subtitle="Verifikator laporan MBG Kota Mojokerto"
      >
        <div
          style={{
            background: "var(--g-pale)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: ".85rem",
            marginBottom: "1rem",
            fontSize: ".78rem",
            color: "var(--muted)",
          }}
        >
          <strong style={{ color: "var(--g-deep)", display: "block", marginBottom: ".25rem" }}>
            Demo credentials
          </strong>
          Username: <code>pemkot</code> · Password: <code>mojokerto2025</code>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" defaultValue="pemkot" readOnly />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" defaultValue="mojokerto2025" readOnly />
        </div>
        <div className="form-group">
          <label>Wilayah Kerja</label>
          <select value={wilayahPemda} onChange={(e) => setWilayahPemda(e.target.value)}>
            {wilayahList.map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>
        </div>
        <button
          className="btn btn-blue"
          style={{ width: "100%" }}
          onClick={() => {
            login({
              role: "pemda",
              label: "Pemerintah Kota",
              avatar: "🏛️",
              nama: "Pemkot Mojokerto",
              wilayah: wilayahPemda,
            });
            setModal(null);
          }}
        >
          Masuk sebagai Pemkot →
        </button>
      </Modal>

      {/* ── BGN login modal ─────────────────────────────────────── */}
      <Modal
        open={modal === "bgn"}
        onClose={() => setModal(null)}
        title="🇮🇩 Login BGN / SPPG Mojokerto"
        subtitle="Admin BGN koordinator Kota Mojokerto"
      >
        <div
          style={{
            background: "var(--amber-lt)",
            border: "1px solid #fcd34d",
            borderRadius: 10,
            padding: ".85rem",
            marginBottom: "1rem",
            fontSize: ".78rem",
            color: "#92400e",
          }}
        >
          <strong style={{ display: "block", marginBottom: ".25rem" }}>Demo credentials</strong>
          Username: <code>bgn.mojokerto</code> · Password: <code>bgn2025</code>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" defaultValue="bgn.mojokerto" readOnly />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" defaultValue="bgn2025" readOnly />
        </div>
        <div className="form-group">
          <label>Unit SPPG</label>
          <select value={unitBgn} onChange={(e) => setUnitBgn(e.target.value)}>
            <option>SPPG Prajurit Kulon</option>
            <option>SPPG Magersari</option>
            <option>SPPG Kranggan</option>
          </select>
        </div>
        <button
          className="btn btn-amber"
          style={{ width: "100%" }}
          onClick={() => {
            login({
              role: "bgn",
              label: "BGN / SPPG Mojokerto",
              avatar: "🇮🇩",
              nama: "Admin BGN Mojokerto",
              unit: unitBgn,
            });
            setModal(null);
          }}
        >
          Masuk sebagai BGN/SPPG →
        </button>
      </Modal>
    </Fragment>
  );
}
