import { CreateUserInput } from "./CreateUserInput";

export interface ICreateUserUseCase {
  execute(input: CreateUserInput): Promise<void>;
}
