import { User } from "../../domain/entities/user/User";
import { CreateUserError } from "../../errors/CreateUserError";
import { IUsersRepository } from "../../domain/contract/repositories/IUsersRepository";
import { CreateUserInput, ICreateUserUseCase } from "./ICreateUserUseCase";
import { EncryptData } from "../../utils/EncryptData";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(readonly usersRepository: IUsersRepository) {}

  async execute(input: CreateUserInput): Promise<void> {
    if (await this.usersRepository.existsByEmail(input.getEmail()))
      throw new CreateUserError("email already in use");
    input.setEncryptedPassword(EncryptData.execute(input.getPassword()));
    const user = new User(input.getFields());
    await this.usersRepository.insert(user);
  }
}
