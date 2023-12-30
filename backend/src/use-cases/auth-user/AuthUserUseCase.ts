import { IUsersRepository } from "../../domain/contract/repositories/IUsersRepository";
import { IAuthUserUseCase } from "./IAuthUserUseCase";
import { IJwtGenerator } from "../../utils/IJwtGenerator";
import { AuthUserInput } from "./AuthUserInput";
import { AuthUserOutput } from "./AuthUserOutput";
import { ApplicationError } from "../../errors/ApplicationError";
import { IPasswordEncryptor } from "../../utils/IPasswordEncryptor";
import { AuthUserError } from "../../errors/AuthUserError";

export class AuthUserUseCase implements IAuthUserUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly passwordEncryptor: IPasswordEncryptor,
    private readonly jwtGenerator: IJwtGenerator
  ) {}

  async execute(input: AuthUserInput): Promise<AuthUserOutput> {
    const savedUserDB = await this.usersRepository.selectByEmail(
      input.getEmail()
    );
    if (!savedUserDB) throw new ApplicationError("email not found");

    const hash = savedUserDB.getPassword();
    if (!hash) throw new ApplicationError("password hash not found");

    const authenticated = this.passwordEncryptor.compare(
      input.getPassword(),
      hash
    );
    if (!authenticated) throw new AuthUserError("incorrect email or password");

    const jwt = this.jwtGenerator.generate({
      userId: savedUserDB.getId(),
    });
    return {
      jwt,
    };
  }
}
