import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import configureStore, { MockStore } from "redux-mock-store";
import SelectedDealsFlyout from "../../../src/components/SelectedDealsFlyout";
import { Provider } from "react-redux";

vi.mock("../../hooks/redux", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));
vi.mock("../../utils/downloadCSV", () => ({
  default: vi.fn(),
}));

const mockStore = configureStore([]);

describe("SelectedDealsFlyout component", () => {
  let store: MockStore;
  beforeEach(() => {
    store = mockStore({
      selectedDealsReducer: {
        deals: [],
      },
    });
  });

  it("renders correctly with selected deals", () => {
    render(
      <Provider store={store}>
        <SelectedDealsFlyout />
      </Provider>
    );
    expect(screen.getByText("Unselect all")).toBeInTheDocument();
    expect(screen.getByText("0 items are selected")).toBeInTheDocument();
    expect(screen.getByText("Download")).toBeInTheDocument();
  });
});
