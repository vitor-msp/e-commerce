import { ApplicationError } from "../../errors/ApplicationError";

export class RefreshTokenInput {
  private refreshJwt: string;

  public constructor(input: any) {
    if (!input["refreshJwt"]) throw new ApplicationError("missing refreshJwt");
    this.refreshJwt = input["refreshJwt"];
  }

  public getRefreshJwt(): string {
    return this.refreshJwt;
  }
}
