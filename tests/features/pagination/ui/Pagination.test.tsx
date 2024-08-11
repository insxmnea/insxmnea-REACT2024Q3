import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Pagination } from "src/features/pagination/ui/Pagination";
import { describe, it, expect, vi } from "vitest";

const renderWithRouter = (ui: React.ReactElement, route = "/") => {
  const history = createMemoryRouter(
    [
      {
        path: "/",
        element: ui,
      },
    ],
    { initialEntries: [route] }
  );

  return render(<RouterProvider router={history} />);
};

describe("Pagination component", () => {
  it("renders pagination items", () => {
    const totalPageCount = 5;

    renderWithRouter(<Pagination totalPageCount={totalPageCount} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(totalPageCount + 2);
  });
});
