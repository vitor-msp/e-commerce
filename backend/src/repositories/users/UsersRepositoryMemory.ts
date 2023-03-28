import { IUser } from "../../domain/entities/user/IUser";
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepositoryMemory implements IUsersRepository {
  constructor(private readonly users: IUser[]) {
    this.users = [{ id: "1", email: "used@teste.com", password: "used" }];
  }

  async insert(user: IUser): Promise<void> {
    this.users.push(user);
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.users.some((user) => user.email.localeCompare(email) === 0);
  }
}
