/**
 * AppContext — central state container for MBG Watch.
 *
 * Holds:
 *   • screen   — "landing" | "app"
 *   • user     — { role, label, avatar, nama, ...extras } | null
 *   • page     — current page id (matches keys in pages/index.jsx)
 *   • db       — the in-memory mirror of localStorage DB
 *   • toasts   — list of active toasts
 *
 * Exposes mutator helpers wrapped in useCallback for stable refs:
 *   login, logout, navigate, refreshDB, showToast,
 *   updateLaporanStatus, addFotoVerif, saveLaporanFields, addLaporan.
 *
 * Also wires up a cross-tab BroadcastChannel + storage listener so that
 * mutations made by one tab/window propagate to the others.
 */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { STORE_KEY, getDefaultDB, readDB, saveDB } from "../utils/db.js";
import { defaultPageByRole } from "../data/menu.js";

const AppContext = createContext(null);

export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [screen, setScreen] = useState("landing");
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("");
  const [db, setDb] = useState(() => {
    try {
      return readDB() || getDefaultDB();
    } catch {
      return getDefaultDB();
    }
  });
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  const showToast = useCallback((type, title, msg = "") => {
    const id = ++toastIdRef.current;
    setToasts((arr) => [...arr, { id, type, title, msg }]);
    setTimeout(() => setToasts((arr) => arr.filter((t) => t.id !== id)), 4500);
  }, []);

  const refreshDB = useCallback(() => {
    setDb({ ...readDB() });
  }, []);

  const login = useCallback(
    (newUser) => {
      setUser(newUser);
      setScreen("app");
      setPage(defaultPageByRole[newUser.role] ?? "");
      showToast("success", "Masuk berhasil!", "Selamat datang, " + newUser.nama);
    },
    [showToast],
  );

  const logout = useCallback(() => {
    setUser(null);
    setScreen("landing");
    setPage("");
    showToast("info", "Keluar", "Sampai jumpa!");
  }, [showToast]);

  const navigate = useCallback((nextPage) => {
    setPage(nextPage);
  }, []);

  const updateLaporanStatus = useCallback((id, status, verifiedBy) => {
    const next = readDB();
    const lap = next.laporan.find((l) => l.id === id);
    if (!lap) return;
    lap.status = status;
    if (verifiedBy) lap.verified_by = verifiedBy;
    saveDB(next);
    setDb({ ...next });
  }, []);

  const addFotoVerif = useCallback((id, keys) => {
    const next = readDB();
    const lap = next.laporan.find((l) => l.id === id);
    if (!lap) return;
    lap.fotoVerif = [...lap.fotoVerif, ...keys];
    saveDB(next);
    setDb({ ...next });
  }, []);

  /**
   * Apply a patch object onto a laporan (e.g. catatanPemkot, justifikasiBGN).
   */
  const saveLaporanFields = useCallback((id, patch) => {
    const next = readDB();
    const lap = next.laporan.find((l) => l.id === id);
    if (!lap) return;
    Object.assign(lap, patch);
    saveDB(next);
    setDb({ ...next });
  }, []);

  /**
   * Add a brand-new laporan and a corresponding block to the blockchain.
   */
  const addLaporan = useCallback((laporan, block) => {
    const next = readDB();
    next.laporan = [laporan, ...next.laporan];
    if (block) next.blockchain = [...next.blockchain, block];
    saveDB(next);
    setDb({ ...next });
  }, []);

  // Cross-tab sync via BroadcastChannel + storage event
  useEffect(() => {
    let bc;
    try {
      bc = new BroadcastChannel("mbgwatch_sync");
      bc.onmessage = (e) => {
        if (e.data === "DB_UPDATE") refreshDB();
      };
    } catch {
      /* BroadcastChannel unsupported */
    }
    const onStorage = (e) => {
      if (e.key === STORE_KEY) refreshDB();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      bc?.close?.();
    };
  }, [refreshDB]);

  const value = {
    screen,
    user,
    page,
    db,
    toasts,
    login,
    logout,
    navigate,
    refreshDB,
    showToast,
    updateLaporanStatus,
    addFotoVerif,
    saveLaporanFields,
    addLaporan,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
