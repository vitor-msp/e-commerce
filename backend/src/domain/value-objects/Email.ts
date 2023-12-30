import emailValidator from "email-validator";
import { DomainError } from "../../errors/DomainError";

export class Email {
  private constructor(public readonly email: string) {}

  public static build(email: string): Email {
    email = email.trim();
    if (!emailValidator.validate(email)) throw new DomainError("invalid email");
    return new Email(email);
  }
}
