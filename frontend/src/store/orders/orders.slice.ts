import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder, IOrdersState } from "./orders.types";

const initialState: IOrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrdersAction: (state, { payload }: PayloadAction<IOrder[]>) => {
      state.orders = payload;
    },
  },
});

export const { addOrdersAction } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
