import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";

export const ErrorBoundaryLayout = () => {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
};
