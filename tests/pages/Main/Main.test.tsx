import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Main from "../../../src/pages/Main";

vi.mock("../../../src/components/SearchBar", () => ({
  default: () => <div>SearchBar Component</div>,
}));

vi.mock("../../../src/components/DealsList", () => ({
  default: () => <div>DealsList Component</div>,
}));

vi.mock("../../../src/components/ThemeButton", () => ({
  default: () => <div>ThemeButton Component</div>,
}));

describe("Main component", () => {
  it("renders correctly", () => {
    render(
      <Router>
        <Main />
      </Router>
    );

    expect(screen.getByText("SearchBar Component")).toBeInTheDocument();
    expect(screen.getByText("ThemeButton Component")).toBeInTheDocument();
    expect(screen.getByText("DealsList Component")).toBeInTheDocument();
  });
});
