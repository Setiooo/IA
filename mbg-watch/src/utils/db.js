/**
 * LocalStorage-backed "database" for the MBG Watch demo.
 *
 * The original Parcel bundle exposed three primitives:
 *   readDB()         → DB | null
 *   saveDB(db)       → void
 *   getDefaultDB()   → DB   (seeded from /data/laporan.js)
 *
 * Plus a tiny anti-bot identity helper (deviceId/cooldown/etc.) stored
 * under a separate localStorage key.
 */
import { initialLaporan, initialBlockchain } from "../data/laporan.js";

export const STORE_KEY = "mbgwatch_mojokerto_v1";
export const AB_KEY = "mbg_ab_mjk_v1";

/** Read the DB. Returns null when storage is empty or unreadable. */
export function readDB() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return getDefaultDB();
}

/** Persist the entire DB. */
export function saveDB(db) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(db));
  } catch {
    /* ignore */
  }
}

/** Seed a fresh DB with demo laporan + blockchain. Also writes it back. */
export function getDefaultDB() {
  const db = {
    laporan: initialLaporan,
    blockchain: initialBlockchain,
  };
  saveDB(db);
  return db;
}

/* ── Anti-bot device fingerprint (lightweight, demo-only) ───────── */
function deviceFingerprint() {
  const nav = window.navigator;
  const seed =
    nav.userAgent +
    nav.language +
    (nav.hardwareConcurrency || "") +
    screen.width +
    "x" +
    screen.height +
    new Date().getTimezoneOffset();
  let h = 5381;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) + h + seed.charCodeAt(i);
    h &= h;
  }
  return "DEV" + Math.abs(h).toString(16).toUpperCase();
}

export function getAntiBotState() {
  try {
    const raw = localStorage.getItem(AB_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return {
    deviceId: deviceFingerprint(),
    firstSeen: Date.now(),
    laporanCount: 0,
    cooldownUntil: 0,
    suspectScore: 0,
    banned: false,
    history: [],
  };
}

export function saveAntiBotState(state) {
  try {
    localStorage.setItem(AB_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}
