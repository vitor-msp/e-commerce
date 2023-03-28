import { AuthUserController } from "../controllers/auth-user/AuthUserController";
import { CreateUserController } from "../controllers/create-user/CreateUserController";
import { UsersRepositoryMemory } from "../repositories/users/UsersRepositoryMemory";
import { AuthUserUseCase } from "../use-cases/auth-user/AuthUserUseCase";
import { CreateUserUseCase } from "../use-cases/create-user/CreateUserUseCase";

const usersRepositoryMemory = new UsersRepositoryMemory([]);
export const createUserController = new CreateUserController(
  new CreateUserUseCase(usersRepositoryMemory)
);
export const authUserController = new AuthUserController(
  new AuthUserUseCase(usersRepositoryMemory)
);
