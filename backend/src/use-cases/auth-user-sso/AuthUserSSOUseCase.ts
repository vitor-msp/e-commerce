import { IUsersRepository } from "../../domain/contract/repositories/IUsersRepository";
import { IJwtGenerator } from "../utils/jwt-generator/IJwtGenerator";
import { JWT_EXPIRES_IN, REFRESH_JWT_EXPIRES_IN } from "../utils/constants";
import { AuthUserSSOInput } from "./AuthUserSSOInput";
import { AuthUserSSOOutput } from "./AuthUserSSOOutput";
import { User } from "../../domain/entities/user/User";
import { Role } from "../../domain/value-objects/Role";
import { IAuthUserSSOUseCase } from "./IAuthUserSSOUseCase";
import { ApplicationError } from "../../errors/ApplicationError";

export class AuthUserSSOUseCase implements IAuthUserSSOUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly jwtGenerator: IJwtGenerator
  ) {}

  async execute(input: AuthUserSSOInput): Promise<AuthUserSSOOutput> {
    let user = await this.selectBySsoId(input);
    if (!user) {
      const emailInUse = await this.usersRepository.existsByEmail(
        input.getEmail()
      );
      if (emailInUse) throw new ApplicationError("email already in use");
      user = await this.createUser(input);
    }

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

  private async selectBySsoId(input: AuthUserSSOInput): Promise<User | null> {
    switch (input.getSsoIdField()) {
      case "github":
        return await this.usersRepository.selectByGithubId(input.getGithubId());

      default:
        throw new ApplicationError("invalid sso option");
    }
  }

  private async createUser(input: AuthUserSSOInput): Promise<User> {
    input.setRole(Role.Customer);
    const user = new User(input.getFields());
    await this.usersRepository.insert(user);
    return user;
  }
}
