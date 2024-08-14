import { IUsersRepository } from "../../domain/contract/repositories/IUsersRepository";
import { IAuthUserUseCase } from "./IAuthUserUseCase";
import { IJwtGenerator } from "../utils/jwt-generator/IJwtGenerator";
import { IPasswordEncryptor } from "../utils/password-encryptor/IPasswordEncryptor";
import { AuthUserInput } from "./AuthUserInput";
import { AuthUserOutput } from "./AuthUserOutput";
import { ApplicationError } from "../../errors/ApplicationError";
import { AuthUserError } from "../../errors/AuthUserError";
import { JWT_EXPIRES_IN, REFRESH_JWT_EXPIRES_IN } from "../utils/constans";

export class AuthUserUseCase implements IAuthUserUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly passwordEncryptor: IPasswordEncryptor,
    private readonly jwtGenerator: IJwtGenerator
  ) {}

  async execute(input: AuthUserInput): Promise<AuthUserOutput> {
    const user = await this.usersRepository.selectByEmail(input.getEmail());
    if (!user) throw new ApplicationError("email not found");

    const hash = user.getPassword();
    if (!hash) throw new ApplicationError("password hash not found");

    const authenticated = this.passwordEncryptor.compare(
      input.getPassword(),
      hash
    );
    if (!authenticated) throw new AuthUserError("incorrect email or password");

    const userId = user.getId();
    const jwt = this.jwtGenerator.generate(
      { userId, role: user.getRole() },
      JWT_EXPIRES_IN
    );
    const refreshJwt = this.jwtGenerator.generate(
      { userId },
      REFRESH_JWT_EXPIRES_IN
    );

    await this.usersRepository.updateRefreshJwt(userId, refreshJwt);

    return {
      jwt,
      refreshJwt,
    };
  }
}
