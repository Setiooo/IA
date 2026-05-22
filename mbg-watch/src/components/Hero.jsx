/**
 * Hero section of the landing page.
 * Two CTAs: scroll to portal, open "Tentang" info modal.
 */
export default function Hero({ onPortalClick, onInfoClick }) {
  return (
    <div className="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="badge">
          <span className="dot" /> Sistem Aktif · 18 SPPG · 3 Kecamatan
        </div>
        <h1>
          Awasi MBG
          <br />
          Kota <span className="accent">Mojokerto</span>
        </h1>
        <p className="hero-p">
          Platform pengawasan partisipatif Program Makan Bergizi Gratis di Kota Mojokerto —
          langsung lapor tanpa registrasi, transparan, dan tercatat di blockchain.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-green btn-big" onClick={onPortalClick}>
            🔐 Masuk ke Sistem
          </button>
          <button className="btn btn-outline btn-big" onClick={onInfoClick}>
            Pelajari Sistem
          </button>
        </div>
      </div>
    </div>
  );
}
