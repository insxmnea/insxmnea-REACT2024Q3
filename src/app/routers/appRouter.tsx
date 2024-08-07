import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "src/pages/homepage";
import { NotFound } from "src/pages/not-found";
import { DealDetails } from "src/widgets/deal-details";
import { ErrorBoundaryLayout } from "src/widgets/error-boundary";

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: "/insxmnea-REACT2024Q3/",
        element: <HomePage />,
        children: [{ path: "details", element: <DealDetails /> }],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
