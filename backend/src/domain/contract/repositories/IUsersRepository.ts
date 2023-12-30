import { User } from "../../entities/user/User";

export type AuthOutputDto = {
  authenticated: boolean;
  userId: string;
};

export interface IUsersRepository {
  insert(user: User): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
  selectById(id: string): Promise<User | null>;
  testEmailAndPassword(email: string, password: string): Promise<AuthOutputDto>;
}
