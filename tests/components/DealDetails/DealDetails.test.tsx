import { beforeEach, describe, expect, it, vi } from "vitest";
import { DealInfo } from "../../../src/services/models";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import DealDetails from "../../../src/components/DealDetails";
import { BrowserRouter } from "react-router-dom";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual: typeof importOriginal = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const dealInfo: DealInfo = {
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

describe("Tests for the DealDetails component", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  it("Check that a loading indicator is displayed while fetching data", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(dealInfo),
      } as Response);
    });

    render(
      <BrowserRouter>
        <DealDetails />
      </BrowserRouter>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument()
    );
  });

  it("Make sure the detailed card component correctly displays the detailed card data", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(dealInfo),
      } as Response);
    });

    render(
      <BrowserRouter>
        <DealDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(dealInfo.gameInfo.name)).toBeInTheDocument();
      expect(
        screen.getByText(`Reviews: ${dealInfo.gameInfo.steamRatingText}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Metacritic: ${dealInfo.gameInfo.metacriticScore}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`${dealInfo.gameInfo.salePrice}$`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`${dealInfo.gameInfo.retailPrice}$`)
      ).toBeInTheDocument();
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        dealInfo.gameInfo.thumb
      );
    });
  });

  it("Ensure that clicking the close button hides the component", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(dealInfo),
      } as Response);
    });

    render(
      <BrowserRouter>
        <DealDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(dealInfo.gameInfo.name)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        {
          pathname: "/insxmnea-REACT2024Q3/",
          search: "",
        },
        { replace: true }
      );
    });
  });
});
