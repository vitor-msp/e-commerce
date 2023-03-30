import { DataSource, Repository } from "typeorm";
import { IUser } from "../../domain/entities/user/IUser";
import { UserDB } from "../../infra/db/schemas/UserDB";
import { AuthOutputDto, IUsersRepository } from "./IUsersRepository";

export class UsersRepositoryPG implements IUsersRepository {
  private readonly database: Repository<UserDB>;

  constructor(database: DataSource) {
    this.database = database.getRepository(UserDB);
  }

  async insert(user: IUser): Promise<void> {
    const { id, email, password } = user;
    await this.database.save({ id, email, password });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.database.findOneBy({ email });
    if (!user) return false;
    return true;
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
