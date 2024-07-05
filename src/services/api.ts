import { Deal } from "./models";

const URL = "https://www.cheapshark.com/api/1.0";

const api = {
  getDeals: async (
    title: string = "",
    pageNumber: number = 1,
    pageSize: number = 50
  ): Promise<Deal[]> => {
    return await fetch(
      `${URL}/deals?storeID=1&title=${title}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
      .then((response) => response.json())
      .then((data) => data);
  },
};

export const { getDeals } = api;
