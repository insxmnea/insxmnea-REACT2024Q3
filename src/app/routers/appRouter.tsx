import { ControlledFormPage } from "@/pages/controlled-form-page";
import { HomePage } from "@/pages/homepage";
import { NotFound } from "@/pages/not-found";
import { UncontrolledFormPage } from "@/pages/uncontrolled-form-page/ui/UncontrolledFormPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/form-uncontrolled",
    element: <UncontrolledFormPage />,
  },
  {
    path: "/form-controlled",
    element: <ControlledFormPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
