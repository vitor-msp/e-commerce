import { DomainError } from "../../../errors/DomainError";
import { UserFields } from "../../entities/user/UserFields";
import { Role } from "../../value-objects/Role";

export class CreateUserInput {
  private email: string;
  private password: string;
  private role?: Role = undefined;

  constructor(input: any) {
    if (!input["email"]) throw new DomainError("missing email");
    if (!input["password"]) throw new DomainError("missing password");
    this.email = input["email"];
    this.password = input["password"];
  }

  public setEncryptedPassword(encryptPassword: string): void {
    this.password = encryptPassword;
  }

  public setRole(role: Role): void {
    this.role = role;
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
