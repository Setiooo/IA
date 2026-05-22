/**
 * Reusable Modal shell — overlay + centered white card.
 *
 * Usage:
 *   <Modal open={open} onClose={() => setOpen(false)} title="..." subtitle="...">
 *     {body}
 *   </Modal>
 */
export default function Modal({ open, onClose, title, subtitle, maxWidth = 440, children }) {
  if (!open) return null;
  return (
    <div
      className="modal-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="modal" style={{ maxWidth }}>
        <button className="modal-close" onClick={onClose} aria-label="Tutup">
          ✕
        </button>
        {title && <h2>{title}</h2>}
        {subtitle && <p className="modal-sub">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
