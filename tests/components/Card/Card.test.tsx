import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import DealCard from "../../../src/components/Card";
import { Deal } from "../../../src/services/models";

const deal: Deal = {
  dealID: "G%2BXAA0GGjaN4wXzRSpEpKtspbGp%2Bz3TJoNnhJI72Bug%3D",
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
};

describe("Tests for the Card component", () => {
  it("Ensure that the card component renders the relevant card data", () => {
    render(<DealCard deal={deal} />);

    screen.debug();
  });
});
