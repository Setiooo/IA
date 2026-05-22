import { Fragment, useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { menuByRole } from "../data/menu.js";

/**
 * Sidebar — fixed left nav for the authenticated app shell.
 *
 * Mobile: hamburger header above main content; sidebar slides in from
 * the left and overlays the content with a dimmed backdrop.
 */
export default function Sidebar() {
  const { user, page, navigate, logout } = useApp();
  const [open, setOpen] = useState(false);
  if (!user) return null;

  const items = menuByRole[user.role] ?? [];

  return (
    <Fragment>
      {/* Mobile header bar */}
      <div
        className="mobile-only-flex"
        style={{
          alignItems: "center",
          gap: ".85rem",
          padding: ".85rem 1rem",
          background: "#fff",
          borderBottom: "1px solid var(--border)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 55,
        }}
      >
        <button
          className="hamburger"
          style={{ display: "flex" }}
          onClick={() => setOpen((o) => !o)}
          aria-label="Buka menu"
        >
          <span />
          <span />
          <span />
        </button>
        <div className="logo" style={{ fontSize: "1rem" }}>
          <div className="logo-box">🌾</div> MBG Watch
        </div>
      </div>

      <div
        className={`sidebar-overlay${open ? " show" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`sidebar${open ? " open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-box" style={{ background: "rgba(255,255,255,.12)" }}>
            🌾
          </div>
          <span>MBG Watch</span>
        </div>

        <div className="nav-section">Menu</div>

        {items.map((item) => (
          <button
            key={item.id}
            className={`nav-item${page === item.id ? " active" : ""}`}
            onClick={() => {
              navigate(item.id);
              setOpen(false);
            }}
          >
            <span className="ni">{item.icon}</span>
            {item.label}
          </button>
        ))}

        <div className="sidebar-user">
          <div className="su-name">
            {user.avatar} {user.nama}
          </div>
          <div className="su-role">
            {user.label}
            {user.wilayah ? " · " + user.wilayah : ""}
          </div>
          <button className="su-logout" onClick={logout}>
            🚪 Keluar
          </button>
        </div>
      </aside>
    </Fragment>
  );
}
