import { UserFields } from "../../domain/entities/user/UserFields";
import { Role } from "../../domain/value-objects/Role";
import { ApplicationError } from "../../errors/ApplicationError";

export type ssoOptions = "github";

export class AuthUserSSOInput {
  private email: string;
  private ssoIdField: ssoOptions;
  private githubId: number;
  private role?: Role;

  public constructor(input: any) {
    if (!input["email"]) throw new ApplicationError("missing email");
    if (!input["ssoIdField"])
      throw new ApplicationError("missing sso id field");
    if (!input["ssoIdValue"])
      throw new ApplicationError("missing sso id value");

    this.email = input["email"];
    this.ssoIdField = input["ssoIdField"];

    switch (this.ssoIdField) {
      case "github":
        this.githubId = input["ssoIdValue"];
        break;

      default:
        throw new ApplicationError("invalid sso option");
    }
  }

  public getEmail(): string {
    return this.email;
  }

  public getSsoIdField(): ssoOptions {
    return this.ssoIdField;
  }

  public getGithubId(): number {
    return this.githubId;
  }

  public setRole(role: Role): void {
    this.role = role;
  }

  public getFields(): UserFields {
    return UserFields.build(this);
  }
}
