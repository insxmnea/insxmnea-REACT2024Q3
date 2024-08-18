import { combineReducers, configureStore } from "@reduxjs/toolkit";
import FormInputReducer from "@/entities/form-input/models/FormInputSlice";

const rootReducer = combineReducers({
  FormInputReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware();
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
