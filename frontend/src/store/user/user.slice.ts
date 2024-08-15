import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "./user.types";
import { GetRoleFromJwt } from "../../utils/GetRoleFromJwt";

const initialState: IUserState = {
  user: {
    isLogged: false,
    role: undefined,
    wantsBuy: false,
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    signInAction: (state, { payload }: PayloadAction<string>) => {
      state.user.isLogged = true;
      state.user.role = GetRoleFromJwt(payload);
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

export const {
  signInAction,
  signOutAction,
  userWantsBuyAction,
  userBoughtAction,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
