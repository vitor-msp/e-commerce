import { User } from "../../entities/user/User";

export interface IUsersRepository {
  insert(user: User): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
  selectById(id: string): Promise<User | null>;
  selectByEmail(email: string): Promise<User | null>;
  selectByGithubId(githubId: number): Promise<User | null>;
  updateRefreshJwt(userId: string, refreshJwt: string): Promise<void>;
}
