import { describe, expect, it } from "vitest";
import { Deal } from "../../../src/services/models";
import { render, screen } from "@testing-library/react";
import DealsList from "../../../src/components/DealsList";
import { BrowserRouter } from "react-router-dom";

describe("Tests for the DealsList component", () => {
  it("Verify that the component renders the specified number of cards", () => {
    const deals: Deal[] = [
      {
        dealID: "1",
        dealRating: "0.0",
        gameID: "75",
        internalName: "HALFLIFE",
        isOnSale: "0",
        lastChange: 1720720626,
        metacriticLink: "/game/half-life/",
        metacriticScore: "96",
        normalPrice: "9.99",
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
      },
      {
        dealID: "2",
        dealRating: "0.0",
        gameID: "75",
        internalName: "HALFLIFE",
        isOnSale: "0",
        lastChange: 1720720626,
        metacriticLink: "/game/half-life/",
        metacriticScore: "96",
        normalPrice: "9.99",
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
        title: "Half-Life 2",
      },
    ];

    render(
      <BrowserRouter>
        <DealsList />
      </BrowserRouter>
    );

    const cards = screen.getAllByRole("img");
    expect(cards).toHaveLength(2);
  });

  it("Check that an appropriate message is displayed if no cards are present", () => {
    const deals: Deal[] = [];

    render(
      <BrowserRouter>
        <DealsList />
      </BrowserRouter>
    );

    const noResultsMessage = screen.getByText(/No results/i);
    expect(noResultsMessage).toBeInTheDocument();
  });
});
