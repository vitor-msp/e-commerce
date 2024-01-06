import { UsersRepositoryPG } from "../../src/repositories/users/UsersRepositoryPG";
import { CreateUserUseCase } from "../../src/use-cases/create-user/CreateUserUseCase";
import { PasswordEncryptor } from "../../src/use-cases/utils/password-encryptor/PasswordEncryptor";
import { CreateUserInput } from "../../src/use-cases/create-user/CreateUserInput";
import { ApplicationError } from "../../src/errors/ApplicationError";

jest.mock("../../src/repositories/users/UsersRepositoryPG");
jest.mock("../../src/use-cases/utils/password-encryptor/PasswordEncryptor");

const UsersRepositoryPGMock = UsersRepositoryPG as jest.Mock<UsersRepositoryPG>;
const PasswordEncryptorMock = PasswordEncryptor as jest.Mock<PasswordEncryptor>;

const makeSut = () => {
  const usersRepositoryPGMock =
    new UsersRepositoryPGMock() as jest.Mocked<UsersRepositoryPG>;
  const passwordEncryptorMock =
    new PasswordEncryptorMock() as jest.Mocked<PasswordEncryptor>;
  const sut = new CreateUserUseCase(
    usersRepositoryPGMock,
    passwordEncryptorMock
  );
  return { sut, usersRepositoryPGMock, passwordEncryptorMock };
};

const USED_USER_EMAIL: string = "used@teste.com";
const NEW_USER_EMAIL: string = "teste@teste.com";
const USER_PASSWORD: string = "password";
const USER_PASSWORD_HASH: string = "password-hash";

const getCreateUserInputExample = (): CreateUserInput => {
  return new CreateUserInput({
    email: NEW_USER_EMAIL,
    password: USER_PASSWORD,
  });
};

describe("Create User Use Case Tests", () => {
  let sut: CreateUserUseCase;
  let usersRepositoryPGMock: jest.Mocked<UsersRepositoryPG>;
  let passwordEncryptorMock: jest.Mocked<PasswordEncryptor>;

  beforeAll(() => {
    const mocks = makeSut();
    sut = mocks.sut;
    usersRepositoryPGMock = mocks.usersRepositoryPGMock;
    passwordEncryptorMock = mocks.passwordEncryptorMock;
  });

  it("should create a valid user", async () => {
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
          password: USER_PASSWORD_HASH,
        },
      })
    );
  });

  it("should throw exception when email already in use", () => {
    usersRepositoryPGMock.existsByEmail.mockResolvedValueOnce(true);

    const input = new CreateUserInput({
      email: USED_USER_EMAIL,
      password: USER_PASSWORD,
    });
    expect(async () => await sut.execute(input)).rejects.toThrowError(
      ApplicationError
    );

    expect(usersRepositoryPGMock.existsByEmail).toHaveBeenCalledTimes(1);
    expect(usersRepositoryPGMock.existsByEmail).toHaveBeenCalledWith(
      USED_USER_EMAIL
    );
    expect(passwordEncryptorMock.generateHash).toHaveBeenCalledTimes(0);
    expect(usersRepositoryPGMock.insert).toHaveBeenCalledTimes(0);
  });
});
