import { IUsersRepository } from "../../domain/contract/repositories/IUsersRepository";
import { ILogoutUseCase } from "./ILogoutUseCase";
import { IJwtValidator } from "../utils/jwt-validator/IJwtValidator";
import { AuthUserError } from "../../errors/AuthUserError";
import { NotFoundError } from "../../errors/NotFoundError";
import { LogoutInput } from "./LogoutInput";

export class LogoutUseCase implements ILogoutUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly jwtValidator: IJwtValidator
  ) {}

  async execute(input: LogoutInput): Promise<void> {
    const inputJwt = input.getRefreshJwt();

    const userId = (await this.jwtValidator.getContent(inputJwt, false)).userId;

    const user = await this.usersRepository.selectById(userId);
    if (!user) throw new NotFoundError("user not found");

    const tokenIsValid = inputJwt === user.getRefreshJwt();
    if (!tokenIsValid) throw new AuthUserError("token is not valid");

    await this.usersRepository.updateRefreshJwt(userId, "REVOKED");
  }
}
