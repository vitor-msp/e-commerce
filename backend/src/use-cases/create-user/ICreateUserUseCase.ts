import { IUsersRepository } from "../../domain/contract/repositories/IUsersRepository";
import { UserFields } from "../../domain/entities/user/UserFields";
import { CreateUserError } from "../../errors/CreateUserError";

export class CreateUserInput {
  private email: string;
  private password: string;

  constructor(input: any) {
    if (!input.email) throw new CreateUserError("missing email");
    this.email = input["email"];
    if (!input.password) throw new CreateUserError("missing password");
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

export interface ICreateUserUseCase {
  execute(input: CreateUserInput): Promise<void>;
}
