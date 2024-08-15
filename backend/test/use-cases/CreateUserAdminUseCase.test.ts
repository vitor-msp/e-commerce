import { UsersRepositoryPG } from "../../src/repositories/users/UsersRepositoryPG";
import { CreateUserAdminUseCase } from "../../src/use-cases/create-user-admin/CreateUserAdminUseCase";
import { PasswordEncryptor } from "../../src/use-cases/utils/password-encryptor/PasswordEncryptor";
import { CreateUserInput } from "../../src/domain/services/create-user/CreateUserInput";
import { CreateUserDomainService } from "../../src/domain/services/create-user/CreateUserDomainService";

jest.mock("../../src/repositories/users/UsersRepositoryPG");
jest.mock("../../src/use-cases/utils/password-encryptor/PasswordEncryptor");

const UsersRepositoryPGMock = UsersRepositoryPG as jest.Mock<UsersRepositoryPG>;
const PasswordEncryptorMock = PasswordEncryptor as jest.Mock<PasswordEncryptor>;

const makeSut = () => {
  const usersRepositoryPGMock =
    new UsersRepositoryPGMock() as jest.Mocked<UsersRepositoryPG>;
  const passwordEncryptorMock =
    new PasswordEncryptorMock() as jest.Mocked<PasswordEncryptor>;
  const sut = new CreateUserAdminUseCase(
    new CreateUserDomainService(usersRepositoryPGMock, passwordEncryptorMock)
  );
  return { sut, usersRepositoryPGMock, passwordEncryptorMock };
};

const NEW_USER_EMAIL: string = "teste@teste.com";
const USER_PASSWORD: string = "password";
const USER_PASSWORD_HASH: string = "password-hash";

const getCreateUserInputExample = (): CreateUserInput => {
  return new CreateUserInput({
    email: NEW_USER_EMAIL,
    password: USER_PASSWORD,
  });
};

describe("Create User Admin Use Case Tests", () => {
  let sut: CreateUserAdminUseCase;
  let usersRepositoryPGMock: jest.Mocked<UsersRepositoryPG>;
  let passwordEncryptorMock: jest.Mocked<PasswordEncryptor>;

  beforeAll(() => {
    const mocks = makeSut();
    sut = mocks.sut;
    usersRepositoryPGMock = mocks.usersRepositoryPGMock;
    passwordEncryptorMock = mocks.passwordEncryptorMock;
  });

  it("should create a valid user admin", async () => {
    usersRepositoryPGMock.existsByEmail.mockResolvedValueOnce(false);
    passwordEncryptorMock.generateHash.mockReturnValueOnce(USER_PASSWORD_HASH);

    await sut.execute(getCreateUserInputExample());

    expect(usersRepositoryPGMock.existsByEmail).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.existsByEmail).toHaveBeenCalledWith(
      NEW_USER_EMAIL
    );
    expect(passwordEncryptorMock.generateHash).toHaveBeenCalledTimes(1);
    expect(passwordEncryptorMock.generateHash).toHaveBeenCalledWith(
      USER_PASSWORD
    );
    expect(usersRepositoryPGMock.insert).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        fields: {
          id: expect.any(String),
          email: { email: NEW_USER_EMAIL },
          role: "Administrator",
          password: USER_PASSWORD_HASH,
        },
      })
    );
  });
});
