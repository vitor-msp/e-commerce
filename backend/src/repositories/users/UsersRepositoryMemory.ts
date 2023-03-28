import { IUser } from "../../domain/entities/user/IUser";
import { CompareEncryptedData } from "../../utils/CompareEncryptedData";
import { EncryptData } from "../../utils/EncryptData";
import { AuthOutputDto, IUsersRepository } from "./IUsersRepository";

export class UsersRepositoryMemory implements IUsersRepository {
  constructor(private readonly users: IUser[]) {
    this.users = [
      {
        id: "1",
        email: "teste@teste.com",
        password: EncryptData.execute("teste123"),
      },
      {
        id: "2",
        email: "used@teste.com",
        password: EncryptData.execute("used"),
      },
    ];
  }

  async insert(user: IUser): Promise<void> {
    this.users.push(user);
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.users.some((user) => user.email.localeCompare(email) === 0);
  }

  async testEmailAndPassword(
    email: string,
    password: string
  ): Promise<AuthOutputDto> {
    const user = this.users.find(
      (user) => user.email.localeCompare(email) === 0
    );
    if (!user)
      return {
        authenticated: false,
        userId: "",
      };
    return {
      authenticated: CompareEncryptedData.execute(password, user.password!),
      userId: user.id,
    };
  }
}
