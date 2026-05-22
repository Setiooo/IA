/**
 * Top navbar shown on the landing page. The landing has no router,
 * so the buttons just emit click callbacks for the parent to handle.
 */
export default function Navbar({ onInfoClick, onLoginClick }) {
  return (
    <nav className="land-nav">
      <div className="logo">
        <div className="logo-box">🌾</div> MBG Watch
        <span
          style={{
            fontSize: ".62rem",
            background: "var(--g-pale)",
            color: "var(--g-mid)",
            padding: ".18rem .55rem",
            borderRadius: 100,
            marginLeft: ".35rem",
            fontWeight: 700,
          }}
        >
          KOTA MOJOKERTO
        </span>
      </div>
      <div className="nav-btns">
        <button className="btn btn-outline btn-sm" onClick={onInfoClick}>
          📖 Tentang
        </button>
        <button className="btn btn-green btn-sm" onClick={onLoginClick}>
          Masuk →
        </button>
      </div>
    </nav>
  );
}
