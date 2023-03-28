import { IUsersRepository } from "../../repositories/users/IUsersRepository";

export type CreateUserInputDto = {
  email: string;
  password: string;
};

export interface ICreateUserUseCase {
  readonly usersRepository: IUsersRepository;
  execute(input: CreateUserInputDto): Promise<void>;
}
