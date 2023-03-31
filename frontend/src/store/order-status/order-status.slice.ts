import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderStatus, IOrderStatusState } from "./order-status.types";

const initialState: IOrderStatusState = {
  orderStatus: {
    bought: false,
    message: "",
  },
};

const orderStatusSlice = createSlice({
  name: "order-status",
  initialState,
  reducers: {
    boughtAlert: (state, { payload }: PayloadAction<IOrderStatus>) => {
      state.orderStatus = payload;
    },
    cleanBought: (state) => {
      state.orderStatus.bought = false;
    },
  },
});

export const { boughtAlert, cleanBought } = orderStatusSlice.actions;
export const orderStatusReducer = orderStatusSlice.reducer;
