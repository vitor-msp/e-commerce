import * as uuid from "uuid";
import { Email } from "../../value-objects/Email";

export class UserFields {
  private password?: string;

  private constructor(
    private readonly id: string,
    private readonly email: Email
  ) {}

  public static build(input: any): UserFields {
    if (!input["email"]) throw new Error("missing email");
    const email = Email.build(input["email"]);
    const fields = new UserFields(uuid.v4(), email);
    fields.password = input["password"];
    return fields;
  }

  public static rebuild(
    id: string,
    email: string,
    password?: string
  ): UserFields {
    const fields = new UserFields(id, Email.build(email));
    if (password) fields.password = password;
    return fields;
  }

  public getData() {
    return { id: this.id, email: this.email, password: this.password };
  }
}
