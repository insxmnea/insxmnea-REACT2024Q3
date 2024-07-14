import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SearchBar from "../../../src/components/SearchBar";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("SearchBar component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Verify that clicking the Search button saves the entered value to the local storage", () => {
    const onSearch = vi.fn();
    const history: string[] = [];

    render(<SearchBar history={history} onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("Search");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "test query" } });
    fireEvent.click(button);

    expect(localStorage.getItem("searchQuery")).toBe('"test query"');
    expect(onSearch).toHaveBeenCalledWith("test query");
  });

  it("Check that the component retrieves the value from the local storage upon mounting", () => {
    localStorage.setItem("searchQuery", '"stored query"');
    const onSearch = vi.fn();
    const history: string[] = ["stored query"];

    render(<SearchBar history={history} onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("Search");
    expect(input).toHaveValue("stored query");
  });
});
