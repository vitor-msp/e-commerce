import { CreateUserInput } from "../../domain/services/create-user/CreateUserInput";
import { ICreateUserDomainService } from "../../domain/services/create-user/ICreateUserDomainService";
import { Role } from "../../domain/value-objects/Role";
import { ICreateUserAdminUseCase } from "./ICreateUserAdminUseCase";

export class CreateUserAdminUseCase implements ICreateUserAdminUseCase {
  constructor(
    private readonly createUserDomainService: ICreateUserDomainService
  ) {}

  async execute(input: CreateUserInput): Promise<void> {
    input.setRole(Role.Administrator);
    await this.createUserDomainService.execute(input);
  }
}
