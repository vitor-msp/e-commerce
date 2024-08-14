import { LogoutInput } from "./LogoutInput";

export interface ILogoutUseCase {
  execute(input: LogoutInput): Promise<void>;
}
