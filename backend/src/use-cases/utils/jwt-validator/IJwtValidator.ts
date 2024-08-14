import { JwtContent } from "../../../domain/value-objects/JwtContent";

export interface IJwtValidator {
  getContent(jwt: string, ifValid?: boolean): Promise<JwtContent>;
}
