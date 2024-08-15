import { CreateUserInput } from "../../domain/services/create-user/CreateUserInput";

export interface ICreateUserAdminUseCase {
  execute(input: CreateUserInput): Promise<void>;
}
