import { ICreateUserUseCase } from "./ICreateUserUseCase";
import { CreateUserInput } from "../../domain/services/create-user/CreateUserInput";
import { ICreateUserDomainService } from "../../domain/services/create-user/ICreateUserDomainService";
import { Role } from "../../domain/value-objects/Role";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly createUserDomainService: ICreateUserDomainService
  ) {}

  async execute(input: CreateUserInput): Promise<void> {
    input.setRole(Role.Customer);
    await this.createUserDomainService.execute(input);
  }
}
