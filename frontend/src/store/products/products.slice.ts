import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCategoriesFromProducts,
  getMaterialsFromProducts,
} from "../../utils/products-utils";
import { IProduct, IProductsState } from "./products.types";

const initialState: IProductsState = {
  products: [],
  filters: { categories: [], materials: [] },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsAction: (state, { payload }: PayloadAction<IProduct[]>) => {
      state.products = payload;
      state.filters.categories = getCategoriesFromProducts(payload);
      state.filters.materials = getMaterialsFromProducts(payload);
    },
    addProductToCartAction: (state, { payload }: PayloadAction<IProduct>) => {
      const index = state.products.findIndex(
        (product) => product.id === payload.id
      );
      //@ts-ignore
      state.products.at(index).cart = true;
    },
  },
});

export const { getProductsAction, addProductToCartAction } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
