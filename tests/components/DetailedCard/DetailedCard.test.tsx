import { beforeEach, describe, expect, it, vi } from "vitest";
import { CardInfo } from "../../../src/services/models";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import DetailedCard from "../../../src/components/DetailedCard";

const cardInfo: CardInfo = {
  cheapestPrice: {
    date: 911433600,
    price: "10",
  },
  gameInfo: {
    gameID: "75",
    metacriticLink: "/game/half-life/",
    metacriticScore: "96",
    name: "Half-Life",
    publisher: "Valve",
    releaseDate: 911433600,
    retailPrice: "9.99",
    salePrice: "0.99",
    steamAppID: "70",
    steamRatingCount: "93378",
    steamRatingPercent: "96",
    steamRatingText: "Overwhelmingly Positive",
    steamworks: "1",
    storeID: "1",
    thumb:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/capsule_sm_120.jpg?t=1700269108",
  },
};

describe("Tests for the DetailedCard component", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  it("Check that a loading indicator is displayed while fetching data", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(cardInfo),
      } as Response);
    });

    render(<DetailedCard id="1" hideDetailedCard={vi.fn()} />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument()
    );
  });

  it("Make sure the detailed card component correctly displays the detailed card data", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(cardInfo),
      } as Response);
    });

    render(<DetailedCard id="1" hideDetailedCard={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(cardInfo.gameInfo.name)).toBeInTheDocument();
      expect(
        screen.getByText(`Reviews: ${cardInfo.gameInfo.steamRatingText}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Metacritic: ${cardInfo.gameInfo.metacriticScore}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`${cardInfo.gameInfo.salePrice}$`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`${cardInfo.gameInfo.retailPrice}$`)
      ).toBeInTheDocument();
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        cardInfo.gameInfo.thumb
      );
    });
  });

  it("Ensure that clicking the close button hides the component", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(cardInfo),
      } as Response);
    });
    const hideDetailedCard = vi.fn();

    render(<DetailedCard id="1" hideDetailedCard={hideDetailedCard} />);

    await waitFor(() => {
      expect(screen.getByText(cardInfo.gameInfo.name)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(hideDetailedCard).toHaveBeenCalled();
  });
});
