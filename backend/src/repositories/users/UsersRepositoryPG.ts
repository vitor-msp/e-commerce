import { DataSource, Repository } from "typeorm";
import { IUser } from "../../domain/entities/user/IUser";
import { UserDB } from "../../infra/db/schemas/UserDB";
import { AuthOutputDto, IUsersRepository } from "./IUsersRepository";

export class UsersRepositoryPG implements IUsersRepository {
  private readonly database: Repository<UserDB>;

  constructor(database: DataSource) {
    this.database = database.getRepository(UserDB);
  }

  insert(user: IUser): Promise<void> {
    throw new Error("Method not implemented.");
  }

  existsByEmail(email: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  selectById(id: string): Promise<IUser | undefined> {
    throw new Error("Method not implemented.");
  }

  testEmailAndPassword(
    email: string,
    password: string
  ): Promise<AuthOutputDto> {
    throw new Error("Method not implemented.");
  }
}
