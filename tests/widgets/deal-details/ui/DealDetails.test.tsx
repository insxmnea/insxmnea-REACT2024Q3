import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { beforeAll, afterEach, afterAll, describe, it, expect } from "vitest";
import { server } from "../../../mocks/server";
import { setupStore } from "src/app/store";
import { DealDetails } from "src/widgets/deal-details";

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

describe("DealDetails component", () => {
  it("renders loading state", () => {
    renderWithProviders(<DealDetails />);
    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });

  it("renders error state", async () => {
    server.use(
      http.get("https://www.cheapshark.com/api/1.0/deals", () => {
        return new HttpResponse(null, {
          status: 500,
        });
      })
    );
    renderWithProviders(<DealDetails />);
    expect(await screen.findByText("No results")).toBeInTheDocument();
  });

  it("renders deal details", async () => {
    server.use(http.get("https://www.cheapshark.com/api/1.0/deals", () => {}));
    renderWithProviders(<DealDetails />);
    expect(await screen.findByText(/game 1/i)).toBeInTheDocument();
    expect(screen.getByText(/very positive/i)).toBeInTheDocument();
    expect(screen.getByText(/85/i)).toBeInTheDocument();
    expect(screen.getByText(/10.99/i)).toBeInTheDocument();
    expect(screen.getByText(/19.99/i)).toBeInTheDocument();
  });
});
