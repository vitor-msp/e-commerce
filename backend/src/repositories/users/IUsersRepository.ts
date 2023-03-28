import { IUser } from "../../domain/entities/user/IUser";

export interface IUsersRepository {
  insert(user: IUser): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
}
