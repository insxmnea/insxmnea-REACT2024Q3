import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { Deal, DealInfo, Deals } from "../types/models";

export const dealsAPI = createApi({
  reducerPath: "dealsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.cheapshark.com/api/1.0" }),
  endpoints: (build) => ({
    getDeals: build.query<Deals, { title: string; pageNumber: number }>({
      query: ({ title = "", pageNumber = 0 }) =>
        `/deals?storeID=1&title=${title}&pageNumber=${pageNumber}`,
      transformResponse: (response: Deal[], meta: FetchBaseQueryMeta) => {
        let totalPageCount = 0;

        if (meta.response) {
          totalPageCount = Number(
            meta.response.headers.get("X-Total-Page-Count")
          );
        }
        return {
          deals: response,
          totalPageCount,
        };
      },
    }),

    getDeal: build.query<DealInfo, string>({
      query: (id) => `/deals?storeId=1&id=${id}`,
    }),
  }),
});
