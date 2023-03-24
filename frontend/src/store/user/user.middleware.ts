import { AppThunk } from "..";
import { userApi } from "../../factory";
import { IUserSignIn } from "../../services/api/user/UserApi";
import { signInAction } from "./user.slice";
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
