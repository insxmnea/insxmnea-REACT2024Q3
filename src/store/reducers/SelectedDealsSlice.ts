import { createSlice } from "@reduxjs/toolkit";
import { Deal } from "../../services/models";

type State = {
  deals: Deal[];
};

const initialState: State = {
  deals: [],
};

const selectedDealsSlice = createSlice({
  name: "selectedDeals",
  initialState,
  reducers: {
    addDeal: (state, action: { payload: Deal }) => {
      state.deals.push(action.payload);
    },
    removeDeal: (state, action: { payload: string }) => {
      state.deals = state.deals.filter(
        (deal) => deal.dealID !== action.payload
      );
    },
    clearDeals: (state) => {
      state.deals = [];
    },
  },
});

export const { addDeal, removeDeal, clearDeals } = selectedDealsSlice.actions;
export default selectedDealsSlice.reducer;
