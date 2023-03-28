import { CreateUserController } from "../controllers/create-user/CreateUserController";
import { UsersRepositoryMemory } from "../repositories/users/UsersRepositoryMemory";
import { CreateUserUseCase } from "../use-cases/create-user/CreateUserUseCase";

export const createUserController = new CreateUserController(
  new CreateUserUseCase(new UsersRepositoryMemory([]))
);
