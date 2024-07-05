import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import Main from "./pages/Main/index.tsx";
import ErrorBoundary from "./components/ErrorBoundary/index.tsx";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  </React.StrictMode>
);
