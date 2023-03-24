import axios, { AxiosInstance } from "axios";

export interface IUserSignUp {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface IUserSignIn {
  email: string;
  password: string;
}

export interface IUserSignInReturn {
  jwt: string;
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
    const res: string = await this.api
      .post("/signup", user)
      .then((res) => {
        error = false;
        return res.data;
      })
      .catch((error) => error.response?.data ?? error.message);
    // if (error) throw new Error(res);
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
    return {
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dk8cVwBMdjmCEn_Q6s2qveecaoGEGIOkcQAwXkGBeK4",
    };
    //@ts-ignore
    if (error) throw new Error(res);
    return res;
  }
}
