import { createSlice } from "@reduxjs/toolkit";
import { Deal } from "../../services/models";

type State = {
  deals: Deal[];
  isLoading: boolean;
  error: string;
};

const initialState: State = {
  deals: [],
  isLoading: false,
  error: "",
};

export const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    getDeals(state) {
      state.isLoading = true;
    },
    getDealsSuccess(state, action: { payload: Deal[] }) {
      state.deals = action.payload;
      state.isLoading = false;
    },
    getDealsError(state, action: { payload: string }) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default dealsSlice.reducer;
