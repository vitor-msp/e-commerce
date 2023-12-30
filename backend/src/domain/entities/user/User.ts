import { UserFields } from "./UserFields";

export class User {
  private readonly fields: UserFields;

  constructor(fields: UserFields) {
    this.fields = fields;
  }

  public getFields(): UserFields {
    return this.fields;
  }

  public getId(): string {
    return this.fields.getData().id;
  }
}
