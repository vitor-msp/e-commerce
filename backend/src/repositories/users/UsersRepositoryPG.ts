import { DataSource, Repository } from "typeorm";
import { UserDB } from "../../infra/db/schemas/UserDB";
import { CompareEncryptedData } from "../../utils/CompareEncryptedData";
import {
  AuthOutputDto,
  IUsersRepository,
} from "../../domain/contract/repositories/IUsersRepository";
import { User } from "../../domain/entities/user/User";

export class UsersRepositoryPG implements IUsersRepository {
  private readonly database: Repository<UserDB>;

  constructor(database: DataSource) {
    this.database = database.getRepository(UserDB);
  }

  async insert(user: User): Promise<void> {
    const userDB = UserDB.build(user.getFields());
    await this.database.save(userDB);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.database.findOneBy({ email });
    return !!user;
  }

  async selectById(id: string): Promise<User | null> {
    const userDB = await this.database.findOneBy({ id });
    if (!userDB) return null;
    return userDB.getEntity();
  }

  async testEmailAndPassword(
    email: string,
    password: string
  ): Promise<AuthOutputDto> {
    const savedUserDB = await this.database.findOneBy({ email });
    if (!savedUserDB || !savedUserDB.password || !savedUserDB.id)
      return { authenticated: false, userId: "" };
    const authenticated = CompareEncryptedData.execute(
      password,
      savedUserDB.password
    );
    return {
      authenticated,
      userId: authenticated ? savedUserDB.id : "",
    };
  }
}
