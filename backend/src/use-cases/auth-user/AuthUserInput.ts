import { ApplicationError } from "../../errors/ApplicationError";

export class AuthUserInput {
  private email: string;
  private password: string;

  public constructor(input: any) {
    if (!input["email"]) throw new ApplicationError("missing email");
    if (!input["password"]) throw new ApplicationError("missing password");
    this.email = input["email"];
    this.password = input["password"];
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }
}
