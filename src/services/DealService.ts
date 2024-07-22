import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dealsAPI = createApi({
  reducerPath: "dealsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.cheapshark.com/api/1.0" }),
  endpoints: (build) => ({
    getDeals: build.query({
      query: () => ({ url: "/deals" }),
    }),
  }),
});
