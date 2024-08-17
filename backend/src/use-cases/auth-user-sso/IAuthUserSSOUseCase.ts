import { AuthUserSSOInput } from "./AuthUserSSOInput";
import { AuthUserSSOOutput } from "./AuthUserSSOOutput";

export interface IAuthUserSSOUseCase {
  execute(input: AuthUserSSOInput): Promise<AuthUserSSOOutput>;
}
