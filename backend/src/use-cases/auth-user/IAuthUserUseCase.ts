import { IUsersRepository } from "../../domain/contract/repositories/IUsersRepository";

export type AuthUserInputDto = {
  email: string;
  password: string;
};

export type AuthUserOutputDto = {
  jwt: string;
};

export interface IAuthUserUseCase {
  readonly usersRepository: IUsersRepository;
  execute(input: AuthUserInputDto): Promise<AuthUserOutputDto>;
}
