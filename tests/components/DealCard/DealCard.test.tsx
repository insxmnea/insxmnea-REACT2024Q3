import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Deal } from "../../../src/services/models";
import DealCard from "../../../src/components/DealCard";
import { BrowserRouter } from "react-router-dom";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual: typeof importOriginal = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const deal: Deal = {
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

describe("Tests for the DealCard component", () => {
  it("Ensure that the card component renders the relevant card data", () => {
    render(
      <BrowserRouter>
        <DealCard deal={deal} />
      </BrowserRouter>
    );

    expect(screen.getByText(deal.title)).toBeInTheDocument();
    expect(screen.getByText(`${deal.salePrice}$`)).toBeInTheDocument();
    expect(screen.getByText(`${deal.normalPrice}$`)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", deal.thumb);
  });

  it("Validate that clicking on a card opens a detailed card component", async () => {
    render(
      <BrowserRouter>
        <DealCard deal={deal} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("img"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        {
          pathname: "/insxmnea-REACT2024Q3/details",
          search: "id=1",
        },
        { replace: true }
      );
    });
  });
});
