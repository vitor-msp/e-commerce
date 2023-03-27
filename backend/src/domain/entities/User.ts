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
    userInput.id = userInput.id?.trim();
    //@ts-ignore
    this.id = userInput.id?.localeCompare("") === 0 ? uuid.v4() : userInput.id;
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
