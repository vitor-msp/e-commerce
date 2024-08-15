import { Role } from "../../../domain/value-objects/Role";
import { AuthorizationMiddleware } from "./AuthorizationMiddleware";

export class CustomerGuard extends AuthorizationMiddleware {
  public constructor() {
    super([Role.Customer]);
  }
}
