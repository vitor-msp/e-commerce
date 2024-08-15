import axios, { AxiosInstance } from "axios";
import { errorIsUnauthorized, UnauthorizedError } from "../UnauthorizedError";
import { injectJwt } from "../../../utils/InjectJwt";

export interface IUserSignUp {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface IUserSignIn {
  email: string;
  password: string;
}

export interface IUserRefreshToken {
  refreshJwt: string;
}

export interface IUserLogout {
  refreshJwt: string;
}

export interface IUserSignInReturn {
  jwt: string;
  refreshJwt: string;
}

export interface IUserRefreshTokenReturn {
  jwt: string;
}

export interface IErrorReturn {
  errorMessage: string;
}

export class UserApi {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_USER_API_URL,
    });
  }

  async signUp(user: IUserSignUp): Promise<void> {
    let error = true;
    const res: IErrorReturn = await this.api
      .post("/signup", user)
      .then((res) => {
        error = false;
        return res.data;
      })
      .catch((error) => error.response?.data ?? error.message);
    if (error) throw new Error(res.errorMessage);
  }

  async signUpAdmin(user: IUserSignUp, jwt: string): Promise<void> {
    let error = true;
    const res: IErrorReturn = await this.api
      .post("/admin/signup", user, {
        headers: injectJwt(jwt),
      })
      .then((res) => {
        error = false;
        return res.data;
      })
      .catch((error) => error.response?.data ?? error.message);
    if (error) throw new Error(res.errorMessage);
  }

  async signIn(user: IUserSignIn): Promise<IUserSignInReturn> {
    let error = true;
    const res: IUserSignInReturn = await this.api
      .post("/signin", user)
      .then((res) => {
        error = false;
        return res.data;
      })
      .catch((error) => error.response?.data ?? error.message);
    //@ts-ignore
    if (error) throw new Error(res.errorMessage);
    return res;
  }

  async signOut(user: IUserLogout): Promise<void> {
    let error = true;
    const res = await this.api
      .post("/logout", user)
      .then((res) => {
        error = false;
        return res.data;
      })
      .catch((error) => error.response?.data ?? error.message);
    //@ts-ignore
    if (error) throw new Error(res.errorMessage);
  }

  async refreshToken(
    user: IUserRefreshToken
  ): Promise<IUserRefreshTokenReturn> {
    let error = true;
    const res: IUserRefreshTokenReturn = await this.api
      .post("/refresh-token", user)
      .then((res) => {
        error = false;
        return res.data;
      })
      .catch((error) => {
        if (errorIsUnauthorized(error)) throw new UnauthorizedError();
        return error.response?.data ?? error.message;
      });
    //@ts-ignore
    if (error) throw new Error(res.errorMessage);
    return res;
  }
}
