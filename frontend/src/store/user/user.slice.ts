import { createSlice } from "@reduxjs/toolkit";
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
    signInAction: (state) => {
      state.user.isLogged = true;
    },
    signOutAction: (state) => {
      state.user.isLogged = false;
    },
  },
});

export const { signInAction, signOutAction } = userSlice.actions;
export const userReducer = userSlice.reducer;
