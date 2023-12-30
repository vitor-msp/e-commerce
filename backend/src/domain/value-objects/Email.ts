import emailValidator from "email-validator";
import { UserError } from "../../errors/UserError";

export class Email {
  private constructor(public readonly email: string) {}

  public static build(email: string): Email {
    email = email.trim();
    if (!emailValidator.validate(email)) throw new UserError("invalid email");
    return new Email(email);
  }
}
