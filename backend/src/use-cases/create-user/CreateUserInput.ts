import { UserFields } from "../../domain/entities/user/UserFields";
import { ApplicationError } from "../../errors/ApplicationError";

export class CreateUserInput {
  private email: string;
  private password: string;

  constructor(input: any) {
    if (!input["email"]) throw new ApplicationError("missing email");
    if (!input["password"]) throw new ApplicationError("missing password");
    this.email = input["email"];
    this.password = input["password"];
  }

  public setEncryptedPassword(encryptPassword: string): void {
    this.password = encryptPassword;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getFields(): UserFields {
    return UserFields.build(this);
  }
}
