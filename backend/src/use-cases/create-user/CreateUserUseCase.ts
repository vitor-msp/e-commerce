import { User } from "../../domain/entities/user/User";
import { CreateUserError } from "../../errors/CreateUserError";
import { IUsersRepository } from "../../domain/contract/repositories/IUsersRepository";
import { CreateUserInput, ICreateUserUseCase } from "./ICreateUserUseCase";
import { IPasswordEncryptor } from "../../utils/IPasswordEncryptor";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly passwordEncryptor: IPasswordEncryptor
  ) {}

  async execute(input: CreateUserInput): Promise<void> {
    if (await this.usersRepository.existsByEmail(input.getEmail()))
      throw new CreateUserError("email already in use");
    input.setEncryptedPassword(
      this.passwordEncryptor.generateHash(input.getPassword())
    );
    const user = new User(input.getFields());
    await this.usersRepository.insert(user);
  }
}
