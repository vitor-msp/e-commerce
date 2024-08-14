import * as uuid from "uuid";
import { Email } from "../../value-objects/Email";
import { Role } from "../../value-objects/Role";

export class UserFields {
  private password?: string;
  private refreshJwt?: string;

  private constructor(
    private readonly id: string,
    private readonly email: Email,
    private readonly role: Role
  ) {}

  public static build(input: any): UserFields {
    const email = Email.build(input["email"]);
    const role = input["role"] ?? Role.Customer;
    const fields = new UserFields(uuid.v4(), email, role);
    fields.password = input["password"];
    return fields;
  }

  public static rebuild(
    id: string,
    email: string,
    role: Role,
    password?: string,
    refreshJwt?: string
  ): UserFields {
    const fields = new UserFields(id, Email.build(email), role);
    if (password) fields.password = password;
    if (refreshJwt) fields.refreshJwt = refreshJwt;
    return fields;
  }

  public getData() {
    return {
      id: this.id,
      email: this.email,
      role: this.role,
      password: this.password,
      refreshJwt: this.refreshJwt,
    };
  }
}
