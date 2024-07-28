import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import configureStore, { MockStore } from "redux-mock-store";
import SelectedDealsFlyout from "../../../src/components/SelectedDealsFlyout";
import { Provider } from "react-redux";
import { Deal } from "../../../src/services/models";

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
  let deal: Deal;
  beforeEach(() => {
    store = mockStore({
      selectedDealsReducer: {
        deals: [],
      },
    });

    deal = {
      dealID: "1",
      dealRating: "0.0",
      gameID: "75",
      internalName: "HALFLIFE",
      isOnSale: "0",
      lastChange: 1720720626,
      metacriticLink: "/game/half-life/",
      metacriticScore: "96",
      normalPrice: "0.99",
      releaseDate: 911433600,
      salePrice: "9.99",
      savings: "0.000000",
      steamAppID: "70",
      steamRatingCount: "93378",
      steamRatingPercent: "96",
      steamRatingText: "Overwhelmingly Positive",
      storeID: "1",
      thumb:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/capsule_sm_120.jpg?t=1700269108",
      title: "Half-Life",
    };
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
