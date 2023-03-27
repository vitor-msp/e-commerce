import * as uuid from "uuid";
import emailValidator from "email-validator";
import { EncryptData } from "../helpers/EncryptData";
import { CompareEncryptedData } from "../helpers/CompareEncryptedData";

export type UserProps = {
  id?: string;
  email: string;
  password?: string;
};

export class User {
  private readonly id: string;
  private readonly email: string;
  private password?: string;

  constructor(userInput: UserProps) {
    this.id = userInput.id?.trim() ?? uuid.v4();
    this.email = this.filterEmail(userInput.email);
    if (userInput.password)
      this.password = this.filterPassword(userInput.password);
  }

  private filterEmail(email: string): string {
    email = email.trim();
    if (!emailValidator.validate(email)) throw new Error("invalid email");
    return email;
  }

  private filterPassword(password: string): string {
    if (password.localeCompare("") === 0) throw new Error("blank password");
    return EncryptData.execute(password);
  }

  getData(): UserProps {
    return {
      id: this.id,
      email: this.email,
    };
  }

  passwordIsCorrect(password: string): boolean {
    if (!this.password) throw new Error("none password saved");
    return CompareEncryptedData.execute(password, this.password);
  }
}
