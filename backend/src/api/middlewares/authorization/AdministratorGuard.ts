import { Role } from "../../../domain/value-objects/Role";
import { AuthorizationMiddleware } from "./AuthorizationMiddleware";

export class AdministratorGuard extends AuthorizationMiddleware {
  public constructor() {
    super([Role.Administrator]);
  }
}
