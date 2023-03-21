import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentProduct, ICurrentProductState } from "./current-product.types";

const initialState: ICurrentProductState = {
  data: {
    id: "string",
    name: "string",
    description: "string",
    images: [],
    price: 0,
    discountValue: 0,
    category: "",
    material: "",
  },
};

const currentProductSlice = createSlice({
  name: "current-product",
  initialState,
  reducers: {
    updateCurrentProductAction: (
      state,
      { payload }: PayloadAction<ICurrentProduct>
    ) => {
      state.data = { ...payload };
    },
  },
});

export const { updateCurrentProductAction } = currentProductSlice.actions;
export const productsReducer = currentProductSlice.reducer;
