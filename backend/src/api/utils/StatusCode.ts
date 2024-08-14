import { ApplicationError } from "../../errors/ApplicationError";
import { AuthUserError } from "../../errors/AuthUserError";
import { DomainError } from "../../errors/DomainError";
import { NotFoundError } from "../../errors/NotFoundError";

export abstract class StatusCode {
  public static fromError(error: any): number {
    if (error instanceof DomainError || error instanceof ApplicationError)
      return 400;

    if (error instanceof AuthUserError) return 401;

    if (error instanceof NotFoundError) return 404;

    return 500;
  }
}
