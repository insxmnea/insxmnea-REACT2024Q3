import { Deal } from "./models";

const URL = "https://www.cheapshark.com/api/1.0";

const api = {
  getDeals: async (title: string = ""): Promise<Deal[]> => {
    const query = `${URL}/deals?storeID=1&title=${title}`;
    return await fetch(query)
      .then((response) => response.json())
      .then((data) => data);
  },
};

export const { getDeals } = api;
