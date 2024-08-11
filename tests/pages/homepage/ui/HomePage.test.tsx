import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { HomePage } from "src/pages/homepage";
import { describe, expect, it, vi } from "vitest";

vi.mock("src/widgets/search-bar", () => ({
  SearchBar: () => <div>SearchBar Component</div>,
}));

vi.mock("src/widgets/deals-list", () => ({
  DealsList: () => <div>DealsList Component</div>,
}));

vi.mock("src/features/theme", () => ({
  ThemeButton: () => <div>ThemeButton Component</div>,
}));

describe("HomePage component", () => {
  it("renders correctly", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText("SearchBar Component")).toBeInTheDocument();
    expect(screen.getByText("ThemeButton Component")).toBeInTheDocument();
    expect(screen.getByText("DealsList Component")).toBeInTheDocument();
  });
});
