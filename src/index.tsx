import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import Main from "./pages/Main/index.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound/index.tsx";
import ErrorBoundaryLayout from "./components/ErrorBoundaryLayout/index.tsx";

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: "/insxmnea-REACT2024Q3/",
        element: <Main />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
