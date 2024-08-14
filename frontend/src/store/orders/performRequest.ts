import { NavigateFunction } from "react-router-dom";
import { userApi } from "../../factory";
import { UnauthorizedError } from "../../services/api/UnauthorizedError";
import {
  LOCAL_STORAGE_JWT_KEY_NAME,
  LOCAL_STORAGE_REFRESH_JWT_KEY_NAME,
} from "../user/user.types";
import { signOut } from "../user/user.middleware";

export class Command {
  public constructor(private readonly command: Function) {}

  public async execute(): Promise<void> {
    await this.command();
  }
}

export const performRequest = async (
  command: Command,
  navigate: NavigateFunction,
  dispatch: any
) => {
  try {
    await command.execute();
  } catch (error) {
    if (!(error instanceof UnauthorizedError)) return alert(error);

    const refreshJwt = localStorage.getItem(LOCAL_STORAGE_REFRESH_JWT_KEY_NAME);
    if (!refreshJwt) {
      alert("Usuário não autenticado. Gentileza fazer o login novamente!");
      return navigate("/signin");
    }

    try {
      const jwt = await userApi.refreshToken({ refreshJwt });
      localStorage.setItem(LOCAL_STORAGE_JWT_KEY_NAME, jwt.jwt);

      await command.execute();
    } catch (error) {
      if (!(error instanceof UnauthorizedError)) return alert(error);

      dispatch(signOut());
      alert("Session expired. Please, log in again!");
      navigate("/signin");
    }
  }
};
