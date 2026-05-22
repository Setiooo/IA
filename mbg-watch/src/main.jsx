import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/dashboard.css";
import "./styles/form.css";
import "./styles/modal.css";
import "./styles/responsive.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
