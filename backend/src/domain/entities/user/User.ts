import { UserFields } from "./UserFields";

export class User {
  private readonly fields: UserFields;

  constructor(fields: UserFields) {
    this.fields = fields;
  }

  public getFields(): UserFields {
    return this.fields;
  }

  // passwordIsCorrect(password: string): boolean {
  //   if (!this.password) throw new UserError("none password saved");
  //   return CompareEncryptedData.execute(password, this.password);
  // }
}
