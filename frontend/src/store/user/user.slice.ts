import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "./user.types";

const initialState: IUserState = {
  user: {
    isLogged: false,
  },
};

const userSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // addProductsAction: (state, { payload }: PayloadAction<IProduct[]>) => {
    // },
  },
});

export const {} = userSlice.actions;
export const userReducer = userSlice.reducer;
