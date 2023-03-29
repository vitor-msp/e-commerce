import { IUser } from "../../domain/entities/user/IUser";

export type AuthOutputDto = {
  authenticated: boolean;
  userId: string;
};

export interface IUsersRepository {
  insert(user: IUser): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
  selectById(id: string): Promise<IUser | undefined>;
  testEmailAndPassword(email: string, password: string): Promise<AuthOutputDto>;
}
