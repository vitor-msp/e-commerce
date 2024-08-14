import { AppThunk } from "..";
import { userApi } from "../../factory";
import { IUserSignIn } from "../../services/api/user/UserApi";
import { signInAction, signOutAction } from "./user.slice";
import {
  LOCAL_STORAGE_JWT_KEY_NAME,
  LOCAL_STORAGE_REFRESH_JWT_KEY_NAME,
} from "./user.types";

export const signIn =
  (user: IUserSignIn): AppThunk =>
  async (dispatch) => {
    try {
      const jwt = await userApi.signIn(user);
      localStorage.setItem(LOCAL_STORAGE_JWT_KEY_NAME, jwt.jwt);
      localStorage.setItem(LOCAL_STORAGE_REFRESH_JWT_KEY_NAME, jwt.refreshJwt);
      dispatch(signInAction());
    } catch (error) {
      alert(error);
    }
  };

export const testSignIn = (): AppThunk => async (dispatch) => {
  try {
    const JwtString = localStorage.getItem(LOCAL_STORAGE_JWT_KEY_NAME);
    if (JwtString) dispatch(signInAction());
  } catch (error) {
    alert(error);
  }
};

export const signOut = (): AppThunk => async (dispatch) => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_JWT_KEY_NAME);
    const refreshJwt = localStorage.getItem(LOCAL_STORAGE_REFRESH_JWT_KEY_NAME);
    if (refreshJwt) {
      localStorage.removeItem(LOCAL_STORAGE_REFRESH_JWT_KEY_NAME);
      try {
        await userApi.signOut({ refreshJwt });
      } catch (error) {}
    }
    dispatch(signOutAction());
  } catch (error) {
    alert(error);
  }
};
