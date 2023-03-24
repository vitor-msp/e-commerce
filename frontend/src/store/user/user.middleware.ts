import { AppThunk } from "..";
import { userApi } from "../../factory";
import { IUserSignIn } from "../../services/api/user/UserApi";
import { signInAction, signOutAction } from "./user.slice";
import { LOCAL_STORAGE_JWT_KEY_NAME } from "./user.types";

export const signIn =
  (user: IUserSignIn): AppThunk =>
  async (dispatch) => {
    try {
      const jwt = await userApi.signIn(user);
      localStorage.setItem(LOCAL_STORAGE_JWT_KEY_NAME, jwt.jwt);
      dispatch(signInAction());
    } catch (error) {
      alert(error);
    }
  };

export const signOut = (): AppThunk => async (dispatch) => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_JWT_KEY_NAME);
    dispatch(signOutAction());
  } catch (error) {
    alert(error);
  }
};
