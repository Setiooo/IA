/**
 * Page registry — maps a page id (matching the sidebar menu) to the
 * component that should render in the main content area.
 *
 * Shared components (Reports, MonitorSPPG, Blockchain, Notification)
 * are reused across Pemkot and BGN routes — that matches the original
 * bundle's X registry.
 */
import BuatLaporan from "./masyarakat/BuatLaporan.jsx";
import RiwayatLaporan from "./masyarakat/RiwayatLaporan.jsx";

import PemdaDashboard from "./pemda/Dashboard.jsx";
import Verifikasi from "./pemda/Verifikasi.jsx";
import Reports from "./pemda/Reports.jsx";
import MonitorSPPG from "./pemda/MonitorSPPG.jsx";

import BGNDashboard from "./bgn/Dashboard.jsx";
import PetaKecamatan from "./bgn/PetaKecamatan.jsx";
import Kebijakan from "./bgn/Kebijakan.jsx";

import Blockchain from "../components/Blockchain.jsx";
import Notification from "../components/Notification.jsx";

export const pageRegistry = {
  // Masyarakat
  "m-lapor": BuatLaporan,
  "m-riwayat": RiwayatLaporan,
  "m-blockchain": Blockchain,
  "m-notif": Notification,

  // Pemkot
  "pd-home": PemdaDashboard,
  "pd-verifikasi": Verifikasi,
  "pd-laporan": Reports,
  "pd-sppg": MonitorSPPG,
  "pd-blockchain": Blockchain,
  "pd-notif": Notification,

  // BGN
  "bgn-home": BGNDashboard,
  "bgn-peta": PetaKecamatan,
  "bgn-laporan": Reports,
  "bgn-sppg": MonitorSPPG,
  "bgn-blockchain": Blockchain,
  "bgn-kebijakan": Kebijakan,
};
