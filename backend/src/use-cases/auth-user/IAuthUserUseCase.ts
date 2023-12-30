import { AuthUserInput } from "./AuthUserInput";
import { AuthUserOutput } from "./AuthUserOutput";

export interface IAuthUserUseCase {
  execute(input: AuthUserInput): Promise<AuthUserOutput>;
}
