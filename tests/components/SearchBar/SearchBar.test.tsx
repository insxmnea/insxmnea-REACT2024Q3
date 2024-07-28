import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SearchBar from "../../../src/components/SearchBar";

vi.mock("../../hooks/useSearchQuery", () => ({
  default: vi.fn(() => ["test query", vi.fn()]),
}));
vi.mock("../../hooks/useHistory", () => ({
  default: vi.fn(() => [["test1", "test2"], vi.fn()]),
}));

describe("SearchBar component", () => {
  it("renders input and button", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("hides search history on outside click", async () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText("Search");
    fireEvent.focus(input);
    fireEvent.mouseDown(document);
    await waitFor(() => {
      expect(screen.queryByText("test1")).not.toBeInTheDocument();
      expect(screen.queryByText("test2")).not.toBeInTheDocument();
    });
  });

  it("handles Enter and Escape keys", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText("Search");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByText("test1")).not.toBeInTheDocument();
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
