import { Fragment, useCallback, useEffect, useRef, useState } from "react";

/**
 * UploadPhoto / CameraCapture — fullscreen camera modal.
 *
 * Props:
 *   onCapture(b64)  — called when the user accepts a captured shot
 *   onClose()       — called when the user dismisses the modal
 *
 * Behaviour:
 *   • Tries navigator.mediaDevices.getUserMedia, with facingMode that
 *     can toggle between "environment" (rear) and "user" (front).
 *   • States: "starting" | "ready" | "captured" | "error".
 *   • A small white flash animation plays on shutter press.
 *   • The captured image is delivered as a JPEG data URL (q=0.88).
 *   • Tracks are released on close / unmount.
 */
export default function UploadPhoto({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [state, setState] = useState("starting");
  const [errorMsg, setErrorMsg] = useState("");
  const [shot, setShot] = useState(null);
  const [facing, setFacing] = useState("environment");
  const [flash, setFlash] = useState(false);

  const startCamera = useCallback(async (face) => {
    // Stop any previous tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setState("starting");
    setShot(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setState("error");
      setErrorMsg(
        "Browser ini tidak mendukung akses kamera. Coba gunakan Chrome atau Safari terbaru.",
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: face },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setState("ready");
    } catch (err) {
      setState("error");
      if (err.name === "NotAllowedError") {
        setErrorMsg(
          "Izin kamera ditolak. Buka Pengaturan browser dan izinkan akses kamera untuk situs ini.",
        );
      } else if (err.name === "NotFoundError") {
        setErrorMsg("Kamera tidak ditemukan di perangkat ini.");
      } else {
        setErrorMsg(`Kamera tidak bisa dibuka: ${err.message}`);
      }
    }
  }, []);

  useEffect(() => {
    startCamera(facing);
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShutter = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || state !== "ready") return;

    setFlash(true);
    setTimeout(() => setFlash(false), 180);

    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (facing === "user") {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, w, h);
    setShot(canvas.toDataURL("image/jpeg", 0.88));
    setState("captured");
  };

  const closeAndStop = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    onClose?.();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 700,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: ".85rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(to bottom, rgba(0,0,0,.7), transparent)",
          zIndex: 10,
        }}
      >
        <button
          onClick={closeAndStop}
          style={topBtn}
          aria-label="Tutup kamera"
        >
          ✕
        </button>
        <div
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: ".9rem",
            fontFamily: "Syne, sans-serif",
          }}
        >
          📷 Ambil Foto Bukti
        </div>
        <button
          onClick={() => {
            const next = facing === "environment" ? "user" : "environment";
            setFacing(next);
            startCamera(next);
          }}
          style={{ ...topBtn, fontSize: "1.2rem" }}
          aria-label="Balik kamera"
        >
          🔄
        </button>
      </div>

      {flash && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#fff",
            zIndex: 20,
            opacity: 0.8,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Camera viewport */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 540,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {state !== "captured" && (
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: facing === "user" ? "scaleX(-1)" : "none",
              display: state === "ready" ? "block" : "none",
            }}
          />
        )}

        {state === "captured" && shot && (
          <img
            src={shot}
            alt="Captured"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        )}

        {state === "starting" && (
          <div style={{ color: "#fff", textAlign: "center" }}>
            <div
              style={{
                fontSize: "2.5rem",
                marginBottom: ".75rem",
                animation: "spin 1s linear infinite",
                display: "inline-block",
              }}
            >
              ⏳
            </div>
            <p style={{ fontSize: ".88rem", opacity: 0.7 }}>Memulai kamera…</p>
          </div>
        )}

        {state === "error" && (
          <div style={{ color: "#fff", textAlign: "center", padding: "2rem", maxWidth: 340 }}>
            <div style={{ fontSize: "2.5rem", marginBottom: ".75rem" }}>🚫</div>
            <p style={{ fontSize: ".9rem", fontWeight: 700, marginBottom: ".5rem" }}>
              Kamera tidak bisa dibuka
            </p>
            <p
              style={{
                fontSize: ".8rem",
                opacity: 0.7,
                lineHeight: 1.6,
                marginBottom: "1.25rem",
              }}
            >
              {errorMsg}
            </p>
            <button onClick={() => startCamera(facing)} style={retryBtn}>
              Coba Lagi
            </button>
            <button onClick={onClose} style={closeBtn}>
              Tutup
            </button>
          </div>
        )}

        {state === "ready" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px)",
              backgroundSize: "33.33% 33.33%",
            }}
          />
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Bottom controls */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1.5rem 1rem 2rem",
          background: "linear-gradient(to top, rgba(0,0,0,.8), transparent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        {state === "ready" && (
          <Fragment>
            <button
              onClick={handleShutter}
              style={shutterStyle}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.92)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              aria-label="Ambil foto"
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#fff",
                  border: "2px solid #ccc",
                }}
              />
            </button>
          </Fragment>
        )}

        {state === "captured" && (
          <Fragment>
            <button
              onClick={() => {
                setShot(null);
                setState("ready");
              }}
              style={pillBtn("rgba(255,255,255,.15)", "#fff")}
            >
              ↩ Ulangi
            </button>
            <button
              onClick={() => {
                if (shot) {
                  onCapture?.(shot);
                  setShot(null);
                  setState("ready");
                }
              }}
              style={pillBtn("var(--g-bright, #22c55e)", "#fff")}
            >
              ✅ Pakai & Foto Lagi
            </button>
            <button
              onClick={() => {
                if (shot) onCapture?.(shot);
                closeAndStop();
              }}
              style={pillBtn("#fff", "#000")}
            >
              Selesai →
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
}

/* ── Inline styles ──────────────────────────────────────────────── */
const topBtn = {
  background: "rgba(255,255,255,.15)",
  border: "none",
  color: "#fff",
  borderRadius: "50%",
  width: 38,
  height: 38,
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
  fontSize: "1.1rem",
};

const retryBtn = {
  background: "var(--g-bright)",
  color: "#fff",
  border: "none",
  borderRadius: 100,
  padding: ".55rem 1.25rem",
  fontWeight: 700,
  cursor: "pointer",
  marginBottom: ".75rem",
  display: "block",
  width: "100%",
};

const closeBtn = {
  background: "rgba(255,255,255,.12)",
  color: "#fff",
  border: "none",
  borderRadius: 100,
  padding: ".5rem 1.25rem",
  cursor: "pointer",
  width: "100%",
};

const shutterStyle = {
  width: 72,
  height: 72,
  borderRadius: "50%",
  background: "#fff",
  border: "4px solid rgba(255,255,255,.4)",
  cursor: "pointer",
  boxShadow: "0 0 0 3px rgba(255,255,255,.3)",
  transition: "transform .1s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function pillBtn(bg, color) {
  return {
    background: bg,
    border: "none",
    color,
    borderRadius: 100,
    padding: ".65rem 1.4rem",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: ".88rem",
  };
}
