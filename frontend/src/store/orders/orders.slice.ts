import { createSlice } from "@reduxjs/toolkit";
import { IOrdersState } from "./orders.types";

const initialState: IOrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // addProductsAction: (state, { payload }: PayloadAction<IProduct[]>) => {
    // },
  },
});

export const {} = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
