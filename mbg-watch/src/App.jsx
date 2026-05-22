import { AppProvider, useApp } from "./context/AppContext.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Toast from "./components/Toast.jsx";
import Landing from "./pages/Landing.jsx";
import { pageRegistry } from "./pages/index.jsx";

/**
 * AppRoot — chooses between Landing and the authenticated app shell
 * (Sidebar + current page) based on context state.
 */
function AppRoot() {
  const { screen, page } = useApp();
  if (screen === "landing") return <Landing />;
  const PageComp = pageRegistry[page];
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content" style={{ paddingTop: "1.75rem" }}>
        {PageComp ? (
          <PageComp />
        ) : (
          <div style={{ padding: "2rem", color: "var(--muted)" }}>
            Halaman tidak ditemukan.
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoot />
      <Toast />
    </AppProvider>
  );
}
