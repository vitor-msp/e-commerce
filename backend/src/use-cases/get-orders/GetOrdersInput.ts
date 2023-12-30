import { ApplicationError } from "../../errors/ApplicationError";

export class GetOrdersInput {
  private userId: string;

  public constructor(input: any) {
    if (!input["userId"]) throw new ApplicationError("missing user id");
    this.userId = input["userId"];
  }

  public getUserId(): string {
    return this.userId;
  }
}
