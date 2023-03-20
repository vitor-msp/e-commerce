import { createSlice } from "@reduxjs/toolkit";
import { IProductsState } from "./products.types";

const initialState: IProductsState = {
  data: { products: [] },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const {} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
