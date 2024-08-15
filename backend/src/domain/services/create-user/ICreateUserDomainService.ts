import { CreateUserInput } from "./CreateUserInput";

export interface ICreateUserDomainService {
  execute(input: CreateUserInput): Promise<void>;
}
