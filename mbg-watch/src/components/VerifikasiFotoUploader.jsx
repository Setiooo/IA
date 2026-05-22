import { useRef } from "react";
import { useApp } from "../context/AppContext.jsx";
import { getFoto, storeFoto, fileToBase64 } from "../utils/image.js";

/**
 * Verification-photo uploader used by Pemkot inside each verifikasi card.
 *
 * • Accepts multiple images from the file picker.
 * • Stores each as a base64 blob keyed via storeFoto().
 * • Appends the new keys to laporan.fotoVerif via AppContext.
 */
export default function VerifikasiFotoUploader({ laporan }) {
  const { addFotoVerif, showToast } = useApp();
  const fileRef = useRef(null);

  const handleFiles = async (files) => {
    showToast("info", "Mengupload foto verifikasi...", "");
    const b64s = await Promise.all(Array.from(files).map(fileToBase64));
    const keys = b64s.map((b64) => storeFoto(b64));
    addFotoVerif(laporan.id, keys);
    showToast("success", `${files.length} foto verifikasi tersimpan`, "");
  };

  return (
    <div className="foto-verif-section">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={async (e) => {
          if (e.target.files?.length) {
            await handleFiles(e.target.files);
            e.target.value = "";
          }
        }}
      />
      <div className="foto-verif-label">
        📸 Foto Bukti Verifikasi Petugas
        <span style={{ fontSize: ".7rem", opacity: 0.7 }}>
          {laporan.fotoVerif.length
            ? `(${laporan.fotoVerif.length} foto)`
            : "(belum ada)"}
        </span>
      </div>
      <div className="foto-verif-grid">
        {laporan.fotoVerif.map((k, i) => (
          <img className="foto-thumb" src={getFoto(k)} alt={`Verif ${i + 1}`} key={k} />
        ))}
        <div className="foto-add-btn" onClick={() => fileRef.current?.click()}>
          <span>＋</span>
          <span>Tambah</span>
        </div>
      </div>
    </div>
  );
}
