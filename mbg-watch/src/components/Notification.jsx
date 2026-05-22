import { useApp } from "../context/AppContext.jsx";
import { notifications } from "../data/notifications.js";

/**
 * Shared Notifications page — used by all three roles.
 * Shows the pending laporan count in the header subtitle.
 */
export default function Notification() {
  const { db } = useApp();
  const pendingCount = db.laporan.filter((l) => l.status === "pending").length;
  return (
    <div>
      <div className="page-header">
        <h2>🔔 Notifikasi</h2>
        <p>{pendingCount} laporan menunggu tindakan</p>
      </div>
      {notifications.map((n, i) => (
        <div
          key={i}
          className={`notif-item${n.unread ? " unread" : ""}${n.type ? " " + n.type : ""}`}
        >
          <h4>{n.title}</h4>
          <p>
            {n.msg} · <span style={{ color: "var(--muted)" }}>{n.time}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
