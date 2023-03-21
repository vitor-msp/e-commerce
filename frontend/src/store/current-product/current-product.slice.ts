import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../products/products.types";
import { ICurrentProduct, ICurrentProductState } from "./current-product.types";

const EMPTY_PRODUCT: ICurrentProduct = {
  id: "string",
  name: "string",
  description: "string",
  images: [],
  price: 0,
  discountValue: 0,
  category: "",
  material: "",
};

const initialState: ICurrentProductState = {
  data: EMPTY_PRODUCT,
  showProduct: false,
};

const currentProductSlice = createSlice({
  name: "current-product",
  initialState,
  reducers: {
    updateCurrentProductAction: (
      state,
      { payload }: PayloadAction<IProduct>
    ) => {
      state.data = { ...payload };
      state.showProduct = true;
    },
    cleanCurrentProductAction: (state) => {
      state.data = EMPTY_PRODUCT;
      state.showProduct = false;
    },
  },
});

export const { updateCurrentProductAction, cleanCurrentProductAction } =
  currentProductSlice.actions;
export const currentProductReducer = currentProductSlice.reducer;
