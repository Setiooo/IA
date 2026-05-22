/**
 * Image helpers — pseudo "foto" storage backed by localStorage and
 * SVG placeholders for the demo "__demo_*" keys.
 */
import { readDB, saveDB } from "./db.js";

const PLACEHOLDER_PALETTE = [
  ["#166534", "#bbf7d0", "🍱"],
  ["#1e40af", "#dbeafe", "📋"],
  ["#7c3aed", "#ede9fe", "🔍"],
  ["#92400e", "#fef3c7", "📷"],
];

/** Deterministic SVG placeholder for "__demo_..." keys. */
export function demoSvg(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = ((h << 5) - h + key.charCodeAt(i)) | 0;
  }
  const [bg, , emoji] = PLACEHOLDER_PALETTE[Math.abs(h) % PLACEHOLDER_PALETTE.length];
  return (
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${bg}" rx="10"/><text x="100" y="110" text-anchor="middle" font-size="70">${emoji}</text></svg>`,
    )
  );
}

/**
 * Store a base64 image inside the DB's fotoBlobs map and return its key.
 */
export function storeFoto(b64) {
  const key = "foto_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
  const db = readDB();
  if (!db.fotoBlobs) db.fotoBlobs = {};
  db.fotoBlobs[key] = b64;
  saveDB(db);
  return key;
}

/**
 * Resolve a foto key to a renderable src. Falls back to a demo SVG when
 * the key starts with "__demo" or when the blob is missing.
 */
export function getFoto(key) {
  if (!key) return "";
  if (typeof key === "string" && key.indexOf("data:") === 0) return key;
  if (typeof key === "string" && key.startsWith("__demo")) return demoSvg(key);
  const db = readDB();
  if (db && db.fotoBlobs && db.fotoBlobs[key]) return db.fotoBlobs[key];
  return demoSvg(key);
}

/** Convert a File/Blob to a base64 data URL. */
export function fileToBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = (e) => res(e.target.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}
