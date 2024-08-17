import { UserFields } from "../../domain/entities/user/UserFields";
import { Role } from "../../domain/value-objects/Role";
import { ApplicationError } from "../../errors/ApplicationError";

export class AuthUserSSOInput {
  private email: string;
  private githubId: number;
  private role?: Role;

  public constructor(input: any) {
    if (!input["email"]) throw new ApplicationError("missing email");
    if (!input["githubId"]) throw new ApplicationError("missing githubId");
    this.email = input["email"];
    this.githubId = input["githubId"];
  }

  public getEmail(): string {
    return this.email;
  }

  public setRole(role: Role): void {
    this.role = role;
  }

  public getFields(): UserFields {
    return UserFields.build(this);
  }
}
