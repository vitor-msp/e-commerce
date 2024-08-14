import { DataSource, Repository } from "typeorm";
import { UserDB } from "../../infra/db/schemas/UserDB";
import { IUsersRepository } from "../../domain/contract/repositories/IUsersRepository";
import { User } from "../../domain/entities/user/User";

export class UsersRepositoryPG implements IUsersRepository {
  private readonly database: Repository<UserDB>;

  public constructor(database: DataSource) {
    this.database = database.getRepository(UserDB);
  }

  public async insert(user: User): Promise<void> {
    const userDB = UserDB.build(user);
    await this.database.save(userDB);
  }

  public async existsByEmail(email: string): Promise<boolean> {
    const user = await this.database.findOneBy({ email });
    return !!user;
  }

  public async selectById(id: string): Promise<User | null> {
    const userDB = await this.database.findOneBy({ id });
    if (!userDB) return null;
    return userDB.getEntity();
  }

  public async selectByEmail(email: string): Promise<User | null> {
    const userDB = await this.database.findOneBy({ email });
    if (!userDB) return null;
    return userDB.getEntity();
  }

  public async updateRefreshJwt(
    userId: string,
    refreshJwt: string
  ): Promise<void> {
    await this.database.update({ id: userId }, { refreshJwt });
  }
}
