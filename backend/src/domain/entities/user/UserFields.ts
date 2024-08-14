import * as uuid from "uuid";
import { Email } from "../../value-objects/Email";

export class UserFields {
  private password?: string;
  private refreshJwt?: string;

  private constructor(
    private readonly id: string,
    private readonly email: Email
  ) {}

  public static build(input: any): UserFields {
    const email = Email.build(input["email"]);
    const fields = new UserFields(uuid.v4(), email);
    fields.password = input["password"];
    return fields;
  }

  public static rebuild(
    id: string,
    email: string,
    password?: string,
    refreshJwt?: string
  ): UserFields {
    const fields = new UserFields(id, Email.build(email));
    if (password) fields.password = password;
    if (refreshJwt) fields.refreshJwt = refreshJwt;
    return fields;
  }

  public getData() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      refreshJwt: this.refreshJwt,
    };
  }
}
