import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import Main from "./pages/Main/index.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound/index.tsx";
import ErrorBoundaryLayout from "./components/ErrorBoundaryLayout/index.tsx";
import DealDetails from "./components/DealDetails/index.tsx";
import { setupStore } from "./store/store.ts";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: "/insxmnea-REACT2024Q3/",
        element: <Main />,
        children: [{ path: "details", element: <DealDetails /> }],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const store = setupStore();

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
