import { DomainError } from "../../../errors/DomainError";
import { IPasswordEncryptor } from "../../../use-cases/utils/password-encryptor/IPasswordEncryptor";
import { IUsersRepository } from "../../contract/repositories/IUsersRepository";
import { User } from "../../entities/user/User";
import { CreateUserInput } from "./CreateUserInput";
import { ICreateUserDomainService } from "./ICreateUserDomainService";

export class CreateUserDomainService implements ICreateUserDomainService {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly passwordEncryptor: IPasswordEncryptor
  ) {}

  async execute(input: CreateUserInput): Promise<void> {
    const emailInUse = await this.usersRepository.existsByEmail(
      input.getEmail()
    );
    if (emailInUse) throw new DomainError("email already in use");
    const encryptedPassword = this.passwordEncryptor.generateHash(
      input.getPassword()
    );
    input.setEncryptedPassword(encryptedPassword);
    const user = new User(input.getFields());
    await this.usersRepository.insert(user);
  }
}
