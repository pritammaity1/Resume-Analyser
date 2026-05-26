import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.tsx";
import { AnalysisProvide } from "./context/AnalysisContext.tsx";
import "@/styles/index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AnalysisProvide>
        <App />
      </AnalysisProvide>
    </AuthProvider>
  </StrictMode>,
);
