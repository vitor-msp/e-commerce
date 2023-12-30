import { DataSource, Repository } from "typeorm";
import { UserDB } from "../../infra/db/schemas/UserDB";
import { IPasswordEncryptor } from "../../utils/IPasswordEncryptor";
import {
  AuthOutput,
  IUsersRepository,
} from "../../domain/contract/repositories/IUsersRepository";
import { User } from "../../domain/entities/user/User";

export class UsersRepositoryPG implements IUsersRepository {
  private readonly database: Repository<UserDB>;
  private readonly passwordEncryptor: IPasswordEncryptor;

  constructor(database: DataSource, passwordEncryptor: IPasswordEncryptor) {
    this.database = database.getRepository(UserDB);
    this.passwordEncryptor = passwordEncryptor;
  }

  async insert(user: User): Promise<void> {
    const userDB = UserDB.build(user);
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
  ): Promise<AuthOutput> {
    const savedUserDB = await this.database.findOneBy({ email });
    if (!savedUserDB || !savedUserDB.password || !savedUserDB.id)
      return { authenticated: false, userId: "" };
    const authenticated = this.passwordEncryptor.compare(
      password,
      savedUserDB.password
    );
    return {
      authenticated,
      userId: authenticated ? savedUserDB.id : "",
    };
  }
}
