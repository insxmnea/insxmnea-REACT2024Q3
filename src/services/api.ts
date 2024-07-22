import { DealInfo, Deals } from "./models";

const URL = "https://www.cheapshark.com/api/1.0";

const api = {
  getDeals: async (title: string = "", page: number = 0): Promise<Deals> => {
    const query = `${URL}/deals?storeID=1&title=${title}&pageNumber=${page}`;
    const response = await fetch(query);

    const totalPageCount = Number(response.headers.get("X-Total-Page-Count"));
    const deals = await response.json();

    return {
      totalPageCount,
      deals,
    };
  },
  getDeal: async (id: string): Promise<DealInfo> => {
    const query = `${URL}/deals?id=${id}`;
    const response = await fetch(query);
    return await response.json();
  },
};

export const { getDeals, getDeal } = api;
