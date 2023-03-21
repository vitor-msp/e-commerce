import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProductsState } from "./products.types";

const initialState: IProductsState = {
  data: { products: [] },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsAction: (state, { payload }: PayloadAction<IProduct[]>) => {
      state.data.products = payload;
    },
  },
});

export const { getProductsAction } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
