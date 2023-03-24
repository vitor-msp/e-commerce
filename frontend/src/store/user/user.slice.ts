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
  },
});

export const { signInAction } = userSlice.actions;
export const userReducer = userSlice.reducer;
