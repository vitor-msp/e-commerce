import { User } from "../../domain/entities/user/User";
import { IUsersRepository } from "../../domain/contract/repositories/IUsersRepository";
import { ICreateUserUseCase } from "./ICreateUserUseCase";
import { IPasswordEncryptor } from "../../utils/IPasswordEncryptor";
import { CreateUserInput } from "./CreateUserInput";
import { ApplicationError } from "../../errors/ApplicationError";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly passwordEncryptor: IPasswordEncryptor
  ) {}

  async execute(input: CreateUserInput): Promise<void> {
    const emailInUse = await this.usersRepository.existsByEmail(
      input.getEmail()
    );
    if (emailInUse) throw new ApplicationError("email already in use");
    const encryptedPassword = this.passwordEncryptor.generateHash(
      input.getPassword()
    );
    input.setEncryptedPassword(encryptedPassword);
    const user = new User(input.getFields());
    await this.usersRepository.insert(user);
  }
}
