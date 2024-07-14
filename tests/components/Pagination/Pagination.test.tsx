import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Pagination from "../../../src/components/Pagination";

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
  it("updates URL query parameter when page changes", () => {
    const onPageChange = vi.fn();
    const totalPageCount = 5;
    const currentPage = 1;

    renderWithRouter(
      <Pagination
        totalPageCount={totalPageCount}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByTestId("next"));

    expect(onPageChange).toHaveBeenCalledWith(currentPage + 1);
  });
});
