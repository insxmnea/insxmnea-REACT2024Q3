import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://www.cheapshark.com/api/1.0/deals", ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id === "error") {
      return new HttpResponse(null, {
        status: 500,
      });
    }

    return HttpResponse.json({
      gameInfo: {
        name: "Game 1",
        thumb: "thumb_url",
        steamRatingText: "Very Positive",
        metacriticScore: 85,
        salePrice: "10.99",
        retailPrice: "19.99",
        steamAppID: "12345",
      },
    });
  }),
];
