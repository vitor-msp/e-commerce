import * as uuid from "uuid";
import emailValidator from "email-validator";
import { EncryptData } from "../../../utils/EncryptData";
import { CompareEncryptedData } from "../../../utils/CompareEncryptedData";
import { IUser, UserProps } from "./IUser";
import { UserError } from "../../../errors/UserError";

export class User implements IUser {
  readonly id: string;
  readonly email: string;
  readonly password?: string;

  constructor(userInput: UserProps) {
    userInput.id = userInput.id?.trim();
    this.id =
      userInput.id && userInput.id.localeCompare("") !== 0
        ? userInput.id
        : uuid.v4();
    this.email = this.filterEmail(userInput.email);
    if (userInput.password)
      this.password = this.filterPassword(userInput.password);
  }

  private filterEmail(email: string): string {
    email = email.trim();
    if (!emailValidator.validate(email)) throw new UserError("invalid email");
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
    if (!this.password) throw new UserError("none password saved");
    return CompareEncryptedData.execute(password, this.password);
  }

  getDataAndPassword(): IUser {
    return {
      id: this.id,
      email: this.email,
      password: this.password ?? "",
    };
  }
}
