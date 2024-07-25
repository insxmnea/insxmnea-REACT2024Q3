import { combineReducers, configureStore } from "@reduxjs/toolkit";
import selectedDealsReducer from "./reducers/SelectedDealsSlice";
import { dealsAPI } from "../services/DealService";

const rootReducer = combineReducers({
  selectedDealsReducer,
  [dealsAPI.reducerPath]: dealsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(dealsAPI.middleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
