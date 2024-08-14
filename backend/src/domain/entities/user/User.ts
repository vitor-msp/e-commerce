import { Role } from "../../value-objects/Role";
import { UserFields } from "./UserFields";

export class User {
  private readonly fields: UserFields;

  constructor(fields: UserFields) {
    this.fields = fields;
  }

  public getFields(): UserFields {
    return this.fields;
  }

  public getId(): string {
    return this.fields.getData().id;
  }

  public getRole(): Role {
    return this.fields.getData().role;
  }

  public getPassword(): string | undefined {
    return this.fields.getData().password;
  }

  public getRefreshJwt(): string | undefined {
    return this.fields.getData().refreshJwt;
  }
}
