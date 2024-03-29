import { User } from "../../entities/user/User";

export interface IUsersRepository {
  insert(user: User): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
  selectById(id: string): Promise<User | null>;
  selectByEmail(email: string): Promise<User | null>;
}
