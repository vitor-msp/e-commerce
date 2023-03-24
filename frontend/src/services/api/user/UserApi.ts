import axios, { AxiosInstance } from "axios";

export interface IUserSignUp {
  email: string;
  password: string;
  passwordConfirmation: string;
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
}