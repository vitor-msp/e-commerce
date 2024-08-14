import { IUsersRepository } from "../../domain/contract/repositories/IUsersRepository";
import { IJwtGenerator } from "../utils/jwt-generator/IJwtGenerator";
import { RefreshTokenInput } from "./RefreshTokenInput";
import { RefreshTokenOutput } from "./RefreshTokenOutput";
import { IRefreshTokenUseCase } from "./IRefreshTokenUseCase";
import { IJwtValidator } from "../utils/jwt-validator/IJwtValidator";
import { AuthUserError } from "../../errors/AuthUserError";
import { NotFoundError } from "../../errors/NotFoundError";
import { JWT_EXPIRES_IN } from "../utils/constans";

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly jwtValidator: IJwtValidator,
    private readonly jwtGenerator: IJwtGenerator
  ) {}

  async execute(input: RefreshTokenInput): Promise<RefreshTokenOutput> {
    const inputJwt = input.getRefreshJwt();

    const userId = await this.jwtValidator.getContent(inputJwt);

    const user = await this.usersRepository.selectById(userId);
    if (!user) throw new NotFoundError("user not found");

    const tokenIsValid = inputJwt === user.getRefreshJwt();
    if (!tokenIsValid) throw new AuthUserError("token is not valid");

    const jwt = this.jwtGenerator.generate({ userId }, JWT_EXPIRES_IN);

    return {
      jwt,
    };
  }
}
