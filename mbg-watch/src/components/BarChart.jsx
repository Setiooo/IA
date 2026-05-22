import { useEffect, useRef } from "react";

/**
 * Horizontal bar chart used by the Pemkot dashboard.
 * `items` = array of [label, value]. Bars animate from 0 to value%.
 */
export default function BarChart({ items }) {
  const barsRef = useRef([]);
  useEffect(() => {
    const id = setTimeout(() => {
      barsRef.current.forEach((el, i) => {
        if (el) el.style.width = items[i][1] + "%";
      });
    }, 120);
    return () => clearTimeout(id);
  }, [items]);
  return (
    <div className="bar-chart">
      {items.map(([label, value], i) => (
        <div className="bar-row" key={label}>
          <div className="bar-label">{label}</div>
          <div className="bar-track">
            <div
              className="bar-fill"
              ref={(el) => {
                if (el) barsRef.current[i] = el;
              }}
              style={{ width: 0 }}
            >
              {value}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
