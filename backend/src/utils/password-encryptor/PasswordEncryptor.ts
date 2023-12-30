import bcrypt from "bcryptjs";
import { IPasswordEncryptor } from "./IPasswordEncryptor";

export class PasswordEncryptor implements IPasswordEncryptor {
  public generateHash(plainText: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(plainText, salt);
    return hash;
  }

  public compare(plainText: string, hash: string): boolean {
    return bcrypt.compareSync(plainText, hash);
  }
}
