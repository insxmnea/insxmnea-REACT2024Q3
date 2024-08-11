import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { describe, it, expect } from "vitest";
import { setupStore } from "src/app/store";
import { DealsList } from "src/widgets/deals-list";
import { server } from "../../../mocks/server";

const renderWithProviders = (ui: ReactElement) => {
  const store = setupStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe("DealsList component", () => {
  it("renders loading state", () => {
    renderWithProviders(<DealsList />);
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
    renderWithProviders(<DealsList />);
    expect(await screen.findByText("No results")).toBeInTheDocument();
  });
});
