/**
 * Lightweight 16-char "blockchain" hash helpers.
 *
 * NOT cryptographically secure — just enough for the demo so that each
 * laporan gets a deterministic-looking hex string and consecutive blocks
 * reference one another via `prev`.
 */

/** Quick non-crypto hash producing a 16-char lowercase hex string. */
export function fakeHash(seed) {
  let h1 = 0xdeadbeef ^ 0;
  let h2 = 0x41c6ce57 ^ 0;
  const str = String(seed);
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hi = (h2 >>> 0).toString(16).padStart(8, "0");
  const lo = (h1 >>> 0).toString(16).padStart(8, "0");
  return (hi + lo).slice(0, 16);
}

/** Append a new block to the chain that references the previous block. */
export function appendBlock(chain, laporanId, ts) {
  const last = chain[chain.length - 1];
  const block = (last?.block ?? 1000) + 1;
  const prev = last?.hash ?? "0000000000000000";
  const hash = fakeHash(block + "|" + laporanId + "|" + prev + "|" + ts);
  return { block, hash, prev, ts, laporan: laporanId };
}

/** Format ISO-ish timestamp the way the demo data does (YYYY-MM-DD HH:MM:SS). */
export function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
}
