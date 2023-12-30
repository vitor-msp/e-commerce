import { IUsersRepository } from "../../domain/contract/repositories/IUsersRepository";
import {
  AuthUserInputDto,
  AuthUserOutputDto,
  IAuthUserUseCase,
} from "./IAuthUserUseCase";
import { GenerateJwt } from "../../utils/GenerateJwt";
import { AuthUserUseCaseError } from "../../errors/AuthUserError";

export type JwtPayload = {
  userId: string;
};

export class AuthUserUseCase implements IAuthUserUseCase {
  constructor(readonly usersRepository: IUsersRepository) {}

  async execute(input: AuthUserInputDto): Promise<AuthUserOutputDto> {
    const authData = await this.usersRepository.testEmailAndPassword(
      input.email,
      input.password
    );
    if (!authData.authenticated)
      throw new AuthUserUseCaseError("incorrect email or password");
    const jwtPayload: JwtPayload = {
      userId: authData.userId,
    };
    return {
      jwt: GenerateJwt.execute(jwtPayload),
    };
  }
}
