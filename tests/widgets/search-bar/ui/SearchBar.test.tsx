import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { SearchBar } from "src/widgets/search-bar";
import { setupStore } from "src/app/store";
import { Provider } from "react-redux";
import { server } from "../../../mocks/server";

vi.mock("src/features/search", () => ({
  useSearchQuery: vi.fn(() => ["test query", vi.fn()]),
  useHistory: vi.fn(() => [["test1", "test2"], vi.fn()]),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  const store = setupStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("SearchBar component", () => {
  it("renders input and button", () => {
    renderWithProviders(<SearchBar />);

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("hides search history on outside click", async () => {
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText("Search");
    fireEvent.focus(input);
    fireEvent.mouseDown(document);
    await waitFor(() => {
      expect(screen.queryByText("test1")).not.toBeInTheDocument();
      expect(screen.queryByText("test2")).not.toBeInTheDocument();
    });
  });

  it("handles Enter and Escape keys", () => {
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText("Search");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByText("test1")).not.toBeInTheDocument();
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
