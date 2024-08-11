import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { Deal } from "../../../../src/entities/deal/types/models";
import { MemoryRouter } from "react-router-dom";
import configureStore, { MockStore } from "redux-mock-store";
import { Provider } from "react-redux";
import { addDeal } from "../../../../src/entities/selected-deals/model/SelectedDealsSlice";
import { DealCard } from "src/widgets/deal-card";

const mockStore = configureStore([]);

describe("DealCard component", () => {
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

  it("renders deal information correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DealCard {...deal} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(deal.title)).toBeInTheDocument();
    expect(screen.getByText(`$${deal.salePrice}`)).toBeInTheDocument();
    expect(screen.getByText(`$${deal.normalPrice}`)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", deal.thumb);
  });

  it("handles checkbox changes", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DealCard {...deal} />
        </MemoryRouter>
      </Provider>
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(store.getActions()).toEqual([addDeal(deal)]);
  });
});
