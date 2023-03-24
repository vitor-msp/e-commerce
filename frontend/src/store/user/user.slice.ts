import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./user.types";

const initialState: IUserState = {
  user: {
    isLogged: false,
    wantsBuy: false,
  },
};

const userSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    signInAction: (state) => {
      state.user.isLogged = true;
    },
    signOutAction: (state) => {
      state.user.isLogged = false;
    },
    userWantsBuyAction: (state) => {
      state.user.wantsBuy = true;
    },
    userBoughtAction: (state) => {
      state.user.wantsBuy = false;
    },
  },
});

export const { signInAction, signOutAction, userWantsBuyAction, userBoughtAction } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
