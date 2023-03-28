import { User } from "../../domain/entities/user/User";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { CreateUserInputDto, ICreateUserUseCase } from "./ICreateUserUseCase";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(readonly usersRepository: IUsersRepository) {}

  async execute(input: CreateUserInputDto): Promise<void> {
    if (await this.usersRepository.existsByEmail(input.email))
      throw new Error("email already in use");
    const user = new User(input);
    await this.usersRepository.insert(user.getDataAndPassword());
  }
}
