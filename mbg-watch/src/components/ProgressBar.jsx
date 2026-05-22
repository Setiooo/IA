import { useEffect, useRef } from "react";

/**
 * Animated bar that grows from 0% to (val/max)% on mount/value change.
 * Used inside chart rows and the BGN dashboard kecamatan summary.
 */
export default function ProgressBar({ val, max = 100, color = "var(--g-bright)" }) {
  const ref = useRef(null);
  useEffect(() => {
    const id = setTimeout(() => {
      if (ref.current) ref.current.style.width = (val / max) * 100 + "%";
    }, 120);
    return () => clearTimeout(id);
  }, [val, max]);
  return (
    <div className="bar-track">
      <div
        className="bar-fill"
        ref={ref}
        style={{ width: 0, background: `linear-gradient(90deg, ${color}, ${color}dd)` }}
      >
        {val}
      </div>
    </div>
  );
}
