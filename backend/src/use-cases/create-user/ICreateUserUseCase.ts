import { CreateUserInput } from "../../domain/services/create-user/CreateUserInput";

export interface ICreateUserUseCase {
  execute(input: CreateUserInput): Promise<void>;
}
