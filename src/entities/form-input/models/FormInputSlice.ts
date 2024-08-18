import { createSlice } from "@reduxjs/toolkit";
import { FormInput } from "../types/FormInput";
import { COUNTRIES } from "../config/countries";

type State = {
  formInput: FormInput;
  countries: string[];
};

const initialState: State = {
  formInput: {
    name: "",
    age: 0,
    email: "",
    password: "",
    gender: "",
    terms: false,
    picture: "",
    country: "",
  },
  countries: COUNTRIES,
};

const FormInputSlice = createSlice({
  name: "formInput",
  initialState,
  reducers: {
    addFormInput: (state, action: { payload: FormInput }) => {
      state.formInput = { ...action.payload };
    },
    clearForm: (state) => {
      state.formInput = { ...initialState.formInput };
    },
  },
});

export const { addFormInput, clearForm } = FormInputSlice.actions;
export default FormInputSlice.reducer;
